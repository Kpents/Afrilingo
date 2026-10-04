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
  const stepNames = ["Your goals", "Starting level", "Placement check"];
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
    <div className="mx-auto max-w-3xl pb-24 sm:pb-0"><header className="flex items-center justify-between gap-4"><div className="flex min-w-0 items-center gap-3"><button onClick={onCancel} aria-label="Cancel adding course" className={`grid size-11 shrink-0 place-items-center rounded-xl ${dark ? "bg-white/7" : "bg-black/5"}`}><X/></button><span className="text-3xl">{course.flag}</span><div className="min-w-0"><div className="truncate font-black">Start {course.language}</div><div className="truncate text-[10px] font-black uppercase tracking-[.16em] text-[#F28C28]">{stepNames[step]}</div></div></div><div className="shrink-0 rounded-full bg-[#4338CA]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[.16em] text-[#7067FF]">{step + 1} / {totalSteps}</div></header>
      <div className={`mt-5 h-2.5 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/10"}`}><motion.div className="h-full rounded-full bg-gradient-to-r from-[#F28C28] to-[#F6C445]" animate={{width:`${(step + 1) / totalSteps * 100}%`}}/></div>
      <AnimatePresence mode="wait"><motion.main key={step} initial={{opacity:0,x:18}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-18}} className="py-8">
        {step === 0 && <div><div className="afri-pattern relative grid items-center gap-5 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#4338CA] to-[#24745B] p-6 text-white sm:grid-cols-[1fr_13rem] sm:p-8"><div className="relative z-10"><div className="text-xs font-black uppercase tracking-[.22em] text-[#F6C445]">Personalize this course</div><h1 className="mt-2 text-4xl font-black sm:text-5xl">Why {course.language}?</h1><p className="mt-3 text-lg font-semibold leading-8 text-white/65">Choose every reason that fits. Your course stays complete—we’ll simply bring the most useful moments forward.</p></div><Lebo languageId={course.id} pose="explore" animate={false} className="mx-auto size-48"/></div><div className="mt-5 inline-flex rounded-full bg-[#24745B]/12 px-3 py-1.5 text-xs font-black text-[#53B98A]">{selectedMotivations.length ? `${selectedMotivations.length} selected` : "Choose at least one"}</div><div className="mt-4 grid gap-3 sm:grid-cols-2">{motivations.map(([id,title,text,Icon]) => { const selected=selectedMotivations.includes(id); return <button key={id} aria-pressed={selected} onClick={() => toggle(id)} className={`flex min-h-24 items-center gap-4 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${selected ? "border-[#24745B] bg-[#24745B]/12 ring-2 ring-[#24745B]/10" : card}`}><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#24745B]/15 text-[#53B98A]"><Icon/></span><span className="flex-1"><span className="block font-black">{title}</span><span className="mt-1 block text-sm font-semibold opacity-45">{text}</span></span>{selected && <span className="grid size-7 place-items-center rounded-full bg-[#24745B] text-white"><Check size={16}/></span>}</button>; })}</div></div>}
        {step === 1 && <div><div className="text-xs font-black uppercase tracking-[.22em] text-[#4338CA]">Choose your starting point</div><h1 className="mt-2 text-4xl font-black sm:text-5xl">How much {course.language} do you know?</h1><p className="mt-3 text-lg font-semibold leading-8 opacity-50">Learners with experience take a short placement check. It affects no hearts or XP.</p><div className="mt-7 grid gap-3">{[["new","🌱","I’m brand new","Begin with Unit 1 foundations."],["some","🌿","I know a few words","Take a five-question placement check."],["returning","🌳","I’ve studied before","Take a five-question placement check."]].map(([id,emoji,title,text]) => <button key={id} aria-pressed={familiarity===id} onClick={() => { setFamiliarity(id); setPlacementIndex(0); setPlacementScore(0); setPlacementSelection(null); }} className={`flex min-h-24 items-center gap-4 rounded-[1.4rem] border p-4 text-left transition hover:-translate-y-0.5 ${familiarity === id ? "border-[#4338CA] bg-[#4338CA]/10 ring-2 ring-[#4338CA]/10" : card}`}><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#4338CA]/10 text-2xl">{emoji}</span><span className="flex-1"><span className="block font-black">{title}</span><span className="text-sm font-semibold opacity-45">{text}</span></span>{familiarity === id && <span className="grid size-7 place-items-center rounded-full bg-[#4338CA] text-white"><Check size={16}/></span>}</button>)}</div><div className={`mt-5 rounded-2xl border p-4 text-sm font-semibold ${dark?"border-white/10 bg-white/5":"border-black/8 bg-white"}`}><strong className="text-[#F28C28]">Your choice is flexible.</strong> You can always open earlier units or retake practice later.</div></div>}
        {step === 2 && question && <div><div className="text-xs font-black uppercase tracking-[.22em] text-[#4338CA]">Placement · {placementIndex + 1}/{questions.length}</div><h1 className="mt-3 text-3xl font-black">{question.prompt}</h1><div className="mt-6 grid gap-3 sm:grid-cols-2">{options.map(option => <button key={option} aria-pressed={placementSelection === option} onClick={() => setPlacementSelection(option)} className={`min-h-16 rounded-2xl border-2 p-4 text-left font-black ${placementSelection === option ? "border-[#F28C28] bg-[#F28C28]/12" : card}`}>{option}</button>)}</div><p className="mt-4 text-sm font-semibold opacity-50">Your result suggests a starting unit. Earlier units remain available and skipped content awards no XP.</p></div>}
      </motion.main></AnimatePresence>
      <footer className={`fixed inset-x-0 bottom-0 z-20 border-t p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:static sm:border-0 sm:bg-transparent sm:p-0 ${dark?"border-white/10 bg-[#101312]/95":"border-black/8 bg-[#FFF8EE]/95"}`}><div className="mx-auto flex max-w-3xl gap-3 sm:border-t sm:border-current/10 sm:pt-5">{step > 0 && <button onClick={() => { if (step === 2) { setStep(1); setPlacementIndex(0); setPlacementScore(0); setPlacementSelection(null); } else setStep(0); }} className={`grid size-14 place-items-center rounded-2xl ${dark ? "bg-white/6" : "bg-black/5"}`} aria-label="Previous step"><ArrowLeft/></button>}<button disabled={!canContinue} onClick={advance} onPointerDown={hapticPress} className="afri-press flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F28C28] text-lg font-black text-white disabled:opacity-35">{step === 1 && needsPlacement ? <>Begin placement <Target size={20}/></> : step === 1 ? <>Start course <Sparkles size={20}/></> : step === 2 && placementIndex + 1 === questions.length ? <>Start at my level <Sparkles size={20}/></> : <>Continue <ArrowRight size={20}/></>}</button></div></footer>
    </div>
  </div>;
}
