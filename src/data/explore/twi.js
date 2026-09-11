import { twiUnits } from "../twi/course";

const levels=["beginner","intermediate","advanced"];
const wordTypes=[["nouns","Nouns","📦"],["verbs","Verbs","🏃🏾"],["adjectives","Adjectives","✨"],["pronouns","Pronouns","👥"],["adverbs","Adverbs","⚡"],["question-words","Question Words","❓"],["numbers","Numbers","🔢"],["common-expressions","Common Expressions","💬"]].map(([id,label,emoji])=>({id,label,emoji}));
const themes=[["home","Home","🏠"],["food-drinks","Food & Drinks","🍲"],["restaurant","Restaurant","🍽️"],["family","Family","👨‍👩‍👧"],["school","School","🏫"],["work","Work","💼"],["market-shopping","Market & Shopping","🛒"],["transport","Transport","🚕"],["health","Health","🏥"],["clothing","Clothing","👕"],["animals","Animals","🐕"],["weather","Weather","🌦️"],["sports","Sports","⚽"],["relationships","Relationships","❤️"],["places-directions","Places & Directions","🗺️"],["body","Body","🧍"],["colours","Colours","🎨"]].map(([id,label,emoji])=>({id,label,emoji}));
const unitThemes=["relationships","market-shopping","relationships","family","food-drinks","home","market-shopping","relationships","places-directions","work","market-shopping","relationships","school","transport","relationships","health","weather","work","relationships","relationships"];
const question=/^(what|who|where|how|which)|\?$/i, number=/one|two|three|four|five|six|seven|eight|nine|ten|twenty|number|hour/i, adverb=/today|later|again|slowly|right|left|ahead|here|there/i, adjective=/expensive|little|many|true/i;
function infer(native,english){if(question.test(english))return"question-words";if(number.test(english))return"numbers";if(adverb.test(english))return"adverbs";if(adjective.test(english))return"adjectives";if(/^to /i.test(english))return"verbs";if(!/[.!?]/.test(native)&&native.split(/\s+/).length<=2)return"nouns";return"common-expressions";}
const courseEntries=twiUnits.flatMap((unit,ui)=>unit.lessons.flatMap((lesson,li)=>(lesson.vocabulary||[]).map((word,wi)=>({
  id:`twi-${unit.id}-${lesson.id}-${wi}`,native:word.native,english:word.english,audio:word.audio||"",
  exampleNative:lesson.conversation?.[0]?.native||word.native,exampleEnglish:lesson.conversation?.[0]?.english||word.english,
  level:levels[(li+wi)%3],wordType:infer(word.native,word.english),theme:unitThemes[ui]||"relationships",
  contextNote:lesson.cultureCard?.text,source:"Twi course",verificationStatus:"source-aligned",linguistic:word.linguistic||{}
}))));
const supplements=[
  ["pronoun-me","Me","I / me","pronouns","relationships"],["pronoun-wo","Wo","you — singular","pronouns","relationships"],["pronoun-yen","Yɛn","we / us","pronouns","relationships"],
  ["animal-akraman","Ɔkraman","dog","nouns","animals"],["animal-ɔkra","Ɔkra","cat","nouns","animals"],
  ["body-ani","Ani","eye","nouns","body"],["body-nsa","Nsa","hand or arm","nouns","body"],
  ["cloth-ntoma","Ntoma","cloth","nouns","clothing"],
  ["pending-sports","Verification pending","Sports vocabulary awaiting native-speaker review","nouns","sports"],
  ["pending-colours","Verification pending","Colour vocabulary awaiting native-speaker review","nouns","colours"],
  ["pending-restaurant","Verification pending","Restaurant vocabulary awaiting native-speaker review","nouns","restaurant"]
].flatMap(([id,native,english,wordType,theme])=>levels.map(level=>({id:`${id}-${level}`,native,english,wordType,theme,level,audio:"",exampleNative:native,exampleEnglish:english,source:native==="Verification pending"?"editorial placeholder":"course reference",verificationStatus:native==="Verification pending"?"verification-pending":"source-aligned",contextNote:native==="Verification pending"?"This category stays visible without teaching an uncertain translation.":"Optional linguistic detail will expand after editorial review.",linguistic:{}})));
const seen=new Set();
export const twiExploreLibrary={languageId:"twi",languageName:"Twi",nativeName:"Twi",levels,wordTypes,themes,entries:[...supplements,...courseEntries].filter(item=>{const key=`${item.native}|${item.english}|${item.theme}|${item.level}`;if(seen.has(key))return false;seen.add(key);return true;})};
