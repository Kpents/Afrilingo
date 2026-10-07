import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createAttempt, learningInsights, prioritizePracticeItems, recordAttempt } from "../src/utils/learningTelemetry.js";
import { expectedAnswer, normalizeAnswer } from "../src/utils/answerEvaluation.js";
import { buildUnitPathNodes } from "../src/utils/learningPath.js";

const progressSource = await readFile(new URL("../src/hooks/useCourseProgress.js", import.meta.url), "utf8");
assert.match(progressSource, /\.\.\.initialProgress,\s*\.\.\.parsed/, "Normalization must retain legacy progress fields.");
assert.match(progressSource, /learning:\s*\{\s*\.\.\.initialProgress\.learning/, "Older saves must receive the learning schema.");

const question = { id: "greeting:q1", type: "native-to-english", answer: "Hello" };
const miss = createAttempt({ question, source: { id: "greeting", title: "Greetings" }, correct: false, answer: "Goodbye", responseTimeMs: 2400, now: 1000 });
const hit = createAttempt({ question, source: { id: "greeting", title: "Greetings" }, correct: true, answer: "Hello", responseTimeMs: 1600, now: 2000 });
const learning = recordAttempt(recordAttempt(undefined, miss), hit);
assert.equal(learning.attempts.length, 2, "Each answer should create an attempt.");
assert.equal(learning.concepts[question.id].accuracy, 50, "Concept accuracy should aggregate attempts.");
assert.equal(learning.concepts[question.id].misses, 1, "Concept misses should be retained.");
assert.equal(learningInsights(learning, 3000).weakest[0].id, question.id, "Learner insights should expose weak concepts.");

const weak = { key: "weak", question, source: { id: "greeting" } };
const unseen = { key: "unseen", question: { id: "new:q1", type: "multiple-choice" }, source: { id: "new" } };
assert.equal(prioritizePracticeItems([unseen, weak], learning, 3000)[0].key, "weak", "Recent mistakes should outrank unseen material.");

const typed = { type: "listen-and-type", answer: "  Medaase " };
assert.equal(normalizeAnswer(typed, "medaase "), expectedAnswer(typed), "Typed listening answers should ignore case and outside whitespace.");

const path = buildUnitPathNodes({ id:"unit-1", lessons:[{id:"l1"},{id:"l2"},{id:"challenge"}] }, { hasImmersion:true });
assert.deepEqual(path.filter(item => item.type === "lesson").map(item => item.id), ["l1","l2","challenge"], "Mixed paths must preserve every authored lesson in order.");
assert.ok(path.some(item => item.type === "practice") && path.some(item => item.type === "story") && path.some(item => item.type === "review"), "Mixed paths should add non-blocking practice, immersion and review nodes.");

console.log("Learning engine validation passed: legacy saves, attempt ledger, concept mastery, adaptive priority and typed listening.");
