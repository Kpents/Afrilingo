import { createServer } from "vite";

const server = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true }
});

try {
  const { masterCurriculum } = await server.ssrLoadModule("/src/data/curriculum/masterCurriculum.js");
  const { languages } = await server.ssrLoadModule("/src/data/languages.js");
  const errors = [];

  if (masterCurriculum.units.length !== 73) {
    errors.push(`Master curriculum has ${masterCurriculum.units.length} units; expected 73.`);
  }

  const expectedSections = [
    ["foundations", 1, 9],
    ["everyday-life", 10, 39],
    ["communication-culture", 40, 73]
  ];
  expectedSections.forEach(([id, start, end], index) => {
    const section = masterCurriculum.sections[index];
    if (!section || section.id !== id || section.unitRange[0] !== start || section.unitRange[1] !== end) {
      errors.push(`Section ${index + 1} does not match ${id} (${start}–${end}).`);
    }
  });

  const ids = new Set();
  masterCurriculum.units.forEach((unit, index) => {
    if (unit.number !== index + 1) errors.push(`Unit ${unit.id} has a non-sequential number.`);
    if (ids.has(unit.id)) errors.push(`Duplicate master unit ID: ${unit.id}`);
    ids.add(unit.id);
    if (!unit.title || !unit.objective || !unit.cefr || !unit.skills?.length) {
      errors.push(`Unit ${unit.id} is missing required planning metadata.`);
    }
  });

  for (const [languageId, course] of Object.entries(languages)) {
    const curriculum = course.curriculum;
    if (!curriculum || curriculum.units.length !== 73) {
      errors.push(`${languageId}: missing 73-unit curriculum projection.`);
      continue;
    }
    const playable = curriculum.units.filter(unit => unit.status === "playable");
    if (playable.length !== course.units.length) {
      errors.push(`${languageId}: ${playable.length} projected units for ${course.units.length} existing units.`);
    }
    const mappedIndexes = playable.map(unit => unit.courseUnitIndex);
    if (new Set(mappedIndexes).size !== course.units.length) {
      errors.push(`${languageId}: an existing unit is duplicated or missing in the projection.`);
    }
    playable.forEach(unit => {
      if (unit.courseUnit !== course.units[unit.courseUnitIndex]) {
        errors.push(`${languageId}: projection replaced existing unit ${unit.courseUnitIndex + 1}.`);
      }
      const originalIds = course.units[unit.courseUnitIndex].lessons.map(lesson => lesson.id);
      const projectedIds = unit.courseUnit.lessons.map(lesson => lesson.id);
      if (originalIds.join("|") !== projectedIds.join("|")) {
        errors.push(`${languageId}: lesson IDs changed in existing unit ${unit.courseUnitIndex + 1}.`);
      }
    });
    curriculum.units.filter(unit => unit.status === "upcoming").forEach(unit => {
      if (unit.courseUnit || unit.lessonCount) errors.push(`${languageId}: upcoming ${unit.id} contains unverified lesson content.`);
    });
  }

  if (languages.zulu.curriculum.playableUnitCount !== 28 || languages.zulu.units.length !== 28) {
    errors.push("Zulu's 28-unit course was not preserved.");
  }

  if (errors.length) {
    console.error(errors.map(error => `✗ ${error}`).join("\n"));
    process.exitCode = 1;
  } else {
    const languageCount = Object.keys(languages).length;
    const playableCount = Object.values(languages).reduce((sum, course) => sum + course.units.length, 0);
    console.log(`✓ Master Curriculum v${masterCurriculum.version}: 73 units across 3 sections`);
    console.log(`✓ ${languageCount} language projections preserve ${playableCount} verified playable units`);
    console.log("✓ Zulu's existing 28 units and lesson IDs are unchanged");
    console.log("✓ Unauthored curriculum slots contain no generated lesson content");
  }
} finally {
  await server.close();
}
