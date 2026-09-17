import { resolve } from "node:path";
import { createServer } from "vite";

const root = resolve(import.meta.dirname, "..");
const server = await createServer({ root, appType: "custom", logLevel: "silent", server: { middlewareMode: true } });

let languages;
let progression;
let backup;
try {
  ({ languages } = await server.ssrLoadModule("/src/data/languages.js"));
  progression = await server.ssrLoadModule("/src/utils/courseProgress.js");
  backup = await server.ssrLoadModule("/src/services/progressBackup.js");
} finally {
  await server.close();
}

const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

for (const [languageId, course] of Object.entries(languages)) {
  const empty = [];
  check(progression.isUnitUnlocked(course.units, 0, empty), `${languageId}: Unit 1 must begin unlocked.`);
  check(!progression.isUnitUnlocked(course.units, 1, empty), `${languageId}: Unit 2 must begin locked.`);

  for (let index = 1; index < course.units.length; index += 1) {
    const previousFinalId = course.units[index - 1].lessons.at(-1).id;
    check(
      progression.isUnitUnlocked(course.units, index, [previousFinalId]),
      `${languageId}: completing ${previousFinalId} must unlock Unit ${index + 1}.`,
    );
  }

  const allCompleted = course.units.flatMap(unit => unit.lessons.map(lesson => lesson.id));
  check(
    progression.getFurthestUnlockedUnit(course.units, allCompleted) === course.units.length - 1,
    `${languageId}: a completed course must expose its final unit.`,
  );

  for (const unit of course.units) {
    check(progression.isLessonUnlocked(unit.lessons, 0, empty), `${languageId}/${unit.id}: first lesson must be unlocked.`);
    for (let index = 1; index < unit.lessons.length; index += 1) {
      check(
        progression.isLessonUnlocked(unit.lessons, index, [unit.lessons[index - 1].id]),
        `${languageId}/${unit.id}: lesson ${index + 1} must unlock from its predecessor.`,
      );
    }
  }
}

for (const languageId of ["twi", "ga"]) {
  const course = languages[languageId];
  course.units.forEach((unit, unitIndex) => {
    unit.lessons.forEach((lesson, lessonIndex) => {
      const isChallenge = lessonIndex === unit.lessons.length - 1;
      const checkpoint = isChallenge && (unitIndex + 1) % 4 === 0;
      const minimum = checkpoint ? 20 : isChallenge ? 15 : 12;
      check(
        lesson.questions.length >= minimum,
        `${languageId}/${unit.id}/${lesson.id}: expected at least ${minimum} questions, found ${lesson.questions.length}.`,
      );
      if (checkpoint) {
        check(lesson.reviewScope === "four-unit-checkpoint", `${languageId}/${unit.id}: checkpoint metadata is missing.`);
        check(lesson.reviewUnitIds?.length === 4, `${languageId}/${unit.id}: checkpoint must review four units.`);
      }
    });
  });
}

class MemoryStorage {
  constructor(entries = {}) { this.values = new Map(Object.entries(entries)); }
  get length() { return this.values.size; }
  key(index) { return [...this.values.keys()][index] ?? null; }
  getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}

globalThis.localStorage = new MemoryStorage({
  "afrilingo:twi": JSON.stringify({ xp: 125, completedLessonIds: ["twi-u1-l1"] }),
  "afrilingo:preferences": JSON.stringify({ theme: "dark" }),
  "afrilingo:unknown": JSON.stringify({ shouldNotExport: true }),
  "unrelated:key": JSON.stringify({ shouldRemain: true }),
});

const exported = backup.exportLearningData();
check(exported.product === "AfriLingo" && exported.version === 1, "Backup export must remain versioned.");
check(exported.data.twi?.xp === 125, "Backup export must preserve course progress.");
check(exported.data.preferences?.theme === "dark", "Backup export must preserve preferences.");
check(!exported.data.unknown, "Backup export must exclude unknown AfriLingo keys.");
check(!exported.data["unrelated:key"], "Backup export must exclude unrelated storage.");

const importedCount = await backup.importLearningData({
  text: async () => JSON.stringify({ product: "AfriLingo", version: 1, data: { ga: { xp: 40 }, unsafe: { value: true } } }),
});
check(importedCount === 1 && JSON.parse(localStorage.getItem("afrilingo:ga")).xp === 40, "Backup import must restore only supported course data.");

let corruptRejected = false;
try {
  await backup.importLearningData({ text: async () => "{not-json" });
} catch { corruptRejected = true; }
check(corruptRejected, "Corrupt backup files must be rejected without overwriting progress.");
check(JSON.parse(localStorage.getItem("afrilingo:twi")).xp === 125, "A rejected backup must leave existing progress intact.");

backup.resetCourseData("ga");
check(localStorage.getItem("afrilingo:ga") === null, "Course reset must remove only the selected course.");
check(localStorage.getItem("afrilingo:twi") !== null, "Course reset must preserve other languages.");

if (failures.length) {
  console.error(`Experience validation failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`AfriLingo experience validation: ${Object.keys(languages).length} languages · progression, isolation, backup and recovery passed`);
}
