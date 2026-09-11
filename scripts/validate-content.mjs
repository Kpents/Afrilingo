import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";

const root = resolve(import.meta.dirname, "..");
const server = await createServer({ root, appType: "custom", logLevel: "silent", server: { middlewareMode: true } });
let languages, exploreLibraries, immersionLibraries, supportedQuestionTypes;
try {
  ({ languages } = await server.ssrLoadModule("/src/data/languages.js"));
  ({ exploreLibraries } = await server.ssrLoadModule("/src/data/explore/index.js"));
  ({ immersionLibraries } = await server.ssrLoadModule("/src/data/immersion/index.js"));
  ({ supportedQuestionTypes } = await server.ssrLoadModule("/src/utils/courseValidation.js"));
} finally {
  await server.close();
}

const errors = [];
const warnings = [];
const notes = [];
const stats = { languages: 0, units: 0, lessons: 0, questions: 0, cultureCards: 0, exploreEntries: 0, immersionItems: 0 };
const add = (bucket, code, path, message) => bucket.push({ code, path, message });
const present = value => typeof value === "string" ? Boolean(value.trim()) : value != null;
const normalized = value => String(value ?? "").trim().toLocaleLowerCase();
const unique = values => new Set(values).size === values.length;

for (const [languageId, course] of Object.entries(languages)) {
  stats.languages++;
  if (course.id !== languageId) add(errors, "COURSE_ID", languageId, `Course id is “${course.id}”.`);
  if (course.units.length !== 28) add(warnings, "COURSE_INCOMPLETE", languageId, `Target is 28 units; found ${course.units.length}. Content expansion requires editorial review.`);
  const lessonIds = []; const cardIds = []; const cardTexts = new Map(); const reportedCardTexts = new Set();
  course.units.forEach((unit, unitIndex) => {
    stats.units++;
    const unitPath = `${languageId}/unit-${unitIndex + 1}`;
    if (/review-required/i.test(unit.editorialStatus || "")) add(warnings, "COURSE_EDITORIAL_REVIEW", unitPath, "Unit is explicitly awaiting native-speaker editorial sign-off.");
    if (!present(unit.id) || !present(unit.title) || !unit.lessons?.length) add(errors, "UNIT_SHAPE", unitPath, "Unit needs an id, title, and lessons.");
    if (!unit.lessons?.at(-1)) add(errors, "PROGRESSION", unitPath, "Unit has no final lesson for progression unlocking.");
    unit.lessons?.forEach((lesson, lessonIndex) => {
      stats.lessons++; stats.cultureCards++;
      const lessonPath = `${unitPath}/${lesson.id || `lesson-${lessonIndex + 1}`}`;
      lessonIds.push(lesson.id); cardIds.push(lesson.cultureCard?.id);
      if (!present(lesson.id) || !present(lesson.title) || !(lesson.xp > 0)) add(errors, "LESSON_SHAPE", lessonPath, "Lesson needs an id, title, and positive XP.");
      if (!lesson.conversation?.length || !lesson.questions?.length) add(errors, "LESSON_CONTENT", lessonPath, "Lesson needs conversation and questions.");
      lesson.conversation?.forEach((line, index) => { if (!present(line.native) || !present(line.english)) add(errors, "CONVERSATION", `${lessonPath}/conversation-${index + 1}`, "Line needs native and English text."); });
      lesson.vocabulary?.forEach((word, index) => { if (!present(word.native) || !present(word.english)) add(errors, "VOCABULARY", `${lessonPath}/word-${index + 1}`, "Vocabulary needs native and English text."); });
      const card = lesson.cultureCard;
      for (const field of ["id", "title", "category", "emoji", "text", "language", "region"]) if (!present(card?.[field])) add(errors, "CULTURE_CARD", lessonPath, `Culture card is missing ${field}.`);
      if (card?.text) { const key = normalized(card.text); if (cardTexts.has(key) && !reportedCardTexts.has(key)) { add(warnings, "DUPLICATE_CULTURE", lessonPath, `Culture text duplicates ${cardTexts.get(key)} and may be intentionally templated.`); reportedCardTexts.add(key); } else if (!cardTexts.has(key)) cardTexts.set(key, lessonPath); }
      const questionIds = [];
      lesson.questions?.forEach((question, index) => {
        stats.questions++;
        const questionPath = `${lessonPath}/question-${index + 1}`;
        questionIds.push(question.id);
        if (!present(question.id) || !present(question.prompt) || !present(question.explanation)) add(errors, "QUESTION_SHAPE", questionPath, "Question needs an id, prompt, and explanation.");
        if (!supportedQuestionTypes.has(question.type)) add(errors, "QUESTION_TYPE", questionPath, `Unsupported type “${question.type}”.`);
        if (["match", "matching"].includes(question.type)) {
          if (!question.pairs?.length || question.pairs.some(pair => !present(pair.native) || !present(pair.english))) add(errors, "MATCH_DATA", questionPath, "Matching questions need complete native/English pairs.");
        } else if (!present(question.answer)) add(errors, "QUESTION_ANSWER", questionPath, "Question has no answer.");
        if (question.options) {
          const values = question.options.map(option => typeof option === "object" ? option.value ?? option.label : option);
          if (!unique(values.map(normalized))) add(errors, "DUPLICATE_OPTIONS", questionPath, "Answer options are not unique.");
          if (!values.map(normalized).includes(normalized(question.answer))) add(errors, "ANSWER_NOT_OPTION", questionPath, "The answer is not present in the options.");
        }
      });
      if (!unique(questionIds)) add(errors, "DUPLICATE_QUESTION_ID", lessonPath, "Question ids are duplicated within the lesson.");
    });
  });
  if (!unique(lessonIds)) add(errors, "DUPLICATE_LESSON_ID", languageId, "Lesson ids are not unique across the course.");
  if (!unique(cardIds)) add(errors, "DUPLICATE_CARD_ID", languageId, "Culture card ids are not unique across the course.");

  const explore = exploreLibraries[languageId];
  if (!explore) add(warnings, "EXPLORE_MISSING", languageId, "Explore library is not available yet.");
  else {
    const ids = []; const wordTypeIds = new Set((explore.wordTypes || []).map(item => item.id)); const themeIds = new Set((explore.themes || []).map(item => item.id));
    for (const entry of explore.entries || []) {
      stats.exploreEntries++; ids.push(entry.id);
      const path = `${languageId}/explore/${entry.id || "unknown"}`;
      for (const field of ["id", "native", "english", "exampleNative", "exampleEnglish", "level", "wordType", "theme"]) if (!present(entry[field])) add(errors, "EXPLORE_ENTRY", path, `Entry is missing ${field}.`);
      if (!explore.levels?.includes(entry.level)) add(errors, "EXPLORE_LEVEL", path, `Unknown level “${entry.level}”.`);
      if (!wordTypeIds.has(entry.wordType) || !themeIds.has(entry.theme)) add(errors, "EXPLORE_CATEGORY", path, `Word type “${entry.wordType}” or theme “${entry.theme}” is not declared by the library.`);
      if (/pending|questionable|verify/i.test(entry.verificationStatus || entry.contextNote || "")) add(warnings, "EDITORIAL_REVIEW", path, "Entry is explicitly marked for editorial verification.");
    }
    if (!unique(ids)) add(errors, "DUPLICATE_EXPLORE_ID", languageId, "Explore entry ids are duplicated.");
  }

  const immersion = immersionLibraries[languageId];
  if (!immersion) add(warnings, "IMMERSION_MISSING", languageId, "Immersion library is not available yet.");
  else {
    for (const collection of ["conversations", "variations", "speakers", "grammar", "missions", "stories", "dailyPhrases"]) {
      const items = immersion[collection] || []; stats.immersionItems += items.length;
      if (!items.length) add(warnings, "IMMERSION_SECTION", `${languageId}/immersion/${collection}`, "Section is empty.");
      if (!unique(items.map(item => item.id))) add(errors, "DUPLICATE_IMMERSION_ID", `${languageId}/immersion/${collection}`, "Ids are duplicated.");
    }
  }
}

notes.push({ code: "AUDIO_DEFERRED", path: "all-languages", message: "Missing audio is intentionally informational while native-speaker recordings are deferred." });
const byCode = items => Object.entries(items.reduce((all, item) => ({ ...all, [item.code]: (all[item.code] || 0) + 1 }), {})).sort((a,b) => b[1]-a[1]);
const lines = ["# AfriLingo Content Audit", "", `Generated: ${new Date().toISOString()}`, "", "## Summary", "", `- ${stats.languages} languages`, `- ${stats.units} units`, `- ${stats.lessons} lessons`, `- ${stats.questions} questions`, `- ${stats.cultureCards} culture cards`, `- ${stats.exploreEntries} Explore entries`, `- ${stats.immersionItems} Immersion items`, `- ${errors.length} blocking errors`, `- ${warnings.length} editorial warnings`, "", "## Blocking errors", "", ...(errors.length ? errors.map(item => `- **${item.code}** · \`${item.path}\` — ${item.message}`) : ["None. ✅"]), "", "## Editorial review queue", "", ...(warnings.length ? byCode(warnings).map(([code,count]) => `- **${code}** — ${count} item${count === 1 ? "" : "s"}`) : ["None."]), "", "Detailed warning records are available in `content-audit.json`.", "", "## Notes", "", ...notes.map(item => `- **${item.code}** — ${item.message}`), ""];
await mkdir(resolve(root, "reports"), { recursive: true });
await writeFile(resolve(root, "reports/content-audit.json"), JSON.stringify({ generatedAt: new Date().toISOString(), stats, errors, warnings, notes }, null, 2));
await writeFile(resolve(root, "reports/content-audit.md"), lines.join("\n"));
console.log(`AfriLingo content audit: ${stats.languages} languages · ${stats.units} units · ${stats.lessons} lessons · ${stats.questions} questions`);
console.log(`${errors.length} blocking errors · ${warnings.length} editorial warnings`);
if (errors.length) { console.error("See reports/content-audit.md for details."); process.exitCode = 1; }
