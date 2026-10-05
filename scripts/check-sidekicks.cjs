const { chromium } = require('C:/Users/Allen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
  for(const width of [1280,375]){
   const page=await browser.newPage({viewport:{width,height:850}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(()=>{if(!localStorage.getItem('afrilingo:preferences'))localStorage.setItem('afrilingo:preferences',JSON.stringify({onboarded:true,name:'Cast test',languageId:'twi',startedLanguageIds:['twi'],soundEnabled:false}))});
   await page.goto(process.env.AFRILINGO_TEST_URL || 'http://127.0.0.1:5175/');
   if(width===1280)await page.getByRole('button',{name:'Toggle dark mode'}).click();
   await page.getByRole('button',{name:'Immerse',exact:true}).first().click();
   await page.getByRole('button',{name:/Meet the Cast/}).click();
   for(const name of ['Zuri','Kobby','Taffy','Chidi']){
    await page.getByRole('button',{name:new RegExp(name)}).first().click();
    await page.getByRole('heading',{name,exact:true}).waitFor();
    await page.getByRole('button',{name:'Ask for a tip'}).click();
    if(!(await page.getByRole('status').innerText()).length)throw Error(`${name} has no tip`);
   }
   await page.getByRole('button',{name:'Choose Chidi for Adventures'}).click();
   await page.getByRole('button',{name:/My Adventure companion/}).waitFor();
   if(await page.evaluate(()=>JSON.parse(localStorage.getItem('afrilingo:preferences')).companionId)!=='taji')throw Error('Companion preference did not persist');
   await page.reload();
   await page.getByRole('button',{name:'Immerse',exact:true}).first().click();
   await page.getByRole('button',{name:/Meet the Cast/}).click();
   await page.getByRole('button',{name:/My Adventure companion/}).waitFor();
   await page.screenshot({path:`prototypes/lebo-2d-rive/build/cast-${width}.png`,fullPage:true});
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(`${width}px overflow`);
   if(errors.length)throw Error(errors.join('\n'));
   await page.getByRole('button',{name:/Immersion home/}).click();
   await page.getByRole('heading',{name:'Chidi is ready to explore.'}).waitFor();
   await page.screenshot({path:`prototypes/lebo-2d-rive/build/immersion-home-${width}.png`,fullPage:true});
   await page.getByRole('button',{name:/Read a Story/}).click();
   await page.getByRole('heading',{name:'Twi Stories'}).waitFor();
   await page.getByRole('button',{name:/Immersion home/}).click();
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(`${width}px Immersion home overflow`);
   await page.getByRole('button',{name:/^Adventures/}).click();
   await page.getByText('Chidi is with you').waitFor();
   await page.locator('button:not([disabled])').filter({hasText:'Neighbourhood Market'}).first().click();
   await page.getByRole('button',{name:'Meet Gogo Nandi'}).click();
   await page.getByRole('status').getByText('Meet Gogo Nandi.',{exact:false}).waitFor();
   await page.getByRole('button',{name:'Close character introduction'}).click();
   await page.getByRole('button',{name:'Ask Chidi for a tip'}).click();
   await page.getByRole('status').getByText('Chidi says:',{exact:false}).waitFor();
   await page.getByRole('button',{name:'Talk to Twi speaker'}).click();
   await page.getByRole('button',{name:'Ask Chidi for a tip'}).click();
   await page.getByRole('status').getByText('Chidi says:',{exact:false}).waitFor();
   await page.getByRole('button',{name:'Fa nifa.',exact:true}).click();
   await page.getByRole('status').filter({hasText:'Chidi encourages you'}).waitFor();
   await page.getByRole('button',{name:'Me din de Ama.',exact:true}).click();
   await page.getByRole('status').filter({hasText:'Chidi cheers'}).waitFor();
   await page.screenshot({path:`prototypes/lebo-2d-rive/build/companion-reaction-${width}.png`,fullPage:true});
   await page.getByRole('button',{name:/Complete ·/}).click();
   await page.getByRole('heading',{name:'Adventure complete!'}).waitFor();
   await page.getByRole('button',{name:'Back to adventures'}).click();
   await page.getByRole('button',{name:/Shopping for Bananas/}).click();
   await page.getByRole('button',{name:'Ask Chidi for a tip'}).click();
   await page.getByRole('status').getByText('Chidi says:',{exact:false}).waitFor();
   await page.getByRole('button',{name:/Inspect fruit/}).click();
   await page.getByRole('button',{name:'Speak to the seller'}).click();
   await page.getByRole('button',{name:'Ask Chidi for a tip'}).click();
   await page.getByRole('status').getByText('Chidi says:',{exact:false}).waitFor();
   await page.getByRole('button',{name:'Da yie.',exact:true}).click();
   await page.getByRole('status').filter({hasText:'Chidi encourages you'}).waitFor();
   await page.getByRole('button',{name:'Maakye.',exact:true}).click();
   await page.getByRole('status').filter({hasText:'Chidi cheers'}).waitFor();
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(`${width}px featured mission overflow`);
   console.log(`${width}px cast and Adventure cameo PASS`);
   await page.close();
  }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
