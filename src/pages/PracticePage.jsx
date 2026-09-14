import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Dumbbell, Headphones, Heart, RotateCcw, Sparkles, X, XCircle } from "lucide-react";
import QuestionRenderer, { expectedAnswer, normalizeAnswer } from "../components/lessons/QuestionRenderer";
import Lebo from "../components/ui/Lebo";
import { dateKey } from "../utils/dateKey";
import { playUiSound } from "../services/uiSound";
import { hapticPress } from "../utils/hapticFeedback";

const modes = [
  { id: "smart", title: "Smart practice", text: "Mistakes first, then concepts you have already met.", icon: Sparkles, color: "#F28C28" },
  { id: "review", title: "Weak spots", text: "Focus only on questions in your review queue.", icon: RotateCcw, color: "#C95D3A" },
  { id: "vocabulary", title: "Vocabulary", text: "Refresh useful words from your Explore library.", icon: BookOpen, color: "#24745B" },
  { id: "listening", title: "Listening-ready", text: "Practice audio questions when recordings are available.", icon: Headphones, color: "#4338CA" }
];

function shuffle(items) {
  return [...items].sort((a, b) => String(a.key).localeCompare(String(b.key)));
}

function vocabularyQuestions(library, masteredIds) {
  if (!library?.entries?.length) return [];
  const preferred = library.entries.filter(entry => masteredIds.includes(entry.id));
  const pool = preferred.length >= 4 ? preferred : library.entries.slice(0, 12);
  return pool.map((entry, index) => ({
    key: `vocabulary:${entry.id}`,
    source: { id: `practice-vocabulary-${entry.id}`, title: "Vocabulary practice" },
    question: {
      id: `practice-vocabulary-${entry.id}`,
      type: index % 2 ? "english-to-native" : "native-to-english",
      prompt: index % 2 ? `Choose the phrase for “${entry.english}”.` : `What does “${entry.native}” mean?`,
      answer: index % 2 ? entry.native : entry.english,
      options: [...new Set([index % 2 ? entry.native : entry.english, ...pool.filter(item => item.id !== entry.id).map(item => index % 2 ? item.native : item.english)])].slice(0, 4),
      explanation: `${entry.native} means “${entry.english}.”`
    }
  }));
}

function buildPools(language, progress, library) {
  const completed = new Set(progress.completedLessonIds || []);
  const course = language.units.flatMap(unit => unit.lessons)
    .filter(lesson => completed.has(lesson.id))
    .flatMap(lesson => (lesson.questions || []).map(question => ({ key: `course:${lesson.id}:${question.id}`, question, source: { id: lesson.id, title: lesson.title } })));
  const review = [...(progress.reviewQueue || [])].sort((a, b) => b.misses - a.misses).map(item => ({ key: item.reviewKey, question: item.question, source: { id: item.sourceId, title: item.sourceTitle }, reviewKey: item.reviewKey }));
  const vocabulary = vocabularyQuestions(library, progress.explore?.masteredEntryIds || []);
  const listening = course.filter(item => item.question.type === "listening" && item.question.audio);
  return { course, review, vocabulary, listening };
}

export default function PracticePage({ dark, language, progress, library, dailyTarget = 3, soundEnabled, onLoseHeart, onReviewQuestion, onComplete }) {
  const [mode, setMode] = useState(null);
  const pools = useMemo(() => buildPools(language, progress, library), [language, progress, library]);
  const selected = useMemo(() => {
    if (!mode) return [];
    if (mode === "review") return pools.review.slice(0, 10);
    if (mode === "vocabulary") return shuffle(pools.vocabulary).slice(0, 10);
    if (mode === "listening") return (pools.listening.length ? pools.listening : pools.vocabulary).slice(0, 10);
    const keys = new Set();
    return [...pools.review, ...pools.course, ...pools.vocabulary].filter(item => !keys.has(item.key) && keys.add(item.key)).slice(0, 10);
  }, [mode, pools]);
  if (mode && selected.length) return <PracticeSession dark={dark} mode={mode} items={selected} hearts={progress.hearts} languageId={language.id} soundEnabled={soundEnabled} onLoseHeart={onLoseHeart} onReviewQuestion={onReviewQuestion} onExit={() => setMode(null)} onComplete={(result) => { onComplete(result); setMode(null); }} />;
  const card = dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";
  const todayCount = progress.daily?.date === dateKey() ? progress.daily.completed : 0;
  return <div className="mx-auto max-w-4xl">
    <section className="afri-pattern overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#24745B] to-[#4338CA] p-6 text-white sm:p-8"><div className="flex items-center gap-5"><Lebo pose="learn" reaction="idle" languageId={language.id} className="h-28 w-28 shrink-0" decorative/><div><div className="text-xs font-black uppercase tracking-[.24em] text-white/60">Personalized · {language.language}</div><h1 className="mt-2 text-3xl font-black sm:text-4xl">Daily Practice</h1><p className="mt-2 font-semibold text-white/70">A short session shaped by what you have learned and what needs another look.</p></div></div><div className="mt-6"><div className="flex justify-between text-xs font-black"><span>Today’s goal</span><span>{Math.min(todayCount, dailyTarget)}/{dailyTarget} activities</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-white/15"><motion.div className="h-full rounded-full bg-[#F6C445]" animate={{width:`${Math.min(100, todayCount / dailyTarget * 100)}%`}}/></div></div></section>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">{modes.map(item => { const Icon = item.icon; const count = item.id === "review" ? pools.review.length : item.id === "vocabulary" ? pools.vocabulary.length : item.id === "listening" ? pools.listening.length : pools.review.length + pools.course.length + pools.vocabulary.length; const unavailable = item.id === "review" ? !pools.review.length : item.id === "listening" ? !pools.listening.length && !pools.vocabulary.length : !count; return <button key={item.id} disabled={unavailable || progress.hearts === 0} onClick={() => setMode(item.id)} className={`min-h-36 rounded-[1.6rem] border p-5 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${card} ${dark ? "hover:bg-white/6" : "hover:-translate-y-0.5 hover:shadow-lg"}`}><span className="grid size-12 place-items-center rounded-2xl" style={{color:item.color,backgroundColor:`${item.color}18`}}><Icon/></span><span className="mt-4 block text-xl font-black">{item.title}</span><span className="mt-1 block text-sm font-semibold opacity-50">{unavailable && item.id === "review" ? "Your review queue is clear." : item.id === "listening" && !pools.listening.length ? "Uses vocabulary until audio arrives." : item.text}</span></button>; })}</div>
    {progress.hearts === 0 && <div className="mt-4 rounded-2xl bg-[#C95D3A]/10 p-4 text-center font-bold text-[#C95D3A]">Recover a heart before starting practice.</div>}
  </div>;
}

function PracticeSession({ dark, mode, items, hearts, languageId, soundEnabled, onLoseHeart, onReviewQuestion, onExit, onComplete }) {
  const [index, setIndex] = useState(0); const [selected, setSelected] = useState(null); const [checked, setChecked] = useState(false); const [correctCount, setCorrectCount] = useState(0); const [mistakes, setMistakes] = useState(0);
  const item = items[index]; const question = item.question; const correct = normalizeAnswer(question, selected) === expectedAnswer(question); const percent = ((index + (checked ? 1 : 0)) / items.length) * 100;
  const submit = () => { if (selected == null || (Array.isArray(selected) && !selected.length)) return; setChecked(true); playUiSound(correct ? "correct" : "incorrect", soundEnabled); if (correct) setCorrectCount(value => value + 1); else { setMistakes(value => value + 1); onLoseHeart(); onReviewQuestion(question, item.source); } };
  const next = () => { if (index + 1 >= items.length) return onComplete({ mode, xp: correctCount * 4, correct: correctCount, total: items.length, mistakes }); setIndex(value => value + 1); setSelected(null); setChecked(false); };
  return <div className="mx-auto max-w-2xl">
    <div className="mb-7 flex items-center gap-3"><button onClick={onExit} className={`grid size-11 place-items-center rounded-xl ${dark ? "bg-white/6" : "bg-black/5"}`} aria-label="Exit practice"><X size={19}/></button><div className={`h-3 flex-1 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/10"}`}><motion.div className="h-full rounded-full bg-[#24745B]" animate={{width:`${percent}%`}}/></div><div className="flex items-center gap-1 font-black text-[#EF5B5B]"><Heart size={20} fill="currentColor"/>{hearts}</div></div>
    <div className="text-xs font-black uppercase tracking-[.22em] text-[#4338CA]">{mode} practice · {index + 1}/{items.length}</div>
    <h1 className="mt-2 text-3xl font-black">{question.prompt}</h1>
    <div className="mt-6"><QuestionRenderer question={question} dark={dark} checked={checked} value={selected} onChange={setSelected}/></div>
    {checked && <div className={`mt-5 flex items-start gap-3 rounded-2xl border p-4 ${correct ? "border-[#24745B]/30 bg-[#24745B]/10" : "border-[#C95D3A]/30 bg-[#C95D3A]/10"}`}><Lebo pose={correct ? "encourage" : "learn"} reaction={correct ? "correct" : "encourage"} languageId={languageId} className="size-16 shrink-0" decorative/>{correct ? <CheckCircle2 className="text-[#53B98A]"/> : <XCircle className="text-[#C95D3A]"/>}<div><div className="font-black">{correct ? "Strong answer!" : "Added to your review queue."}</div><div className="mt-1 text-sm font-semibold opacity-55">{question.explanation}</div></div></div>}
    <button disabled={!checked && (selected == null || (Array.isArray(selected) && !selected.length))} onPointerDown={hapticPress} onClick={checked ? next : submit} data-tone={checked ? correct ? "green" : "clay" : "orange"} className={`afri-press mt-7 min-h-14 w-full rounded-2xl font-black text-white disabled:opacity-30 ${checked ? correct ? "bg-[#24745B]" : "bg-[#C95D3A]" : "bg-[#F28C28]"}`}>{checked ? index + 1 >= items.length ? "Finish practice" : "Continue" : "Check"}</button>
  </div>;
}
