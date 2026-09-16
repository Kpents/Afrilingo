import { motion, useReducedMotion } from "framer-motion";
import { Check, Lock, Star } from "lucide-react";
import { isLessonUnlocked } from "../utils/courseProgress";
import SidekickPortrait from "./ui/SidekickPortrait";
import { sidekicks } from "../data/sidekicks";
import { hapticPress } from "../utils/hapticFeedback";

const encouragements = [
  { id: "kobby", message: "Every new word is a win. Keep going—you’re building something brilliant!" },
  { id: "zuri", message: "Take your time and notice the patterns. You know more than you think." },
  { id: "nia", message: "Stay curious! Each lesson brings you closer to a real conversation." },
  { id: "taji", message: "Say it out loud and trust your voice. I’m cheering you on!" }
].map(item => ({ ...item, character: sidekicks.find(character => character.id === item.id) }));

export default function LessonPath({ lessons, progress, dark, onStart }) {
  const reduceMotion = useReducedMotion();
  const offsets = [0, 70, 20, -55, 10];
  const tilts = [-3, 2.5, -2, 3, -1.5];

  return (
    <div className="relative flex min-h-[720px] flex-col items-center gap-10 overflow-hidden py-6">
      <div className={`absolute bottom-10 left-1/2 top-10 w-2 -translate-x-1/2 rounded-full ${dark ? "bg-[#232B28]" : "bg-[#E9E0D4]"}`} />
      {lessons.map((lesson, index) => {
        const done = progress.completedLessonIds.includes(lesson.id);
        const unlocked = isLessonUnlocked(lessons, index, progress.completedLessonIds);
        const status = done ? "done" : unlocked ? "current" : "locked";
        const encouragement = index < lessons.length - 1 ? encouragements[index % encouragements.length] : null;

        return (
          <div key={lesson.id} className="contents">
          <div
            className="relative z-10 flex w-full max-w-sm justify-center"
            style={{ transform: `translateX(${offsets[index] || 0}px)` }}
          >
            <motion.button
              disabled={status === "locked"}
              onClick={() => onStart(lesson)}
              onPointerDown={hapticPress}
              whileHover={status !== "locked" ? { scale: 1.05 } : {}}
              className="afri-path-button relative flex flex-col items-center"
            >
              <motion.div
                style={{ rotate: `${tilts[index % tilts.length]}deg` }}
                whileHover={status !== "locked" && !reduceMotion ? { rotate: 0 } : {}}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
              >
                <div data-tone={status === "done" ? "green" : status === "current" ? "gold" : dark ? "locked-night" : "locked"} className={`afri-press relative grid h-24 w-24 place-items-center rounded-full border-[7px] ${
              status === "done"
                ? "border-[#F6C445] bg-[#24745B] text-white"
                : status === "current"
                ? "border-[#F6C445] bg-[#F28C28] text-white"
                : dark
                ? "border-[#303A35] bg-[#202724] text-white/25"
                : "border-stone-200 bg-stone-100 text-stone-300"
                }`}>
                  {status === "current" && !reduceMotion && <motion.span aria-hidden className="absolute -inset-3 -z-10 rounded-full border-4 border-[#F6C445]/45" animate={{scale:[.86,1.18],opacity:[.8,0]}} transition={{duration:1.6,repeat:Infinity,ease:"easeOut"}}/>}
                  {status === "done" ? <Check size={36} strokeWidth={4} /> : status === "locked" ? <Lock size={30} /> : <span className="text-4xl">{lesson.emoji}</span>}
                  {status !== "locked" && (
                    <motion.span animate={!reduceMotion&&status==="current"?{rotate:[0,-8,8,0],scale:[1,1.12,1]}:{}} transition={{duration:1.8,repeat:Infinity,repeatDelay:.5}} className="absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-[#F6C445] text-[#252525] shadow-md">
                      <Star size={18} fill="currentColor" />
                    </motion.span>
                  )}
                </div>
              </motion.div>
              <div className="mt-3 text-center">
                <div className="text-sm font-black">{lesson.title}</div>
                <div className={`mt-1 text-xs font-bold ${dark ? "text-white/45" : "text-black/45"}`}>
                  {done ? "Completed" : status === "locked" ? "Locked" : `+${lesson.xp} XP`}
                </div>
              </div>
            </motion.button>
          </div>
          {encouragement?.character && (
              <motion.aside
                aria-label={`Encouragement from ${encouragement.character.name}`}
                initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.55 }}
                className={`relative z-10 flex w-[calc(100%-2rem)] max-w-sm items-center gap-3 rounded-[28px] border p-3 shadow-lg ${index % 2 === 0 ? "flex-row" : "flex-row-reverse text-right"} ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/5 bg-white"}`}
              >
                <div className="relative shrink-0">
                  <div className={`grid h-[74px] w-[74px] place-items-end overflow-hidden rounded-[24px] border-4 ${dark ? "border-[#303A35] bg-[#232B28]" : "border-[#FFF1D9] bg-[#FFF8EE]"}`}>
                    <SidekickPortrait character={encouragement.character} className="h-[68px] w-[68px]" />
                  </div>
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-black shadow-sm ${encouragement.character.id === "zuri" ? "text-[#252525]" : "text-white"}`} style={{ backgroundColor: encouragement.character.color }}>
                    {encouragement.character.name}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: encouragement.character.color }}>
                    {encouragement.character.name} says
                  </div>
                  <p className={`text-sm font-bold leading-relaxed ${dark ? "text-white/85" : "text-[#252525]"}`}>
                    {encouragement.message}
                  </p>
                </div>
              </motion.aside>
          )}
          </div>
        );
      })}
    </div>
  );
}
