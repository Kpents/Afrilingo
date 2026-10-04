import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Flame, HeartHandshake, Landmark, Plane, Sparkles, Target, Users } from "lucide-react";
import { availableLanguageList } from "../data/languages";
import Lebo from "../components/ui/Lebo";
import { hapticPress } from "../utils/hapticFeedback";
import { buildPlacementQuestions, placementUnitIndex } from "../utils/placementTest";

const motivations = [
  ["travel", "Travel", "Speak confidently on real journeys.", Plane],
  ["family", "Family", "Connect across generations.", Users],
  ["culture", "Culture", "Understand language through context.", Landmark],
  ["relationships", "Relationships", "Talk naturally with people you care about.", HeartHandshake],
  ["general", "Personal growth", "Build a lasting learning habit.", Sparkles]
];
const targets = [[1, "Relaxed", "One activity a day"], [3, "Steady", "Three activities a day"], [5, "Focused", "Five activities a day"]];

export default function OnboardingPage({ dark, initial, onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(() => ({
    ...initial,
    motivations: Array.isArray(initial.motivations) ? initial.motivations : initial.motivation ? [initial.motivation] : []
  }));
  const language = availableLanguageList.find(item => item.id === form.languageId) || availableLanguageList[0];
  const placementQuestions = useMemo(() => buildPlacementQuestions(language), [language]);
  const [placementIndex, setPlacementIndex] = useState(0);
  const [placementSelection, setPlacementSelection] = useState(null);
  const [placementScore, setPlacementScore] = useState(0);
  const currentPlacementQuestion = placementQuestions[placementIndex];
  const placementOptions = useMemo(() => {
    if (!currentPlacementQuestion) return [];
    const options = [...currentPlacementQuestion.options].sort(() => Math.random() - 0.5);
    if (options.length > 1 && options[0] === currentPlacementQuestion.answer) options.push(options.shift());
    return options;
  }, [currentPlacementQuestion]);
  const needsPlacement = form.familiarity !== "new";
  const totalSteps = needsPlacement ? 6 : 5;
  const stepNames = ["Your profile", "Choose language", "Your goals", "Daily rhythm", "Starting level", "Placement check"];
  const card = dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";
  const canContinue = step === 0 ? Boolean(form.name.trim()) : step === 2 ? form.motivations.length > 0 : step === 5 ? placementSelection != null : true;
  const toggleMotivation = id => setForm(previous => ({
    ...previous,
    motivations: previous.motivations.includes(id)
      ? previous.motivations.filter(value => value !== id)
      : [...previous.motivations, id]
  }));
  const finish = (extra = {}) => onComplete({ ...form, ...extra, name: form.name.trim(), onboarded: true });
  const advance = () => {
    if (step < 4) return setStep(value => value + 1);
    if (step === 4) return needsPlacement && placementQuestions.length ? setStep(5) : finish();
    const question = placementQuestions[placementIndex];
    const nextScore = placementScore + (placementSelection === question.answer ? 1 : 0);
    if (placementIndex + 1 < placementQuestions.length) {
      setPlacementScore(nextScore);
      setPlacementIndex(value => value + 1);
      setPlacementSelection(null);
      return;
    }
    finish({ placement: {
      score: nextScore,
      total: placementQuestions.length,
      unitIndex: placementUnitIndex(nextScore, placementQuestions.length, language.units.length),
      completedAt: new Date().toISOString()
    }});
  };
  return <div className={`min-h-screen overflow-x-hidden px-4 py-6 ${dark ? "bg-[#101312] text-[#F8F4EA]" : "bg-[#FFF8EE] text-[#252525]"}`}>
    <div className="mx-auto max-w-3xl pb-24 sm:pb-0"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-[#F28C28] text-xl font-black text-white shadow-lg shadow-orange-500/20">A</div><div><div className="text-xl font-black">AfriLingo</div><div className="text-[10px] font-black uppercase tracking-[.18em] text-[#F28C28]">{stepNames[step]}</div></div></div><div className="rounded-full bg-[#4338CA]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[.16em] text-[#7067FF]">{step + 1} / {totalSteps}</div></div><div className={`mt-5 h-2.5 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/10"}`}><motion.div className="h-full rounded-full bg-gradient-to-r from-[#F28C28] to-[#F6C445]" animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}/></div>
      <AnimatePresence mode="wait"><motion.main key={step} initial={{opacity:0,x:18}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-18}} className="py-8">
        {step === 0 && <div className="grid items-center gap-6 sm:grid-cols-[1fr_280px]"><div><div className="text-xs font-black uppercase tracking-[.24em] text-[#F28C28]">Meet your learning companion</div><h1 className="mt-3 text-4xl font-black sm:text-5xl">Sawubona! I’m Lebo.</h1><p className="mt-4 max-w-lg text-lg font-semibold leading-8 opacity-55">Let’s learn African languages through practical speech, culture, and small wins that add up.</p><label className="mt-7 block text-sm font-black">What should Lebo call you?<input autoFocus value={form.name} onChange={event=>setForm({...form,name:event.target.value})} placeholder="Your first name" className={`mt-2 min-h-14 w-full rounded-2xl border px-4 text-lg font-bold outline-none focus:border-[#F28C28] ${dark?"border-white/10 bg-white/5":"border-black/10 bg-white"}`}/></label></div><Lebo languageId={form.languageId} pose="wave" reaction="wave" className="mx-auto h-64 w-64"/></div>}
        {step === 1 && <Step title={`Nice to meet you, ${form.name.trim()}.`} text="Which language would you like to begin with?"><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">{availableLanguageList.map(item=><button key={item.id} aria-pressed={form.languageId===item.id} onClick={()=>setForm({...form,languageId:item.id})} className={`relative min-h-32 overflow-hidden rounded-[1.4rem] border p-4 text-left transition hover:-translate-y-0.5 ${form.languageId===item.id?"border-[#F28C28] bg-[#F28C28]/10 ring-2 ring-[#F28C28]/15":card}`}><span className="text-4xl">{item.flag}</span><span className="mt-3 block text-lg font-black">{item.language}</span><span className="block truncate text-xs font-bold opacity-45">{item.nativeName}</span>{form.languageId===item.id&&<span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-[#F28C28] text-white"><Check size={16}/></span>}</button>)}</div></Step>}
        {step === 2 && <Step title="What brings you here?" text="Choose as many reasons as you like. We’ll use them to make prompts and recommendations feel more relevant."><div className="mt-5 inline-flex rounded-full bg-[#24745B]/12 px-3 py-1.5 text-xs font-black text-[#53B98A]">{form.motivations.length ? `${form.motivations.length} selected` : "Choose at least one"}</div><div className="mt-4 grid gap-3 sm:grid-cols-2">{motivations.map(([id,title,text,Icon])=>{const selected=form.motivations.includes(id);return <button key={id} type="button" aria-pressed={selected} onClick={()=>toggleMotivation(id)} className={`flex min-h-24 items-center gap-4 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${selected?"border-[#24745B] bg-[#24745B]/12 ring-2 ring-[#24745B]/10":card}`}><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#24745B]/15 text-[#53B98A]"><Icon/></span><span className="flex-1"><span className="block font-black">{title}</span><span className="mt-1 block text-sm font-semibold opacity-45">{text}</span></span>{selected&&<span className="grid size-7 place-items-center rounded-full bg-[#24745B] text-white"><Check size={16} aria-hidden="true"/></span>}</button>})}</div></Step>}
        {step === 3 && <Step title="Choose your daily rhythm" text="You can always change this later."><div className="mt-6 space-y-3">{targets.map(([value,title,text])=><button key={value} onClick={()=>setForm({...form,dailyTarget:value})} className={`flex min-h-20 w-full items-center gap-4 rounded-2xl border p-4 text-left ${form.dailyTarget===value?"border-[#F28C28] bg-[#F28C28]/10":card}`}><span className="grid size-12 place-items-center rounded-xl bg-[#F6C445]/20 text-[#A66A00]"><Target/></span><span className="flex-1"><span className="block font-black">{title}</span><span className="text-sm font-semibold opacity-45">{text}</span></span>{form.dailyTarget===value&&<Check className="text-[#F28C28]"/>}</button>)}</div></Step>}
        {step === 4 && <Step title={`Your ${language.language} journey is ready.`} text="Tell us your comfort level. If you already know some of the language, a short placement check will suggest where to begin."><div className="mt-6 grid gap-3">{[["new","I’m brand new","Start gently with foundations."],["some","I know a few words","Take a five-question placement check."],["returning","I’ve studied before","Take a five-question placement check."]].map(([id,title,text])=><button key={id} onClick={()=>{setForm({...form,familiarity:id});setPlacementIndex(0);setPlacementScore(0);setPlacementSelection(null)}} className={`flex min-h-20 items-center justify-between rounded-2xl border p-4 text-left ${form.familiarity===id?"border-[#4338CA] bg-[#4338CA]/10":card}`}><span><span className="block font-black">{title}</span><span className="text-sm font-semibold opacity-45">{text}</span></span>{form.familiarity===id&&<Check className="text-[#7067FF]"/>}</button>)}</div><div className="mt-6 flex items-center gap-4 rounded-[1.5rem] bg-gradient-to-r from-[#F28C28] to-[#C95D3A] p-5 text-white"><Lebo languageId={form.languageId} pose="encourage" reaction="correct" className="size-24 shrink-0"/><div><div className="text-sm font-black uppercase tracking-wider text-white/65">Lebo says</div><div className="mt-1 text-xl font-black">Start where you are. You can revisit earlier lessons anytime.</div></div></div></Step>}
        {step === 5 && currentPlacementQuestion && <Step title="Find your starting point" text={`Question ${placementIndex + 1} of ${placementQuestions.length} · No hearts or XP are affected.`}><div className={`mt-6 rounded-[1.75rem] border p-5 sm:p-7 ${card}`}><div className="text-xs font-black uppercase tracking-[.18em] text-[#4338CA]">Placement check</div><h2 className="mt-3 text-2xl font-black">{currentPlacementQuestion.prompt}</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{placementOptions.map(option=><button key={option} type="button" aria-pressed={placementSelection===option} onClick={()=>setPlacementSelection(option)} className={`min-h-16 rounded-2xl border-2 p-4 text-left font-black ${placementSelection===option?"border-[#F28C28] bg-[#F28C28]/12":dark?"border-white/10 bg-white/5":"border-black/8 bg-[#FFF8EE]"}`}>{option}</button>)}</div></div><p className="mt-4 text-sm font-semibold opacity-50">Your result unlocks a suggested unit. Earlier units remain available, and skipped lessons do not award XP or Culture Cards.</p></Step>}
      </motion.main></AnimatePresence>
      <div className={`fixed inset-x-0 bottom-0 z-20 border-t p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:static sm:border-0 sm:bg-transparent sm:p-0 ${dark?"border-white/10 bg-[#101312]/95":"border-black/8 bg-[#FFF8EE]/95"}`}><div className="mx-auto flex max-w-3xl gap-3 sm:border-t sm:border-current/10 sm:pt-5">{step>0&&<button onClick={()=>{if(step===5){setPlacementIndex(0);setPlacementScore(0);setPlacementSelection(null);setStep(4)}else setStep(value=>value-1)}} className={`grid size-14 place-items-center rounded-2xl ${dark?"bg-white/6":"bg-black/5"}`} aria-label="Previous step"><ArrowLeft/></button>}<button disabled={!canContinue} onPointerDown={hapticPress} onClick={advance} className="afri-press flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F28C28] text-lg font-black text-white disabled:opacity-35">{step===4&&!needsPlacement?<>Start learning <Flame size={20}/></>:step===4?<>Begin placement check <Target size={20}/></>:step===5&&placementIndex+1===placementQuestions.length?<>See my starting point <Sparkles size={20}/></>:<>Continue <ArrowRight size={20}/></>}</button></div></div>
    </div>
  </div>;
}

function Step({title,text,children}){return <div><h1 className="text-4xl font-black sm:text-5xl">{title}</h1><p className="mt-3 max-w-2xl text-lg font-semibold leading-8 opacity-50">{text}</p>{children}</div>}
