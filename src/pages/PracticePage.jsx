import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, ChevronRight, Dumbbell, Headphones, Heart, RotateCcw, Sparkles, Target, Trophy, X, XCircle } from "lucide-react";
import QuestionRenderer, { expectedAnswer, normalizeAnswer } from "../components/lessons/QuestionRenderer";
import Lebo from "../components/ui/Lebo";
import { dateKey } from "../utils/dateKey";
import { playUiSound } from "../services/uiSound";
import { hapticPress } from "../utils/hapticFeedback";
import SidekickPortrait from "../components/ui/SidekickPortrait";
import { sidekicks } from "../data/sidekicks";

const modes = [
  { id: "smart", title: "Smart practice", text: "Mistakes first, then concepts you have already met.", icon: Sparkles, color: "#F28C28" },
  { id: "review", title: "Weak spots", text: "Focus only on questions in your review queue.", icon: RotateCcw, color: "#C95D3A" },
  { id: "vocabulary", title: "Vocabulary", text: "Refresh useful words from your Explore library.", icon: BookOpen, color: "#24745B" },
  { id: "listening", title: "Listening-ready", text: "Practice audio questions when recordings are available.", icon: Headphones, color: "#4338CA" }
];

const practiceCrew = { smart:"zuri", review:"kobby", vocabulary:"nia", listening:"taji" };

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
  const todayPractice = progress.practice?.date === dateKey() ? progress.practice : { sessions:0, xp:0 };
  const recommendedMode = pools.review.length ? "review" : pools.course.length ? "smart" : "vocabulary";
  const recommended = modes.find(item => item.id === recommendedMode);
  const recommendedCount = recommendedMode === "review" ? pools.review.length : recommendedMode === "vocabulary" ? pools.vocabulary.length : pools.review.length + pools.course.length + pools.vocabulary.length;
  const guide = sidekicks.find(item => item.id === practiceCrew[recommendedMode]) || sidekicks[0];
  return <div className="mx-auto max-w-4xl">
    <section className="afri-pattern relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#24745B] via-[#205d4c] to-[#4338CA] p-6 text-white sm:p-8"><div className="absolute -right-16 -top-20 size-72 rounded-full bg-[#F6C445]/10"/><div className="relative grid items-center gap-5 sm:grid-cols-[minmax(0,1fr)_10rem]"><div><div className="text-xs font-black uppercase tracking-[.24em] text-[#F6C445]">Personalized · {language.language}</div><h1 className="mt-2 text-4xl font-black sm:text-5xl">Build your reflexes.</h1><p className="mt-3 max-w-xl font-semibold leading-7 text-white/70">Train what you know, revisit what slipped, and turn today’s practice into lasting recall.</p><div className="mt-5 flex flex-wrap gap-2 text-xs font-black"><span className="rounded-full bg-white/12 px-3 py-2">{todayPractice.sessions} sessions today</span><span className="rounded-full bg-white/12 px-3 py-2">+{todayPractice.xp} practice XP</span><span className="rounded-full bg-white/12 px-3 py-2">{pools.review.length} weak spots</span></div></div><Lebo pose="learn" reaction="idle" languageId={language.id} className="mx-auto size-40" decorative/></div><div className="relative mt-6"><div className="flex justify-between text-xs font-black"><span>Today’s goal</span><span>{Math.min(todayCount, dailyTarget)}/{dailyTarget} activities</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-white/15"><motion.div className="h-full rounded-full bg-[#F6C445]" animate={{width:`${Math.min(100, todayCount / dailyTarget * 100)}%`}}/></div></div></section>

    <section className="relative mt-5 overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#F28C28] to-[#C95D3A] p-5 text-white sm:p-7"><div className="absolute -right-8 -top-10 text-[9rem] opacity-10">🎯</div><div className="relative grid items-center gap-5 sm:grid-cols-[minmax(0,1fr)_9rem]"><div><div className="text-xs font-black uppercase tracking-[.22em] text-white/65">Recommended next</div><h2 className="mt-2 text-3xl font-black">{recommended.title}</h2><p className="mt-2 max-w-xl font-semibold leading-6 text-white/75">{recommendedMode==="review"?`${recommendedCount} missed ${recommendedCount===1?"concept is":"concepts are"} ready for another look.`:recommended.text}</p><button disabled={!recommendedCount||progress.hearts===0} onClick={()=>setMode(recommendedMode)} onPointerDown={hapticPress} className="afri-press mt-5 flex min-h-14 items-center gap-2 rounded-2xl bg-white px-6 font-black text-[#C95D3A] disabled:opacity-40">Start recommended session <ChevronRight size={19}/></button></div><SidekickPortrait character={guide} className="mx-auto size-36 rounded-[2rem] bg-white/15" eager/></div></section>

    <div className="mt-9 flex items-end justify-between"><div><div className="text-xs font-black uppercase tracking-[.2em] text-[#F28C28]">Your training journey</div><h2 className="mt-1 text-3xl font-black">Choose your focus</h2></div><div className="hidden items-center gap-2 rounded-full bg-[#F6C445]/15 px-3 py-2 text-xs font-black sm:flex"><Trophy size={16} className="text-[#F28C28]"/>{todayPractice.sessions} completed</div></div>
    <div className="relative mt-6 space-y-4 before:absolute before:bottom-10 before:left-[1.45rem] before:top-10 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-[#F28C28] before:via-[#24745B] before:to-[#4338CA] sm:before:left-[2rem]">{modes.map((item,index) => { const Icon=item.icon; const count=item.id==="review"?pools.review.length:item.id==="vocabulary"?pools.vocabulary.length:item.id==="listening"?(pools.listening.length||pools.vocabulary.length):pools.review.length+pools.course.length+pools.vocabulary.length; const unavailable=item.id==="review"?!pools.review.length:item.id==="listening"?!pools.listening.length&&!pools.vocabulary.length:!count; const character=sidekicks.find(member=>member.id===practiceCrew[item.id]); return <button key={item.id} disabled={unavailable||progress.hearts===0} onClick={()=>setMode(item.id)} onPointerDown={hapticPress} className={`afri-press relative flex min-h-32 w-full items-center gap-4 rounded-[1.7rem] border p-4 pl-16 text-left disabled:cursor-not-allowed disabled:opacity-40 sm:gap-6 sm:p-6 sm:pl-24 ${card}`}><span className="absolute left-3 z-10 grid size-12 place-items-center rounded-2xl border-4 border-white text-lg font-black text-white shadow-lg sm:left-5 sm:size-14" style={{backgroundColor:item.color}}>{index+1}</span><SidekickPortrait character={character} className="hidden size-20 rounded-2xl bg-[#F6C445]/15 sm:block"/><span className="min-w-0 flex-1"><span className="flex items-center gap-2 text-xs font-black uppercase tracking-[.16em]" style={{color:item.color}}><Icon size={16}/>{unavailable?"Not ready":`${count} available`}</span><span className="mt-1 block text-2xl font-black">{item.title}</span><span className={`mt-1 block text-sm font-semibold leading-6 ${dark?"text-white/45":"text-black/45"}`}>{unavailable&&item.id==="review"?"Your review queue is clear — nice work.":item.id==="listening"&&!pools.listening.length?"Uses vocabulary practice until verified audio arrives.":item.text}</span></span><ChevronRight className="shrink-0 opacity-30"/></button>;})}</div>
    <div className={`mt-5 flex items-center gap-4 rounded-[1.5rem] border p-4 ${card}`}><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#24745B]/15 text-[#24745B]"><Target/></span><div><div className="font-black">Practice adapts as you learn</div><p className="mt-1 text-sm font-semibold opacity-50">Completed lessons, Explore vocabulary, and missed questions automatically shape these sessions.</p></div></div>
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
