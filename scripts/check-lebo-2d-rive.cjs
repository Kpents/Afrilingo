const { chromium } = require('C:/Users/Allen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1280,height:940}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5175/prototypes/lebo-rive-review/2d.html');
 await page.waitForFunction(()=>window.leboPreview?.loaded);
 for(const pose of ['Wave','Celebrate','Curious','Learn']){
  await page.locator(`[data-pose="${pose}"]`).click();
  await page.waitForTimeout(150);
  const start=await page.locator('canvas').screenshot();
  await page.waitForTimeout(900);
  await page.locator('#pause').click();
  const later=await page.locator('canvas').screenshot();
  await page.screenshot({path:`prototypes/lebo-2d-rive/build/browser-${pose.toLowerCase()}.png`,fullPage:true});
  if(start.equals(later)){await browser.close();throw Error(`${pose} did not animate`)}
  console.log(pose,'changed pixels:',!start.equals(later),await page.evaluate(()=>({loaded:leboPreview.loaded,animation:leboPreview.animationNames,status:document.getElementById('status').textContent,playing:leboPreview.isPlaying})));
 }
 await page.locator('#replay').click();
 await page.waitForTimeout(3800);
 console.log('Finished:',await page.locator('#status').textContent());
 if(!(await page.locator('#status').textContent()).includes('complete')){await browser.close();throw Error('Reaction did not finish')}
 await page.setViewportSize({width:375,height:812});
 await page.locator('[data-pose="Wave"]').click();await page.waitForTimeout(700);await page.locator('#pause').click();
 await page.screenshot({path:'prototypes/lebo-2d-rive/build/browser-mobile.png',fullPage:true});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile overflow');
 console.log('Browser errors:',errors);
 await browser.close();if(errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
