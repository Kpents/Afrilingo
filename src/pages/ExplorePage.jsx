import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BookOpen, CheckCircle2, ChevronRight, Heart, Info, Layers3, Search, Sparkles, XCircle } from "lucide-react";
import AudioButton from "../components/ui/AudioButton";
import QuestionRenderer, { expectedAnswer, normalizeAnswer } from "../components/lessons/QuestionRenderer";
import ConceptIcon from "../components/ui/ConceptIcon";

const levelLabels = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };

export default function ExplorePage({ dark, library, progress, onLoseHeart, onReviewQuestion, onComplete }) {
  const [browseMode, setBrowseMode] = useState("themes");
  const [category, setCategory] = useState(null);
  const [level, setLevel] = useState("beginner");
  const [session, setSession] = useState(null);
  const categories = browseMode === "themes" ? library.themes : library.wordTypes;
  const field = browseMode === "themes" ? "theme" : "wordType";
  const mastery = progress.explore?.masteredEntryIds || [];

  const categoryEntries = useMemo(() => category ? library.entries.filter((entry) => entry[field] === category.id) : [], [category, field, library]);
  const levelEntries = categoryEntries.filter((entry) => entry.level === level);

  if (session) {
    return <ExploreSession dark={dark} entries={session.entries} categoryKey={session.categoryKey} title={session.title} hearts={progress.hearts} onLoseHeart={onLoseHeart} onReviewQuestion={onReviewQuestion} onExit={() => setSession(null)} onComplete={(result) => { onComplete(result); setSession(null); }} />;
  }

  const start = () => {
    if (!levelEntries.length) return;
    setSession({
      entries: levelEntries.slice(0, 6),
      categoryKey: `${browseMode}:${category.id}:${level}`,
      title: `${category.label} · ${levelLabels[level]}`
    });
  };

  const card = dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";

  return (
    <div className="mx-auto max-w-5xl">
      <section className="afri-pattern overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#4338CA] to-[#24745B] p-6 text-white sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div><div className="text-xs font-black uppercase tracking-[0.25em] text-white/65">{library.languageName} Explore</div><h1 className="mt-2 text-3xl font-black sm:text-4xl">Vocabulary Library</h1><p className="mt-3 max-w-2xl font-semibold leading-7 text-white/70">Learn freely outside the course path. Browse practical {library.nativeName || library.languageName} by theme or word type, then practice at your own level.</p></div>
          <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white/15 text-3xl">🔎</div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-black"><span className="rounded-full bg-white/15 px-3 py-2">{library.entries.length} entries</span><span className="rounded-full bg-white/15 px-3 py-2">{mastery.length} mastered</span><span className="rounded-full bg-white/15 px-3 py-2">Course progress unchanged</span></div>
      </section>

      <div className={`mt-5 grid grid-cols-2 gap-2 rounded-2xl border p-2 ${card}`}>
        <ModeButton active={browseMode === "themes"} onClick={() => { setBrowseMode("themes"); setCategory(null); }} icon={<Layers3 size={18}/>} label="Browse by theme" />
        <ModeButton active={browseMode === "wordTypes"} onClick={() => { setBrowseMode("wordTypes"); setCategory(null); }} icon={<BookOpen size={18}/>} label="Browse by word type" />
      </div>

      {!category ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((item) => {
            const entries = library.entries.filter((entry) => entry[field] === item.id);
            const mastered = entries.filter((entry) => mastery.includes(entry.id)).length;
            const percent = entries.length ? Math.round(mastered / entries.length * 100) : 0;
            return <button key={item.id} onClick={() => setCategory(item)} className={`min-h-36 rounded-[1.5rem] border p-4 text-left transition hover:-translate-y-0.5 hover:border-[#F28C28]/45 ${card}`}>
              <div className="flex items-start justify-between"><span className="text-3xl">{item.emoji}</span><ChevronRight size={18} className="opacity-30"/></div>
              <div className="mt-4 font-black leading-tight">{item.label}</div><div className={`mt-1 text-xs font-bold ${dark ? "text-white/40" : "text-black/40"}`}>{entries.length} words · {percent}%</div>
              <div className={`mt-3 h-1.5 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/8"}`}><div className="h-full rounded-full bg-[#F28C28]" style={{ width: `${percent}%` }}/></div>
            </button>;
          })}
        </div>
      ) : (
        <section className="mt-5">
          <button onClick={() => setCategory(null)} className={`flex min-h-11 items-center gap-2 rounded-xl px-3 font-black ${dark ? "bg-white/6" : "bg-black/5"}`}><ArrowLeft size={18}/> All categories</button>
          <div className="mt-5 flex items-center gap-4"><span className="text-5xl">{category.emoji}</span><div><div className="text-xs font-black uppercase tracking-[0.2em] text-[#F28C28]">Explore category</div><h2 className="text-3xl font-black">{category.label}</h2></div></div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {library.levels.map((item) => {
              const entries = categoryEntries.filter((entry) => entry.level === item);
              const completed = entries.filter((entry) => mastery.includes(entry.id)).length;
              return <button key={item} onClick={() => setLevel(item)} disabled={!entries.length} className={`min-h-20 rounded-2xl border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-35 ${level === item ? "border-[#F28C28] bg-[#F28C28] text-white" : card}`}><span className="block text-sm font-black">{levelLabels[item]}</span><span className="mt-1 block text-[11px] font-bold opacity-60">{completed}/{entries.length}</span></button>;
            })}
          </div>
          <div className={`mt-4 rounded-[1.6rem] border p-4 ${card}`}>
            <div className="flex items-center justify-between"><div><div className="text-xs font-black uppercase tracking-wider text-[#4338CA]">{levelLabels[level]}</div><div className="mt-1 text-xl font-black">{levelEntries.length} vocabulary entries</div></div><Search className="opacity-25"/></div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {levelEntries.slice(0, 8).map((entry) => <div key={entry.id} className={`flex min-h-16 items-center gap-3 rounded-xl p-3 ${dark ? "bg-white/5" : "bg-black/[0.035]"}`}>{entry.iconId && <ConceptIcon iconId={entry.iconId} className="size-12 shrink-0"/>}<AudioButton src={entry.audio} label={entry.native} compact className={dark ? "bg-white/8" : "bg-white"}/><div className="min-w-0"><div className="truncate font-black">{entry.native}</div><div className={`truncate text-xs font-semibold ${dark ? "text-white/45" : "text-black/45"}`}>{entry.english}</div></div>{mastery.includes(entry.id) && <CheckCircle2 size={17} className="ml-auto shrink-0 text-[#53B98A]"/>}</div>)}
            </div>
            {!levelEntries.length ? <p className={`mt-4 text-sm font-semibold ${dark ? "text-white/45" : "text-black/45"}`}>This level is awaiting editorial vocabulary.</p> : <button onClick={start} className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#F28C28] px-5 font-black text-white shadow-lg shadow-orange-500/20"><Sparkles size={19}/> Start vocabulary session</button>}
          </div>
        </section>
      )}
    </div>
  );
}

function ModeButton({ active, onClick, icon, label }) {
  return <button onClick={onClick} className={`flex min-h-12 items-center justify-center gap-2 rounded-xl text-sm font-black transition ${active ? "bg-[#F28C28] text-white" : "opacity-55 hover:opacity-100"}`}>{icon}{label}</button>;
}

function ExploreSession({ dark, entries, categoryKey, title, hearts, onLoseHeart, onReviewQuestion, onExit, onComplete }) {
  const [stage, setStage] = useState("study");
  const [studyIndex, setStudyIndex] = useState(0);
  const [reveal, setReveal] = useState(0);
  const questions = useMemo(() => entries.map((entry, index) => entry.iconId && index % 2 === 0 ? ({ id: `explore-${entry.id}`, type: "image-to-word", iconId: entry.iconId, prompt: "Which Zulu word matches this image?", answer: entry.native, options: [...new Set([entry.native, ...entries.filter((item, i) => i !== index && item.iconId).map((item) => item.native)])].slice(0, 4), explanation: `${entry.native} means “${entry.english}.”` }) : ({ id: `explore-${entry.id}`, type: "native-to-english", prompt: `What does “${entry.native}” mean?`, answer: entry.english, options: [...new Set([entry.english, ...entries.filter((_, i) => i !== index).map((item) => item.english)])].slice(0, 4), explanation: `${entry.native} means “${entry.english}.”` })), [entries]);
  const [queue, setQueue] = useState(questions);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const entry = entries[studyIndex];

  if (stage === "complete") return <div className="mx-auto max-w-xl text-center"><motion.div initial={{scale:0}} animate={{scale:1}} className="mx-auto grid size-28 place-items-center rounded-[2rem] bg-[#F6C445] text-6xl">🏆</motion.div><h1 className="mt-6 text-4xl font-black">Vocabulary mastered!</h1><p className={`mt-3 ${dark ? "text-white/55" : "text-black/55"}`}>{entries.length} entries practiced · {mistakes} mistakes · +{entries.length * 5} XP</p><button onClick={() => onComplete({ categoryKey, masteredEntryIds: entries.map((item) => item.id), xp: entries.length * 5 })} className="mt-6 min-h-14 w-full rounded-2xl bg-[#F28C28] font-black text-white">Collect XP & return</button></div>;

  if (stage === "study") {
    const details = entry.linguistic && Object.keys(entry.linguistic).length > 0;
    const next = () => { if (reveal < 3) return setReveal((value) => value + 1); if (studyIndex + 1 < entries.length) { setStudyIndex((value) => value + 1); setReveal(0); } else setStage("quiz"); };
    return <div className="mx-auto max-w-2xl"><SessionHeader title={title} onExit={onExit} progress={(studyIndex + reveal / 4) / entries.length * 55}/><div className={`rounded-[2rem] border p-6 sm:p-8 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}>
      <div className="text-xs font-black uppercase tracking-[.22em] text-[#F28C28]">Word {studyIndex + 1} of {entries.length}</div>{entry.iconId && <ConceptIcon iconId={entry.iconId} className="mx-auto mt-5 h-44 w-full max-w-xs"/>}<div className="mt-6 flex items-start justify-between gap-4"><div><h1 className="break-words text-4xl font-black sm:text-5xl">{entry.native}</h1><div className={`mt-2 text-sm font-bold uppercase tracking-wider ${dark ? "text-white/35" : "text-black/35"}`}>{levelLabels[entry.level]} · {entry.wordType.replaceAll("-", " ")}</div></div><AudioButton src={entry.audio} label={entry.native} compact className="shrink-0 bg-[#4338CA] text-white"/></div>
      <AnimatePresence>{reveal >= 1 && <Reveal title="Meaning"><div className="text-2xl font-black">{entry.english}</div></Reveal>}{reveal >= 2 && <Reveal title="Example sentence"><div className="text-xl font-black">{entry.exampleNative}</div><div className={`mt-1 font-semibold ${dark ? "text-white/50" : "text-black/50"}`}>{entry.exampleEnglish}</div></Reveal>}{reveal >= 3 && <Reveal title="Practice"><div className="font-black">Say the word aloud, then recall its meaning without looking.</div>{entry.contextNote && <div className={`mt-3 flex gap-2 text-sm leading-6 ${dark ? "text-white/45" : "text-black/45"}`}><Info size={17} className="mt-1 shrink-0"/>{entry.contextNote}</div>}{details && <details className={`mt-3 rounded-xl p-3 text-sm ${dark ? "bg-white/5" : "bg-black/5"}`}><summary className="cursor-pointer font-black">Language details</summary><div className="mt-2 space-y-1">{Object.entries(entry.linguistic).map(([key, value]) => <div key={key}><span className="font-black capitalize">{key.replace(/([A-Z])/g, " $1")}:</span> {Array.isArray(value) ? value.join(", ") : value}</div>)}</div></details>}</Reveal>}</AnimatePresence>
      <button onClick={next} className="mt-7 min-h-14 w-full rounded-2xl bg-[#F28C28] font-black text-white">{reveal === 0 ? "Reveal meaning" : reveal === 1 ? "See example" : reveal === 2 ? "Practice" : studyIndex + 1 < entries.length ? "Next word" : "Start mini quiz"}</button>
    </div></div>;
  }

  const current = queue[quizIndex];
  const correct = normalizeAnswer(current, selected) === expectedAnswer(current);
  const submit = () => { if (selected == null) return; setChecked(true); if (!correct) { setMistakes((value) => value + 1); onLoseHeart(); onReviewQuestion?.(current, { id: categoryKey, title }); if (!queue.some((item, index) => index > quizIndex && item.id === current.id)) setQueue((items) => [...items, { ...current, retry: true }]); } };
  const next = () => { if (quizIndex + 1 >= queue.length) return setStage("complete"); setQuizIndex((value) => value + 1); setSelected(null); setChecked(false); };
  return <div className="mx-auto max-w-2xl"><SessionHeader title={`${title} · Mini quiz`} onExit={onExit} progress={55 + ((quizIndex + (checked ? 1 : 0)) / queue.length) * 45} hearts={hearts}/><div className="text-xs font-black uppercase tracking-[.22em] text-[#4338CA]">{current.retry ? "Review question" : "Mini quiz"}</div><h1 className="mt-2 text-3xl font-black">{current.prompt}</h1><div className="mt-6"><QuestionRenderer question={current} dark={dark} checked={checked} value={selected} onChange={setSelected}/></div>{checked && <div className={`mt-5 flex gap-3 rounded-2xl border p-4 ${correct ? "border-[#24745B]/30 bg-[#24745B]/10" : "border-[#C95D3A]/30 bg-[#C95D3A]/10"}`}>{correct ? <CheckCircle2 className="text-[#53B98A]"/> : <XCircle className="text-[#C95D3A]"/>}<div><div className="font-black">{correct ? "Excellent!" : "Not quite."}</div><div className="mt-1 text-sm font-semibold opacity-60">{current.explanation}</div></div></div>}<button disabled={!checked && selected == null} onClick={checked ? next : submit} className={`mt-7 min-h-14 w-full rounded-2xl font-black text-white disabled:opacity-30 ${checked && correct ? "bg-[#24745B]" : checked ? "bg-[#C95D3A]" : "bg-[#F28C28]"}`}>{checked ? "Continue" : "Check"}</button></div>;
}

function Reveal({ title, children }) { return <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="mt-6 border-t border-current/10 pt-5"><div className="mb-2 text-xs font-black uppercase tracking-[.2em] text-[#24745B]">{title}</div>{children}</motion.div>; }
function SessionHeader({ title, onExit, progress, hearts }) { return <div className="mb-7 flex items-center gap-3"><button aria-label="Exit Explore session" onClick={onExit} className="grid size-11 shrink-0 place-items-center rounded-xl bg-black/5"><ArrowLeft size={20}/></button><div className="min-w-0 flex-1"><div className="truncate text-xs font-black uppercase tracking-wider opacity-50">{title}</div><div className="mt-2 h-3 overflow-hidden rounded-full bg-black/10"><motion.div className="h-full rounded-full bg-[#F28C28]" animate={{width:`${progress}%`}}/></div></div>{hearts != null && <div className="flex items-center gap-1 font-black text-[#EF5B5B]"><Heart size={20} fill="currentColor"/>{hearts}</div>}</div>; }
