# AfriLingo Master Curriculum v1.0

AfriLingo uses one universal communicative roadmap with language-owned lesson content. The roadmap contains 73 units in three sections:

1. **Foundations** — Units 1–9
2. **Everyday Life** — Units 10–39
3. **Communication & Culture** — Units 40–73

The objectives are shared so that every course develops comparable real-world capabilities. Vocabulary, grammar order, pronunciation, examples and cultural content are **not** copied between languages. CEFR labels are planning guidance rather than certification claims.

## Architecture

- `src/data/curriculum/masterCurriculum.js` owns the 73 universal objectives, section boundaries, skill coverage, checkpoints and adaptation profiles.
- `src/utils/curriculumMigration.js` projects verified course units into the roadmap.
- `src/data/<language>/course.js` remains the source of truth for playable, language-specific lessons.
- `src/data/languages.js` prepares each legacy course and then attaches its curriculum projection.

Every projected slot has one of two explicit states:

- `playable` / `verified-existing`: linked to an existing authored unit.
- `upcoming` / `not-authored`: objective metadata only, with no questions or translations.

This separation prevents planning placeholders from masquerading as finished learning content.

## Progress and compatibility

Existing units and lesson objects are retained by reference. Their IDs, order and stored completion keys are not rewritten. XP, hearts, streaks, course switching, Firebase/local progress and lesson unlocking therefore continue to use the existing structures.

Curriculum coverage is derived from completed lesson IDs with `getCurriculumProgress()`. Two percentages are intentionally distinct:

- completion of currently verified content;
- coverage of the full 73-unit roadmap.

Finishing the authored course does not silently mark upcoming curriculum units complete.

## Adding a language

1. Create the course data under `src/data/<language>/` using stable unit and lesson IDs.
2. Add the course to `src/data/languages.js` through `prepareLanguage(id, course, units, region)`.
3. Add a concise adaptation profile in `masterCurriculum.js`. Specify linguistic priorities rather than forcing another language's grammar order.
4. Map only native-speaker-reviewed vocabulary, examples, pronunciation and cultural material. Leave uncertain content out or explicitly flagged for verification.
5. Run `npm run validate:curriculum`, the existing content validators, tests and production build.

## Modifying a course

- Do not renumber existing lesson IDs after release.
- Add verified lessons to the language course, then let the projection expose them.
- Universal objectives may be clarified, but master unit IDs and numbers must remain stable after launch.
- Tone, noun-class, concord and morphology support belongs in language data and presentation metadata, not in a universal English-shaped grammar sequence.
- Checkpoints are defined at master units 9, 19, 29, 39, 50, 61 and 73. A language may prepare learners for them in a different grammatical order.

## Validation

`scripts/validate-master-curriculum.mjs` verifies section ranges, 73 stable units, required objective metadata, one-to-one migration of all existing units, unchanged lesson IDs, empty upcoming slots and preservation of Zulu's 28-unit course.
