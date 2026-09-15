import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronRight, Dices, Heart, Info, Search, SlidersHorizontal, Sparkles, XCircle } from "lucide-react";
import AudioButton from "../components/ui/AudioButton";
import QuestionRenderer, { expectedAnswer, normalizeAnswer } from "../components/lessons/QuestionRenderer";
import ConceptIcon from "../components/ui/ConceptIcon";
import ConfettiBurst from "../components/ui/ConfettiBurst";
import { playUiSound } from "../services/uiSound";
import { hapticPress } from "../utils/hapticFeedback";

const levelLabels = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };

export default function ExplorePage({ dark, library, progress, soundEnabled, onLoseHeart, onReviewQuestion, onComplete }) {
  const [browseMode, setBrowseMode] = useState("themes");
  const [category, setCategory] = useState(null);
  const [level, setLevel] = useState("beginner");
  const [session, setSession] = useState(null);
  const [query, setQuery] = useState("");
  const field = browseMode === "themes" ? "theme" : "wordType";
  const mastery = progress.explore?.masteredEntryIds || [];

  const categoryEntries = useMemo(() => category ? library.entries.filter((entry) => entry[field] === category.id) : [], [category, field, library]);
  const levelEntries = categoryEntries.filter((entry) => entry.level === level);
  const searchText = query.trim().toLocaleLowerCase();
  const searchResults = useMemo(() => searchText ? library.entries.filter(entry =>
    entry.native.toLocaleLowerCase().includes(searchText) || entry.english.toLocaleLowerCase().includes(searchText)
  ).slice(0, 12) : [], [library, searchText]);
  const openEntry = entry => {
    const theme = library.themes.find(item => item.id === entry.theme);
    const wordType = library.wordTypes.find(item => item.id === entry.wordType);
    setBrowseMode(theme ? "themes" : "wordTypes");
    setCategory(theme || wordType);
    setLevel(entry.level);
    setQuery("");
  };

  const themeShelves = [
    { title: "Useful today", subtitle: "Words for getting around and getting things done", ids: ["market-shopping", "transport", "health", "places-directions"] },
    { title: "Food & home", subtitle: "The language of everyday life", ids: ["food-drinks", "restaurant", "home", "clothing"] },
    { title: "People & relationships", subtitle: "Connect with the people around you", ids: ["family", "relationships", "school", "work"] },
    { title: "Your world", subtitle: "Describe what you see, feel, and enjoy", ids: ["animals", "weather", "sports", "body", "colours"] }
  ];
  const themeStats = item => {
    const entries = library.entries.filter(entry => entry.theme === item.id);
    const mastered = entries.filter(entry => mastery.includes(entry.id)).length;
    return { entries, mastered, percent: entries.length ? Math.round(mastered / entries.length * 100) : 0 };
  };
  const recommended = library.themes.find(item => {
    const stats = themeStats(item);
    return stats.entries.length && stats.mastered < stats.entries.length;
  }) || library.themes[0];
  const surprise = () => {
    const unmastered = library.entries.filter(entry => !mastery.includes(entry.id));
    const pool = unmastered.length >= 6 ? unmastered : library.entries;
    const offset = mastery.length % Math.max(pool.length, 1);
    const entries = [...pool.slice(offset), ...pool.slice(0, offset)].slice(0, 6);
    if (entries.length) setSession({ entries, categoryKey: "surprise-mix", title: "Surprise mix" });
  };

  if (session) {
    return <ExploreSession dark={dark} entries={session.entries} categoryKey={session.categoryKey} title={session.title} hearts={progress.hearts} soundEnabled={soundEnabled} onLoseHeart={onLoseHeart} onReviewQuestion={onReviewQuestion} onExit={() => setSession(null)} onComplete={(result) => { onComplete(result); setSession(null); }} />;
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

      <div className={`mt-5 rounded-[1.6rem] border p-4 sm:p-5 ${card}`}>
        <label htmlFor="explore-search" className="text-sm font-black">Find a word you want to learn</label>
        <div className={`mt-3 flex min-h-14 items-center gap-3 rounded-2xl border px-4 ${dark ? "border-white/10 bg-[#232B28]" : "border-black/10 bg-[#FFF8EE]"}`}>
          <Search size={20} className="shrink-0 text-[#F28C28]"/>
          <input id="explore-search" value={query} onChange={event => setQuery(event.target.value)} placeholder={`Search ${library.languageName} or English`} className="min-w-0 flex-1 bg-transparent font-semibold outline-none placeholder:opacity-45"/>
          {query && <button onClick={() => setQuery("")} className="min-h-10 text-xs font-black text-[#F28C28]">Clear</button>}
        </div>
        {searchText && <div className="mt-4"><div className="text-xs font-black uppercase tracking-wider opacity-45">{searchResults.length ? `Matching words · ${searchResults.length}${searchResults.length === 12 ? "+" : ""}` : "No matching words yet"}</div><div className="mt-3 grid gap-3 sm:grid-cols-2">{searchResults.map(entry => <button key={entry.id} onClick={() => openEntry(entry)} onPointerDown={hapticPress} data-tone={dark ? "night" : "surface"} className={`afri-press flex min-h-16 items-center gap-3 rounded-xl p-3 text-left ${dark ? "bg-[#232B28]" : "bg-[#FFF8EE]"}`}><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#F6C445]/20 text-xl">{entry.iconId ? <ConceptIcon iconId={entry.iconId} className="size-10"/> : "🔤"}</span><span className="min-w-0 flex-1"><span className="block truncate font-black">{entry.native}</span><span className="block truncate text-xs font-semibold opacity-55">{entry.english} · {levelLabels[entry.level]}</span></span><ChevronRight size={18} className="shrink-0 opacity-35"/></button>)}</div></div>}
      </div>

      {!category ? (
        <div className="mt-5 space-y-8">
          {recommended && <section className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-r from-[#24745B] to-[#1f5f4c] p-5 text-white sm:p-7">
            <div className="absolute -right-5 -top-8 text-[9rem] opacity-15">{recommended.emoji}</div>
            <div className="relative max-w-xl"><div className="text-xs font-black uppercase tracking-[.22em] text-white/65">Continue exploring</div><h2 className="mt-2 text-2xl font-black sm:text-3xl">Keep building your {recommended.label.toLowerCase()} vocabulary</h2><p className="mt-2 text-sm font-semibold text-white/70">{themeStats(recommended).mastered} of {themeStats(recommended).entries.length} words mastered</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-black/20"><div className="h-full rounded-full bg-[#F6C445]" style={{width:`${themeStats(recommended).percent}%`}}/></div><button onClick={() => { setBrowseMode("themes"); setCategory(recommended); }} onPointerDown={hapticPress} className="afri-press mt-5 min-h-12 rounded-xl bg-white px-5 font-black text-[#24745B]">Continue collection</button></div>
          </section>}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={surprise} onPointerDown={hapticPress} className="afri-press flex min-h-20 flex-1 items-center gap-4 rounded-[1.4rem] bg-gradient-to-r from-[#F28C28] to-[#C95D3A] px-5 text-left text-white"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15"><Dices/></span><span><span className="block font-black">Surprise me</span><span className="block text-xs font-semibold text-white/70">A fresh six-word mix</span></span></button>
            <details className={`group flex-1 rounded-[1.4rem] border ${card}`}><summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 px-5"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#4338CA]/15 text-[#4338CA]"><SlidersHorizontal/></span><span className="flex-1"><span className="block font-black">Browse word types</span><span className="block text-xs font-semibold opacity-45">Nouns, verbs, expressions, and more</span></span><ChevronRight className="opacity-35 transition group-open:rotate-90"/></summary><div className="flex flex-wrap gap-2 border-t border-current/10 p-4">{library.wordTypes.map(item => <button key={item.id} onClick={() => { setBrowseMode("wordTypes"); setCategory(item); }} className={`min-h-11 rounded-full px-4 text-sm font-black ${dark ? "bg-white/7" : "bg-black/5"}`}>{item.emoji} {item.label}</button>)}</div></details>
          </div>

          {themeShelves.map(shelf => {
            const items = shelf.ids.map(id => library.themes.find(item => item.id === id)).filter(Boolean);
            if (!items.length) return null;
            return <section key={shelf.title}><div className="flex items-end justify-between gap-3"><div><h2 className="text-2xl font-black">{shelf.title}</h2><p className={`mt-1 text-sm font-semibold ${dark ? "text-white/45" : "text-black/45"}`}>{shelf.subtitle}</p></div><span className="hidden text-xs font-black uppercase tracking-wider opacity-35 sm:block">Explore →</span></div><div className="afri-shelf mt-4 flex snap-x gap-3 overflow-x-auto pb-3">{items.map((item,index) => { const stats=themeStats(item); const colors=["#F28C28","#24745B","#4338CA","#C95D3A"]; return <button key={item.id} onClick={() => { setBrowseMode("themes"); setCategory(item); }} onPointerDown={hapticPress} className="afri-press relative min-h-40 min-w-[15rem] snap-start overflow-hidden rounded-[1.6rem] p-5 text-left text-white sm:min-w-[17rem]" style={{background:`linear-gradient(135deg, ${colors[index%colors.length]}, ${colors[(index+1)%colors.length]})`}}><span className="absolute -bottom-5 -right-3 text-[7rem] opacity-20">{item.emoji}</span><span className="relative block text-4xl">{item.emoji}</span><span className="relative mt-5 block text-xl font-black">{item.label}</span><span className="relative mt-1 block text-xs font-bold text-white/70">{stats.entries.length} words · {stats.percent}% mastered</span></button>; })}</div></section>;
          })}

          {!!mastery.length && <section><h2 className="text-2xl font-black">Recently mastered</h2><div className="afri-shelf mt-4 flex gap-3 overflow-x-auto pb-3">{library.entries.filter(entry => mastery.includes(entry.id)).slice(-8).reverse().map(entry => <button key={entry.id} onClick={() => openEntry(entry)} className={`flex min-w-[13rem] items-center gap-3 rounded-2xl border p-3 text-left ${card}`}>{entry.iconId ? <ConceptIcon iconId={entry.iconId} className="size-12 shrink-0"/> : <span className="text-2xl">✨</span>}<span><span className="block font-black">{entry.native}</span><span className="block text-xs font-semibold opacity-45">{entry.english}</span></span></button>)}</div></section>}
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
            {!levelEntries.length ? <p className={`mt-4 text-sm font-semibold ${dark ? "text-white/45" : "text-black/45"}`}>This level is awaiting editorial vocabulary.</p> : <button onClick={start} onPointerDown={hapticPress} className="afri-press mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#F28C28] px-5 font-black text-white"><Sparkles size={19}/> Start vocabulary session</button>}
          </div>
        </section>
      )}
    </div>
  );
}

function ExploreSession({ dark, entries, categoryKey, title, hearts, soundEnabled, onLoseHeart, onReviewQuestion, onExit, onComplete }) {
  const [stage, setStage] = useState("study");
  const [studyIndex, setStudyIndex] = useState(0);
  const [reveal, setReveal] = useState(0);
  const questions = useMemo(() => entries.map((entry, index) => entry.iconId && index % 2 === 0 ? ({ id: `explore-${entry.id}`, type: "image-to-word", iconId: entry.iconId, prompt: "Which word matches this image?", answer: entry.native, options: [...new Set([entry.native, ...entries.filter((item, i) => i !== index && item.iconId).map((item) => item.native)])].slice(0, 4), explanation: `${entry.native} means “${entry.english}.”` }) : ({ id: `explore-${entry.id}`, type: "native-to-english", prompt: `What does “${entry.native}” mean?`, answer: entry.english, options: [...new Set([entry.english, ...entries.filter((_, i) => i !== index).map((item) => item.english)])].slice(0, 4), explanation: `${entry.native} means “${entry.english}.”` })), [entries]);
  const [queue, setQueue] = useState(questions);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const entry = entries[studyIndex];

  if (stage === "complete") return <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] px-2 pb-2 text-center"><ConfettiBurst/><motion.div initial={{scale:0}} animate={{scale:1}} className="mx-auto grid size-28 place-items-center rounded-[2rem] bg-[#F6C445] text-6xl">🏆</motion.div><h1 className="mt-6 text-4xl font-black">Vocabulary mastered!</h1><p className={`mt-3 ${dark ? "text-white/55" : "text-black/55"}`}>{entries.length} entries practiced · {mistakes} mistakes · +{entries.length * 5} XP</p><button onClick={() => onComplete({ categoryKey, masteredEntryIds: entries.map((item) => item.id), xp: entries.length * 5 })} onPointerDown={hapticPress} className="afri-press mt-6 min-h-14 w-full rounded-2xl bg-[#F28C28] font-black text-white">Collect XP & return</button></div>;

  if (stage === "study") {
    const details = entry.linguistic && Object.keys(entry.linguistic).length > 0;
    const next = () => { if (reveal < 3) return setReveal((value) => value + 1); if (studyIndex + 1 < entries.length) { setStudyIndex((value) => value + 1); setReveal(0); } else setStage("quiz"); };
    return <div className="mx-auto max-w-2xl"><SessionHeader title={title} onExit={onExit} progress={(studyIndex + reveal / 4) / entries.length * 55}/><div className={`rounded-[2rem] border p-6 sm:p-8 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}>
      <div className="text-xs font-black uppercase tracking-[.22em] text-[#F28C28]">Word {studyIndex + 1} of {entries.length}</div>{entry.iconId && <ConceptIcon iconId={entry.iconId} className="mx-auto mt-5 h-44 w-full max-w-xs"/>}<div className="mt-6 flex items-start justify-between gap-4"><div><h1 className="break-words text-4xl font-black sm:text-5xl">{entry.native}</h1><div className={`mt-2 text-sm font-bold uppercase tracking-wider ${dark ? "text-white/35" : "text-black/35"}`}>{levelLabels[entry.level]} · {entry.wordType.replaceAll("-", " ")}</div></div><AudioButton src={entry.audio} label={entry.native} compact className="shrink-0 bg-[#4338CA] text-white"/></div>
      <AnimatePresence>{reveal >= 1 && <Reveal title="Meaning"><div className="text-2xl font-black">{entry.english}</div></Reveal>}{reveal >= 2 && <Reveal title="Example sentence"><div className="text-xl font-black">{entry.exampleNative}</div><div className={`mt-1 font-semibold ${dark ? "text-white/50" : "text-black/50"}`}>{entry.exampleEnglish}</div></Reveal>}{reveal >= 3 && <Reveal title="Practice"><div className="font-black">Say the word aloud, then recall its meaning without looking.</div>{entry.contextNote && <div className={`mt-3 flex gap-2 text-sm leading-6 ${dark ? "text-white/45" : "text-black/45"}`}><Info size={17} className="mt-1 shrink-0"/>{entry.contextNote}</div>}{details && <details className={`mt-3 rounded-xl p-3 text-sm ${dark ? "bg-white/5" : "bg-black/5"}`}><summary className="cursor-pointer font-black">Language details</summary><div className="mt-2 space-y-1">{Object.entries(entry.linguistic).map(([key, value]) => <div key={key}><span className="font-black capitalize">{key.replace(/([A-Z])/g, " $1")}:</span> {Array.isArray(value) ? value.join(", ") : value}</div>)}</div></details>}</Reveal>}</AnimatePresence>
      <button onClick={next} onPointerDown={hapticPress} className="afri-press mt-7 min-h-14 w-full rounded-2xl bg-[#F28C28] font-black text-white">{reveal === 0 ? "Reveal meaning" : reveal === 1 ? "See example" : reveal === 2 ? "Practice" : studyIndex + 1 < entries.length ? "Next word" : "Start mini quiz"}</button>
    </div></div>;
  }

  const current = queue[quizIndex];
  const correct = normalizeAnswer(current, selected) === expectedAnswer(current);
  const submit = () => { if (selected == null) return; setChecked(true); playUiSound(correct ? "correct" : "incorrect", soundEnabled); if (!correct) { setMistakes((value) => value + 1); onLoseHeart(); onReviewQuestion?.(current, { id: categoryKey, title }); if (!queue.some((item, index) => index > quizIndex && item.id === current.id)) setQueue((items) => [...items, { ...current, retry: true }]); } };
  const next = () => { if (quizIndex + 1 >= queue.length) { playUiSound("complete", soundEnabled); return setStage("complete"); } setQuizIndex((value) => value + 1); setSelected(null); setChecked(false); };
  return <div className="mx-auto max-w-2xl">
    <SessionHeader title={`${title} · Mini quiz`} onExit={onExit} progress={55 + ((quizIndex + (checked ? 1 : 0)) / queue.length) * 45} hearts={hearts}/>
    <div className="text-xs font-black uppercase tracking-[.22em] text-[#4338CA]">{current.retry ? "Review question" : "Mini quiz"}</div>
    <h1 className="mt-2 text-3xl font-black">{current.prompt}</h1>
    <div className="mt-6"><QuestionRenderer question={current} dark={dark} checked={checked} value={selected} onChange={setSelected}/></div>
    {checked && <div className={`mt-5 flex gap-3 rounded-2xl border p-4 ${correct ? "border-[#24745B]/30 bg-[#24745B]/10" : "border-[#C95D3A]/30 bg-[#C95D3A]/10"}`}>{correct ? <CheckCircle2 className="text-[#53B98A]"/> : <XCircle className="text-[#C95D3A]"/>}<div><div className="font-black">{correct ? "Excellent!" : "Not quite."}</div><div className="mt-1 text-sm font-semibold opacity-60">{current.explanation}</div></div></div>}
    <button disabled={!checked && selected == null} onPointerDown={hapticPress} onClick={checked ? next : submit} data-tone={checked ? correct ? "green" : "clay" : "orange"} className={`afri-press mt-7 min-h-14 w-full rounded-2xl font-black text-white disabled:opacity-30 ${checked && correct ? "bg-[#24745B]" : checked ? "bg-[#C95D3A]" : "bg-[#F28C28]"}`}>{checked ? "Continue" : "Check"}</button>
  </div>;
}

function Reveal({ title, children }) { return <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="mt-6 border-t border-current/10 pt-5"><div className="mb-2 text-xs font-black uppercase tracking-[.2em] text-[#24745B]">{title}</div>{children}</motion.div>; }
function SessionHeader({ title, onExit, progress, hearts }) { return <div className="mb-7 flex items-center gap-3"><button aria-label="Exit Explore session" onClick={onExit} className="grid size-11 shrink-0 place-items-center rounded-xl bg-black/5"><ArrowLeft size={20}/></button><div className="min-w-0 flex-1"><div className="truncate text-xs font-black uppercase tracking-wider opacity-50">{title}</div><div className="mt-2 h-3 overflow-hidden rounded-full bg-black/10"><motion.div className="h-full rounded-full bg-[#F28C28]" animate={{width:`${progress}%`}}/></div></div>{hearts != null && <div className="flex items-center gap-1 font-black text-[#EF5B5B]"><Heart size={20} fill="currentColor"/>{hearts}</div>}</div>; }
