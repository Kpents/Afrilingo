# AfriLingo final QA report

## Engineering pass

- [x] Fresh onboarding supports multiple motivations and starts with only the chosen course.
- [x] Incorrect answers remove a heart, reveal the answer and explanation, and enter Review.
- [x] Correct Review answers award XP and advance weekly review goals.
- [x] Twi and Ga retain independent XP, hearts, and progress when switching courses.
- [x] All 14 courses derive lesson and unit unlocking from course order rather than fixed ids.
- [x] All 28 units per language remain reachable when predecessor challenges are complete.
- [x] Progress export/import is versioned, excludes unrelated storage, and rejects corrupt files.
- [x] Light/dark themes, reduced motion, skip navigation, dialog labels, and disabled-state semantics are present.
- [x] Production build includes content, experience, and bundle-budget validation.

The repeatable checks run with `npm run validate:experience` and are also part of `npm run build`.

## Manual viewport matrix

Before a public production claim, complete a device pass at:

- [ ] 375 px mobile: onboarding, Home path, lesson, completion, Explore, Immerse, Practice, Profile.
- [ ] Tablet: the same critical journey in portrait and landscape.
- [ ] Desktop: keyboard-only navigation, focus visibility, dialogs, course switching, and refresh/restore.
- [ ] Screen reader: labels and announcements for answer feedback, progress, dialogs, and lesson completion.

## Human content and usability sign-off

These checks require people rather than automation and remain release gates:

- [ ] Native Twi speakers review the records in `reports/content-audit.json`, naturalness, tones, and cultural notes.
- [ ] Beginner learners complete onboarding, one lesson, one Review session, one Adventure, and one Explore activity without coaching.
- [ ] Record confusion points, severity, device, and reproduction steps; fix release-blocking findings.
- [ ] Replace deferred audio with licensed native-speaker recordings when audio production resumes.

## Acceptance rule

AfriLingo may be shared as a testing build after `npm run build` passes. Describe language content as beta until the native-speaker editorial queue and representative-learner pilot are signed off.
