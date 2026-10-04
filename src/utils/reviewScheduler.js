const DAY_MS = 24 * 60 * 60 * 1000;
const REVIEW_INTERVAL_DAYS = [0, 1, 3, 7, 14, 30];
const MASTERED_STAGE = REVIEW_INTERVAL_DAYS.length - 1;

export function reviewKeyFor(question, source = {}) {
  return `${source.id || "practice"}:${question.id}`;
}

export function recordReviewMiss(queue = [], question, source = {}, now = Date.now()) {
  const reviewKey = reviewKeyFor(question, source);
  const existing = queue.find(item => item.reviewKey === reviewKey);
  const nextItem = {
    ...existing,
    reviewKey,
    question: { ...question, retry: false },
    sourceId: source.id || existing?.sourceId || "practice",
    sourceTitle: source.title || existing?.sourceTitle || "Practice",
    misses: (existing?.misses || 0) + 1,
    correctReviews: existing?.correctReviews || 0,
    stage: Math.max(0, (existing?.stage || 0) - 1),
    lastMissedAt: now,
    dueAt: now
  };
  return existing ? queue.map(item => item.reviewKey === reviewKey ? nextItem : item) : [...queue, nextItem];
}

export function applyReviewOutcomes(queue = [], outcomes = [], now = Date.now()) {
  const byKey = new Map(outcomes.map(outcome => [outcome.reviewKey, outcome]));
  return queue.flatMap(item => {
    const outcome = byKey.get(item.reviewKey);
    if (!outcome) return [item];
    if (!outcome.correct) {
      return [{
        ...item,
        misses: (item.misses || 0) + 1,
        stage: Math.max(0, (item.stage || 0) - 1),
        lastMissedAt: now,
        lastReviewedAt: now,
        dueAt: now
      }];
    }
    const stage = Math.min(MASTERED_STAGE, (item.stage || 0) + 1);
    if (stage >= MASTERED_STAGE) return [];
    return [{
      ...item,
      stage,
      correctReviews: (item.correctReviews || 0) + 1,
      lastReviewedAt: now,
      dueAt: now + REVIEW_INTERVAL_DAYS[stage] * DAY_MS
    }];
  });
}

export function prioritizeReviewQueue(queue = [], now = Date.now()) {
  return [...queue].sort((a, b) => {
    const aDue = a.dueAt ?? a.lastMissedAt ?? 0;
    const bDue = b.dueAt ?? b.lastMissedAt ?? 0;
    const aReady = aDue <= now;
    const bReady = bDue <= now;
    if (aReady !== bReady) return aReady ? -1 : 1;
    if (aReady) {
      const aScore = (a.misses || 0) * 100 + Math.max(0, now - aDue) / DAY_MS - (a.stage || 0) * 5;
      const bScore = (b.misses || 0) * 100 + Math.max(0, now - bDue) / DAY_MS - (b.stage || 0) * 5;
      return bScore - aScore;
    }
    return aDue - bDue;
  });
}

export function isReviewDue(item, now = Date.now()) {
  return (item.dueAt ?? item.lastMissedAt ?? 0) <= now;
}

export function reviewDueLabel(item, now = Date.now()) {
  const dueAt = item.dueAt ?? item.lastMissedAt ?? 0;
  if (dueAt <= now) return (item.stage || 0) > 0 ? "Ready to strengthen" : "Needs attention";
  const days = Math.max(1, Math.ceil((dueAt - now) / DAY_MS));
  return days === 1 ? "Review tomorrow" : `Review in ${days} days`;
}
