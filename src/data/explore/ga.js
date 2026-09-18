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
const unitThemes = [
  "relationships", "market-shopping", "relationships", "home", "family", "food-drinks", "home",
  "colours", "relationships", "places-directions", "work", "market-shopping", "relationships", "school",
  "transport", "relationships", "health", "weather", "work", "relationships", "relationships", "school",
  "home", "transport", "health", "relationships", "relationships", "relationships"
];
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
const normalize = value => String(value || "").toLocaleLowerCase().replace(/[.!?]/g, "").trim();
const levelFor = unitIndex => unitIndex < 9 ? "beginner" : unitIndex < 20 ? "intermediate" : "advanced";
function courseExample(lesson, word) {
  const native = normalize(word.native);
  const line = lesson.conversation?.find(item => normalize(item.native).includes(native) || native.includes(normalize(item.native)));
  return line || { native: word.native, english: word.english };
}
const entries = gaUnits.flatMap((unit, unitIndex) => unit.lessons.flatMap((lesson, lessonIndex) =>
  (lesson.vocabulary || []).map((word, wordIndex) => {
    const example = courseExample(lesson, word);
    return {
      id: `ga-${unit.id}-${lesson.id}-${wordIndex}`, native: word.native, english: word.english,
      audio: word.audio || "", exampleNative: example.native, exampleEnglish: example.english,
      level: levelFor(unitIndex), wordType: typeOf(word.native, word.english),
      theme: unitThemes[unitIndex], contextNote: lesson.cultureCard?.text,
      source: `Ga course · Unit ${unitIndex + 1}: ${unit.title}`,
      verificationStatus: "source-aligned",
      linguistic: { ...(word.linguistic || {}), courseUnit: unitIndex + 1, lesson: lesson.title }
    };
  })
));
const supplements = [
  ["pronoun-mi", "mi", "I / me", "pronouns", "relationships", "beginner"],
  ["pronoun-bo", "bo", "you", "pronouns", "relationships", "beginner"],
  ["verb-yaa", "yaa", "go", "verbs", "transport", "beginner"],
  ["verb-kasɛ", "kasɛ", "learn", "verbs", "school", "beginner"],
  ["animal-gbee", "gbee", "dog", "nouns", "animals", "beginner"],
  ["animal-alonte", "alɔnte", "cat", "nouns", "animals", "beginner"],
  ["body-yitso", "yitso", "head", "nouns", "body", "beginner"],
  ["body-nine", "nine", "hand / arm", "nouns", "body", "beginner"],
  ["clothes-mama", "mama", "cloth", "nouns", "clothing", "beginner"]
].map(([id, native, english, wordType, theme, level]) => ({
  id, native, english, wordType, theme, level, audio: "",
  exampleNative: native, exampleEnglish: english, source: "Bureau of Ghana Languages — Ga guide",
  verificationStatus: "source-aligned",
  contextNote: "A source-aligned reference item. A native-speaker review will add a longer natural example.",
  linguistic: { sourceType: "reference vocabulary" }
}));
const seen = new Set();
export const gaExploreLibrary = { languageId: "ga", languageName: "Ga", nativeName: "Ga", wordTypes, themes, levels, entries: [...supplements, ...entries].filter(item => { const key=`${normalize(item.native)}|${normalize(item.english)}|${item.level}`; if(seen.has(key)) return false; seen.add(key); return true; }) };
