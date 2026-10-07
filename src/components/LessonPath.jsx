import { motion, useReducedMotion } from "framer-motion";
import { BookOpenText, Check, Dumbbell, Headphones, Lock, Mic, RotateCcw, Star } from "lucide-react";
import { isLessonUnlocked } from "../utils/courseProgress";
import { buildUnitPathNodes } from "../utils/learningPath";
import SidekickPortrait from "./ui/SidekickPortrait";
import { sidekicks } from "../data/sidekicks";
import { hapticPress } from "../utils/hapticFeedback";

const encouragements = [
  ["kobby", "Every new word is a win. Keep going—you’re building something brilliant!"],
  ["zuri", "Take your time and notice the patterns. You know more than you think."],
  ["nia", "Stay curious! Each lesson brings you closer to a real conversation."],
  ["taji", "Say it out loud and trust your voice. I’m cheering you on!"]
].map(([id, message]) => ({ message, character: sidekicks.find(item => item.id === id) }));

const activityIcons = { practice:Dumbbell, story:BookOpenText, listening:Headphones, speaking:Mic, review:RotateCcw };
const activityColors = { practice:"#24745B", story:"#C95D3A", listening:"#4338CA", speaking:"#F28C28", review:"#F6C445" };

export default function LessonPath({ unit, progress, dark, onStart, onNavigate, hasImmersion }) {
  const reduceMotion = useReducedMotion();
  const lessons = unit.lessons;
  const nodes = buildUnitPathNodes(unit, { hasImmersion });
  const offsets = [0, 70, 20, -55, 10, 55, -20];
  const tilts = [-3, 2.5, -2, 3, -1.5];
  return <div className="relative flex min-h-[720px] flex-col items-center gap-8 overflow-hidden py-6">
    <div className={`absolute bottom-10 left-1/2 top-10 w-2 -translate-x-1/2 rounded-full ${dark ? "bg-[#232B28]" : "bg-[#E9E0D4]"}`} />
    {nodes.map((node, nodeIndex) => node.type === "lesson" ? <LessonNode key={node.id} node={node} nodeIndex={nodeIndex} lessons={lessons} progress={progress} dark={dark} reduceMotion={reduceMotion} offsets={offsets} tilts={tilts} onStart={onStart}/> : <ActivityNode key={node.id} node={node} lessons={lessons} progress={progress} dark={dark} reduceMotion={reduceMotion} onNavigate={onNavigate}/>) }
  </div>;
}

function ActivityNode({ node, lessons, progress, dark, reduceMotion, onNavigate }) {
  const unlocked = progress.completedLessonIds.includes(lessons[node.afterLessonIndex]?.id);
  const Icon = activityIcons[node.type] || Star;
  const color = activityColors[node.type] || "#4338CA";
  return <motion.button disabled={!unlocked} onClick={() => onNavigate(node.target)} onPointerDown={hapticPress} initial={reduceMotion?false:{opacity:0,y:12}} whileInView={reduceMotion?{}:{opacity:1,y:0}} viewport={{once:true,amount:.4}} className={`afri-press relative z-10 flex min-h-20 w-[calc(100%-2rem)] max-w-sm items-center gap-4 rounded-[1.5rem] border p-3 text-left disabled:cursor-not-allowed disabled:opacity-45 ${dark?"border-white/10 bg-[#1A201E]":"border-black/8 bg-white"}`}>
    <span className="grid size-14 shrink-0 place-items-center rounded-2xl text-white shadow-lg" style={{backgroundColor:unlocked?color:dark?"#303A35":"#D6D3D1"}}>{unlocked?<Icon size={25}/>:<Lock size={22}/>}</span>
    <span className="min-w-0 flex-1"><span className="block text-[10px] font-black uppercase tracking-[.16em]" style={{color}}>Optional path activity</span><span className="mt-1 block text-lg font-black">{node.title}</span><span className={`mt-1 block text-xs font-semibold ${dark?"text-white/45":"text-black/45"}`}>{unlocked?node.subtitle:"Complete the lesson above to unlock"}</span></span><span aria-hidden className="text-2xl">{node.emoji}</span>
  </motion.button>;
}

function LessonNode({ node, nodeIndex, lessons, progress, dark, reduceMotion, offsets, tilts, onStart }) {
  const lesson = node.lesson;
  const done = progress.completedLessonIds.includes(lesson.id);
  const unlocked = isLessonUnlocked(lessons, node.lessonIndex, progress.completedLessonIds);
  const status = done ? "done" : unlocked ? "current" : "locked";
  const encouragement = node.lessonIndex < lessons.length - 1 && node.lessonIndex % 2 === 1 ? encouragements[node.lessonIndex % encouragements.length] : null;
  return <div className="contents"><div className="relative z-10 flex w-full max-w-sm justify-center" style={{transform:`translateX(${offsets[nodeIndex%offsets.length]}px)`}}><motion.button disabled={status==="locked"} onClick={()=>onStart(lesson)} onPointerDown={hapticPress} whileHover={status!=="locked"?{scale:1.05}:{}} className="afri-path-button relative flex flex-col items-center"><motion.div style={{rotate:`${tilts[node.lessonIndex%tilts.length]}deg`}} whileHover={status!=="locked"&&!reduceMotion?{rotate:0}:{}} transition={{type:"spring",stiffness:420,damping:24}}><div data-tone={status==="done"?"green":status==="current"?"gold":dark?"locked-night":"locked"} className={`afri-press relative grid h-24 w-24 place-items-center rounded-full border-[7px] ${status==="done"?"border-[#F6C445] bg-[#24745B] text-white":status==="current"?"border-[#F6C445] bg-[#F28C28] text-white":dark?"border-[#303A35] bg-[#202724] text-white/25":"border-stone-200 bg-stone-100 text-stone-300"}`}>{status==="current"&&!reduceMotion&&<motion.span aria-hidden className="absolute -inset-3 -z-10 rounded-full border-4 border-[#F6C445]/45" animate={{scale:[.86,1.18],opacity:[.8,0]}} transition={{duration:1.6,repeat:Infinity,ease:"easeOut"}}/>}{status==="done"?<Check size={36} strokeWidth={4}/>:status==="locked"?<Lock size={30}/>:<span className="text-4xl">{lesson.emoji}</span>}{status!=="locked"&&<span className="absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-[#F6C445] text-[#252525] shadow-md"><Star size={18} fill="currentColor"/></span>}</div></motion.div><div className="mt-3 text-center"><div className="text-sm font-black">{lesson.title}</div>{lesson.reviewLabel&&<div className="mt-1 text-[10px] font-black uppercase tracking-[.12em] text-[#F28C28]">{lesson.reviewLabel}</div>}<div className={`mt-1 text-xs font-bold ${dark?"text-white/45":"text-black/45"}`}>{done?"Completed":status==="locked"?"Locked":`+${lesson.xp} XP`}</div></div></motion.button></div>{encouragement?.character&&<motion.aside initial={reduceMotion?false:{opacity:0,y:12}} whileInView={reduceMotion?{}:{opacity:1,y:0}} viewport={{once:true}} className={`relative z-10 flex w-[calc(100%-2rem)] max-w-sm items-center gap-3 rounded-[28px] border p-3 shadow-lg ${dark?"border-white/10 bg-[#1A201E]":"border-black/5 bg-white"}`}><SidekickPortrait character={encouragement.character} className="size-[68px] shrink-0 rounded-[22px] bg-[#F6C445]/15"/><div><div className="text-[10px] font-black uppercase tracking-[.16em]" style={{color:encouragement.character.color}}>{encouragement.character.name} says</div><p className="mt-1 text-sm font-bold leading-relaxed">{encouragement.message}</p></div></motion.aside>}</div>;
}
