import { twiUnits } from "../twi/course";
import { findIconId } from "../iconLibrary";

const levels=["beginner","intermediate","advanced"];
const wordTypes=[["nouns","Nouns","📦"],["verbs","Verbs","🏃🏾"],["adjectives","Adjectives","✨"],["pronouns","Pronouns","👥"],["adverbs","Adverbs","⚡"],["question-words","Question Words","❓"],["numbers","Numbers","🔢"],["common-expressions","Common Expressions","💬"]].map(([id,label,emoji])=>({id,label,emoji}));
const themes=[["home","Home","🏠"],["food-drinks","Food & Drinks","🍲"],["restaurant","Restaurant","🍽️"],["family","Family","👨‍👩‍👧"],["school","School","🏫"],["work","Work","💼"],["market-shopping","Market & Shopping","🛒"],["transport","Transport","🚕"],["health","Health","🏥"],["clothing","Clothing","👕"],["animals","Animals","🐕"],["weather","Weather","🌦️"],["sports","Sports","⚽"],["relationships","Relationships","❤️"],["places-directions","Places & Directions","🗺️"],["body","Body","🧍"],["colours","Colours","🎨"]].map(([id,label,emoji])=>({id,label,emoji}));
const unitThemes=["relationships","market-shopping","relationships","family","food-drinks","home","market-shopping","relationships","places-directions","work","market-shopping","relationships","school","transport","relationships","health","weather","work","relationships","relationships","relationships","places-directions","work","weather","health","relationships","relationships","relationships"];
const question=/^(what|who|where|how|which)|\?$/i, number=/one|two|three|four|five|six|seven|eight|nine|ten|twenty|number|hour/i, adverb=/today|later|again|slowly|right|left|ahead|here|there/i, adjective=/expensive|little|many|true/i;
function infer(native,english){if(question.test(english))return"question-words";if(number.test(english))return"numbers";if(adverb.test(english))return"adverbs";if(adjective.test(english))return"adjectives";if(/^to /i.test(english))return"verbs";if(!/[.!?]/.test(native)&&native.split(/\s+/).length<=2)return"nouns";return"common-expressions";}
const clean=value=>String(value||"").toLocaleLowerCase().replace(/[.!?,'’]/g,"").trim();
function exampleFor(lesson,word){const needle=clean(word.native);return lesson.conversation?.find(line=>clean(line.native).includes(needle))||lesson.conversation?.[0]||{native:word.native,english:word.english};}
const rawCourseEntries=twiUnits.flatMap((unit,ui)=>
  unit.lessons.flatMap(lesson=>(lesson.vocabulary||[]).map((word,wi)=>{
    const example=exampleFor(lesson,word);
    return {
      id:`twi-${unit.id}-${lesson.id}-${wi}`,native:word.native,english:word.english,audio:word.audio||"",
      iconId:word.iconId||findIconId(word.english),
      exampleNative:example.native,exampleEnglish:example.english,
      level:ui<8?"beginner":ui<18?"intermediate":"advanced",wordType:infer(word.native,word.english),theme:unitThemes[ui]||"relationships",
      contextNote:lesson.cultureCard?.text,source:"Twi course",verificationStatus:"source-aligned",linguistic:word.linguistic||{}
    };
  }))
);
function balanceThemeLevels(entries){
  const byTheme=entries.reduce((groups,entry)=>{const items=groups.get(entry.theme)||[];items.push(entry);groups.set(entry.theme,items);return groups;},new Map());
  return [...byTheme.values()].flatMap(items=>{
    const sorted=[...items].sort((a,b)=>((a.native.split(/\s+/).length*12)+a.native.length)-((b.native.split(/\s+/).length*12)+b.native.length));
    return sorted.map((item,index)=>({...item,level:levels[Math.min(2,Math.floor(index/sorted.length*3))]}));
  });
}
const courseEntries=balanceThemeLevels(rawCourseEntries);
const supplements=[
  ["pronoun-me","Me","I / me","pronouns","relationships"],["pronoun-wo","Wo","you — singular","pronouns","relationships"],["pronoun-yen","Yɛn","we / us","pronouns","relationships"],
  ["animal-akraman","Ɔkraman","dog","nouns","animals"],["animal-ɔkra","Ɔkra","cat","nouns","animals"],
  ["body-ani","Ani","eye","nouns","body"],["body-nsa","Nsa","hand or arm","nouns","body"],
  ["cloth-ntoma","Ntoma","cloth","nouns","clothing"],
  ["sport-football","Fótbɔɔl","football or soccer","nouns","sports","FSI Twi Basic Course · Unit 19","A widely understood football term documented in a complete match-going dialogue."],
  ["sport-ball","Bɔɔl","ball","nouns","sports","FSI Twi Basic Course · Unit 19","The FSI dialogue distinguishes the ball from the football match."],
  ["sport-play","Bɔ bɔɔl","play football","verbs","sports","FSI Twi Basic Course · Unit 19","Use this as an action phrase for playing football."],
  ["colour-red","Kɔkɔɔ","red","adjectives","colours","FSI Twi Basic Course · Unit 13","Twi colour adjectives normally follow the noun they describe."],
  ["colour-black","Tuntum","black","adjectives","colours","FSI Twi Basic Course · Unit 13","Twi colour adjectives normally follow the noun they describe."],
  ["colour-white","Fitaa","white","adjectives","colours","FSI Twi Basic Course · Unit 13","Twi colour adjectives normally follow the noun they describe."],
  ["restaurant-place","Adidibea","restaurant or eating place","nouns","restaurant","Akan (Twi) Dictionary · Adidibea","This entry names a place where people eat."],
  ["restaurant-food","Aduane","food","nouns","restaurant","Peace Corps Ghana · Twi For All","Pair this high-frequency word with a polite request."],
  ["restaurant-water","Nsuo","water","nouns","restaurant","Peace Corps Ghana · Twi For All","A practical word for ordering or asking for a drink."]
].flatMap(([id,native,english,wordType,theme,source="course reference",contextNote="Optional linguistic detail will expand after editorial review."])=>levels.map(level=>({id:`${id}-${level}`,native,english,wordType,theme,level,audio:"",iconId:findIconId(english),exampleNative:native,exampleEnglish:english,source,verificationStatus:"source-aligned",contextNote,linguistic:{}})));
const seen=new Set();
export const twiExploreLibrary={languageId:"twi",languageName:"Twi",nativeName:"Twi",levels,wordTypes,themes,entries:[...supplements,...courseEntries].filter(item=>{const key=`${item.native}|${item.english}|${item.theme}|${item.level}`;if(seen.has(key))return false;seen.add(key);return true;})};
