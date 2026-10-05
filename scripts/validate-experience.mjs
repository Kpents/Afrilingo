import { resolve } from "node:path";
import { createServer } from "vite";

const root = resolve(import.meta.dirname, "..");
const server = await createServer({ root, appType: "custom", logLevel: "silent", server: { middlewareMode: true } });

let languages;
let progression;
let backup;
let placement;
let reviewScheduler;
let personalization;
let adaptiveLesson;
let learnerMastery;
try {
  ({ languages } = await server.ssrLoadModule("/src/data/languages.js"));
  progression = await server.ssrLoadModule("/src/utils/courseProgress.js");
  backup = await server.ssrLoadModule("/src/services/progressBackup.js");
  placement = await server.ssrLoadModule("/src/utils/placementTest.js");
  reviewScheduler = await server.ssrLoadModule("/src/utils/reviewScheduler.js");
  personalization = await server.ssrLoadModule("/src/utils/learningPersonalization.js");
  adaptiveLesson = await server.ssrLoadModule("/src/utils/adaptiveLesson.js");
  learnerMastery = await server.ssrLoadModule("/src/utils/learnerMastery.js");
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

  const placementQuestions = placement.buildPlacementQuestions(course);
  check(placementQuestions.length === 5, `${languageId}: placement check must contain five questions.`);
  check(placementQuestions.every(question => question.options.includes(question.answer)), `${languageId}: placement answers must appear in their options.`);
  const placementIndex = placement.placementUnitIndex(5, 5, course.units.length);
  check(placementIndex > 0, `${languageId}: a perfect placement result must recommend a later starting unit.`);
  check(progression.getFurthestUnlockedUnit(course.units, [], placementIndex) === placementIndex, `${languageId}: placement must unlock its suggested unit without fake completions.`);
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

const reviewNow = Date.UTC(2026, 9, 4, 12);
const reviewQuestion = { id: "review-1", type: "multiple-choice", prompt: "Choose the greeting.", answer: "Maakye", options: ["Maakye", "Daabi"] };
let reviewQueue = reviewScheduler.recordReviewMiss([], reviewQuestion, { id: "twi-u1-l1", title: "Morning greetings" }, reviewNow);
check(reviewQueue.length === 1 && reviewScheduler.isReviewDue(reviewQueue[0], reviewNow), "A missed question must enter review immediately.");
reviewQueue = reviewScheduler.recordReviewMiss(reviewQueue, reviewQuestion, { id: "twi-u1-l1", title: "Morning greetings" }, reviewNow + 1000);
check(reviewQueue[0].misses === 2, "Repeated misses must increase review priority without duplicating the item.");
reviewQueue = reviewScheduler.applyReviewOutcomes(reviewQueue, [{ reviewKey: reviewQueue[0].reviewKey, correct: true }], reviewNow + 2000);
check(reviewQueue[0].stage === 1 && !reviewScheduler.isReviewDue(reviewQueue[0], reviewNow + 2000), "A correct review must schedule the concept for a later interval.");
reviewQueue = reviewScheduler.applyReviewOutcomes(reviewQueue, [{ reviewKey: reviewQueue[0].reviewKey, correct: false }], reviewNow + 3000);
check(reviewQueue[0].misses === 3 && reviewScheduler.isReviewDue(reviewQueue[0], reviewNow + 3000), "A failed review must return the concept to the due queue.");

let masteredQueue = reviewScheduler.recordReviewMiss([], { ...reviewQuestion, id: "review-2" }, { id: "twi-u1-l1", title: "Morning greetings" }, reviewNow);
for (let stage = 0; stage < 5; stage += 1) {
  masteredQueue = reviewScheduler.applyReviewOutcomes(masteredQueue, [{ reviewKey: masteredQueue[0]?.reviewKey, correct: true }], reviewNow + stage * 31 * 24 * 60 * 60 * 1000);
}
check(masteredQueue.length === 0, "A concept must leave review only after repeated successful recall.");

check(personalization.preferredThemeIds(["travel"])[0] === "transport", "Travel goals must prioritize practical transport vocabulary.");
check(personalization.recommendedImmersionFeature(["culture"]) === "stories", "Culture goals must prioritize contextual stories.");
const personalizedItems = personalization.rankByMotivations([{ title: "Family visit" }, { title: "Taxi directions" }], ["travel"], item => item.title);
check(personalizedItems[0].title === "Taxi directions", "Goal-aware ranking must bring relevant scenarios forward.");

const authoredQuestions = [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }];
let adaptiveQueue = adaptiveLesson.createLessonQueue(authoredQuestions);
adaptiveQueue = adaptiveLesson.scheduleAdaptiveRetry(adaptiveQueue, 0, adaptiveQueue[0]);
check(adaptiveQueue.map(item => item.id).join("") === "abcad", "A missed concept must return after an intervening recall gap.");
const repeatedIndex = adaptiveQueue.findIndex((item, index) => index > 0 && item.id === "a");
adaptiveQueue = adaptiveLesson.scheduleAdaptiveRetry(adaptiveQueue, repeatedIndex, adaptiveQueue[repeatedIndex]);
check(adaptiveQueue.at(-1).retryAttempt === 2, "Repeated misses must remain in the lesson with an incremented attempt.");
const mastery = adaptiveLesson.lessonMasterySummary([{ questionId:"a", correct:false, retryAttempt:0 }, { questionId:"a", correct:true, retryAttempt:1 }, { questionId:"b", correct:true, retryAttempt:0 }]);
check(mastery.secure === 2 && mastery.recovered === 1, "Lesson mastery must distinguish recovered concepts from first-pass recall.");

const skillEvidence = learnerMastery.summarizeSkillEvidence([{ skill:"listening", correct:true }, { skill:"listening", correct:false }, { skill:"matching", correct:true }]);
const learnerModel = learnerMastery.updateLearnerMastery({}, skillEvidence, reviewNow);
check(learnerModel.skills.listening.attempts === 2 && learnerModel.skills.listening.accuracy === 50, "Skill mastery must aggregate answer evidence accurately.");
check(learnerMastery.skillForQuestion({ type:"sentence-builder" }) === "sentences", "Exercise types must map to a reusable skill taxonomy.");

if (failures.length) {
  console.error(`Experience validation failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`AfriLingo experience validation: ${Object.keys(languages).length} languages · progression, personalization, persistent mastery, adaptive lessons and review, isolation, backup and recovery passed`);
}
