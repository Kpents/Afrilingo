const normalized = value => String(value ?? "").trim().toLocaleLowerCase();

function uniqueVocabulary(items) {
  const seen = new Set();
  return items.filter(item => {
    if (!item?.native || !item?.english) return false;
    const key = `${normalized(item.native)}::${normalized(item.english)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function vocabularyForLesson(lesson) {
  return uniqueVocabulary([
    ...(lesson.vocabulary || []),
    ...(lesson.conversation || []).map(line => ({ native: line.native, english: line.english }))
  ]);
}

function optionsFor(items, answer, field) {
  const values = [answer, ...items.map(item => item[field])];
  const seen = new Set();
  return values.filter(value => {
    const key = normalized(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 4);
}

function lastToken(value) {
  return String(value).trim().split(/\s+/).at(-1);
}

function generatedQuestion(kind, word, pool, id, checkpoint) {
  const prefix = checkpoint ? "Checkpoint review: " : "";

  if (kind === 0) return {
    id, type: "native-to-english",
    prompt: `${prefix}What does “${word.native}” mean?`,
    options: optionsFor(pool, word.english, "english"), answer: word.english,
    explanation: `${word.native} means “${word.english}.”`
  };

  if (kind === 1) return {
    id, type: "english-to-native",
    prompt: `${prefix}Choose the Twi for “${word.english}”.`,
    options: optionsFor(pool, word.native, "native"), answer: word.native,
    explanation: `${word.native} expresses “${word.english}.”`
  };

  if (kind === 2) {
    const phrase = pool.find(item => item.native.split(/\s+/).length > 1) || word;
    return {
      id, type: "sentence-builder",
      prompt: `${prefix}Build the Twi expression for “${phrase.english}”.`,
      tiles: phrase.native.trim().split(/\s+/), answer: phrase.native,
      explanation: `The complete expression is “${phrase.native}”.`
    };
  }

  if (kind === 3) {
    const phrase = pool.find(item => item.native.split(/\s+/).length > 1) || word;
    const answer = lastToken(phrase.native);
    const endings = optionsFor(pool.map(item => ({ token: lastToken(item.native) })), answer, "token");
    return {
      id, type: "fill-in-the-blank",
      prompt: `${prefix}Complete “${phrase.native.replace(new RegExp(`${answer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`), "____")}”.`,
      options: endings, answer,
      explanation: `The missing part is “${answer}”. The full expression is “${phrase.native}”.`
    };
  }

  if (kind === 4) return {
    id, type: "matching",
    prompt: `${prefix}Match each Twi expression with its English meaning.`,
    pairs: pool.slice(0, Math.min(4, pool.length)),
    explanation: "Connect each expression with its meaning, then read the pairs once more."
  };

  return {
    id, type: "conversation",
    prompt: `${prefix}In a real conversation, how would you express “${word.english}”?`,
    options: optionsFor(pool, word.native, "native"), answer: word.native,
    explanation: `${word.native} is the expression practiced for “${word.english}.”`
  };
}

function deepenLesson(lesson, pool, target, checkpoint = false) {
  const vocabulary = uniqueVocabulary([...vocabularyForLesson(lesson), ...pool]);
  if (!vocabulary.length || lesson.questions.length >= target) return lesson;

  const questions = [...lesson.questions];
  const prompts = new Set(questions.map(question => normalized(question.prompt)));
  let attempt = 0;

  while (questions.length < target && attempt < target * 10) {
    const word = vocabulary[attempt % vocabulary.length];
    const question = generatedQuestion(attempt % 6, word, vocabulary, `depth-${questions.length + 1}`, checkpoint);
    attempt++;
    if (prompts.has(normalized(question.prompt))) continue;
    prompts.add(normalized(question.prompt));
    questions.push(question);
  }

  return { ...lesson, questions };
}

export function deepenTwiCourse(units) {
  return units.map((unit, unitIndex) => {
    const unitPool = uniqueVocabulary(unit.lessons.flatMap(vocabularyForLesson));
    const checkpoint = (unitIndex + 1) % 4 === 0;
    const reviewUnits = checkpoint ? units.slice(Math.max(0, unitIndex - 3), unitIndex + 1) : [unit];
    const reviewPool = uniqueVocabulary(reviewUnits.flatMap(reviewUnit => reviewUnit.lessons.flatMap(vocabularyForLesson)));

    return {
      ...unit,
      lessons: unit.lessons.map((lesson, lessonIndex) => {
        const isChallenge = lessonIndex === unit.lessons.length - 1;
        if (!isChallenge) return deepenLesson(lesson, unitPool, 12);

        const target = checkpoint ? 20 : 16;
        return {
          ...deepenLesson(lesson, reviewPool, target, checkpoint),
          reviewScope: checkpoint ? "four-unit-checkpoint" : "unit",
          reviewUnitIds: reviewUnits.map(reviewUnit => reviewUnit.id),
          reviewLabel: checkpoint ? `Checkpoint · Units ${unitIndex - 2}–${unitIndex + 1}` : "Unit review"
        };
      })
    };
  });
}
