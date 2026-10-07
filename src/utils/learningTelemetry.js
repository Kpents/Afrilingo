import { skillForQuestion } from "./learnerMastery.js";

const MAX_ATTEMPTS = 600;
const DAY_MS = 24 * 60 * 60 * 1000;

const clean = value => String(value ?? "").trim();

export function conceptKeyFor(question = {}, source = {}) {
  return clean(question.conceptId || question.vocabularyId || source.conceptId || question.id || source.id || "practice");
}

export function createAttempt({ question, source = {}, correct, responseTimeMs, answer, mode = "lesson", now = Date.now() }) {
  return {
    id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
    questionId: clean(question?.id),
    conceptId: conceptKeyFor(question, source),
    skill: skillForQuestion(question),
    sourceId: clean(source.id || mode),
    sourceTitle: clean(source.title || mode),
    mode,
    correct: Boolean(correct),
    responseTimeMs: Math.max(0, Math.round(Number(responseTimeMs) || 0)),
    answer: Array.isArray(answer) ? answer.join(" ") : clean(answer),
    attemptedAt: now
  };
}

export function recordAttempt(learning = {}, attempt) {
  const attempts = [...(learning.attempts || []), attempt].slice(-MAX_ATTEMPTS);
  const previous = learning.concepts?.[attempt.conceptId] || { attempts: 0, correct: 0, misses: 0 };
  const total = previous.attempts + 1;
  const correct = previous.correct + (attempt.correct ? 1 : 0);
  return {
    schemaVersion: 1,
    ...learning,
    attempts,
    concepts: {
      ...(learning.concepts || {}),
      [attempt.conceptId]: {
        ...previous,
        skill: attempt.skill,
        attempts: total,
        correct,
        misses: previous.misses + (attempt.correct ? 0 : 1),
        accuracy: Math.round((correct / total) * 100),
        averageResponseTimeMs: Math.round(((previous.averageResponseTimeMs || 0) * previous.attempts + attempt.responseTimeMs) / total),
        lastAttemptAt: attempt.attemptedAt,
        lastCorrectAt: attempt.correct ? attempt.attemptedAt : previous.lastCorrectAt || null,
        lastMissedAt: attempt.correct ? previous.lastMissedAt || null : attempt.attemptedAt
      }
    }
  };
}

export function practicePriority(item, learning = {}, now = Date.now()) {
  const concept = learning.concepts?.[conceptKeyFor(item.question, item.source)] || {};
  const attempts = concept.attempts || 0;
  const accuracy = attempts ? concept.correct / attempts : 0.75;
  const ageDays = concept.lastAttemptAt ? Math.max(0, (now - concept.lastAttemptAt) / DAY_MS) : 3;
  const weakness = (1 - accuracy) * 100;
  const misses = Math.min(5, concept.misses || 0) * 10;
  const staleness = Math.min(30, ageDays * 2);
  const unseenBoost = attempts ? 0 : 8;
  return weakness + misses + staleness + unseenBoost;
}

export function prioritizePracticeItems(items = [], learning = {}, now = Date.now()) {
  return [...items].sort((a, b) => practicePriority(b, learning, now) - practicePriority(a, learning, now) || String(a.key).localeCompare(String(b.key)));
}

export function learningInsights(learning = {}, now = Date.now()) {
  const concepts = Object.entries(learning.concepts || {}).map(([id, value]) => ({ id, ...value, staleDays: value.lastAttemptAt ? Math.floor((now - value.lastAttemptAt) / DAY_MS) : 0 }));
  const weakest = [...concepts].filter(item => item.attempts > 0).sort((a, b) => a.accuracy - b.accuracy || b.misses - a.misses).slice(0, 5);
  const stale = [...concepts].filter(item => item.lastAttemptAt && item.staleDays >= 7).sort((a, b) => b.staleDays - a.staleDays).slice(0, 5);
  const recent = (learning.attempts || []).filter(item => now - item.attemptedAt <= 7 * DAY_MS);
  const previous = (learning.attempts || []).filter(item => now - item.attemptedAt > 7 * DAY_MS && now - item.attemptedAt <= 14 * DAY_MS);
  const accuracy = list => list.length ? Math.round(list.filter(item => item.correct).length / list.length * 100) : null;
  return { attempts: learning.attempts?.length || 0, concepts: concepts.length, weakest, stale, recentAccuracy: accuracy(recent), previousAccuracy: accuracy(previous) };
}
