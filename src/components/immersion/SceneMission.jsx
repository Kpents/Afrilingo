import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Heart, Search, Sparkles, XCircle } from "lucide-react";
import Lebo from "../ui/Lebo";
import ConfettiBurst from "../ui/ConfettiBurst";
import { playUiSound } from "../../services/uiSound";
import SidekickPortrait from "../ui/SidekickPortrait";
import CompanionReaction from "./CompanionReaction";
import { hapticPress } from "../../utils/hapticFeedback";

const crewCast = {
  ama: { id:"kobby", name:"Kobby", species:"Monkey", image:"images/sidekicks/kobby.png", color:"#24745B", framed:true },
  "gogo-nandi": { id:"zuri", name:"Zuri", species:"Elephant", image:"images/sidekicks/zuri.png", color:"#F6C445" },
  kofi: { id:"nia", name:"Taffy", species:"Giraffe", image:"images/sidekicks/nia.png", color:"#4338CA" }
};

export default function SceneMission({ mission, companion, languageId, dark, hearts, completed, soundEnabled, onLoseHeart, onReward, onExit }) {
  const [stage, setStage] = useState("arrival");
  const [stepIndex, setStepIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [route, setRoute] = useState(null);
  const [claimed, setClaimed] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [wasCompleted] = useState(completed);
  const chosenRoute = mission.routes.find(option => option.id === route);
  const steps = chosenRoute?.detour ? [chosenRoute.detour, ...mission.steps] : mission.steps;
  const step = steps[stepIndex];
  const correct = choice === step.answer;
  const image = path => `${import.meta.env.BASE_URL}${path}`;
  const surface = dark ? "border-white/10 bg-[#1A201E]/95" : "border-black/10 bg-white/95";
  const total = steps.length + 1;
  const progress = stage === "arrival" ? 0 : stage === "inspect" ? 1 : stepIndex + 2;

  const answer = value => {
    if (hearts <= 0 || correct || claimed) return;
    setChoice(value);
    const matched = value === step.answer;
    playUiSound(matched ? "correct" : "incorrect", soundEnabled);
    if (!matched) onLoseHeart();
  };
  const next = () => {
    if (!correct || claimed) return;
    setChoice(null);
    setShowTip(false);
    if (stepIndex + 1 < steps.length) {
      setStepIndex(index => index + 1);
      return;
    }
    setClaimed(true);
    onReward({ field: "completedAdventures", id: mission.id, xp: mission.xp });
    playUiSound("complete", soundEnabled);
    setStage("complete");
  };

  if (stage === "complete") return <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] p-5 text-center">
    <ConfettiBurst count={36}/>
    <Lebo pose="celebrate" reaction="celebrate" languageId={languageId} className="mx-auto size-48" decorative/>
    <h1 className="mt-3 text-4xl font-black">{mission.completionTitle}</h1>
    <p className="mt-3 font-semibold opacity-60">{chosenRoute?.ending || mission.completionText}</p>
    <div className={`mt-5 rounded-2xl border p-4 text-left text-sm leading-6 ${dark ? "border-[#F6C445]/25 bg-[#F6C445]/10" : "border-[#F6C445]/35 bg-[#F6C445]/15"}`}><strong>Culture note:</strong> {mission.culture}</div>
    <div className="mt-5 text-2xl font-black text-[#F28C28]">{wasCompleted ? "Practice complete" : `+${mission.xp} XP`}</div>
    <button onClick={onExit} onPointerDown={hapticPress} className="afri-press mt-6 min-h-14 w-full rounded-2xl bg-[#F28C28] font-black text-white">Back to adventures</button>
  </div>;

  return <div className="mx-auto max-w-2xl">
    <header className="mb-4 flex items-center gap-3">
      <button onClick={onExit} aria-label={`Exit ${mission.title}`} className={`grid size-11 place-items-center rounded-xl ${dark ? "bg-white/6" : "bg-black/5"}`}><ArrowLeft size={19}/></button>
      <div className="min-w-0 flex-1"><div className="text-xs font-black uppercase tracking-wider text-[#F28C28]">{mission.languageName} adventure · {mission.setting}</div><h1 className="truncate text-lg font-black">{mission.title}</h1></div>
      <span className="flex items-center gap-1 font-black text-[#EF5B5B]"><Heart size={19} fill="currentColor"/> {hearts}</span>
    </header>
    <div className="mb-4 flex gap-1.5" role="progressbar" aria-label={`${mission.title} progress`} aria-valuemin="0" aria-valuemax={total} aria-valuenow={progress}>
      {Array.from({length:total},(_,index)=><div key={index} className={`h-2 flex-1 rounded-full ${index < progress ? "bg-[#F28C28]" : dark ? "bg-white/10" : "bg-black/10"}`}/>)}
    </div>
    <div className="relative mx-auto aspect-[3/5] w-full max-w-[28rem] overflow-hidden rounded-[2rem] border border-black/10 shadow-2xl">
      <img src={image(mission.image)} alt={mission.imageAlt} className="absolute inset-0 h-full w-full object-cover object-center"/>
      <div className="absolute inset-x-3 top-3 z-10 rounded-2xl bg-black/70 p-3 text-white backdrop-blur"><div className="text-[10px] font-black uppercase tracking-wider text-[#F6C445]">Mission</div><p className="mt-1 text-sm font-bold">{stage === "arrival" ? mission.goal : stage === "inspect" ? mission.item.hint : step.prompt}</p></div>
      {companion && <><button onClick={()=>setShowTip(value=>!value)} aria-label={`Ask ${companion.name} for a tip`} aria-expanded={showTip} className={`absolute right-3 z-30 grid size-14 place-items-center overflow-hidden rounded-full border-4 border-[#F6C445] bg-white shadow-xl ${stage === "dialogue" ? "top-40" : "bottom-3"}`}><SidekickPortrait character={companion} className="h-full w-full" eager/></button>{showTip && <div role="status" className={`absolute right-3 z-30 max-w-[min(15rem,75%)] rounded-2xl bg-white p-3 text-sm font-bold text-[#252525] shadow-xl ${stage === "dialogue" ? "top-56" : "bottom-20"}`}><span className="text-[#C95D3A]">{companion.name} says:</span> {companion.tip}</div>}</>}
      {stage === "arrival" && <>
        <motion.button whileTap={{scale:.95}} onClick={()=>{setShowTip(false);setStage("inspect")}} className={`absolute z-10 flex min-h-12 items-center gap-2 rounded-2xl border-2 border-[#F6C445] bg-white px-3 py-2 text-sm font-black text-[#1A201E] shadow-xl ${mission.hotspotClass || "left-[9%] top-[38%]"}`}><Search size={19}/> {mission.inspectAction}</motion.button>
        <Lebo pose="explore" reaction="idle" languageId={languageId} className="absolute bottom-3 left-3 size-24" decorative/>
      </>}
      {stage === "inspect" && <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className={`absolute inset-x-3 bottom-3 z-20 rounded-[1.5rem] border p-4 shadow-2xl ${surface}`}>
        <div className="text-xs font-black uppercase tracking-wider text-[#24745B]">Look closely</div>
        <h2 className="mt-1 text-xl font-black">{mission.item.label}</h2>
        <div className="mt-3 flex gap-3 rounded-xl bg-[#F6C445]/15 p-3"><span className="text-3xl">{mission.item.emoji}</span><div><div className="font-black">{mission.item.vocabulary[0].native}</div><div className="text-sm font-semibold opacity-55">{mission.item.vocabulary[0].english}</div></div></div>
        {mission.routes.map((option,index)=><button key={option.id} onPointerDown={hapticPress} onClick={()=>{setShowTip(false);setStage("dialogue");setRoute(option.id)}} data-tone={index === 0 ? "orange" : dark ? "night" : "surface"} className={`afri-press mt-3 min-h-12 w-full rounded-xl px-3 text-sm font-black ${index === 0 ? "bg-[#F28C28] text-white" : dark ? "bg-white/8" : "bg-black/5"}`}>{option.label}</button>)}
      </motion.div>}
      {stage === "dialogue" && <>
        {mission.characters.map((person,index)=>{const character=crewCast[person];return <div key={`${person}-${index}`} className={`absolute size-20 rounded-full border-4 shadow-xl ${index===1 ? "right-[9%] top-[42%] border-[#F28C28] bg-white" : "left-[8%] top-[32%] border-white bg-[#F6C445]"}`}><SidekickPortrait character={character} className="h-full w-full" eager/></div>})}
        <AnimatePresence mode="wait"><motion.div key={step.id} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} exit={{opacity:0,y:15}} className={`absolute inset-x-3 bottom-3 z-20 max-h-[59%] overflow-y-auto rounded-[1.5rem] border p-4 shadow-2xl ${surface}`}>
          <div className="flex items-center justify-between gap-3 text-xs font-black uppercase tracking-wider text-[#4338CA]"><span className="flex items-center gap-2"><SidekickPortrait character={crewCast[step.character]} className="size-9 rounded-full bg-[#F6C445]/20" eager/>{crewCast[step.character].name} · {step.speaker}</span><span>{stepIndex+1}/{steps.length}</span></div>
          {chosenRoute?.detour && stepIndex === 0 && <p className="mt-2 rounded-lg bg-[#F6C445]/15 p-2 text-xs font-semibold">{chosenRoute.note}</p>}
          <div className="mt-3 text-xl font-black">{step.native}</div><div className="mt-1 text-sm font-semibold opacity-55">{step.english}</div><div className="mt-3 text-sm font-black">{step.prompt}</div>
          <div className="mt-3 grid gap-3">{step.choices.map(value=><button key={value} disabled={correct || hearts <= 0 || choice === value} onPointerDown={hapticPress} onClick={()=>answer(value)} data-tone={choice===value ? correct ? "green" : "clay" : dark ? "night" : "surface"} className={`afri-press min-h-12 rounded-xl border p-3 text-left text-sm font-black disabled:cursor-not-allowed ${choice===value ? correct ? "border-[#24745B] bg-[#24745B]/15" : "border-[#C95D3A] bg-[#C95D3A]/15" : "border-current/10"}`}>{value}</button>)}</div>
          {choice&&<div role="status" className={`mt-3 flex gap-2 rounded-xl p-3 text-sm font-semibold ${correct ? "bg-[#24745B]/15" : "bg-[#C95D3A]/15"}`}>{correct ? <CheckCircle2 className="shrink-0 text-[#53B98A]"/> : <XCircle className="shrink-0 text-[#C95D3A]"/>}<span>{correct ? step.feedback : `Try again. ${step.feedback}`}</span></div>}
          {choice && companion && <CompanionReaction key={`${step.id}:${choice}`} character={companion} correct={correct} question={step.english} hearts={hearts} choice={choice}/>}
          {hearts<=0&&!correct&&<div className="mt-3 rounded-xl bg-[#C95D3A]/15 p-3 text-sm font-bold">Out of hearts. Return after a heart recovers.</div>}
          {correct&&<button onClick={next} onPointerDown={hapticPress} className="afri-press mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F28C28] font-black text-white"><Sparkles size={17}/>{stepIndex+1===steps.length ? "Finish mission" : "Continue"}</button>}
        </motion.div></AnimatePresence>
      </>}
    </div>
  </div>;
}
