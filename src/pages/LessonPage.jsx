import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Heart, RotateCcw, Sparkles, X, XCircle } from "lucide-react";
import MiniConversation from "../components/MiniConversation";
import CultureCard from "../components/CultureCard";
import QuestionRenderer, { expectedAnswer, normalizeAnswer } from "../components/lessons/QuestionRenderer";
import Lebo from "../components/ui/Lebo";
import LearningVisual from "../components/ui/LearningVisual";
import ConfettiBurst from "../components/ui/ConfettiBurst";
import { playUiSound } from "../services/uiSound";
import { hapticPress } from "../utils/hapticFeedback";

export default function LessonPage({ lesson, dark, hearts, languageId, soundEnabled, isFirstLesson, isUnitChallenge, onExit, onLoseHeart, onReviewQuestion, onRefillHearts, onComplete }) {
  const [stage, setStage] = useState("conversation");
  const [queue, setQueue] = useState(() => lesson.questions.map((q) => ({ ...q, retry: false })));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [earned, setEarned] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const current = queue[index];

  if (stage === "hearts") {
    return <OutOfHearts dark={dark} onExit={onExit} onRefill={() => { onRefillHearts(); setStage("quiz"); }} />;
  }

  if (stage === "conversation") {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <button aria-label="Exit lesson" onClick={onExit} className={`grid h-11 w-11 place-items-center rounded-xl ${dark ? "bg-white/6" : "bg-black/5"}`}>
            <X size={22} />
          </button>
          <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F28C28]">{lesson.title}</div>
          <div className="w-10" />
        </div>

        <MiniConversation conversation={lesson.conversation} dark={dark} />

        <VisualWarmup vocabulary={lesson.vocabulary} dark={dark} />

        <button
          onClick={() => hearts > 0 ? setStage("quiz") : setStage("hearts")}
          onPointerDown={hapticPress}
          className="afri-press mt-6 w-full rounded-[1.4rem] bg-[#F28C28] py-4 text-lg font-black uppercase tracking-wide text-white"
        >
          Start lesson
        </button>
      </div>
    );
  }

  if (stage === "complete") {
    return (
      <Completion
        dark={dark}
        lesson={lesson}
        languageId={languageId}
        earned={earned}
        mistakes={mistakes}
        isFirstLesson={isFirstLesson}
        isUnitChallenge={isUnitChallenge}
        soundEnabled={soundEnabled}
        onContinue={() => onComplete({
          xp: lesson.xp + (isUnitChallenge ? 50 : 0),
          cultureCardId: lesson.cultureCard.id
        })}
      />
    );
  }

  const submittedAnswer = normalizeAnswer(current, selected);
  const correct = submittedAnswer === expectedAnswer(current);
  const progress = Math.min(100, ((index + (checked ? 1 : 0)) / queue.length) * 100);

  const continueFlow = () => {
    if (hearts <= 0 && !correct) {
      setStage("hearts");
      return;
    }
    if (index + 1 >= queue.length) {
      setStage("complete");
      return;
    }
    setIndex(i => i + 1);
    setSelected(null);
    setChecked(false);
  };

  const checkAnswer = () => {
    if (selected == null || (Array.isArray(selected) && selected.length === 0)) return;
    setChecked(true);
    playUiSound(correct ? "correct" : "incorrect", soundEnabled);

    if (submittedAnswer === expectedAnswer(current)) {
      setEarned(x => x + (current.retry ? 5 : 10));
    } else {
      setMistakes(m => m + 1);
      onLoseHeart();
      onReviewQuestion?.(current);

      const alreadyQueued = queue.some((q, i) => i > index && q.id === current.id);
      if (!alreadyQueued) {
        setQueue(q => [...q, { ...current, retry: true }]);
      }
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center gap-4">
        <button aria-label="Exit lesson" onClick={onExit} className={`grid h-11 w-11 place-items-center rounded-xl ${dark ? "bg-white/6" : "bg-black/5"}`}>
          <X size={22} />
        </button>
        <div role="progressbar" aria-label="Lesson progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)} className={`h-4 flex-1 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/10"}`}>
          <motion.div className="h-full rounded-full bg-[#F28C28]" animate={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-1.5 font-black text-[#EF5B5B]">
          <Heart size={22} fill="currentColor" /> {hearts}
        </div>
      </div>

      {current.retry && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#4338CA]/12 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-[#7067FF]">
          <RotateCcw size={15} /> Review
        </div>
      )}

      <div className="mb-7">
        <div className="text-xs font-black uppercase tracking-[0.25em] text-[#4338CA]">
          {current.type.replaceAll("-", " ")}
        </div>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">{current.prompt}</h1>
      </div>

      <QuestionRenderer question={current} dark={dark} checked={checked} value={selected} onChange={setSelected} />

      <AnimatePresence>
        {checked && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 rounded-[1.5rem] border p-4 ${
              correct
                ? "border-[#24745B]/30 bg-[#24745B]/12"
                : "border-[#C95D3A]/30 bg-[#C95D3A]/12"
            }`}
          >
            <div className="flex items-start gap-3">
              <Lebo key={`${current.id}-${correct}`} pose={correct ? "encourage" : "learn"} reaction={correct ? "correct" : "encourage"} languageId={languageId} className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" decorative />
              {correct ? <CheckCircle2 className="text-[#53B98A]" /> : <XCircle className="text-[#E47A5D]" />}
              <div>
                <div className={`font-black ${correct ? "text-[#53B98A]" : "text-[#E47A5D]"}`}>
                  {correct ? "Excellent!" : "Not quite."}
                </div>
                <div className={`mt-1 text-sm font-semibold ${dark ? "text-white/60" : "text-black/60"}`}>
                  {current.explanation}
                </div>
                {!correct && (
                  <div className="mt-2 text-sm font-black">
                    Correct answer: <span className="text-[#24745B]">{current.answer || "Match each pair"}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8">
        {!checked ? (
          <button
            disabled={selected == null || (Array.isArray(selected) && selected.length === 0)}
            onClick={checkAnswer}
            onPointerDown={hapticPress}
            data-tone={selected == null || (Array.isArray(selected) && selected.length === 0) ? dark ? "locked-night" : "locked" : "orange"}
            className={`afri-press w-full rounded-[1.4rem] py-4 text-lg font-black uppercase tracking-wide ${
              selected != null && (!Array.isArray(selected) || selected.length > 0)
                ? "bg-[#F28C28] text-white shadow-lg shadow-orange-500/20"
                : dark
                ? "bg-white/8 text-white/25"
                : "bg-black/8 text-black/25"
            }`}
          >
            Check
          </button>
        ) : (
          <button
            onClick={continueFlow}
            onPointerDown={hapticPress}
            data-tone={correct ? "green" : "clay"}
            className={`afri-press w-full rounded-[1.4rem] py-4 text-lg font-black uppercase tracking-wide text-white ${
              correct ? "bg-[#24745B]" : "bg-[#C95D3A]"
            }`}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

function VisualWarmup({ vocabulary = [], dark }) {
  const words = vocabulary.filter(word => word.iconId || Number.isFinite(word.number)).slice(0, 10);
  if (!words.length) return null;
  return <section className="mt-6" aria-labelledby="visual-warmup-title"><div className="mb-3 flex items-end justify-between gap-3"><div><div className="text-xs font-black uppercase tracking-[.2em] text-[#4338CA]">See it. Say it.</div><h2 id="visual-warmup-title" className="mt-1 text-xl font-black">Visual warm-up</h2></div><span className={`text-xs font-bold ${dark ? "text-white/40" : "text-black/40"}`}>{words.length} words</span></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">{words.map((word, index) => <motion.article key={`${word.native}-${index}`} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:index*.035}} className={`overflow-hidden rounded-2xl border p-2 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}><LearningVisual iconId={word.iconId} number={word.number} label={word.english} className="aspect-square w-full"/><div className="px-1 pb-1 pt-2 text-center"><div className="truncate font-black">{word.native}</div><div className={`truncate text-xs font-semibold ${dark ? "text-white/45" : "text-black/45"}`}>{word.english}</div></div></motion.article>)}</div></section>;
}

function OutOfHearts({ dark, onExit, onRefill }) {
  return <div className="mx-auto max-w-xl text-center"><motion.div initial={{scale:.7, opacity:0}} animate={{scale:1, opacity:1}} className="mx-auto grid h-24 w-24 place-items-center rounded-[2rem] bg-[#EF5B5B]/15 text-5xl">💔</motion.div><h1 className="mt-6 text-4xl font-black">Out of hearts</h1><p className={`mx-auto mt-3 max-w-md leading-7 ${dark ? "text-white/55" : "text-black/55"}`}>One heart regenerates every 30 minutes. Recover one now with a quick practice refill and continue from the same question.</p><button onClick={onRefill} onPointerDown={hapticPress} data-tone="green" className="afri-press mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-[1.4rem] bg-[#24745B] px-5 text-lg font-black text-white"><Sparkles size={20}/>Practice refill · +1 heart</button><button onClick={onExit} className={`mt-3 min-h-12 w-full rounded-[1.2rem] font-black ${dark ? "bg-white/6" : "bg-black/5"}`}>Return to path</button></div>;
}

function Completion({ dark, lesson, languageId, earned, mistakes, soundEnabled, isFirstLesson, isUnitChallenge, onContinue }) {
  const reduceMotion = useReducedMotion();
  useEffect(() => playUiSound(isUnitChallenge ? "unit" : "complete", soundEnabled), [isUnitChallenge, soundEnabled]);
  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] px-1 pb-2 text-center" aria-live="polite">
      <ConfettiBurst count={isUnitChallenge ? 42 : 28} />
      <motion.div initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 170, damping: 12 }} className="relative mx-auto h-52 w-52 sm:h-60 sm:w-60">
        <div className="absolute inset-6 rounded-full bg-[#F6C445]/20 blur-sm" />
        {!reduceMotion && <motion.div aria-hidden className="absolute inset-0 rounded-full border-2 border-dashed border-[#F6C445]/45" animate={{rotate:360,scale:[.94,1.03,.94]}} transition={{rotate:{duration:12,repeat:Infinity,ease:"linear"},scale:{duration:2.2,repeat:Infinity,ease:"easeInOut"}}}/>} 
        <Lebo pose="celebrate" reaction="celebrate" languageId={languageId} className="relative h-full w-full" decorative />
        <motion.span initial={reduceMotion?false:{scale:0,rotate:-20}} animate={{scale:1,rotate:0}} transition={{delay:.35,type:"spring",stiffness:220}} className="absolute bottom-3 right-2 grid h-14 w-14 place-items-center rounded-2xl bg-[#F6C445] text-3xl shadow-xl" aria-hidden>🏆</motion.span>
      </motion.div>

      <h1 className="mt-6 text-4xl font-black">Lesson complete!</h1>
      <p className={`mt-2 font-semibold ${dark ? "text-white/55" : "text-black/55"}`}>
        {mistakes === 0 ? "Perfect run. Beautiful work." : "You finished strong — and reviewed what you missed."}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Reward dark={dark} label="Lesson XP" value={`+${lesson.xp + (isUnitChallenge ? 50 : 0)} XP`} accent="#F6C445" />
        <Reward dark={dark} label="Practice XP" value={`+${earned} XP`} accent="#F28C28" />
        <Reward dark={dark} label="Accuracy" value={`${Math.round((lesson.questions.length / (lesson.questions.length + mistakes)) * 100)}%`} accent="#53B98A" />
      </div>

      {(isFirstLesson || isUnitChallenge || mistakes === 0) && <motion.div initial={{opacity:0, scale:.96}} animate={{opacity:1, scale:1}} className={`mt-5 rounded-[1.5rem] border p-4 text-left ${dark ? "border-[#F6C445]/25 bg-[#F6C445]/10" : "border-[#F6C445]/35 bg-[#F6C445]/15"}`}><div className="text-xs font-black uppercase tracking-wider text-[#F28C28]">{isFirstLesson ? "New achievement" : isUnitChallenge ? "Unit reward" : "Perfect lesson"}</div><div className="mt-1 text-lg font-black">{isFirstLesson ? "👣 First Steps unlocked" : isUnitChallenge ? "🏆 Challenge cleared · +50 bonus XP" : "✨ Flawless finish"}</div></motion.div>}

      <div className="mt-5 text-left">
        <CultureCard card={lesson.cultureCard} dark={dark} collectible />
      </div>

      <button
        onClick={onContinue}
        onPointerDown={hapticPress}
        className="afri-press mt-6 w-full rounded-[1.4rem] bg-[#F28C28] py-4 text-lg font-black uppercase text-white"
      >
        Collect & continue
      </button>
    </div>
  );
}

function Reward({ dark, label, value, accent }) {
  return (
    <div className={`rounded-[1.5rem] border p-4 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}>
      <div className={`text-xs font-black uppercase tracking-wider ${dark ? "text-white/40" : "text-black/40"}`}>{label}</div>
      <div className="mt-1 text-2xl font-black" style={{ color: accent }}>{value}</div>
    </div>
  );
}
