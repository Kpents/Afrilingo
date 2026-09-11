function choices(items, answer, field) {
  return [...new Set([answer, ...items.map(item => item[field]).filter(value => value !== answer)])].slice(0, 4);
}

export function twiLesson({ id, title, emoji, words, culture, xp = 55 }) {
  const vocabulary = words.map(([native, english, metadata = {}]) => ({ native, english, ...metadata }));
  const conversation = vocabulary.slice(0, 2).map((word, index) => ({ speaker: index ? "Learner" : "Speaker", avatar: index ? "🙂" : "🇬🇭", native: word.native, english: word.english }));
  return {
    id, title, emoji, xp, vocabulary, conversation,
    cultureCard: { id: `${id}-culture`, title: culture[0], emoji: culture[1], category: culture[2], text: culture[3] },
    questions: [
      { id:"q1", type:"native-to-english", prompt:`What does “${vocabulary[0].native}” mean?`, options:choices(vocabulary,vocabulary[0].english,"english"), answer:vocabulary[0].english, explanation:`${vocabulary[0].native} means “${vocabulary[0].english}.”` },
      { id:"q2", type:"english-to-native", prompt:`Choose the Twi for “${vocabulary[1].english}”`, options:choices(vocabulary,vocabulary[1].native,"native"), answer:vocabulary[1].native, explanation:`${vocabulary[1].native} expresses “${vocabulary[1].english}.”` },
      { id:"q3", type:"matching", prompt:"Match the Twi expressions with their meanings.", pairs:vocabulary.slice(0,3), explanation:"These expressions belong to this lesson's practical theme." },
      { id:"q4", type:"conversation", prompt:`Which expression means “${vocabulary[2].english}”?`, options:choices(vocabulary,vocabulary[2].native,"native"), answer:vocabulary[2].native, explanation:`${vocabulary[2].native} is the matching expression.` }
    ]
  };
}

export function twiUnit({ id, title, subtitle, emoji, color, lessons, culture }) {
  const built = lessons.map((lesson,index)=>twiLesson({...lesson,id:`${id}-lesson-${index+1}`,culture:lesson.culture||culture}));
  built.push(twiLesson({id:`${id}-challenge`,title:`${title} Challenge`,emoji:"🏆",xp:100,words:lessons.flatMap(x=>x.words).slice(0,4),culture}));
  return { id, title, subtitle, emoji, color, lessons:built };
}
