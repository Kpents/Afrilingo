function choices(items, answer, field) {
  return [...new Set([answer, ...items.map(item => item[field]).filter(value => value !== answer)])].slice(0, 4);
}

function distinctOptions(values) {
  const seen = new Set();
  return values.filter(value => {
    const key = value.toLocaleLowerCase().replace(/[.!?]+$/g, "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function uniqueVocabulary(words) {
  const seen = new Set();
  return words
    .map(([native, english, metadata = {}]) => ({ native, english, ...metadata }))
    .filter(item => {
      const key = `${item.native}::${item.english}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function lastToken(value) {
  return value.trim().split(/\s+/).at(-1);
}

function makeQuestions(vocabulary) {
  const first = vocabulary[0];
  const second = vocabulary[1] || first;
  const third = vocabulary[2] || second;
  const fourth = vocabulary[3] || first;
  const phrase = vocabulary.find(item => item.native.trim().split(/\s+/).length > 1);
  const questions = [
    { id:"q1", type:"native-to-english", prompt:`What does “${first.native}” mean?`, options:choices(vocabulary,first.english,"english"), answer:first.english, explanation:`${first.native} means “${first.english}.”` },
    { id:"q2", type:"english-to-native", prompt:`Choose the Twi for “${second.english}”`, options:choices(vocabulary,second.native,"native"), answer:second.native, explanation:`${second.native} expresses “${second.english}.”` },
    { id:"q3", type:"matching", prompt:"Match each Twi expression with its meaning.", pairs:vocabulary.slice(0,Math.min(4,vocabulary.length)), explanation:"Read both sides aloud as you make each match." },
    { id:"q4", type:"conversation", prompt:`Someone needs to express “${third.english}.” What should they say?`, options:choices(vocabulary,third.native,"native"), answer:third.native, explanation:`${third.native} is the natural response practiced in this lesson.` },
    { id:"q5", type:"native-to-english", prompt:`Choose the meaning of “${fourth.native}”.`, options:choices(vocabulary,fourth.english,"english"), answer:fourth.english, explanation:`${fourth.native} means “${fourth.english}.”` }
  ];

  if (phrase) {
    const answer = lastToken(phrase.native);
    const endings = distinctOptions([answer, ...vocabulary.map(item => lastToken(item.native))]).slice(0,4);
    questions.push(
      { id:"q6", type:"sentence-builder", prompt:`Build the Twi expression for “${phrase.english}”.`, tiles:phrase.native.trim().split(/\s+/), answer:phrase.native, explanation:`The complete expression is “${phrase.native}”` },
      { id:"q7", type:"fill-in-the-blank", prompt:`Complete the expression: “${phrase.native.replace(new RegExp(`${answer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`), "____") }”`, options:endings, answer, explanation:`The missing part is “${answer}”. The full expression is “${phrase.native}”` }
    );
  } else {
    questions.push(
      { id:"q6", type:"english-to-native", prompt:`Recall the Twi word for “${third.english}”.`, options:choices(vocabulary,third.native,"native"), answer:third.native, explanation:`${third.native} means “${third.english}.”` },
      { id:"q7", type:"challenge", prompt:`Which meaning belongs with “${second.native}”?`, options:choices(vocabulary,second.english,"english"), answer:second.english, explanation:`${second.native} means “${second.english}.”` }
    );
  }

  questions.push({ id:"q8", type:"challenge", prompt:`Finish with active recall: choose the Twi for “${first.english}”.`, options:choices(vocabulary,first.native,"native"), answer:first.native, explanation:`The answer is “${first.native}”.` });
  return questions;
}

export function twiLesson({ id, title, emoji, words, culture, xp = 55 }) {
  const vocabulary = uniqueVocabulary(words);
  const conversation = vocabulary.slice(0, 3).map((word, index) => ({ speaker: index % 2 ? "Learner" : "Speaker", avatar: index % 2 ? "🙂" : "🇬🇭", native: word.native, english: word.english }));
  return {
    id, title, emoji, xp, vocabulary, conversation,
    cultureCard: { id: `${id}-culture`, title: `${culture[0]} · ${title}`, emoji: culture[1], category: culture[2], text: culture[3] },
    questions: makeQuestions(vocabulary)
  };
}

export function twiUnit({ id, title, subtitle, emoji, color, lessons, culture }) {
  const built = lessons.map((lesson,index) => {
    const spiralReview = lessons.slice(0,index).flatMap(item => item.words).slice(-2).map(([native,english,metadata={}]) => [native,english,{...metadata,spiralReview:true}]);
    return twiLesson({...lesson,words:[...lesson.words,...spiralReview],id:`${id}-lesson-${index+1}`,culture:lesson.culture||culture});
  });
  built.push(twiLesson({id:`${id}-challenge`,title:`${title} Challenge`,emoji:"🏆",xp:100,words:lessons.flatMap(x=>x.words).slice(0,9),culture}));
  return { id, title, subtitle, emoji, color, lessons:built };
}
