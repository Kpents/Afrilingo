import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, HeartHandshake, Landmark, Plane, Sparkles, Target, Users, X } from "lucide-react";
import Lebo from "../components/ui/Lebo";
import { buildPlacementQuestions, placementUnitIndex } from "../utils/placementTest";
import { hapticPress } from "../utils/hapticFeedback";

const motivations = [
  ["travel", "Travel", "Prioritize transport, directions, food, and practical exchanges.", Plane],
  ["family", "Family", "Highlight home, introductions, family, and everyday connection.", Users],
  ["culture", "Culture", "Surface stories, customs, food, names, and cultural context.", Landmark],
  ["relationships", "Relationships", "Emphasize natural conversation and social confidence.", HeartHandshake],
  ["general", "Personal growth", "Keep a balanced path across every core skill.", Sparkles]
];

export default function CourseOnboardingPage({ dark, course, onCancel, onComplete }) {
  const [step, setStep] = useState(0);
  const [selectedMotivations, setSelectedMotivations] = useState([]);
  const [familiarity, setFamiliarity] = useState("new");
  const [placementIndex, setPlacementIndex] = useState(0);
  const [placementSelection, setPlacementSelection] = useState(null);
  const [placementScore, setPlacementScore] = useState(0);
  const questions = useMemo(() => buildPlacementQuestions(course), [course]);
  const question = questions[placementIndex];
  const options = useMemo(() => {
    if (!question) return [];
    const values = [...question.options].sort(() => Math.random() - .5);
    if (values.length > 1 && values[0] === question.answer) values.push(values.shift());
    return values;
  }, [question]);
  const needsPlacement = familiarity !== "new" && questions.length > 0;
  const totalSteps = needsPlacement ? 3 : 2;
  const card = dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";
  const toggle = id => setSelectedMotivations(values => values.includes(id) ? values.filter(value => value !== id) : [...values, id]);
  const finish = placement => onComplete({ motivations:selectedMotivations, familiarity, placement:placement || null, completedAt:new Date().toISOString() });
  const advance = () => {
    if (step === 0) return setStep(1);
    if (step === 1) return needsPlacement ? setStep(2) : finish();
    const score = placementScore + (placementSelection === question.answer ? 1 : 0);
    if (placementIndex + 1 < questions.length) {
      setPlacementScore(score);
      setPlacementIndex(index => index + 1);
      setPlacementSelection(null);
      return;
    }
    finish({ score, total:questions.length, unitIndex:placementUnitIndex(score, questions.length, course.units.length), completedAt:new Date().toISOString() });
  };
  const canContinue = step === 0 ? selectedMotivations.length > 0 : step === 2 ? placementSelection != null : true;

  return <div className={`min-h-screen overflow-x-hidden px-4 py-6 ${dark ? "bg-[#101312] text-[#F8F4EA]" : "bg-[#FFF8EE] text-[#252525]"}`}>
    <div className="mx-auto max-w-3xl"><header className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><button onClick={onCancel} aria-label="Cancel adding course" className={`grid size-11 place-items-center rounded-xl ${dark ? "bg-white/7" : "bg-black/5"}`}><X/></button><span className="text-3xl">{course.flag}</span><div><div className="font-black">Start {course.language}</div><div className="text-xs font-bold opacity-45">A separate learning plan for this course</div></div></div><div className="text-xs font-black uppercase tracking-[.2em] opacity-40">{step + 1} / {totalSteps}</div></header>
      <div className={`mt-5 h-2 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/10"}`}><motion.div className="h-full rounded-full bg-[#F28C28]" animate={{width:`${(step + 1) / totalSteps * 100}%`}}/></div>
      <AnimatePresence mode="wait"><motion.main key={step} initial={{opacity:0,x:18}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-18}} className="py-8">
        {step === 0 && <div><div className="grid items-center gap-5 sm:grid-cols-[1fr_13rem]"><div><div className="text-xs font-black uppercase tracking-[.22em] text-[#F28C28]">Personalize this course</div><h1 className="mt-2 text-4xl font-black sm:text-5xl">Why are you learning {course.language}?</h1><p className="mt-3 text-lg font-semibold leading-8 opacity-50">Choose every reason that fits. We’ll use them to highlight relevant lessons and practice themes.</p></div><Lebo languageId={course.id} pose="explore" reaction="idle" className="mx-auto size-48"/></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{motivations.map(([id,title,text,Icon]) => { const selected=selectedMotivations.includes(id); return <button key={id} aria-pressed={selected} onClick={() => toggle(id)} className={`flex min-h-24 items-center gap-4 rounded-2xl border p-4 text-left ${selected ? "border-[#24745B] bg-[#24745B]/12" : card}`}><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#24745B]/15 text-[#53B98A]"><Icon/></span><span className="flex-1"><span className="block font-black">{title}</span><span className="mt-1 block text-sm font-semibold opacity-45">{text}</span></span>{selected && <Check className="text-[#53B98A]"/>}</button>; })}</div></div>}
        {step === 1 && <div><div className="text-xs font-black uppercase tracking-[.22em] text-[#4338CA]">Choose your starting point</div><h1 className="mt-2 text-4xl font-black sm:text-5xl">How much {course.language} do you know?</h1><p className="mt-3 text-lg font-semibold leading-8 opacity-50">Learners with experience take a short placement check. It affects no hearts or XP.</p><div className="mt-7 grid gap-3">{[["new","I’m brand new","Begin with Unit 1 foundations."],["some","I know a few words","Take a five-question placement check."],["returning","I’ve studied before","Take a five-question placement check."]].map(([id,title,text]) => <button key={id} onClick={() => { setFamiliarity(id); setPlacementIndex(0); setPlacementScore(0); setPlacementSelection(null); }} className={`flex min-h-20 items-center justify-between rounded-2xl border p-4 text-left ${familiarity === id ? "border-[#4338CA] bg-[#4338CA]/10" : card}`}><span><span className="block font-black">{title}</span><span className="text-sm font-semibold opacity-45">{text}</span></span>{familiarity === id && <Check className="text-[#7067FF]"/>}</button>)}</div></div>}
        {step === 2 && question && <div><div className="text-xs font-black uppercase tracking-[.22em] text-[#4338CA]">Placement · {placementIndex + 1}/{questions.length}</div><h1 className="mt-3 text-3xl font-black">{question.prompt}</h1><div className="mt-6 grid gap-3 sm:grid-cols-2">{options.map(option => <button key={option} aria-pressed={placementSelection === option} onClick={() => setPlacementSelection(option)} className={`min-h-16 rounded-2xl border-2 p-4 text-left font-black ${placementSelection === option ? "border-[#F28C28] bg-[#F28C28]/12" : card}`}>{option}</button>)}</div><p className="mt-4 text-sm font-semibold opacity-50">Your result suggests a starting unit. Earlier units remain available and skipped content awards no XP.</p></div>}
      </motion.main></AnimatePresence>
      <footer className="flex gap-3 border-t border-current/10 pt-5">{step > 0 && <button onClick={() => { if (step === 2) { setStep(1); setPlacementIndex(0); setPlacementScore(0); setPlacementSelection(null); } else setStep(0); }} className={`grid size-14 place-items-center rounded-2xl ${dark ? "bg-white/6" : "bg-black/5"}`} aria-label="Previous step"><ArrowLeft/></button>}<button disabled={!canContinue} onClick={advance} onPointerDown={hapticPress} className="afri-press flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F28C28] text-lg font-black text-white disabled:opacity-35">{step === 1 && needsPlacement ? <>Begin placement <Target size={20}/></> : step === 1 ? <>Start course <Sparkles size={20}/></> : step === 2 && placementIndex + 1 === questions.length ? <>Start at my level <Sparkles size={20}/></> : <>Continue <ArrowRight size={20}/></>}</button></footer>
    </div>
  </div>;
}
