const { chromium } = require('C:/Users/Allen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    for (const width of [375, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 850 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(() => localStorage.setItem('afrilingo:preferences', JSON.stringify({ onboarded: true, name: 'Explore press test', languageId: 'twi', startedLanguageIds: ['twi'], soundEnabled: false })));
      await page.goto(process.env.AFRILINGO_TEST_URL || 'http://127.0.0.1:5175/');
      if (width === 1280) await page.getByRole('button', { name: 'Toggle dark mode' }).click();
      await page.getByRole('button', { name: 'Explore', exact: true }).first().click();
      await page.getByRole('heading', { name: 'Vocabulary Library' }).waitFor();
      await page.getByLabel('Find a word you want to learn').fill('dog');
      await page.screenshot({path:`prototypes/lebo-2d-rive/build/explore-search-${width}.png`,fullPage:true});
      await page.getByRole('button', { name: /Ɔkraman/ }).first().click();
      await page.getByRole('heading', { name: 'Animals' }).waitFor();
      const start = page.getByRole('button', { name: 'Start vocabulary session' });
      await start.waitFor();
      if (!(await start.getAttribute('class')).includes('afri-press')) throw Error('Explore start is flat');
      await start.click();
      const reveal = page.getByRole('button', { name: 'Reveal meaning' });
      await reveal.waitFor();
      if (!(await reveal.getAttribute('class')).includes('afri-press')) throw Error('Explore reveal is flat');
      await reveal.click();
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error(`${width}px overflow`);
      if (errors.length) throw Error(errors.join('\n'));
      console.log(`${width}px Explore raised actions PASS`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
