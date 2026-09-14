import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Flame, HeartHandshake, Landmark, Plane, Sparkles, Target, Users } from "lucide-react";
import { availableLanguageList } from "../data/languages";
import Lebo from "../components/ui/Lebo";

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
  const card = dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";
  const canContinue = step !== 0 || form.name.trim();
  const toggleMotivation = id => setForm(previous => ({
    ...previous,
    motivations: previous.motivations.includes(id)
      ? previous.motivations.filter(value => value !== id)
      : [...previous.motivations, id]
  }));
  const finish = () => onComplete({ ...form, name: form.name.trim(), onboarded: true });
  return <div className={`min-h-screen overflow-x-hidden px-4 py-6 ${dark ? "bg-[#101312] text-[#F8F4EA]" : "bg-[#FFF8EE] text-[#252525]"}`}>
    <div className="mx-auto max-w-3xl"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-[#F28C28] text-xl font-black text-white">A</div><div className="text-xl font-black">AfriLingo</div></div><div className="text-xs font-black uppercase tracking-[.2em] opacity-40">{step + 1} / 5</div></div><div className={`mt-5 h-2 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/10"}`}><motion.div className="h-full rounded-full bg-[#F28C28]" animate={{ width: `${(step + 1) * 20}%` }}/></div>
      <AnimatePresence mode="wait"><motion.main key={step} initial={{opacity:0,x:18}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-18}} className="py-8">
        {step === 0 && <div className="grid items-center gap-6 sm:grid-cols-[1fr_280px]"><div><div className="text-xs font-black uppercase tracking-[.24em] text-[#F28C28]">Meet your learning companion</div><h1 className="mt-3 text-4xl font-black sm:text-5xl">Sawubona! I’m Lebo.</h1><p className="mt-4 max-w-lg text-lg font-semibold leading-8 opacity-55">Let’s learn African languages through practical speech, culture, and small wins that add up.</p><label className="mt-7 block text-sm font-black">What should Lebo call you?<input autoFocus value={form.name} onChange={event=>setForm({...form,name:event.target.value})} placeholder="Your first name" className={`mt-2 min-h-14 w-full rounded-2xl border px-4 text-lg font-bold outline-none focus:border-[#F28C28] ${dark?"border-white/10 bg-white/5":"border-black/10 bg-white"}`}/></label></div><Lebo languageId={form.languageId} pose="wave" reaction="wave" className="mx-auto h-64 w-64"/></div>}
        {step === 1 && <Step title={`Nice to meet you, ${form.name.trim()}.`} text="Which language would you like to begin with?"><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">{availableLanguageList.map(item=><button key={item.id} onClick={()=>setForm({...form,languageId:item.id})} className={`min-h-28 rounded-2xl border p-4 text-left ${form.languageId===item.id?"border-[#F28C28] bg-[#F28C28]/10 ring-2 ring-[#F28C28]/15":card}`}><span className="text-3xl">{item.flag}</span><span className="mt-2 block font-black">{item.language}</span><span className="block truncate text-xs font-bold opacity-45">{item.nativeName}</span></button>)}</div></Step>}
        {step === 2 && <Step title="What brings you here?" text="Choose as many reasons as you like. We’ll use them to make prompts and recommendations feel more relevant."><div className="mt-6 grid gap-3 sm:grid-cols-2">{motivations.map(([id,title,text,Icon])=>{const selected=form.motivations.includes(id);return <button key={id} type="button" aria-pressed={selected} onClick={()=>toggleMotivation(id)} className={`flex min-h-24 items-center gap-4 rounded-2xl border p-4 text-left ${selected?"border-[#24745B] bg-[#24745B]/12":card}`}><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#24745B]/15 text-[#53B98A]"><Icon/></span><span className="flex-1"><span className="block font-black">{title}</span><span className="mt-1 block text-sm font-semibold opacity-45">{text}</span></span>{selected&&<Check className="shrink-0 text-[#53B98A]" aria-hidden="true"/>}</button>})}</div></Step>}
        {step === 3 && <Step title="Choose your daily rhythm" text="You can always change this later."><div className="mt-6 space-y-3">{targets.map(([value,title,text])=><button key={value} onClick={()=>setForm({...form,dailyTarget:value})} className={`flex min-h-20 w-full items-center gap-4 rounded-2xl border p-4 text-left ${form.dailyTarget===value?"border-[#F28C28] bg-[#F28C28]/10":card}`}><span className="grid size-12 place-items-center rounded-xl bg-[#F6C445]/20 text-[#A66A00]"><Target/></span><span className="flex-1"><span className="block font-black">{title}</span><span className="text-sm font-semibold opacity-45">{text}</span></span>{form.dailyTarget===value&&<Check className="text-[#F28C28]"/>}</button>)}</div></Step>}
        {step === 4 && <Step title={`Your ${language.language} journey is ready.`} text="Tell us your comfort level. This keeps recommendations welcoming without skipping the structured course path."><div className="mt-6 grid gap-3">{[["new","I’m brand new","Start gently with foundations."],["some","I know a few words","Blend foundations with extra practice."],["returning","I’ve studied before","Use review and Explore alongside the path."]].map(([id,title,text])=><button key={id} onClick={()=>setForm({...form,familiarity:id})} className={`flex min-h-20 items-center justify-between rounded-2xl border p-4 text-left ${form.familiarity===id?"border-[#4338CA] bg-[#4338CA]/10":card}`}><span><span className="block font-black">{title}</span><span className="text-sm font-semibold opacity-45">{text}</span></span>{form.familiarity===id&&<Check className="text-[#7067FF]"/>}</button>)}</div><div className="mt-6 flex items-center gap-4 rounded-[1.5rem] bg-gradient-to-r from-[#F28C28] to-[#C95D3A] p-5 text-white"><Lebo languageId={form.languageId} pose="encourage" reaction="correct" className="size-24 shrink-0"/><div><div className="text-sm font-black uppercase tracking-wider text-white/65">Lebo says</div><div className="mt-1 text-xl font-black">Small steps. Real conversations. Let’s go!</div></div></div></Step>}
      </motion.main></AnimatePresence>
      <div className="flex gap-3 border-t border-current/10 pt-5">{step>0&&<button onClick={()=>setStep(value=>value-1)} className={`grid size-14 place-items-center rounded-2xl ${dark?"bg-white/6":"bg-black/5"}`} aria-label="Previous step"><ArrowLeft/></button>}<button disabled={!canContinue} onClick={()=>step===4?finish():setStep(value=>value+1)} className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F28C28] text-lg font-black text-white disabled:opacity-35">{step===4?<>Start learning <Flame size={20}/></>:<>Continue <ArrowRight size={20}/></>}</button></div>
    </div>
  </div>;
}

function Step({title,text,children}){return <div><h1 className="text-4xl font-black sm:text-5xl">{title}</h1><p className="mt-3 max-w-2xl text-lg font-semibold leading-8 opacity-50">{text}</p>{children}</div>}
