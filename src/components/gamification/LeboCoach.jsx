import { AnimatePresence, motion } from "framer-motion";
import Lebo from "../ui/Lebo";
import { getLeboMoment } from "../../utils/leboGuide";

const labels = {
  beginner: "Your learning guide",
  welcome: "Today with Lebo",
  returning: "Welcome back",
  streak: "Protect your streak",
  quest: "Daily challenge",
  questDone: "Goal complete",
  lowHearts: "Lebo’s tip",
  noHearts: "Recovery time",
  unitAlmostDone: "Nearly there",
  unitDone: "Unit champion"
};

export default function LeboCoach({ dark, progress, completedInUnit, totalInUnit, languageId }) {
  const moment = getLeboMoment({ progress, completedInUnit, totalInUnit });
  return (
    <motion.aside layout className={`relative overflow-hidden rounded-[1.75rem] border p-4 ${dark ? "border-[#F6C445]/20 bg-[#1A201E]" : "border-[#F28C28]/20 bg-white"}`} aria-label="Message from Lebo">
      <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#F6C445]/15 blur-2xl" />
      <div className="relative flex items-center gap-3">
        <Lebo key={moment.kind} pose={moment.pose} reaction={moment.reaction} languageId={languageId} className="h-24 w-24 shrink-0" decorative />
        <AnimatePresence mode="wait"><motion.div key={moment.kind} initial={{opacity:0,x:8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-8}} transition={{duration:.25}}>
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#F28C28]">{labels[moment.kind]}</div>
          <p className={`mt-1 text-sm font-bold leading-5 ${dark ? "text-white/70" : "text-black/65"}`}>{moment.message}</p>
        </motion.div></AnimatePresence>
      </div>
    </motion.aside>
  );
}
