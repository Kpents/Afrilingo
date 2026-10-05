const { chromium } = require('C:/Users/Allen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.AFRILINGO_TEST_URL || 'http://127.0.0.1:5175/');
    await page.getByPlaceholder('Your first name').fill('A learner');
    await page.getByRole('button', { name: /Continue/ }).click();
    await page.getByRole('button', { name: /Continue/ }).click();
    await page.getByRole('heading', { name: 'What brings you here?' }).waitFor();
    const options = page.locator('main button[aria-pressed]');
    const first = options.nth(0);
    const second = options.nth(1);
    const firstSelected = await first.getAttribute('aria-pressed') === 'true';
    if (!firstSelected) await first.click();
    await second.click();
    const selected = await page.locator('main button[aria-pressed="true"]').count();
    if (selected < 2) throw Error(`Expected two motivations; got ${selected}`);
    await page.getByRole('button', { name: /Continue/ }).click();
    await page.getByRole('button', { name: /Continue/ }).click();
    await page.getByRole('button', { name: /Start learning/ }).click();
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('afrilingo:preferences')));
    if (!saved?.onboarded || saved.motivations.length < 2) throw Error('Multi-select onboarding was not saved');
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error('Mobile overflow');
    if (errors.length) throw Error(errors.join('\n'));
    console.log('Mobile multi-select onboarding PASS');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
