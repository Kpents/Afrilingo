function choices(items, answer, field) {
  return [answer, ...items.map(item => item[field]).filter(value => value !== answer)].slice(0, 4);
}

export function gaLesson({ id, title, emoji, words, culture, note, xp = 55 }) {
  const vocabulary = words.map(([native, english, metadata = {}]) => ({ native, english, ...metadata }));
  const conversation = vocabulary.slice(0, 2).map((word, index) => ({
    speaker: index ? "Learner" : "Speaker", avatar: index ? "🙂" : "🇬🇭",
    native: word.native, english: word.english
  }));
  return {
    id, title, emoji, xp, vocabulary, conversation,
    cultureCard: { id: `${id}-culture`, title: culture[0], emoji: culture[1], category: culture[2], text: culture[3] },
    questions: [
      { id: "q1", type: "native-to-english", prompt: `What does “${vocabulary[0].native}” mean?`, options: choices(vocabulary, vocabulary[0].english, "english"), answer: vocabulary[0].english, explanation: note || `${vocabulary[0].native} means “${vocabulary[0].english}.”` },
      { id: "q2", type: "english-to-native", prompt: `Choose the Ga for “${vocabulary[1].english}”`, options: choices(vocabulary, vocabulary[1].native, "native"), answer: vocabulary[1].native, explanation: `${vocabulary[1].native} expresses “${vocabulary[1].english}.”` },
      { id: "q3", type: "matching", prompt: "Match the Ga expressions with their English meanings.", pairs: vocabulary.slice(0, 3), explanation: "These expressions belong to this lesson's conversation theme." },
      { id: "q4", type: "conversation", prompt: `Which expression means “${vocabulary[2].english}”?`, options: choices(vocabulary, vocabulary[2].native, "native"), answer: vocabulary[2].native, explanation: `${vocabulary[2].native} is the matching expression.` }
    ]
  };
}

export function gaUnit({ id, title, description, emoji, color, lessons, culture }) {
  const built = lessons.map((lesson, index) => gaLesson({ ...lesson, id: `${id}-lesson-${index + 1}`, culture: lesson.culture || culture }));
  const reviewWords = lessons.flatMap(item => item.words).slice(0, 4);
  built.push(gaLesson({ id: `${id}-challenge`, title: `${title} Challenge`, emoji: "🏆", xp: 100, words: reviewWords, culture, note: "Review the unit's most useful expressions." }));
  return { id, title, description, emoji, color, lessons: built };
}
