# AfriLingo

AfriLingo is a reusable, gamified learning platform with 14 language courses and independent progress.

## Features

- 5 lesson path
- Locked/unlocked lesson progression
- Mini conversations before each lesson
- Shuffled multiple-choice answers
- Instant correct/incorrect feedback
- Hearts
- Review queue for missed questions
- XP
- LocalStorage progress persistence
- Collectible Learn Through Culture cards
- Culture collection screen
- Profile/achievement tracking
- Light and dark mode
- Responsive mobile-first layout

## Run

```bash
npm install
npm run dev
```

## Content quality gate

```bash
npm run validate:content
```

Validation runs automatically before every production build. It checks all 28-unit paths, exercise schemas, identifiers, answer options, culture cards, Explore libraries, and Immersion libraries. Structural problems fail the command; language content explicitly awaiting native-speaker review is reported separately in `reports/content-audit.md` and `reports/content-audit.json`.

The production build also enforces a 250 KB maximum per JavaScript chunk. The generated app includes install metadata, an offline application shell, cached same-origin learning assets, and an in-app update notice.

Progress remains local to the browser in this prototype. Learners can export or restore a versioned backup from Settings. Hosting-ready configuration is included for Netlify and Vercel; see `LAUNCH_CHECKLIST.md` before making a public production claim.

## Important content note

The lesson structure follows the provided AfriLingo curriculum for:
1. Saying Hello
2. Good Morning / Afternoon / Evening
3. Introducing Yourself
4. Thank You & Please
5. Greetings Challenge

The language content in this prototype should still be reviewed against your preferred Twi dictionary/native-speaker source before production use.
