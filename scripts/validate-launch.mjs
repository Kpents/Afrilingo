import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";

const root = resolve(import.meta.dirname, "..");
const server = await createServer({ root, appType:"custom", logLevel:"silent", server:{ middlewareMode:true } });
let languages, progress, placement, adaptive, review, dailyPlan, mastery;
try {
  ({ languages } = await server.ssrLoadModule("/src/data/languages.js"));
  progress = await server.ssrLoadModule("/src/hooks/useCourseProgress.js");
  placement = await server.ssrLoadModule("/src/utils/placementTest.js");
  adaptive = await server.ssrLoadModule("/src/utils/adaptiveLesson.js");
  review = await server.ssrLoadModule("/src/utils/reviewScheduler.js");
  dailyPlan = await server.ssrLoadModule("/src/utils/dailyPlan.js");
  mastery = await server.ssrLoadModule("/src/utils/learnerMastery.js");
} finally { await server.close(); }

const failures=[];
const check=(condition,message)=>{if(!condition)failures.push(message)};
const now=Date.UTC(2026,9,5,12);

const legacy=progress.normalizeProgress({ xp:80, hearts:0, heartUpdatedAt:now-61*60*1000, completedLessonIds:["legacy-lesson"], explore:{ masteredEntryIds:["word-1"] } });
const recovered=progress.regenerateHearts(legacy,now);
check(recovered.hearts===2,"Zero-heart recovery must regenerate one heart per 30 minutes.");
check(recovered.completedLessonIds.includes("legacy-lesson")&&recovered.explore.masteredEntryIds.includes("word-1"),"Legacy progress must survive schema migration.");
check(Array.isArray(recovered.dailyPlan.completedStepIds)&&recovered.mastery.skills,"New launch state must receive safe defaults.");

for(const [id,course] of Object.entries(languages)){
  const questions=placement.buildPlacementQuestions(course);
  check(questions.length===5,`${id}: onboarding placement must remain available.`);
  check(placement.placementUnitIndex(5,5,course.units.length)>0,`${id}: experienced learners must be able to start beyond Unit 1.`);
}

const lessonQuestion={id:"journey-q",type:"multiple-choice",prompt:"Choose",answer:"A",options:["A","B"]};
let queue=adaptive.createLessonQueue([lessonQuestion,{...lessonQuestion,id:"bridge-1"},{...lessonQuestion,id:"bridge-2"}]);
queue=adaptive.scheduleAdaptiveRetry(queue,0,queue[0]);
check(queue.at(-1).id==="journey-q"&&queue.at(-1).retryAttempt===1,"A lesson mistake must return before completion after an interval.");

let reviewQueue=review.recordReviewMiss([],lessonQuestion,{id:"lesson-1",title:"First lesson"},now);
reviewQueue=review.applyReviewOutcomes(reviewQueue,[{reviewKey:reviewQueue[0].reviewKey,correct:true}],now+1000);
check(reviewQueue.length===1&&!review.isReviewDue(reviewQueue[0],now+1000),"A recovered mistake must persist as a future spaced review.");

let state={dailyPlan:{date:"2026-10-05",completedStepIds:[]}};
for(const step of dailyPlan.DAILY_PLAN_STEPS) state={...state,dailyPlan:dailyPlan.completeDailyPlanStep(state,step,"2026-10-05")};
check(state.dailyPlan.completedStepIds.length===4,"All four daily-plan activities must persist independently.");
const nextDay=dailyPlan.currentDailyPlan(state,"2026-10-06");
check(nextDay.completedStepIds.length===0,"The daily plan must reset on the next local date.");

const model=mastery.updateLearnerMastery({},[{skill:"vocabulary",correct:8,attempts:10},{skill:"listening",correct:2,attempts:5}],now);
check(mastery.masteryInsights(model).weakest[0]==="listening","Weak-skill recommendations must reflect learner evidence.");

const manifest=JSON.parse(await readFile(resolve(root,"public/manifest.webmanifest"),"utf8"));
check(manifest.display==="standalone"&&manifest.start_url==="./","The install manifest must remain GitHub Pages compatible.");
await access(resolve(root,"public/sw.js"));
await access(resolve(root,"public/app-icon.svg"));
await access(resolve(root,"public/maskable-icon.svg"));

if(failures.length){console.error(`Launch validation failed with ${failures.length} issue${failures.length===1?"":"s"}:`);failures.forEach(item=>console.error(`- ${item}`));process.exitCode=1}
else console.log(`Launch validation passed: ${Object.keys(languages).length} courses · onboarding, recovery, adaptivity, persistence, daily plan and offline shell ready`);
