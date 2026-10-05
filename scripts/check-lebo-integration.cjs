const { chromium } = require('C:/Users/Allen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const origin = process.env.LEBO_TEST_URL || 'http://127.0.0.1:5175/';
    await page.goto(`${origin}?preview=lebo-rig`);
    for (const state of ['wave', 'correct', 'celebrate', 'encourage', 'curious', 'learn', 'idle']) {
      await page.getByRole('button', { name: state, exact: true }).click();
      await page.locator(`[data-lebo-reaction="${state}"][data-lebo-ready="true"]`).waitFor();
      const first = await page.locator('canvas').screenshot();
      await page.waitForTimeout(950);
      const second = await page.locator('canvas').screenshot();
      assert(!first.equals(second), `${state} must animate`);
      await page.waitForTimeout(4700);
      const rest = await page.locator('canvas').screenshot();
      await page.waitForTimeout(300);
      assert(rest.equals(await page.locator('canvas').screenshot()), `${state} must rest`);
      console.log(`${state}: animates and rests`);
    }
    await page.getByRole('button', { name: 'wave', exact: true }).click();
    await page.locator('[data-lebo-ready="true"]').waitFor();
    await page.getByRole('button', { name: 'Pause', exact: true }).click();
    await page.waitForTimeout(100);
    const paused = await page.locator('canvas').screenshot();
    await page.waitForTimeout(400);
    assert(paused.equals(await page.locator('canvas').screenshot()), 'Pause freezes rig');
    await page.setViewportSize({ width: 375, height: 812 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No mobile overflow');
    await page.screenshot({ path: 'prototypes/lebo-2d-rive/build/integration-mobile.png', fullPage: true });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await page.getByText('Reduced motion enabled:', { exact: false }).waitFor();
    assert.equal(await page.locator('canvas').count(), 0);
    const failureContext = await browser.newContext({ serviceWorkers: 'block' });
    await failureContext.route('**/*.riv', route => route.abort());
    const failurePage = await failureContext.newPage();
    await failurePage.goto(`${origin}?preview=lebo-rig`);
    await failurePage.waitForTimeout(2000);
    assert.equal(await failurePage.locator('[data-lebo-ready="true"]').count(), 0);
    assert(await failurePage.locator('img[alt="Lebo the lion"]').isVisible(), 'Failure keeps artwork');
    await failureContext.close();
    await page.addInitScript(() => localStorage.setItem('afrilingo:preferences', JSON.stringify({ onboarded: true, name: 'Lebo test', languageId: 'twi', startedLanguageIds: ['twi'], soundEnabled: false })));
    await page.goto(origin);
    await page.waitForTimeout(6000);
    console.log('Home diagnostic:', await page.evaluate(() => ({ text: document.body.innerText.slice(0, 400), reactions: document.querySelectorAll('[data-lebo-reaction]').length, ready: document.querySelectorAll('[data-lebo-ready="true"]').length })), errors);
    await page.screenshot({ path: 'prototypes/lebo-2d-rive/build/integration-app.png', fullPage: true });
    assert.deepEqual(errors, []);
    console.log('PASS: seven reactions, rest, pause, mobile, reduced motion, failure fallback, app integration, no runtime errors');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
