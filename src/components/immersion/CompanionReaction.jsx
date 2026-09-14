import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import SidekickPortrait from "../ui/SidekickPortrait";

export default function CompanionReaction({ character, correct, question, hearts, choice }) {
  const reduceMotion = useReducedMotion();
  const message = correct
    ? "That reply fits the conversation. Nicely done!"
    : hearts > 0
      ? `The speaker asked, “${question}” Read the choices and try another reply.`
      : "Let's pause here. You can try again after a heart recovers.";

  return <motion.div
    key={choice}
    role="status"
    aria-live="polite"
    initial={reduceMotion ? false : { opacity: 0, y: 12, scale: .96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className={`mt-3 flex items-center gap-3 rounded-2xl border p-3 ${correct ? "border-[#24745B]/35 bg-[#24745B]/15" : "border-[#C95D3A]/35 bg-[#C95D3A]/12"}`}
  >
    <motion.div
      animate={reduceMotion ? undefined : correct ? { rotate: [0, -8, 8, 0], y: [0, -5, 0] } : { rotate: [0, -4, 3, 0] }}
      transition={{ duration: .65 }}
      className="size-14 shrink-0 overflow-hidden rounded-xl bg-white"
    ><SidekickPortrait character={character} className="h-full w-full" eager /></motion.div>
    <div className="min-w-0 text-sm"><div className="flex items-center gap-1.5 font-black">{correct ? <CheckCircle2 size={16} className="text-[#53B98A]"/> : <HeartHandshake size={16} className="text-[#C95D3A]"/>}{character.name} {correct ? "cheers" : "encourages you"}</div><p className="mt-1 font-semibold leading-5 opacity-75">{message}</p></div>
  </motion.div>;
}
