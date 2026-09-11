const choices = (items, answer, field) => [...new Set([answer, ...items.map(item => item[field]).filter(value => value !== answer)])].slice(0, 4);

function lesson(id, title, words, culture, emoji, xp = 60) {
  const vocabulary = words.map(([native, english, linguistic = {}]) => ({ native, english, audio: "", linguistic, verificationStatus: "editorial-review-required" }));
  const [first, second = first, third = first] = vocabulary;
  return { id, title, emoji, xp, vocabulary, editorialStatus: "native-speaker-review-required", conversation: [{ speaker: "A", native: first.native, english: first.english }, { speaker: "B", native: second.native, english: second.english }], cultureCard: { ...culture, id: `${id}-culture` }, questions: [
    { id: "native-english", type: "native-to-english", prompt: `What does “${first.native}” mean?`, options: choices(vocabulary, first.english, "english"), answer: first.english, explanation: `${first.native} means “${first.english}.”` },
    { id: "english-native", type: "english-to-native", prompt: `Choose the Yorùbá for “${second.english}”.`, options: choices(vocabulary, second.native, "native"), answer: second.native, explanation: `${second.native} expresses “${second.english}.”` },
    { id: "conversation", type: "conversation", prompt: `Which expression means “${third.english}”?`, options: choices(vocabulary, third.native, "native"), answer: third.native, explanation: `${third.native} is the matching expression.` }
  ] };
}

export function yorubaUnit([number, title, subtitle, emoji, words, culture]) {
  const groups = [words.slice(0, 3), words.slice(3, 6), words.slice(6, 9)];
  const lessons = groups.map((group, index) => lesson(`yoruba-unit-${number}-lesson-${index + 1}`, `${title}: ${["Learn", "Use", "Connect"][index]}`, group.length ? group : words.slice(0, 3), culture, ["🗣️", "🧠", "✨"][index], 55 + index * 5));
  lessons.push(lesson(`yoruba-unit-${number}-challenge`, `${title} Challenge`, words, culture, "🏆", 100));
  return { id: `yoruba-unit-${number}`, title, subtitle, emoji, color: number % 3 === 0 ? "#4338CA" : number % 2 ? "#C95D3A" : "#24745B", editorialStatus: "native-speaker-review-required", lessons };
}
