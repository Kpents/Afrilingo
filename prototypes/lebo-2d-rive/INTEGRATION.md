# Approved 2D Lebo integration

Seven artboards: Wave, Celebrate, Curious, Learn, Idle, Correct, Encourage.
The last three are subtler motion variants of approved poses, not new drawings.
Each has six bones, a weighted mesh and a one-shot Reaction animation.
The approved transparent artwork is `../lebo-2d-review/lebo-2d-atlas-v2.png`.

## Build

From the repository root, with the official Rive CLI available:

```powershell
node scripts/build-lebo-2d-rig.mjs
rive prototypes/lebo-2d-rive --verify --format=json
rive inspect prototypes/lebo-2d-rive --json
rive prototypes/lebo-2d-rive --once --format=json
Copy-Item prototypes/lebo-2d-rive/build/lebo-2d-rive.riv public/mascot/lebo-2d.riv
npm run build
```

## Runtime

`src/components/ui/LeboRive.jsx` lazy-loads the official pinned Rive canvas
runtime and locally bundled WASM. Asset paths respect Vite's deployment base.
`Lebo.jsx` maps existing semantic feedback to the Rive renderer. Animated
appearances use the approved neutral hoodie; existing course-outfit PNGs remain
as reduced-motion/static and load-failure fallbacks. Course data is unchanged.

Each reaction plays once. Leaving the viewport releases its Rive instance;
hidden browser tabs pause playback. Existing decorative accents remain separate
from the bone animation. No voice audio or lesson scoring changes are included.

The app preview is `/?preview=lebo-rig`. The original standalone approval page
remains available under `prototypes/lebo-rive-review/2d.html` in development.

## Checks

- `node scripts/check-lebo-integration.cjs`: seven moving reactions that settle,
  pause, mobile width, reduced motion, failed-asset fallback, app loading.
- `node scripts/check-lebo-lesson.cjs`: actual first Twi lesson, wrong answer,
  correct answer, retry queue, and completion reaction.
- `npm run build`: content and JavaScript chunk-size audits.

Browser scripts use the local bundled Playwright/Edge setup and a disposable
browser profile. They never change the learner's real browser progress.
