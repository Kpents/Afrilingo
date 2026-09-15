import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Eye, Heart, Sparkles, XCircle } from "lucide-react";
import SidekickPortrait from "../ui/SidekickPortrait";
import ConfettiBurst from "../ui/ConfettiBurst";
import { hapticPress } from "../../utils/hapticFeedback";
import { playUiSound } from "../../services/uiSound";

export default function StoryQuest({ dark, quest, companion, hearts, completed, soundEnabled, onLoseHeart, onReward, onExit }) {
  const wasCompleted = useRef(completed);
  const [nodeId,setNodeId]=useState(quest.start);
  const [choice,setChoice]=useState(null);
  const [translation,setTranslation]=useState(false);
  const [word,setWord]=useState(null);
  const [finished,setFinished]=useState(false);
  const node=quest.nodes[nodeId];
  const selected=node.choices?.find(item=>item.text===choice);
  const correct=selected?.correct;
  const choose=item=>{if(choice&&correct)return;setChoice(item.text);playUiSound(item.correct?"correct":"incorrect",soundEnabled);if(!item.correct)onLoseHeart?.();};
  const next=()=>{if(!selected?.correct)return;if(selected.next==="complete"){if(!completed)onReward({field:"completedWorldStories",id:quest.id,xp:quest.xp});if(quest.cultureCardId)onReward({field:"unlockedWorldCultureCards",id:quest.cultureCardId,xp:0});playUiSound("complete",soundEnabled);setFinished(true);return;}setNodeId(selected.next);setChoice(null);setTranslation(false);setWord(null);};

  if(finished)return <div className="relative mx-auto max-w-xl overflow-hidden py-8 text-center"><ConfettiBurst count={40}/><SidekickPortrait character={companion} className="mx-auto size-44 rounded-[2rem] bg-[#F6C445]/20" eager/><h1 className="mt-4 text-4xl font-black">Story complete!</h1><p className="mt-2 font-semibold opacity-55">You completed “{quest.title}” through meaningful choices.</p>{quest.cultureCardId&&!wasCompleted.current&&<div className="mx-auto mt-4 max-w-sm rounded-2xl bg-[#F6C445]/20 p-4 font-black text-[#C95D3A]">🕷️ New Culture Card unlocked</div>}<div className="mt-3 text-2xl font-black text-[#F28C28]">{wasCompleted.current?"Replay complete":`+${quest.xp} XP`}</div><button onClick={onExit} onPointerDown={hapticPress} className="afri-press mt-6 min-h-14 w-full rounded-2xl bg-[#F28C28] font-black text-white">Return to Twi world</button></div>;

  const surface=dark?"border-white/10 bg-[#1A201E]":"border-black/8 bg-white";
  return <div className="mx-auto max-w-2xl"><header className="flex items-center gap-3"><button onClick={onExit} className={`grid size-11 place-items-center rounded-xl ${dark?"bg-white/6":"bg-black/5"}`} aria-label="Exit story"><ArrowLeft/></button><div className="min-w-0 flex-1"><div className="text-xs font-black uppercase tracking-[.18em] text-[#F28C28]">{quest.provenance}</div><h1 className="truncate text-xl font-black">{quest.title}</h1></div><span className="flex items-center gap-1 font-black text-[#EF5B5B]"><Heart size={19} fill="currentColor"/> {hearts}</span></header>
    <div className={`mt-5 overflow-hidden rounded-[2rem] border ${surface}`}><div className="relative h-64 overflow-hidden"><img src={`${import.meta.env.BASE_URL}${node.image}`} alt="" className="h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"/><div className="absolute bottom-4 left-4 right-4 text-white"><div className="text-xs font-black uppercase tracking-wider text-[#F6C445]">{node.location}</div><div className="mt-1 text-lg font-bold">{node.narration}</div></div></div>
      <div className="p-5 sm:p-6"><div className="flex items-start gap-3"><div className="min-w-0 flex-1"><div className="text-xs font-black uppercase tracking-wider text-[#4338CA]">{node.speaker}</div><div className="mt-2 text-2xl font-black">{node.native}</div>{translation&&<motion.div initial={{opacity:0,y:-5}} animate={{opacity:1,y:0}} className="mt-1 font-semibold opacity-55">{node.english}</motion.div>}</div><button onClick={()=>setTranslation(value=>!value)} aria-label="Reveal translation" className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#4338CA]/10 text-[#4338CA]"><Eye/></button></div>
        {!!node.vocabulary?.length&&<div className="mt-4 flex flex-wrap gap-2">{node.vocabulary.map(item=><button key={item.native} onClick={()=>setWord(word?.native===item.native?null:item)} className={`rounded-full px-3 py-2 text-sm font-black ${word?.native===item.native?"bg-[#F6C445] text-[#1A201E]":dark?"bg-white/7":"bg-black/5"}`}>{item.native}</button>)}</div>}
        <AnimatePresence>{word&&<motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} className="overflow-hidden"><div className="mt-3 rounded-xl bg-[#F6C445]/15 p-3 text-sm"><strong>{word.native}</strong> · {word.english}</div></motion.div>}</AnimatePresence>
        <div className="mt-5 text-sm font-black">{node.prompt}</div><div className="mt-3 space-y-3">{node.choices.map(item=><button key={item.text} disabled={(choice&&correct)||hearts<=0} onClick={()=>choose(item)} onPointerDown={hapticPress} className={`afri-press min-h-14 w-full rounded-2xl border p-4 text-left font-black ${choice===item.text?(item.correct?"border-[#24745B] bg-[#24745B]/15":"border-[#C95D3A] bg-[#C95D3A]/15"):dark?"border-white/10 bg-white/5":"border-black/8 bg-[#FFF8EE]"}`}>{item.text}</button>)}</div>
        {selected&&<div className={`mt-4 flex gap-3 rounded-2xl p-4 text-sm font-semibold ${correct?"bg-[#24745B]/15":"bg-[#C95D3A]/15"}`}>{correct?<CheckCircle2 className="shrink-0 text-[#24745B]"/>:<XCircle className="shrink-0 text-[#C95D3A]"/>}<span>{selected.feedback}</span></div>}
        {hearts<=0&&!correct&&<div className="mt-3 rounded-xl bg-[#C95D3A]/15 p-3 text-sm font-bold">Out of hearts. Return after recovering a heart.</div>}
        {correct&&<button onClick={next} onPointerDown={hapticPress} className="afri-press mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#F28C28] font-black text-white"><Sparkles size={18}/>{selected.next==="complete"?"Finish story":"Continue the story"}</button>}
      </div></div>
  </div>;
}
