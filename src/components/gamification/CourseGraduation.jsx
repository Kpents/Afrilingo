import { useState } from "react";
import { Award, Printer, RotateCcw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Lebo from "../ui/Lebo";
import { hapticPress } from "../../utils/hapticFeedback";

export default function CourseGraduation({ dark, language, learnerName, units, onReview }) {
  const [certificateOpen, setCertificateOpen] = useState(false);
  const reviewLessons = units.map(unit => unit.lessons.at(-1)).filter(Boolean);
  const expressionCount = new Set(units.flatMap(unit => unit.lessons).flatMap(lesson => lesson.vocabulary || []).map(word => word.native)).size;
  const review = reviewLessons[new Date().getDate() % reviewLessons.length];
  const card = dark ? "border-[#F6C445]/25 bg-[#1A201E]" : "border-[#F6C445]/45 bg-white";

  return <section className={`relative mt-7 overflow-hidden rounded-[2rem] border p-6 sm:p-8 ${card}`} aria-labelledby="graduation-title">
    <div className="absolute -right-16 -top-16 size-56 rounded-full bg-[#F6C445]/15"/>
    <div className="relative grid items-center gap-5 sm:grid-cols-[1fr_190px]"><div><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.22em] text-[#F28C28]"><Award size={18}/>Course complete</div><h2 id="graduation-title" className="mt-3 text-3xl font-black sm:text-4xl">Woayɛ ade! You finished the {language.language} path.</h2><p className="mt-3 max-w-2xl font-semibold leading-7 opacity-60">You worked through {units.length} units and encountered {expressionCount} key expressions. Graduation opens a maintenance path—keep the language active through review, stories, and real conversations.</p><div className="mt-5 flex flex-wrap gap-3"><button onClick={()=>setCertificateOpen(value=>!value)} onPointerDown={hapticPress} className="afri-press min-h-12 rounded-xl bg-[#F28C28] px-5 font-black text-white"><Sparkles size={18} className="mr-2 inline"/>{certificateOpen?"Hide certificate":"View certificate"}</button><button onClick={()=>onReview(review)} onPointerDown={hapticPress} data-tone="green" className="afri-press min-h-12 rounded-xl bg-[#24745B] px-5 font-black text-white"><RotateCcw size={18} className="mr-2 inline"/>Maintenance review</button></div></div><Lebo pose="celebrate" reaction="celebrate" languageId={language.id} className="mx-auto size-44" decorative/></div>
    {certificateOpen && <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="afri-certificate mt-7 rounded-[1.6rem] border-4 border-double border-[#F6C445] bg-[#FFF8EE] p-7 text-center text-[#252525]"><div className="text-xs font-black uppercase tracking-[.35em] text-[#C95D3A]">AfriLingo Certificate</div><div className="mt-4 text-3xl font-black">Certificate of Completion</div><p className="mt-3 font-semibold">Presented to</p><div className="mt-1 text-3xl font-black text-[#24745B]">{learnerName?.trim() || "AfriLingo Learner"}</div><p className="mx-auto mt-3 max-w-lg leading-7">for completing the full {language.language} learning path and building a foundation for continued practice.</p><div className="mt-5 text-4xl">🦁 🇬🇭 🎓</div><button onClick={()=>window.print()} className="afri-certificate-print mt-5 min-h-11 rounded-xl bg-[#4338CA] px-4 font-black text-white"><Printer size={17} className="mr-2 inline"/>Print certificate</button></motion.div>}
  </section>;
}
