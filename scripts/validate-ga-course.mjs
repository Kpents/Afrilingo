import { createServer } from "vite";

const server = await createServer({ appType: "custom", logLevel: "silent", server: { middlewareMode: true } });

try {
  const { gaCourse, gaUnits } = await server.ssrLoadModule("/src/data/ga/course.js");
  const { gaExploreLibrary } = await server.ssrLoadModule("/src/data/explore/ga.js");
  const { gaImmersion } = await server.ssrLoadModule("/src/data/immersion/ga.js");
  const errors = [];
  const lessonIds = new Set();

  if (gaUnits.length !== 28) errors.push(`Expected 28 preserved Ga units; found ${gaUnits.length}.`);
  if (gaCourse.phases.length !== 3) errors.push(`Expected 3 Ga phases; found ${gaCourse.phases.length}.`);
  if (gaCourse.phases.flatMap(phase => phase.units).length !== gaUnits.length) errors.push("A Ga unit is missing from the three course phases.");
  if (gaExploreLibrary.entries.length < 100) errors.push(`Ga Explore has only ${gaExploreLibrary.entries.length} entries.`);
  for (const id of gaExploreLibrary.featuredThemeIds || []) {
    if (!gaExploreLibrary.themes.some(theme => theme.id === id)) errors.push(`Ga Explore featured theme is missing: ${id}`);
    if (!gaExploreLibrary.entries.some(entry => entry.theme === id)) errors.push(`Ga Explore featured theme is empty: ${id}`);
  }
  if (gaImmersion.conversations.length < 10) errors.push("Ga Immerse needs at least 10 conversations.");
  if (gaImmersion.missions.length < 6) errors.push("Ga Immerse needs at least 6 missions.");
  if (gaImmersion.stories.length < 6) errors.push("Ga Immerse needs at least 6 stories.");
  if (gaImmersion.dailyPhrases.length < 10) errors.push("Ga Immerse needs at least 10 daily phrases.");

  for (const unit of gaUnits) {
    if (!unit.curriculum?.guideDomains?.length) errors.push(`${unit.id} has no guide-domain alignment.`);
    if (!unit.curriculum?.level) errors.push(`${unit.id} has no CEFR-informed level.`);
    for (const lesson of unit.lessons) {
      if (lessonIds.has(lesson.id)) errors.push(`Duplicate lesson id: ${lesson.id}`);
      lessonIds.add(lesson.id);
      if (!lesson.learningObjective) errors.push(`${lesson.id} has no learning objective.`);
      if ((lesson.questions || []).length < 8) errors.push(`${lesson.id} has fewer than 8 exercises.`);
      for (const question of lesson.questions || []) {
        if (!question.type || !question.prompt) errors.push(`${lesson.id} contains an incomplete question.`);
        if (question.type !== "matching" && question.answer === undefined && !question.tiles) errors.push(`${lesson.id} contains a question without an answer.`);
      }
    }
  }

  if (errors.length) {
    console.error(errors.map(error => `- ${error}`).join("\n"));
    process.exitCode = 1;
  } else {
    const lessons = gaUnits.flatMap(unit => unit.lessons);
    const questions = lessons.flatMap(lesson => lesson.questions || []);
    console.log(`Ga validated: ${gaUnits.length} units, ${lessons.length} lessons, ${questions.length} exercises, ${gaExploreLibrary.entries.length} Explore entries, ${gaImmersion.conversations.length} conversations, ${gaImmersion.missions.length} missions, ${gaImmersion.stories.length} stories.`);
  }
} finally {
  await server.close();
}
