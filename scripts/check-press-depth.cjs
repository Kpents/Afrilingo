const { chromium } = require('C:/Users/Allen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    for (const width of [375, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 850 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(() => {
        if (!localStorage.getItem('afrilingo:preferences')) localStorage.setItem('afrilingo:preferences', JSON.stringify({ onboarded: true, name: 'Press test', languageId: 'twi', startedLanguageIds: ['twi'], soundEnabled: false }));
      });
      await page.goto(process.env.AFRILINGO_TEST_URL || 'http://127.0.0.1:5175/');
      if (width === 1280) await page.getByRole('button', { name: 'Toggle dark mode' }).click();
      const node = page.locator('button:not([disabled]) .afri-press').first();
      await node.waitFor();
      const raised = await node.evaluate(element => getComputedStyle(element).boxShadow);
      if (!raised.includes('5px')) throw Error(`${width}px path node has no raised edge`);
      await node.locator('..').hover();
      await page.mouse.down();
      await page.waitForTimeout(300);
      const pressed = await node.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m42);
      const active = await node.evaluate(element => ({node:element.matches(':active'),parent:element.closest('button')?.matches(':active'),parentClass:element.closest('button')?.className,shadow:getComputedStyle(element).boxShadow,inline:element.getAttribute('style')}));
      await page.mouse.up();
      if (pressed < 4) throw Error(`${width}px path node did not depress: ${pressed} ${JSON.stringify(active)}`);
      await page.getByRole('button', { name: 'Start lesson' }).click();
      const choice = page.locator('button.afri-press').first();
      await choice.waitFor();
      await choice.hover();
      await page.mouse.down();
      await page.waitForTimeout(300);
      const choiceDepth = await choice.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m42);
      await page.mouse.up();
      if (choiceDepth < 4) throw Error(`${width}px quiz choice did not depress`);
      await page.getByRole('button', { name: 'Check', exact: true }).waitFor();
      await page.getByRole('button', { name: 'Check', exact: true }).click();
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      for (const answer of ['Agoo', 'I am fine', 'Me ho yɛ.']) {
        await page.getByRole('button', { name: answer, exact: true }).click();
        await page.getByRole('button', { name: 'Check', exact: true }).click();
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
      }
      const tile = page.getByRole('button', { name: 'Ɛte', exact: true });
      await tile.waitFor();
      if (!(await tile.getAttribute('class')).includes('afri-press')) throw Error('Sentence tiles lost pressed-depth styling');
      await tile.click();
      await page.getByRole('button', { name: 'sɛn?', exact: true }).click();
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error(`${width}px sentence builder overflow`);
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error(`${width}px horizontal overflow`);
      if (errors.length) throw Error(errors.join('\n'));
      console.log(`${width}px ${width === 1280 ? 'light' : 'dark'} raised path and lesson controls PASS`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
