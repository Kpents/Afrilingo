import { zuluUnits } from "../zulu/course";
import { findIconId } from "../iconLibrary";

export const exploreLevels = ["beginner", "intermediate", "advanced"];

export const zuluWordTypes = [
  ["nouns", "Nouns", "📦"], ["verbs", "Verbs", "🏃🏾"], ["adjectives", "Adjectives", "✨"],
  ["pronouns", "Pronouns", "👥"], ["adverbs", "Adverbs", "⚡"], ["question-words", "Question Words", "❓"],
  ["numbers", "Numbers", "🔢"], ["common-expressions", "Common Expressions", "💬"]
].map(([id, label, emoji]) => ({ id, label, emoji }));

export const zuluThemes = [
  ["home", "Home", "🏠"], ["food-drinks", "Food & Drinks", "🍲"], ["restaurant", "Restaurant", "🍽️"],
  ["family", "Family", "👨‍👩‍👧"], ["school", "School", "🏫"], ["work", "Work", "💼"],
  ["market-shopping", "Market & Shopping", "🛒"], ["transport", "Transport", "🚕"], ["health", "Health", "🏥"],
  ["clothing", "Clothing", "👕"], ["animals", "Animals", "🐕"], ["weather", "Weather", "🌦️"],
  ["sports", "Sports", "⚽"], ["relationships", "Relationships", "❤️"], ["places-directions", "Places & Directions", "🗺️"],
  ["body", "Body", "🧍"], ["colours", "Colours", "🎨"]
].map(([id, label, emoji]) => ({ id, label, emoji }));

const unitThemes = {
  1: "relationships", 2: "market-shopping", 3: "relationships", 4: "family", 5: "restaurant", 6: "colours",
  7: "places-directions", 8: "school", 9: "health", 10: "food-drinks", 11: "market-shopping", 12: "transport",
  13: "places-directions", 14: "places-directions", 15: "relationships", 16: "transport", 17: "body", 18: "health",
  19: "food-drinks", 20: "clothing", 21: "sports", 22: "work", 23: "weather", 24: "home", 25: "restaurant",
  26: "work", 27: "relationships", 28: "places-directions"
};

const adjectiveHints = /beautiful|handsome|kind|big|small|new|old|tall|short|red|white|black|yellow|green|blue|good|cheap|expensive|hot|cold|cloudy|windy/i;
const adverbHints = /today|tomorrow|yesterday|slowly|quickly|near|far|here|there|ahead|left|right|morning/i;
const numberHints = /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|hundred|how many)\b/i;
const questionHints = /^(who|what|where|when|why|how|which)|\?$/i;

function inferWordType(native, english) {
  if (questionHints.test(english)) return "question-words";
  if (numberHints.test(english)) return "numbers";
  if (adjectiveHints.test(english)) return "adjectives";
  if (adverbHints.test(english)) return "adverbs";
  if (/^to\s/i.test(english) || /^uku[a-z]/i.test(native)) return "verbs";
  if (!/[.!?]/.test(native) && native.trim().split(/\s+/).length <= 2) return "nouns";
  return "common-expressions";
}

const reusedEntries = zuluUnits.flatMap((unit, unitIndex) => unit.lessons.flatMap((lesson, lessonIndex) =>
  lesson.vocabulary.map((word, wordIndex) => ({
    id: `course-${unit.id}-${lesson.id}-${wordIndex}`,
    native: word.native,
    english: word.english,
    audio: word.audio || "",
    exampleNative: lesson.conversation[0]?.native || word.native,
    exampleEnglish: lesson.conversation[0]?.english || word.english,
    level: exploreLevels[(lessonIndex + wordIndex) % exploreLevels.length],
    wordType: inferWordType(word.native, word.english),
    theme: unitThemes[unitIndex + 1] || "relationships",
    contextNote: lesson.cultureCard?.text,
    source: "course",
    verificationStatus: "source-aligned",
    iconId: word.iconId || findIconId(word.english) || undefined
  }))
));

const supplemental = [
  ["pronoun-mina", "mina", "I / me", "beginner", "pronouns", "relationships", "Mina nginguThandi.", "I am Thandi.", { concord: "ngi- (subject); -ngi- (object)" }],
  ["pronoun-wena", "wena", "you — singular", "intermediate", "pronouns", "work", "Wena usebenza kuphi?", "Where do you work?", { concord: "u- (subject); -ku- (object)" }],
  ["pronoun-bona", "bona", "they / them", "advanced", "pronouns", "relationships", "Bona bafunda isiZulu.", "They learn isiZulu.", { concord: "ba- (subject); -ba- (object)" }],
  ["verb-hamba", "-hamba", "go / walk", "beginner", "verbs", "transport", "Ngihamba ngezinyawo.", "I go on foot.", { verbStem: "-hamba", commonForms: ["ngiyahamba", "uyahamba", "siyahamba"] }],
  ["verb-funda", "-funda", "learn / study / read", "intermediate", "verbs", "school", "Abafundi bafunda esikoleni.", "The learners study at school.", { verbStem: "-funda", commonForms: ["ngiyafunda", "uyafunda", "bayafunda"] }],
  ["verb-sebenza", "-sebenza", "work", "advanced", "verbs", "work", "Ngisebenza edolobheni.", "I work in town.", { verbStem: "-sebenza", commonForms: ["ngiyasebenza", "uyasebenza", "bayasebenza"] }],
  ["adverb-lapha", "lapha", "here", "beginner", "adverbs", "places-directions", "Hlala lapha.", "Sit here.", {}],
  ["adverb-kancane", "kancane", "slowly / a little", "intermediate", "adverbs", "relationships", "Ngicela ukhulume kancane.", "Please speak slowly.", {}],
  ["adverb-masinyane", "masinyane", "soon / quickly", "advanced", "adverbs", "relationships", "Sizobonana masinyane.", "We will see each other soon.", {}],
  ["question-yini", "yini?", "what?", "beginner", "question-words", "school", "Ufunda yini?", "What are you studying?", {}],
  ["question-kuphi", "kuphi?", "where?", "intermediate", "question-words", "places-directions", "Isikole sikuphi?", "Where is the school?", {}],
  ["question-kungani", "kungani?", "why?", "advanced", "question-words", "school", "Kungani ufunda isiZulu?", "Why are you learning isiZulu?", {}],
  ["school-incwadi", "incwadi", "book", "beginner", "nouns", "school", "Ngifunda incwadi.", "I am reading a book.", { nounClass: "9/10", plural: "izincwadi" }],
  ["school-umfundi", "umfundi", "learner / student", "intermediate", "nouns", "school", "Umfundi ufunda isiZulu.", "The learner studies isiZulu.", { nounClass: "1/2", plural: "abafundi" }],
  ["school-uthisha", "uthisha", "teacher", "advanced", "nouns", "school", "Uthisha ukhuluma nabafundi.", "The teacher speaks with the learners.", { nounClass: "1a/2a", plural: "othisha" }],
  ["work-umsebenzi", "umsebenzi", "work / job", "beginner", "nouns", "work", "Nginomsebenzi.", "I have work.", { nounClass: "3/4", plural: "imisebenzi" }],
  ["work-ihhovisi", "ihhovisi", "office", "intermediate", "nouns", "work", "Ngisebenza ehhovisi.", "I work in an office.", { nounClass: "5/6", plural: "amahhovisi" }],
  ["work-umhlangano", "umhlangano", "meeting", "advanced", "nouns", "work", "Umhlangano uqala ekuseni.", "The meeting starts in the morning.", { nounClass: "3/4", plural: "imihlangano" }],
  ["animal-inja", "inja", "dog", "beginner", "nouns", "animals", "Inja iyagijima.", "The dog is running.", { nounClass: "9/10", plural: "izinja" }],
  ["animal-ikati", "ikati", "cat", "intermediate", "nouns", "animals", "Ikati lilele endlini.", "The cat is sleeping in the house.", { nounClass: "5/6", plural: "amakati" }],
  ["animal-indlovu", "indlovu", "elephant", "advanced", "nouns", "animals", "Indlovu inkulu.", "The elephant is big.", { nounClass: "9/10", plural: "izindlovu" }],
  ["number-kunye", "kunye", "one", "beginner", "numbers", "market-shopping", "Ngicela ithikithi elilodwa.", "One ticket, please.", {}],
  ["number-ishumi", "ishumi nambili", "twelve", "intermediate", "numbers", "market-shopping", "Ihora yishumi nambili.", "It is twelve o'clock.", {}],
  ["number-ikhulu", "ikhulu", "one hundred", "advanced", "numbers", "market-shopping", "Kubiza amarandi ayikhulu.", "It costs one hundred rand.", {}]
].map(([id, native, english, level, wordType, theme, exampleNative, exampleEnglish, linguistic]) => ({
  id, native, english, level, wordType, theme, exampleNative, exampleEnglish, linguistic,
  audio: "", source: "supplemental", verificationStatus: "editorial-review-pending",
  contextNote: "Supplemental Explore entry; retain for native-speaker editorial review before recorded audio is added.",
  iconId: findIconId(english) || undefined
}));

const seen = new Set();
export const zuluExploreEntries = [...supplemental, ...reusedEntries].filter((entry) => {
  const key = `${entry.native.toLocaleLowerCase()}|${entry.english.toLocaleLowerCase()}|${entry.theme}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

export const zuluExploreLibrary = {
  languageId: "zulu",
  languageName: "Zulu",
  nativeName: "isiZulu",
  wordTypes: zuluWordTypes,
  themes: zuluThemes,
  levels: exploreLevels,
  entries: zuluExploreEntries
};
