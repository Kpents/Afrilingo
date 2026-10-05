import { BookOpen, Check, ChevronRight, Dumbbell, MessageCircle, RotateCcw } from "lucide-react";
import { currentDailyPlan } from "../../utils/dailyPlan";
import { isReviewDue } from "../../utils/reviewScheduler";
import { masteryInsights, skillDefinitions } from "../../utils/learnerMastery";
import { motivationSummary, preferredThemeIds } from "../../utils/learningPersonalization";
import { hapticPress } from "../../utils/hapticFeedback";

export default function DailyLearningPlan({ dark, progress, motivations, library, hasImmersion, onNavigate }) {
  const plan = currentDailyPlan(progress);
  const completed = new Set(plan.completedStepIds);
  const dueReviews = (progress.reviewQueue || []).filter(item => isReviewDue(item)).length;
  const weakest = masteryInsights(progress.mastery).weakest;
  const weakLabel = weakest ? skillDefinitions[weakest[0]].label : "core language skills";
  const preferredTheme = preferredThemeIds(motivations).map(id => library?.themes?.find(item => item.id === id)).find(Boolean);
  const steps = [
    { id:"review", screen:"review", title:dueReviews ? `Recall ${dueReviews} due ${dueReviews === 1 ? "concept" : "concepts"}` : "Memory is clear", text:dueReviews ? "Strengthen mistakes before they fade." : "Nothing is due right now.", Icon:RotateCcw, color:"#C95D3A", automatic:!dueReviews },
    { id:"skill", screen:"practice", title:`Train ${weakLabel.toLowerCase()}`, text:weakest ? `Your ${weakest[1].accuracy}% accuracy makes this today’s best skill focus.` : "Build enough answer history to reveal your strongest and weakest skills.", Icon:Dumbbell, color:"#4338CA" },
    { id:"vocabulary", screen:"explore", title:preferredTheme ? `Explore ${preferredTheme.label.toLowerCase()}` : "Explore useful vocabulary", text:`Chosen for your ${motivationSummary(motivations)} goals.`, Icon:BookOpen, color:"#24745B", unavailable:!library },
    { id:"immersion", screen:"immersion", title:"Use it in a real moment", text:"Complete a conversation, story, culture mission, or Adventure.", Icon:MessageCircle, color:"#F28C28", unavailable:!hasImmersion }
  ];
  const doneCount = steps.filter(step => step.automatic || completed.has(step.id) || step.unavailable).length;
  const card = dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";
  return <section className={`rounded-[1.75rem] border p-5 ${card}`} aria-labelledby="daily-plan-title"><div className="flex items-start justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-[.18em] text-[#F28C28]">Personalized daily route</div><h2 id="daily-plan-title" className="mt-1 text-2xl font-black">Today’s Plan</h2><p className="mt-1 text-sm font-semibold opacity-50">Memory, mastery, goals, then real-world use.</p></div><span className="rounded-full bg-[#24745B]/12 px-3 py-2 text-xs font-black text-[#24745B]">{doneCount}/{steps.length}</span></div><div className={`mt-4 h-2.5 overflow-hidden rounded-full ${dark?"bg-white/10":"bg-black/8"}`}><div className="h-full rounded-full bg-gradient-to-r from-[#F28C28] to-[#24745B] transition-all" style={{width:`${doneCount / steps.length * 100}%`}}/></div><div className="mt-5 space-y-2">{steps.map((step,index)=>{const done=step.automatic||completed.has(step.id)||step.unavailable;return <button key={step.id} disabled={done} onClick={()=>onNavigate(step.screen)} onPointerDown={hapticPress} className={`afri-press flex min-h-16 w-full items-center gap-3 rounded-2xl p-3 text-left disabled:cursor-default ${done?dark?"bg-white/5":"bg-black/[.035]":dark?"bg-[#232B28]":"bg-[#FFF8EE]"}`}><span className="grid size-10 shrink-0 place-items-center rounded-xl font-black text-white" style={{backgroundColor:done?"#24745B":step.color}}>{done?<Check size={19}/>:index+1}</span><span className="min-w-0 flex-1"><span className="block font-black">{step.title}</span><span className="block text-xs font-semibold opacity-45">{step.unavailable?"Available when this course gains the feature.":step.text}</span></span>{!done&&<ChevronRight size={18} className="opacity-30"/>}</button>})}</div></section>;
}
