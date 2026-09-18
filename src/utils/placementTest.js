const choiceTypes = new Set([
  "multiple-choice", "translate", "native-to-english", "english-to-native",
  "fill-in-the-blank", "conversation", "mini-conversation", "challenge"
]);

function plainOptions(question) {
  return (question.options || []).map(option => typeof option === "object" ? option.value ?? option.label : option).filter(Boolean);
}

export function buildPlacementQuestions(course) {
  if (!course?.units?.length) return [];
  const checkpoints = [0, 1, 3, 5, 7].filter(index => index < course.units.length);
  return checkpoints.flatMap((unitIndex, placementIndex) => {
    const unit = course.units[unitIndex];
    const questions = unit.lessons.flatMap(lesson => lesson.questions || []);
    const question = questions.find(item => choiceTypes.has(item.type) && plainOptions(item).length >= 3 && item.answer);
    if (!question) return [];
    return [{
      id: `placement-${course.id}-${placementIndex + 1}`,
      unitIndex,
      prompt: question.prompt,
      options: plainOptions(question),
      answer: question.answer
    }];
  }).slice(0, 5);
}

export function placementUnitIndex(score, total, unitCount) {
  if (!total || !unitCount) return 0;
  const ratio = score / total;
  const suggested = ratio >= 1 ? 8 : ratio >= 0.8 ? 6 : ratio >= 0.6 ? 4 : ratio >= 0.4 ? 2 : 0;
  return Math.min(suggested, unitCount - 1);
}
