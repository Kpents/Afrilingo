const levels = ["beginner", "intermediate", "advanced"];
const wordTypes = [["nouns","Nouns","📦"],["verbs","Verbs","🏃🏾"],["adjectives","Adjectives","✨"],["pronouns","Pronouns","👥"],["adverbs","Adverbs","⚡"],["question-words","Question Words","❓"],["numbers","Numbers","🔢"],["common-expressions","Common Expressions","💬"]].map(([id,label,emoji])=>({id,label,emoji}));
const themes = [["daily-life","Daily Life","🌅"],["family","Family","👨‍👩‍👧"],["food-drinks","Food & Drinks","🍲"],["school-work","School & Work","🎓"],["market-shopping","Market & Shopping","🛒"],["travel","Travel & Directions","🚌"],["health","Health","🏥"],["nature","Nature & Weather","🌦️"],["relationships","Relationships","❤️"]].map(([id,label,emoji])=>({id,label,emoji}));
const themeFor = title => /family/i.test(title)?"family":/food|drink/i.test(title)?"food-drinks":/school|work/i.test(title)?"school-work":/market|shop/i.test(title)?"market-shopping":/travel|transport|place|direction/i.test(title)?"travel":/health|safety|body/i.test(title)?"health":/weather|environment|nature/i.test(title)?"nature":/feeling|social|respect|greeting|introduction/i.test(title)?"relationships":"daily-life";
const typeFor = (native,english) => /^(who|what|where|when|why|how)|\?$/i.test(english)?"question-words":/\b(one|two|three|four|five|six|seven|eight|nine|ten|hundred)\b/i.test(english)?"numbers":/^to\s/i.test(english)?"verbs":/^(i|you|he|she|we|they)(\s|$)/i.test(english)?"pronouns":native.trim().split(/\s+/).length>2||/[.!?]/.test(native)?"common-expressions":"nouns";

export function exploreFromCourse(course) {
  const entries=[]; const seen=new Set();
  course.units.forEach((unit,unitIndex)=>unit.lessons.forEach((lesson,lessonIndex)=>(lesson.vocabulary||[]).forEach((word,index)=>{
    const key=`${word.native}|${word.english}`.toLocaleLowerCase(); if(seen.has(key))return; seen.add(key);
    const example=lesson.conversation?.find(line=>line.native.includes(word.native))||lesson.conversation?.[0];
    entries.push({id:`course-${lesson.id}-${index}`,native:word.native,english:word.english,audio:word.audio||"",exampleNative:example?.native||word.native,exampleEnglish:example?.english||word.english,level:levels[Math.min(2,Math.floor(unitIndex/(course.units.length/3)))],wordType:typeFor(word.native,word.english),theme:themeFor(unit.title),contextNote:lesson.cultureCard?.text,linguistic:word.linguistic||{},source:"course",verificationStatus:word.verificationStatus||lesson.editorialStatus||"source-aligned"});
  })));
  return {languageId:course.id,languageName:course.language,nativeName:course.nativeName,wordTypes,themes,levels,entries};
}
