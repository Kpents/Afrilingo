# Twi + Ga rollout benchmark

This benchmark compares the current AfriLingo beta with the product promises and learning patterns publicly documented by Falou and Duolingo. The target is not feature-for-feature imitation. It is a credible, reliable Twi and Ga learning product with comparable core learning loops and a stronger African cultural experience.

## Competitive position

| Capability | AfriLingo Twi/Ga today | Falou benchmark | Duolingo benchmark | Rollout verdict |
| --- | --- | --- | --- | --- |
| Guided course | 28-unit paths, checkpoints, dynamic unlocking, placement | Level-based practical lessons | Structured path with unit review and placement | Competitive |
| Exercise variety | Translation, matching, sentence building, visuals, fill-in, conversations, challenges | Conversation, pronunciation, writing, flashcards and review | Reading, writing, listening, speaking, matching, stories and timed challenges | Competitive without speech |
| Mistake recovery | Hearts, explanation, persistent review queue, repeated practice | Personalized weak-spot review | Mistakes practice and personalized review | Good beta; needs memory-strength scheduling |
| Real-life use | Adventures, multi-turn conversations, stories and theme practice | Conversation-first real-life scenarios | Stories, roleplay and Adventures | Strong |
| Culture | Lesson cards, collection, cultural context, settings and characters | Secondary to speaking practice | Culture appears in selected stories/content | AfriLingo advantage |
| Speaking | UI and data architecture prepared; verified recordings deferred | Speech from lesson one with pronunciation feedback | Speaking exercises and conversational products | Release-critical gap |
| Listening | Graceful audio fallback; native recordings deferred | Native audio and repeated pronunciation practice | Listening is integrated throughout mature courses | Release-critical gap |
| Personalization | Motivation-based plan, placement, mistakes-first practice | Weak-spot lessons and personalized review | Adaptive lesson difficulty and spaced review | Partial; next engineering priority |
| Gamification | XP, hearts, streaks, goals, badges, leagues, rewards and mascots | Challenges and certificates | Deep quests, leagues, streak systems and timed events | Competitive beta; leaderboard is simulated |
| Progress portability | Per-language local progress with export/import and recovery | Account-backed product | Account and cross-device sync | Beta-ready; account sync needed for scale |
| Content trust | Source notes and automated audit; human sign-off pending | Mature commercial catalogue | Linguists, learning designers and native speakers | Release-critical gap |

## What “same level” should mean for the first rollout

Twi and Ga are ready for a limited public beta when learners can complete the core loop confidently:

1. Choose a course and level through onboarding or placement.
2. Learn with a clear path and varied exercises.
3. Hear every core expression from a licensed native speaker.
4. Practise speaking without being punished by unreliable recognition.
5. Recover mistakes through scheduled, personalized review.
6. Use the language in an Adventure, conversation or story.
7. Trust the spelling, translation, tone and cultural guidance.
8. Return later without losing progress.

## P0 — gates before describing Twi or Ga as production-ready

- [ ] Native Twi editorial sign-off: spelling, tones, translation, naturalness, dialect labels and cultural notes.
- [ ] Native Ga editorial sign-off: spelling, vowel length, translation, naturalness, regional labels and cultural notes.
- [ ] Licensed native-speaker audio for the launch vocabulary, lesson prompts, conversations and listening questions.
- [ ] Audio QA at slow, normal and natural speed, including missing-file fallback.
- [ ] Representative beginner pilot: onboarding → lesson → mistake review → Adventure → Explore.
- [ ] Device and assistive-technology pass using the matrix in `QA_REPORT.md`.
- [ ] Production owner/contact and final privacy-policy ownership.

## P1 — required to compete on learning quality after the beta opens

- [ ] Add a per-concept mastery record: attempts, accuracy, last seen, consecutive correct answers and next review date.
- [ ] Schedule review using recall strength rather than only the current mistake queue.
- [ ] Adapt lesson endings: add support when accuracy is low and harder retrieval when accuracy is high.
- [ ] Add an optional record-and-compare speaking flow using licensed reference audio before automated scoring.
- [ ] Introduce pronunciation scoring only after evaluation with Twi and Ga speakers across accents, devices and noise levels.
- [ ] Integrate stories, Adventures and personalized review moments into the main path at deliberate intervals.
- [ ] Replace the mock league with an honest personal league or an account-backed leaderboard.
- [ ] Add privacy-conscious product analytics for completion, retries, drop-off, return rate and content-level confusion.

## P2 — scale features, not launch blockers

- [ ] Account authentication and cross-device sync.
- [ ] Friends, social quests and real leaderboards.
- [ ] Downloadable offline audio packs.
- [ ] AI conversation partner with explicit safety, privacy and content-quality evaluation.
- [ ] Advanced proficiency mapping after the curriculum receives formal standards review.

## Rollout stages

### Stage 1 — content council

Two or more reviewers per language audit high-frequency launch material first: greetings, introductions, numbers, family, food, transport, health, directions and conversation repair. Disagreements are documented as variety or context—not silently flattened into one “correct” form.

### Stage 2 — audio pilot

Record a small reusable launch set before the full catalogue: core vocabulary, model sentences, Adventure lines and listening prompts. Measure playback reliability and learner comprehension before scaling production.

### Stage 3 — closed learner pilot

Recruit first-time learners and heritage/reconnecting learners for Twi and Ga. Observe task completion without coaching and record the exact screen, concept, device and severity for every confusion point.

### Stage 4 — public beta

Market Twi and Ga as beta courses, publish known limitations, keep content feedback accessible in-app, and review learning/drop-off signals weekly. Do not claim pronunciation assessment until it has passed language-specific evaluation.

## Evidence used for this benchmark

- Falou App Store listing: conversation-first lessons, AI pronunciation, weak-spot personalization, review and an AI tutor — https://apps.apple.com/us/app/falou-fast-language-learning/id1460579936
- Falou pronunciation overview: native comparison, realistic situations, flashcards, writing/review, challenges and certificates — https://magazine.falou.com/pt/2024/11/01/como-funciona-o-corretor-de-pronuncia-do-falou/
- Duolingo product guide: placement, integrated skills, personalized practice, settings and account-backed progress — https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/
- Duolingo practice guide: mistakes, words, speaking and listening practice — https://blog.duolingo.com/guide-to-duolingo-practice-hub/
- Duolingo path design: spaced review, Stories, guidebooks and character moments in the path — https://blog.duolingo.com/new-duolingo-home-screen-design/
- Duolingo Adventures: interactive characters and real-life tasks inside explorable settings — https://blog.duolingo.com/adventures/

