# AfriLingo learning-engine audit

## What AfriLingo already does better

- Fourteen independent African-language courses with culture cards, placement and saved progress.
- A reusable multi-exercise renderer, adaptive in-lesson retries and spaced review scheduling.
- Explore vocabulary, culturally grounded Immersion, Adventures and character-led learning.
- Daily plans, achievements, resilient local persistence, backup/recovery, offline states and accessibility work.

## Useful overlap

Both applications use a course path, locked progression, reusable lesson loop, immediate feedback, XP, streaks, mistakes and targeted practice. AfriLingo keeps its current data model and UI because those implementations are already broader and more mature.

## Architecture adopted from the reference

- A versioned, language-specific attempt ledger recording correctness, response time, skill, concept, source and mode.
- Aggregated concept evidence that Practice can rank by weakness, misses and staleness.
- Explicit reusable exercise contracts for word banks, typed listening and self-recorded speaking.
- A learning-engine validation gate that checks legacy-save compatibility and personalization behavior.

## Intentionally not transplanted

- Reference branding, colors, copy, artwork, sounds and layout.
- Its single-course hard-coded lesson array and one-number unlock state.
- Demo-only streak logic, random/lesson-level mastery and reset-oriented persistence.
- Any simulated pronunciation score. Speaking remains record-and-playback until appropriate verified assessment exists.

## Integration risks and controls

- **Existing saves:** normalization adds new fields without changing old completion, XP or review data.
- **Storage growth:** the attempt ledger is capped at 600 records per language; concept aggregates remain compact.
- **Curriculum regression:** existing unit and lesson IDs remain unchanged.
- **Content quality:** new engine capabilities do not manufacture language content or audio.
- **Practice bias:** explicit review items stay first; other practice pools use evidence-based scoring with stable tie-breaking.

## Current learning flow

`Course → Unit → Lesson node → Exercise → Attempt → Concept mastery → Personalized Practice → Immersion`

Sections and richer path-node presentation can be layered onto this model later without migrating course content or user progress.
