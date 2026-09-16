import { findIconId } from "../iconLibrary";

const normalized = value => String(value ?? "").trim().toLocaleLowerCase();

const visualEmoji = [
  [/straight ahead|north/i, "⬆️"], [/turn right|\bright\b|east/i, "↪️"], [/turn left|\bleft\b|west/i, "↩️"], [/south/i, "⬇️"],
  [/morning/i, "🌅"], [/afternoon/i, "☀️"], [/evening/i, "🌆"], [/night/i, "🌙"],
  [/expensive|price|how much|money/i, "🏷️"], [/shopping/i, "🛍️"], [/police/i, "👮🏾"], [/thief/i, "🥷🏾"]
];

function withVisualMetadata(word) {
  const iconId = word.iconId || findIconId(word.english);
  const emoji = word.emoji || visualEmoji.find(([pattern]) => pattern.test(word.english))?.[1];
  return { ...word, ...(iconId ? { iconId } : {}), ...(emoji ? { visualEmoji: emoji } : {}) };
}

function uniqueVocabulary(items) {
  const seen = new Set();
  return items.map(withVisualMetadata).filter(item => {
    if (!item?.native || !item?.english) return false;
    const key = `${normalized(item.native)}::${normalized(item.english)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function visualQuestion(items, id, offset = 0) {
  const seenValues = new Set();
  const seenVisuals = new Set();
  const visualItems = items.filter(item => {
    const visualKey = item.iconId ? `icon:${item.iconId}` : Number.isFinite(item.number) ? `number:${item.number}` : item.visualEmoji ? `emoji:${item.visualEmoji}` : "";
    const valueKey = normalized(item.native);
    if (!visualKey || seenValues.has(valueKey) || seenVisuals.has(visualKey)) return false;
    seenValues.add(valueKey);
    seenVisuals.add(visualKey);
    return true;
  });
  if (visualItems.length < 3) return null;
  const answer = visualItems[offset % visualItems.length];
  const choices = [answer, ...visualItems.filter(item => item !== answer)].slice(0, 4);
  return {
    id,
    type: "image-choice",
    prompt: `Choose the picture that best represents “${answer.native}”.`,
    options: choices.map(item => ({
      value: item.native,
      label: item.native,
      visualLabel: item.english,
      showLabel: false,
      iconId: item.iconId,
      number: item.number,
      emoji: item.visualEmoji
    })),
    answer: answer.native,
    explanation: `${answer.native} means “${answer.english}.”`
  };
}

function numberChoices(items, values) {
  return values.map(value => items.find(item => item.number === value)).filter(Boolean);
}

function visualMathQuestion(numberItems) {
  const choices = numberChoices(numberItems, [1, 2, 3, 4]);
  const answer = choices.find(item => item.number === 3);
  if (!answer || choices.length < 4) return null;
  return {
    id: "visual-math-review",
    type: "image-choice",
    prompt: "Visual maths: 🍌🍌 + 🍌. Choose the Twi total.",
    options: choices.map(item => ({ value: item.native, label: item.native, visualLabel: `${item.number} items`, showLabel: false, number: item.number })),
    answer: answer.native,
    explanation: `Two plus one is three. ${answer.native} means “three.”`
  };
}

function marketPriceQuestion(numberItems) {
  const choices = numberChoices(numberItems, [2, 5, 10, 20]);
  const answer = choices.find(item => item.number === 5);
  if (!answer || choices.length < 4) return null;
  return {
    id: "market-price-visual",
    type: "image-choice",
    prompt: `The price is “${answer.native}”. Choose the matching number card.`,
    options: choices.map(item => ({ value: item.native, label: item.native, visualLabel: `Price: ${item.number}`, showLabel: false, number: item.number })),
    answer: answer.native,
    explanation: `${answer.native} is five, so the matching price card is 5.`
  };
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
  if (!questions.some(question => question.type === "image-choice")) {
    const visual = visualQuestion(vocabulary, `depth-visual`, questions.length);
    if (visual) {
      prompts.add(normalized(visual.prompt));
      questions.push(visual);
    }
  }
  let attempt = 0;

  while (questions.length < target && attempt < target * 10) {
    const word = vocabulary[attempt % vocabulary.length];
    const question = generatedQuestion(attempt % 6, word, vocabulary, `depth-${questions.length + 1}`, checkpoint);
    attempt++;
    if (prompts.has(normalized(question.prompt))) continue;
    prompts.add(normalized(question.prompt));
    questions.push(question);
  }

  return { ...lesson, vocabulary: vocabularyForLesson(lesson), questions };
}

export function deepenTwiCourse(units) {
  const numberItems = uniqueVocabulary(units.flatMap(unit => unit.lessons.flatMap(vocabularyForLesson))).filter(item => Number.isFinite(item.number));
  return units.map((unit, unitIndex) => {
    const unitPool = uniqueVocabulary(unit.lessons.flatMap(vocabularyForLesson));
    const checkpoint = (unitIndex + 1) % 4 === 0;
    const reviewUnits = checkpoint ? units.slice(Math.max(0, unitIndex - 3), unitIndex + 1) : [unit];
    const reviewPool = uniqueVocabulary(reviewUnits.flatMap(reviewUnit => reviewUnit.lessons.flatMap(vocabularyForLesson)));

    return {
      ...unit,
      lessons: unit.lessons.map((lesson, lessonIndex) => {
        const isChallenge = lessonIndex === unit.lessons.length - 1;
        if (!isChallenge) {
          const enriched = deepenLesson(lesson, unitPool, 12);
          const specialVisual = unitIndex === 1 && lessonIndex === 3
            ? visualMathQuestion(numberItems)
            : /market|shopping/i.test(unit.title) && lessonIndex === 0
              ? marketPriceQuestion(numberItems)
              : null;
          if (!specialVisual || enriched.questions.some(question => question.id === specialVisual.id)) return enriched;
          return { ...enriched, questions: [...enriched.questions, specialVisual] };
        }

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
