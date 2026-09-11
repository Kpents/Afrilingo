function optionsFrom(items, answer, field) {
  return [answer, ...items.map(item => item[field]).filter(value => value !== answer)].slice(0, 4);
}

export function zuluLesson({ id, title, emoji, xp = 55, words, culture, conversation, builder }) {
  const vocabulary = words.map(([native, english]) => ({ native, english }));
  const questions = [
    { id: "q1", type: "native-to-english", prompt: `What does “${vocabulary[0].native}” mean?`, options: optionsFrom(vocabulary, vocabulary[0].english, "english"), answer: vocabulary[0].english, explanation: `${vocabulary[0].native} means “${vocabulary[0].english}” in this lesson.` },
    { id: "q2", type: "english-to-native", prompt: `Choose the isiZulu for “${vocabulary[1].english}”`, options: optionsFrom(vocabulary, vocabulary[1].native, "native"), answer: vocabulary[1].native, explanation: `${vocabulary[1].native} expresses “${vocabulary[1].english}.”` },
    { id: "q3", type: "matching", prompt: "Match the isiZulu expressions with their meanings.", pairs: vocabulary.slice(0, 3), explanation: "These expressions are used together in this lesson's theme." },
    { id: "q4", type: "conversation", prompt: `Choose the expression meaning “${vocabulary[2].english}”`, options: optionsFrom(vocabulary, vocabulary[2].native, "native"), answer: vocabulary[2].native, explanation: `${vocabulary[2].native} is the fitting expression.` }
  ];
  if (builder) questions.push({ id: "q5", type: "sentence-builder", ...builder });
  return {
    id, title, emoji, xp, vocabulary,
    cultureCard: { id: `${id}-culture`, title: culture[0], emoji: culture[1], category: culture[2], text: culture[3] },
    conversation: conversation.map(([speaker, avatar, native, english]) => ({ speaker, avatar, native, english })),
    questions
  };
}

export function zuluChallenge({ id, title, culture, words, conversation }) {
  return zuluLesson({ id, title, emoji: "🏆", xp: 100, culture, words, conversation, builder: { prompt: `Build: ${words[0][1]}`, tiles: words[0][0].split(" "), answer: words[0][0], explanation: "This sentence combines the unit's core patterns." } });
}
