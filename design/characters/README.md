# AfriLingo supporting cast

These four sheets are the user-supplied visual references. Stable character IDs
in `src/data/sidekicks.js` are independent of display names. The confirmed cast
is Lebo, Kobby, Zuri, Taffy (giraffe), and Chidi (parrot).

The app portraits in `public/images/sidekicks/` were produced with the built-in
image generator from these sheets. Zuri, Taffy, and Chidi are RGBA cutouts. Kobby's
portrait uses a solid white frame because transparent extraction repeatedly
left a painted checkerboard; the framed version preserves his design cleanly.

Prompt set, abbreviated:

- Zuri: isolate the large waving elephant from the approved sheet, preserve
  headband, uniform, books and expression; remove all surrounding content and
  produce real transparency. A second background-removal pass was required.
- Kobby: isolate the large waving monkey, preserving yellow cap, green hoodie,
  shoes and curled tail, centered on uniform white; no text or other poses.
- Taffy: isolate the large waving giraffe with safari hat, glasses, camera and
  explorer clothes; remove sheet background with real transparency.
- Chidi: isolate the large waving parrot with headphones and multicolour wings;
  remove sheet background with real transparency.

No dialogue or language-specific phrases are attributed to these characters
yet. Adventure tips are written in English and can be expanded as their
personalities develop.
