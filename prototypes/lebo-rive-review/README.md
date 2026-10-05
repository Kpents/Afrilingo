# Lebo Rive reaction review

This local preview loads a real, script-free `.riv` file built by Rive CLI 1.0.2. It uses the original `public/mascot/lebo-wave.png` unchanged. The skin weights connect the image mesh to Anchor, Head, Shoulder, Forearm, and Paw bones. The shoulder, forearm, paw, and head rotations are keyed inside Rive; the HTML only controls playback.

Run `node scripts/build-lebo-rig.mjs` from the repository root, then `rive prototypes/lebo-rive --verify`, `rive inspect prototypes/lebo-rive --json`, and `rive prototypes/lebo-rive --once`.

The generated source is `../lebo-rive/scene.rml`. The runtime file is `../lebo-rive/build/lebo-rive.riv`. Rive's native CLI can preview it with `rive prototypes/lebo-rive`.

The browser preview uses the official `@rive-app/canvas` 2.42.1 `rive.js` and `rive.wasm` in `vendor/` (not committed). Serve the repository with Vite and open `/prototypes/lebo-rive-review/`.

This is a first restrained wave, pending visual approval. No lesson integration has been made. It does not include independently redrawn eyelids or a blink. The RML source remains editable; exporting an editor `.rev` requires a Rive login.
