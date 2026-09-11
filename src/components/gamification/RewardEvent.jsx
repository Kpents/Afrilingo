import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, Zap } from "lucide-react";
import Lebo from "../ui/Lebo";

export default function RewardEvent({ event, dark, languageId, onDone }) {
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (!event) return undefined;
    const timer = window.setTimeout(onDone, event.kind === "milestone" ? 3200 : 1900);
    return () => window.clearTimeout(timer);
  }, [event, onDone]);

  return <AnimatePresence>{event && (
    <motion.div key={event.id} role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-[80] flex justify-center px-4" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24, scale: .92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -15, scale: .95 }}>
      {event.kind === "milestone" ? <div className={`pointer-events-auto relative flex w-full max-w-sm items-center gap-3 overflow-hidden rounded-[1.6rem] border p-3 pr-5 shadow-2xl ${dark ? "border-[#F6C445]/30 bg-[#1A201E]" : "border-[#F28C28]/25 bg-white"}`}>
        {!reduceMotion && <span aria-hidden className="absolute inset-0">{[8,22,40,62,79,92].map((left,index)=><motion.i key={left} className="absolute top-0 h-2 w-2 rounded-sm" style={{left:`${left}%`,backgroundColor:["#F6C445","#F28C28","#24745B","#C95D3A","#4338CA"][index%5]}} initial={{y:-12,rotate:0,opacity:0}} animate={{y:[-12,88,130],rotate:[0,120,260],opacity:[0,1,0]}} transition={{duration:1.6,delay:index*.12,repeat:1}}/>)}</span>}
        <Lebo pose="celebrate" reaction="celebrate" languageId={languageId} className="h-24 w-24 shrink-0" decorative />
        <div><div className="text-[10px] font-black uppercase tracking-[.18em] text-[#F28C28]">{event.eyebrow || "Milestone"}</div><div className="mt-1 text-lg font-black">{event.title}</div>{event.message && <div className="mt-1 text-xs font-semibold opacity-55">{event.message}</div>}</div>
      </div> : <motion.div animate={reduceMotion ? {} : event.kind === "heart-loss" ? {x:[0,-5,5,-3,3,0],scale:[1,.96,1]} : { y: [0, -8, 0], scale:[1,1.04,1] }} transition={{duration:.65}} className={`flex items-center gap-2 rounded-full border px-5 py-3 text-lg font-black shadow-2xl ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/10 bg-white"}`}>
        {event.kind === "heart-loss" ? <motion.span animate={reduceMotion?{}:{scale:[1,1.28,.9,1]}}><Heart className="text-[#EF5B5B]" fill="currentColor" /></motion.span> : event.kind === "heart-gain" ? <motion.span animate={reduceMotion?{}:{scale:[.6,1.3,1]}}><Heart className="text-[#53B98A]" fill="currentColor" /></motion.span> : <motion.span animate={reduceMotion?{}:{rotate:[0,-12,12,0]}}><Zap className="text-[#F6C445]" fill="currentColor" /></motion.span>}
        <span>{event.label}</span>{event.kind === "xp" && <Sparkles size={17} className="text-[#F6C445]" />}
      </motion.div>}
    </motion.div>
  )}</AnimatePresence>;
}
