# AfriLingo UI polish checklist

This is the launch-quality checklist for the UI work that was intentionally deferred while the learning functionality was being completed. An item is only **complete** when its acceptance checks pass in light mode, dark mode, and reduced-motion mode.

## Progress

- [~] **1. Smoother transitions between questions, feedback, and rewards**
  - [x] Animate question changes without shifting the lesson shell.
  - [x] Animate answer feedback and progress updates.
  - [ ] Unify lesson-complete, unit-complete, XP, and culture-card reward timing.
  - [ ] Confirm rapid taps cannot overlap or skip transitions.

- [~] **2. More character reactions throughout lessons**
  - [x] Show rotating crew reactions after correct and incorrect answers.
  - [x] Keep reactions contextual and concise on mobile.
  - [ ] Add reactions to warm-ups, review recovery, low-heart moments, and streak milestones.
  - [ ] Verify reactions never obscure controls or repeat excessively.

- [~] **3. Native-app-quality gestures, bottom sheets, and screen transitions**
  - [x] Build one accessible, swipe-to-dismiss bottom-sheet primitive.
  - [x] Migrate course selection and mobile “More” navigation to it.
  - [ ] Apply consistent screen transitions to Explore, Immerse, Practice, Profile, and settings.
  - [ ] Check safe-area spacing and gesture behavior on touch devices.

- [~] **4. Better loading skeletons and polished error/offline states**
  - [x] Replace the generic loader with a branded content-shaped skeleton.
  - [x] Add a friendly retryable error boundary in light and dark modes.
  - [x] Add offline messaging, cached-content guidance, and reconnect feedback.
  - [ ] Ensure loading, empty, offline, and error states retain navigation context.

- [~] **5. More aggressive reduction of text density on smaller screens**
  - [x] Tighten lesson prompts and feedback at approximately 375 px.
  - [x] Audit onboarding, Explore, Immerse, Practice, Profile, and completion screens.
  - [ ] Collapse optional detail behind progressive disclosure where useful.
  - [x] Confirm primary actions remain visible without excessive scrolling.

- [x] **6. Final light/dark accessibility and visual-regression sweep**
  - [x] Check contrast, focus states, touch targets, labels, and keyboard order.
  - [x] Check reduced motion and screen-reader announcements.
  - [x] Capture and compare 375 px mobile, 768 px tablet, and 1440 px desktop views.
  - [x] Test onboarding, path, lesson, Explore, Immerse, Practice, Profile, and settings.

- [x] **7. Consistent artwork quality across every language and secondary screen**
  - [x] Inventory mascot, scene, icon, and fallback artwork by language and surface.
  - [x] Remove stretched, mismatched, low-resolution, and generic broken-image states.
  - [x] Define one fallback policy for missing language-specific artwork.
  - [x] Verify artwork crop rules for mobile, tablet, desktop, light, and dark layouts.

## Release gate

- No horizontal overflow at 375 px.
- No inaccessible white-on-light or dark-on-dark text.
- All dialogs trap focus, close with Escape, and restore focus.
- Touch targets are at least 44 px where practical.
- Reduced-motion users receive the same information without large movement.
- Loading, offline, error, and empty states always offer a useful next action.
- `npm run build` and launch validation pass with zero blocking errors.

