import { findIconId, iconLibrary } from "../data/iconLibrary";

export const supportedQuestionTypes = new Set([
  "multiple-choice", "translate", "native-to-english", "english-to-native",
  "sentence-builder", "match", "matching", "listening", "listen-and-select", "image-choice", "image-to-word",
  "fill-in-the-blank", "conversation", "mini-conversation", "challenge"
]);

const visualCategories = new Set(["food-drinks", "fruits-vegetables", "animals", "places"]);
const numberNames = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
  nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
  "one hundred": 100
};
const normalized = value => String(value ?? "").toLowerCase().replace(/[“”'’.!?]/g, "").replace(/\s+/g, " ").trim();

function numberFrom(value) {
  const text = normalized(value);
  if (/^\d+$/.test(text)) return Number(text);
  return numberNames[text];
}

function visualMetadata(value, vocabulary) {
  const text = normalized(value);
  const word = vocabulary.find(entry => [entry.native, entry.english, entry.number].some(candidate => normalized(candidate) === text));
  const number = Number.isFinite(word?.number) ? word.number : numberFrom(word?.english ?? value);
  if (Number.isFinite(number)) return { number };
  const iconId = word?.iconId || findIconId(word?.english ?? value);
  return iconId && visualCategories.has(iconLibrary[iconId]?.category) && iconLibrary[iconId]?.status === "ready" ? { iconId } : null;
}

function addLearningVisuals(lesson) {
  const vocabulary = (lesson.vocabulary || []).map(word => {
    const number = Number.isFinite(word.number) ? word.number : numberFrom(word.english);
    const foundIcon = word.iconId || findIconId(word.english) || undefined;
    const iconId = foundIcon && iconLibrary[foundIcon]?.status === "ready" && (word.iconId || visualCategories.has(iconLibrary[foundIcon]?.category)) ? foundIcon : undefined;
    return { ...word, ...(Number.isFinite(number) ? { number } : {}), iconId };
  });
  const questions = lesson.questions.map(question => {
    if (!question.options?.length || ["listening", "listen-and-select"].includes(question.type)) return question;
    const options = question.options.map(raw => {
      const value = typeof raw === "object" ? raw.value ?? raw.label : raw;
      const meta = visualMetadata(value, vocabulary);
      return meta ? { ...(typeof raw === "object" ? raw : { value: raw, label: raw }), ...meta } : raw;
    });
    const fullyVisual = options.length >= 2 && options.every(option => typeof option === "object" && (option.iconId || Number.isFinite(option.number) || option.image || option.emoji));
    return fullyVisual ? { ...question, options, visualOptions: true } : question;
  });
  return { ...lesson, vocabulary, questions };
}

export function prepareCourse(course, units, region) {
  return {
    ...course,
    region,
    units: units.map(unit => ({
      ...unit,
      lessons: unit.lessons.map(rawLesson => {
        const lesson = addLearningVisuals(rawLesson);
        return ({
        ...lesson,
        cultureCard: { ...lesson.cultureCard, id: lesson.cultureCard?.id || `${lesson.id}-culture`, language: course.language, region },
        questions: lesson.questions.map((question, questionIndex) => ({ ...question, id: `${lesson.id}:${question.id || `q${questionIndex + 1}`}` }))
      })})
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
