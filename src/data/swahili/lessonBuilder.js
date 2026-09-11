const distractors = (words, answer, key) => [answer, ...words.map((word) => word[key]).filter((value) => value !== answer)].slice(0, 4);

export function swahiliLesson({ id, title, emoji, words, culture, xp = 55 }) {
  const vocabulary = words.map(([native, english, linguistic = {}]) => ({ native, english, audio: "", linguistic }));
  const first = vocabulary[0];
  const second = vocabulary[1] || first;

  return {
    id, title, emoji, xp, vocabulary,
    conversation: [
      { speaker: "A", native: first.native, english: first.english },
      { speaker: "B", native: second.native, english: second.english }
    ],
    cultureCard: { title: culture.title, category: culture.category || "Everyday life", emoji: culture.emoji || emoji, text: culture.text, region: "East Africa" },
    questions: [
      { type: "native-to-english", prompt: `What does “${first.native}” mean?`, options: distractors(vocabulary, first.english, "english"), answer: first.english, explanation: `${first.native} means ${first.english}.` },
      { type: "english-to-native", prompt: `Choose the Swahili for “${second.english}”.`, options: distractors(vocabulary, second.native, "native"), answer: second.native, explanation: `${second.native} means ${second.english}.` },
      { type: "match", prompt: "Match each Swahili expression with its meaning.", pairs: vocabulary.slice(0, 4).map(({ native, english }) => ({ native, english })), explanation: "These expressions belong to this lesson's core vocabulary." },
      { type: "mini-conversation", prompt: `What is a natural response to “${first.native}”?`, conversation: [{ native: first.native, english: first.english }], options: distractors(vocabulary, second.native, "native"), answer: second.native, explanation: `${second.native} fits this short exchange.` }
    ]
  };
}

export function swahiliUnit({ id, title, subtitle, emoji, color, lessons, culture }) {
  const lessonData = lessons.map(swahiliLesson);
  const reviewWords = lessonData.flatMap((lesson) => lesson.vocabulary).slice(0, 8);
  const challenge = swahiliLesson({ id: `${id}-challenge`, title: `${title} Challenge`, emoji: "🏆", words: reviewWords.map(({ native, english, linguistic }) => [native, english, linguistic]), culture: culture || { title: `${title} in context`, emoji, text: `Review ${title.toLowerCase()} through practical Swahili.` }, xp: 90 });
  return { id, title, subtitle, emoji, color, lessons: [...lessonData, challenge] };
}
