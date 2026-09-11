# AfriLingo launch checklist

## Ready

- [x] Production build and 250 KB chunk budget
- [x] Automated validation across all 14 languages
- [x] 28 units per language with dynamic progression
- [x] Explore, Immersion, Practice, Review, Culture, and Profile
- [x] Independent local progress and versioned export/import
- [x] Responsive mobile navigation and keyboard-accessible dialogs
- [x] Light/dark mode and reduced-motion support
- [x] Installable offline application shell
- [x] Privacy, help, recovery, and reset controls
- [x] Netlify and Vercel static-host configuration

## Required before a public production claim

- [ ] Native-speaker editorial review of records listed in `reports/content-audit.json`
- [ ] Replace deferred audio placeholders with licensed native-speaker recordings
- [ ] Confirm a production domain, owner contact, and formal privacy-policy owner
- [ ] Run user acceptance testing with representative learners and devices

## Release command

```bash
npm ci
npm run build
```

Deploy the generated `dist/` directory. Do not bypass a failed content or bundle audit.
