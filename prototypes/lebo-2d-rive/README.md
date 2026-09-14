# Lebo 2D Rive reactions

Approved and integrated into the application. See `INTEGRATION.md` for runtime and verification details.

Seven artboards (Wave, Celebrate, Curious, Learn, Idle, Correct, Encourage) share the approved flat 2D character atlas. Each has six root bones, a weighted image mesh, and a 3.6-second `Reaction` timeline. Animation lives inside the `.riv`; JavaScript only selects and controls playback. The source is raster artwork deformed by Rive skinning, not a vector redraw or frame video.

Build from the repository root:

```
node scripts/build-lebo-2d-rig.mjs
rive prototypes/lebo-2d-rive --verify
rive inspect prototypes/lebo-2d-rive --json
rive prototypes/lebo-2d-rive --once
```

Output: `build/lebo-2d-rive.riv` (about 1.5 MB), copied to `public/mascot/lebo-2d.riv`. Source: `scene.rml` plus the atlas at `../lebo-2d-review/lebo-2d-atlas-v2.png`.

Start Vite on port 5175 and open `/prototypes/lebo-rive-review/2d.html`. It uses the local official Rive canvas runtime 2.42.1 already prepared under that viewer's `vendor/` folder.

Rive CLI 1.0.2 verification and inspection passed without reported problems. Browser checks confirmed motion in all seven reactions, switching after pause, completion, and no horizontal overflow at 375px. Screenshots are in `build/browser-*.png`.

## Artwork preparation

Built-in image generation was used to remove the pose sheet's background. The first attempt simulated transparency and was rejected. The selected second output was checked as RGBA with zero alpha in the background. Final prompt:

> Extract the FOUR approved Lebo lion characters from this exact image onto a TRANSPARENT BACKGROUND. Remove the cream background and text labels entirely. Preserve characters, exact positions and proportions. REQUIRED OUTPUT FORMAT: PNG RGBA with actual alpha=0 for all background pixels. Do not illustrate a transparency checkerboard. Do not draw grey squares or simulate transparency. Request native transparent-background image generation. If showing transparency in the preview, it must be the viewer's transparency grid not painted pixels. Same 1774x887 horizontal composition, four poses unchanged: waving, celebrating, curious, reading. No background color, no labels, no shadows.
