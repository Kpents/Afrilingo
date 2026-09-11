import { motion, useReducedMotion } from "framer-motion";
import { Check, Lock, Star } from "lucide-react";
import { isLessonUnlocked } from "../utils/courseProgress";
import { LeboTip } from "./ui/Lebo";

export default function LessonPath({ lessons, progress, dark, onStart, languageId }) {
  const reduceMotion = useReducedMotion();
  const offsets = [0, 70, 20, -55, 10];

  return (
    <div className="relative flex min-h-[720px] flex-col items-center gap-14 overflow-hidden py-6">
      <div className={`absolute left-1/2 top-10 h-[650px] w-2 -translate-x-1/2 rounded-full ${dark ? "bg-[#232B28]" : "bg-[#E9E0D4]"}`} />
      {lessons.map((lesson, index) => {
        const done = progress.completedLessonIds.includes(lesson.id);
        const unlocked = isLessonUnlocked(lessons, index, progress.completedLessonIds);
        const status = done ? "done" : unlocked ? "current" : "locked";

        return (
          <div key={lesson.id} className="contents">
          <motion.button
            disabled={status === "locked"}
            onClick={() => onStart(lesson)}
            whileHover={status !== "locked" ? { scale: 1.05 } : {}}
            whileTap={status !== "locked" ? { scale: 0.96 } : {}}
            style={{ transform: `translateX(${offsets[index] || 0}px)` }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className={`relative grid h-24 w-24 place-items-center rounded-full border-[7px] shadow-xl transition ${
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
            <div className="mt-3 text-center">
              <div className="text-sm font-black">{lesson.title}</div>
              <div className={`mt-1 text-xs font-bold ${dark ? "text-white/45" : "text-black/45"}`}>
                {done ? "Completed" : status === "locked" ? "Locked" : `+${lesson.xp} XP`}
              </div>
            </div>
          </motion.button>
          {index === 1 && (
            <LeboTip dark={dark} pose="learn" reaction="learn" languageId={languageId} className="relative z-10 w-full max-w-sm px-3">
              {progress.completedLessonIds.includes(lesson.id)
                ? "Great rhythm! Keep climbing—your next lesson is waiting."
                : "I’m Lebo! Take the path one lesson at a time. I’ll be cheering you on."}
            </LeboTip>
          )}
          </div>
        );
      })}
    </div>
  );
}
