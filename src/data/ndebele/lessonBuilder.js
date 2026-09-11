const options = (words, answer, key) => [answer, ...words.map((word) => word[key]).filter((item) => item !== answer)].slice(0, 4);
export function ndebeleLesson({id,title,emoji,words,culture,xp=55}) {
  const vocabulary=words.map(([native,english,linguistic={}])=>({native,english,audio:"",linguistic}));
  const first=vocabulary[0], second=vocabulary[1]||first;
  return {id,title,emoji,xp,vocabulary,conversation:[{speaker:"A",native:first.native,english:first.english},{speaker:"B",native:second.native,english:second.english}],cultureCard:{title:culture.title,emoji:culture.emoji||emoji,category:culture.category||"Everyday life",text:culture.text,region:"Zimbabwe"},questions:[
    {type:"native-to-english",prompt:`What does “${first.native}” mean?`,options:options(vocabulary,first.english,"english"),answer:first.english,explanation:`${first.native} means ${first.english}.`},
    {type:"english-to-native",prompt:`Choose the isiNdebele for “${second.english}”.`,options:options(vocabulary,second.native,"native"),answer:second.native,explanation:`${second.native} means ${second.english}.`},
    {type:"matching",prompt:"Match each isiNdebele expression with its meaning.",pairs:vocabulary.slice(0,4).map(({native,english})=>({native,english})),explanation:"These forms belong to this lesson's core vocabulary."},
    {type:"mini-conversation",prompt:`Choose a fitting response after “${first.native}”.`,conversation:[{native:first.native,english:first.english}],options:options(vocabulary,second.native,"native"),answer:second.native,explanation:`${second.native} continues this practice exchange.`}
  ]};
}
export function ndebeleUnit({number,title,subtitle,emoji,color,lessons,culture}){
  const built=lessons.map((lesson,index)=>ndebeleLesson({id:`ndebele-unit-${number}-lesson-${index+1}`,emoji:["🗣️","🧠","✨"][index],culture,...lesson}));
  const review=built.flatMap((lesson)=>lesson.vocabulary).slice(0,8);
  return {id:`ndebele-unit-${number}`,title,subtitle,emoji,color,lessons:[...built,ndebeleLesson({id:`ndebele-unit-${number}-challenge`,title:`${title} Challenge`,emoji:"🏆",words:review.map(({native,english,linguistic})=>[native,english,linguistic]),culture,xp:90})]};
}
