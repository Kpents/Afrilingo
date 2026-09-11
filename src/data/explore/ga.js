import { gaUnits } from "../ga/course";

const levels = ["beginner", "intermediate", "advanced"];
const wordTypes = [
  ["nouns", "Nouns", "📦"], ["verbs", "Verbs", "🏃🏾"], ["adjectives", "Adjectives", "✨"],
  ["pronouns", "Pronouns", "👥"], ["adverbs", "Adverbs", "⚡"], ["question-words", "Question Words", "❓"],
  ["numbers", "Numbers", "🔢"], ["common-expressions", "Common Expressions", "💬"]
].map(([id, label, emoji]) => ({ id, label, emoji }));
const themes = [
  ["home", "Home", "🏠"], ["food-drinks", "Food & Drinks", "🍲"], ["restaurant", "Restaurant", "🍽️"],
  ["family", "Family", "👨‍👩‍👧"], ["school", "School", "🏫"], ["work", "Work", "💼"],
  ["market-shopping", "Market & Shopping", "🛒"], ["transport", "Transport", "🚕"], ["health", "Health", "🏥"],
  ["clothing", "Clothing", "👕"], ["animals", "Animals", "🐕"], ["weather", "Weather", "🌦️"],
  ["sports", "Sports", "⚽"], ["relationships", "Relationships", "❤️"], ["places-directions", "Places & Directions", "🗺️"],
  ["body", "Body", "🧍"], ["colours", "Colours", "🎨"]
].map(([id, label, emoji]) => ({ id, label, emoji }));
const unitThemes = ["relationships","market-shopping","relationships","home","family","food-drinks","home","colours","relationships","places-directions","work","market-shopping","relationships","school","transport","relationships","health","weather","work","relationships"];
const number = /one|two|three|four|five|six|seven|eight|nine|ten|number|hundred/i;
const question = /^(what|who|where|how|which|whom)|\?$/i;
const adverb = /today|tomorrow|slowly|again|near|far|here|there|ahead|left|right/i;
const adjective = /beautiful|red|white|black|blue|green|yellow|grey/i;
function typeOf(native, english) {
  if (question.test(english)) return "question-words";
  if (number.test(english)) return "numbers";
  if (adverb.test(english)) return "adverbs";
  if (adjective.test(english)) return "adjectives";
  if (/^to /i.test(english)) return "verbs";
  if (!/[.!?]/.test(native) && native.split(/\s+/).length <= 2) return "nouns";
  return "common-expressions";
}
const entries = gaUnits.flatMap((unit, unitIndex) => unit.lessons.flatMap((lesson, lessonIndex) =>
  (lesson.vocabulary || []).map((word, wordIndex) => ({
    id: `ga-${unit.id}-${lesson.id}-${wordIndex}`, native: word.native, english: word.english,
    audio: word.audio || "", exampleNative: lesson.conversation?.[0]?.native || word.native,
    exampleEnglish: lesson.conversation?.[0]?.english || word.english,
    level: levels[(lessonIndex + wordIndex) % 3], wordType: typeOf(word.native, word.english),
    theme: unitThemes[unitIndex] || "relationships", contextNote: lesson.cultureCard?.text,
    source: "Ga course", verificationStatus: "source-aligned", linguistic: word.linguistic || {}
  }))
));
const supplements = [
  ["pronoun-mi", "mi", "I / me", "pronouns", "relationships"],
  ["pronoun-bo", "bo", "you", "pronouns", "relationships"],
  ["verb-yaa", "yaa", "go", "verbs", "transport"],
  ["verb-kasɛ", "kasɛ", "learn", "verbs", "school"],
  ["animal-gbee", "gbee", "dog", "nouns", "animals"],
  ["animal-alonte", "alɔnte", "cat", "nouns", "animals"],
  ["body-yitso", "yitso", "head", "nouns", "body"],
  ["body-nine", "nine", "hand / arm", "nouns", "body"],
  ["clothes-mama", "mama", "cloth", "nouns", "clothing"],
  ["sport-review", "AfriLingo editorial review pending", "Sports vocabulary pending source verification", "nouns", "sports"],
  ["weather-review", "AfriLingo editorial review pending", "Weather vocabulary pending source verification", "nouns", "weather"],
  ["restaurant-review", "AfriLingo editorial review pending", "Restaurant vocabulary pending source verification", "nouns", "restaurant"]
].flatMap(([id, native, english, wordType, theme]) => levels.map((level, index) => ({
  id: `${id}-${level}`, native, english, wordType, theme, level, audio: "",
  exampleNative: native, exampleEnglish: english, source: index ? "editorial placeholder" : "BGL Ga guide",
  verificationStatus: native.startsWith("AfriLingo") ? "verification-pending" : "source-aligned",
  contextNote: native.startsWith("AfriLingo") ? "This category remains visible but will not teach an uncertain translation." : "Open optional details as Ga linguistic annotations are reviewed.",
  linguistic: {}
})));
const seen = new Set();
export const gaExploreLibrary = { languageId: "ga", languageName: "Ga", nativeName: "Ga", wordTypes, themes, levels, entries: [...supplements, ...entries].filter(item => { const key=`${item.native}|${item.english}|${item.theme}|${item.level}`; if(seen.has(key)) return false; seen.add(key); return true; }) };
