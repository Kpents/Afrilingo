export function isUnitUnlocked(units, unitIndex, completedLessonIds) {
  if (unitIndex === 0) return true;
  const previousFinalLesson = units[unitIndex - 1]?.lessons?.at(-1);
  return Boolean(previousFinalLesson && completedLessonIds.includes(previousFinalLesson.id));
}

export function getFurthestUnlockedUnit(units, completedLessonIds) {
  let furthest = 0;
  for (let index = 1; index < units.length; index += 1) {
    if (!isUnitUnlocked(units, index, completedLessonIds)) break;
    furthest = index;
  }
  return furthest;
}

export function isLessonUnlocked(lessons, lessonIndex, completedLessonIds) {
  return lessonIndex === 0 || completedLessonIds.includes(lessons[lessonIndex - 1].id);
}
