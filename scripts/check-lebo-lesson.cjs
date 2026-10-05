const { chromium } = require('C:/Users/Allen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({ headless:true, channel:'msedge' });
 try {
  const page = await browser.newPage({ viewport:{width:1280,height:940} });
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  await page.addInitScript(()=>localStorage.setItem('afrilingo:preferences',JSON.stringify({onboarded:true,name:'Lebo test',languageId:'twi',startedLanguageIds:['twi'],soundEnabled:false})));
  await page.goto(process.env.LEBO_TEST_URL || 'http://127.0.0.1:5175/');
  await page.getByRole('button',{name:/Saying Hello/}).click();
  await page.getByRole('button',{name:'Start lesson',exact:true}).click();
  const answer=async(text,state)=>{
   await page.getByRole('button',{name:text,exact:true}).click();
   await page.getByRole('button',{name:/^Check/}).click();
   await page.locator(`[data-lebo-reaction="${state}"][data-lebo-ready="true"]`).waitFor();
   await page.getByRole('button',{name:/^Continue|^Next/}).click();
  };
  await answer('Medaase','encourage');
  await answer('Agoo','correct');
  await answer('I am fine','correct');
  await answer('Me ho yɛ.','correct');
  await page.getByRole('button',{name:'Ɛte',exact:true}).click();
  await answer('sɛn?','correct');
  await answer('Ɛte sɛn?','correct');
  await page.locator('[data-lebo-reaction="celebrate"][data-lebo-ready="true"]').waitFor();
  await page.screenshot({path:'prototypes/lebo-2d-rive/build/integration-completion.png',fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('PASS: actual lesson wrong/correct/retry/completion reactions, no runtime errors');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
