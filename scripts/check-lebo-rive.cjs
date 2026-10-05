const { chromium } = require('C:/Users/Allen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:5175/prototypes/lebo-rive-review/');
  await page.waitForFunction(()=>window.leboPreview?.loaded, {timeout:20000});
  await page.locator('#replay').click();
  await page.waitForTimeout(900);
  await page.locator('#pause').click();
  await page.screenshot({path:'prototypes/lebo-rive/build/browser-desktop.png',fullPage:true});
  console.log(JSON.stringify(await page.evaluate(()=>({loaded:leboPreview.loaded,animations:leboPreview.animationNames,stateMachines:leboPreview.stateMachineNames,status:document.getElementById('status').textContent,overflow:document.documentElement.scrollWidth>innerWidth}))));
  await page.locator('#pause').click();
  await page.waitForTimeout(3000);
  console.log('After finish:',await page.locator('#status').textContent());
  await page.setViewportSize({width:375,height:812});
  await page.locator('#replay').click();
  await page.waitForTimeout(1000);
  await page.locator('#pause').click();
  await page.screenshot({path:'prototypes/lebo-rive/build/browser-mobile.png',fullPage:true});
  console.log('Mobile overflow:',await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
  console.log('Browser errors:',JSON.stringify(errors));
  await browser.close();
  if(errors.length) process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1});
