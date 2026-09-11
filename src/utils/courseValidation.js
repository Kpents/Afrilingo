export const supportedQuestionTypes = new Set([
  "multiple-choice", "translate", "native-to-english", "english-to-native",
  "sentence-builder", "match", "matching", "listening", "listen-and-select", "image-choice", "image-to-word",
  "fill-in-the-blank", "conversation", "mini-conversation", "challenge"
]);

export function prepareCourse(course, units, region) {
  return {
    ...course,
    region,
    units: units.map(unit => ({
      ...unit,
      lessons: unit.lessons.map(lesson => ({
        ...lesson,
        cultureCard: { ...lesson.cultureCard, id: lesson.cultureCard?.id || `${lesson.id}-culture`, language: course.language, region },
        questions: lesson.questions.map((question, questionIndex) => ({ ...question, id: `${lesson.id}:${question.id || `q${questionIndex + 1}`}` }))
      }))
    }))
  };
}

export function validateCourse(course) {
  const errors = [];
  const lessonIds = new Set();
  const cardIds = new Set();
  if (!course.id || !course.language || !course.flag) errors.push("Course metadata is incomplete.");
  if (!course.units?.length) errors.push("Course has no units.");
  course.units?.forEach((unit, unitIndex) => {
    if (!unit.id || !unit.title || !unit.lessons?.length) errors.push(`Unit ${unitIndex + 1} is incomplete.`);
    unit.lessons?.forEach((lesson, lessonIndex) => {
      const path = `${course.id}/${unit.id}/lesson-${lessonIndex + 1}`;
      if (!lesson.id || lessonIds.has(lesson.id)) errors.push(`${path}: lesson id is missing or duplicated.`);
      lessonIds.add(lesson.id);
      if (!lesson.title || !lesson.xp || !lesson.conversation?.length || !lesson.questions?.length) errors.push(`${path}: core lesson fields are incomplete.`);
      if (!lesson.cultureCard?.id || cardIds.has(lesson.cultureCard?.id)) errors.push(`${path}: culture card id is missing or duplicated.`);
      cardIds.add(lesson.cultureCard?.id);
      ["title", "category", "emoji", "text", "language", "region"].forEach(field => {
        if (!lesson.cultureCard?.[field]) errors.push(`${path}: culture card is missing ${field}.`);
      });
      lesson.conversation?.forEach((line, index) => {
        if (!line.native || !line.english) errors.push(`${path}: conversation line ${index + 1} needs native and English text.`);
      });
      const questionIds = new Set();
      lesson.questions?.forEach((question, index) => {
        if (!question.id || questionIds.has(question.id)) errors.push(`${path}: question ${index + 1} id is missing or duplicated.`);
        questionIds.add(question.id);
        if (!supportedQuestionTypes.has(question.type)) errors.push(`${path}: unsupported question type “${question.type}”.`);
        if (!question.prompt || !question.explanation) errors.push(`${path}: question ${index + 1} needs a prompt and explanation.`);
        if (["match", "matching"].includes(question.type) ? !question.pairs?.length : !question.answer) errors.push(`${path}: question ${index + 1} has no answer data.`);
      });
    });
  });
  return errors;
}
