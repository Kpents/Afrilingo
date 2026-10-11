# Ga course guide alignment

AfriLingo's Ga course is aligned to the Bureau of Ghana Languages' *Language Guide (Ga Version)* without copying the guide wholesale. The guide is used as a scope and reference source; scored content is limited to forms already present in the verified course dataset.

## Course structure

- **Foundations (Units 1–9):** greetings, counting, identity, common actions, family, food, home, description, and questions.
- **Everyday Life (Units 10–20):** directions, time, markets, conversation, school and work, travel, feelings, health, weather, plans, and connected stories.
- **Communication & Culture (Units 21–28):** connected conversation, grammar in context, Accra daily life, travel decisions, health, social nuance, story work, and a cumulative mastery challenge.

Every lesson includes a communicative objective, skill tags, source status, and a tone/audio warning. Existing unit and lesson identifiers remain unchanged so learner progress is preserved.

## Guide coverage

The current course covers guide domains including pronunciation awareness, greetings and responses, pronouns, numbers and quantities, time, directions, home, family, body and health, school, shops and markets, travel, colours, weather, and common expressions.

The guide's chief's-house, post-office, bird, insect, and fish lists are intentionally not converted into scored content yet. They require native-speaker review for modern usage, spelling, tone, and teaching priority before release.

## Explore and Immerse

Ga Explore organizes course vocabulary into guide-informed collections, including greetings, conversation repair, time and calendar, markets, directions, health, home, and feelings. Every entry retains its originating course unit and editorial status.

Ga Immerse provides connected conversations, original graded stories built from course language, practical missions, cautious usage variation, pronunciation awareness, culture notes, and daily phrases. No feature claims to assess pronunciation while native audio and the speech-recognition adapter remain pending.

## Editorial and audio policy

Ga is tonal and uses meaningful vowel-length contrasts. Text alone cannot validate learner pronunciation. All current items therefore carry `source-aligned-native-review-pending`; their empty audio field is deliberate. Native-speaker recordings and editorial sign-off must replace that status before pronunciation scoring is enabled.

## Validation

Run `node scripts/validate-ga-course.mjs` to verify the preserved 28-unit structure, three course phases, lesson IDs, objectives, guide alignment, and minimum exercise depth.
