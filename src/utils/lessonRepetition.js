export const LESSON_REPETITION_STAGES = 4;

const clampStage = value => Math.max(0, Math.min(LESSON_REPETITION_STAGES, Number(value) || 0));

export function getLessonRepetitionStage(progress, lessonId) {
  const saved = progress?.lessonRepetitions?.[lessonId];
  if (typeof saved === "number") return clampStage(saved);
  if (saved && typeof saved === "object") return clampStage(saved.count);
  return progress?.completedLessonIds?.includes(lessonId) ? LESSON_REPETITION_STAGES : 0;
}

export function recordLessonRepetition(repetitions = {}, lessonId, completedAt = new Date().toISOString()) {
  const current = repetitions[lessonId];
  const previousCount = typeof current === "number" ? current : current?.count;
  return {
    ...repetitions,
    [lessonId]: {
      count: clampStage((previousCount || 0) + 1),
      lastCompletedAt: completedAt
    }
  };
}

export function migrateLessonRepetitions(parsed = {}) {
  if (parsed.lessonRepetitions && typeof parsed.lessonRepetitions === "object" && !Array.isArray(parsed.lessonRepetitions)) {
    return parsed.lessonRepetitions;
  }
  return Object.fromEntries((parsed.completedLessonIds || []).map(id => [id, {
    count: LESSON_REPETITION_STAGES,
    migratedLegacyCompletion: true
  }]));
}
