# AfriLingo artwork system

## Visual families

- **Course identity:** one country-attire Lebo image for every available language. Twi additionally has pose-specific artwork; all other courses fall back to their approved country outfit.
- **Crew:** Lebo, Kobby, Zuri, Taffy, and Chidi use transparent, contained portraits with a shared bottom alignment and branded fallback frame.
- **Scenes:** Adventures, stories, and language-world chapters use edge-to-edge `object-cover` artwork with centered focal points and readable overlays.
- **Learning concepts:** numbers use the shared number visual; concrete vocabulary uses `ConceptIcon`; custom African-context artwork uses contained transparent assets.

## Fallback policy

1. Missing custom concept art falls back to a clearly labelled in-app placeholder—never a broken-image glyph.
2. Missing crew art falls back to a branded card labelled with the character’s name.
3. Missing language-specific Lebo poses fall back to that language’s approved country outfit, then to the approved base Lebo pose.
4. Scene images keep their reserved aspect ratio and show a branded unavailable-art panel if loading fails.
5. Decorative images remain hidden from assistive technology; instructional images retain meaningful labels.

## Quality rules

- Portrait and concept assets use `object-contain`; scenes use `object-cover`.
- UI components own crop behavior so datasets only supply asset paths and descriptions.
- New artwork must live under `public/mascot`, `public/images`, or `public/icons`.
- `npm run validate:artwork` checks every referenced repository asset before production builds.
- Placeholder concepts remain explicitly marked `placeholder` in `iconLibrary`; they must not pretend to be commissioned artwork.

