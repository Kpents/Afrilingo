import { motion, useReducedMotion } from "framer-motion";
import Lebo from "../ui/Lebo";
import SidekickPortrait from "../ui/SidekickPortrait";
import { sidekicks } from "../../data/sidekicks";

const crew = [{ id: "lebo", name: "Lebo", species: "Lion" }, ...sidekicks];

const reactions = {
  correct: [
    "Beautiful work. Keep that rhythm going.",
    "Nice one! You made that look easy.",
    "You connected the meaning and the context.",
    "Sharp observation. You caught the clue.",
    "That sounded right. Keep listening for the pattern."
  ],
  incorrect: [
    "Good try. Use the explanation, then meet it again in review.",
    "That one was tricky. You’ll get another shot before the lesson ends.",
    "Study the correction now—the idea will return after a short gap.",
    "Notice the setting and who is speaking. Context can unlock the answer.",
    "Listen for the shape of the phrase, not only the individual words."
  ]
};

export default function LessonReaction({ correct, questionIndex, languageId, dark, compact = false }) {
  const reduceMotion = useReducedMotion();
  const character = crew[questionIndex % crew.length];
  const message = reactions[correct ? "correct" : "incorrect"][questionIndex % crew.length];

  return (
    <motion.aside
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -10, scale: .97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`${compact ? "mt-2 gap-2 rounded-xl border-0 bg-transparent p-0" : "mt-3 gap-3 rounded-2xl border p-3"} flex items-center ${dark ? compact ? "" : "border-white/10 bg-white/[.045]" : compact ? "" : "border-black/7 bg-white/65"}`}
      aria-label={`${character.name} reacts to your answer`}
    >
      {character.id === "lebo" ? (
        <Lebo pose={correct ? "encourage" : "learn"} languageId={languageId} animate={false} className={compact ? "size-10 shrink-0" : "size-16 shrink-0 sm:size-20"} decorative />
      ) : (
        <SidekickPortrait character={character} eager className={compact ? "size-10 shrink-0 rounded-xl bg-[#F6C445]/15" : "size-16 shrink-0 rounded-2xl bg-[#F6C445]/15 sm:size-20"} />
      )}
      <div className="min-w-0">
        <div className={`${compact ? "text-[9px]" : "text-xs"} font-black uppercase tracking-[.18em] text-[#F28C28]`}>{character.name} says</div>
        <p className={`${compact ? "line-clamp-1 text-xs leading-4" : "mt-1 text-sm leading-5 sm:text-base sm:leading-6"} font-bold ${dark ? "text-white/68" : "text-black/65"}`}>{message}</p>
      </div>
    </motion.aside>
  );
}
