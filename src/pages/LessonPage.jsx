import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Heart, RotateCcw, Sparkles, X, XCircle } from "lucide-react";
import MiniConversation from "../components/MiniConversation";
import CultureCard from "../components/CultureCard";
import QuestionRenderer, { expectedAnswer, isAnswerComplete, normalizeAnswer } from "../components/lessons/QuestionRenderer";
import LessonReaction from "../components/lessons/LessonReaction";
import Lebo from "../components/ui/Lebo";
import LearningVisual from "../components/ui/LearningVisual";
import ConfettiBurst from "../components/ui/ConfettiBurst";
import { playUiSound } from "../services/uiSound";
import { hapticPress } from "../utils/hapticFeedback";
import { createLessonQueue, lessonMasterySummary, scheduleAdaptiveRetry } from "../utils/adaptiveLesson";
import { skillForQuestion, summarizeSkillEvidence } from "../utils/learnerMastery";

export default function LessonPage({ lesson, unit, dark, hearts, languageId, soundEnabled, isFirstLesson, isUnitChallenge, isCourseFinal, onExit, onLoseHeart, onReviewQuestion, onStrengthenQuestion, onRefillHearts, onComplete }) {
  const [stage, setStage] = useState("conversation");
  const [queue, setQueue] = useState(() => createLessonQueue(lesson.questions));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [earned, setEarned] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [results, setResults] = useState([]);
  const reduceMotion = useReducedMotion();
  const questionRef = useRef(null);

  const current = queue[index];

  useEffect(() => {
    if (stage === "quiz") questionRef.current?.focus({ preventScroll: true });
  }, [stage, index, current?.id]);

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
          <div className="text-center">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F28C28]">{lesson.title}</div>
            <div className={`mt-1 text-[10px] font-black uppercase tracking-[0.14em] ${dark ? "text-white/40" : "text-black/40"}`}>
              {lesson.reviewLabel ? `${lesson.reviewLabel} · ` : ""}{lesson.questions.length} questions
            </div>
          </div>
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
        mastery={lessonMasterySummary(results)}
        isFirstLesson={isFirstLesson}
        isUnitChallenge={isUnitChallenge}
        isCourseFinal={isCourseFinal}
        unit={unit}
        soundEnabled={soundEnabled}
        onContinue={() => onComplete({
          xp: lesson.xp + (isUnitChallenge ? 50 : 0),
          cultureCardId: lesson.cultureCard.id,
          mastery: lessonMasterySummary(results),
          skillEvidence: summarizeSkillEvidence(results),
          checkpoint: isUnitChallenge
        })}
      />
    );
  }

  const submittedAnswer = normalizeAnswer(current, selected);
  const correct = submittedAnswer === expectedAnswer(current);
  const answerComplete = isAnswerComplete(current, selected);
  const progress = Math.min(100, ((index + (checked ? 1 : 0)) / queue.length) * 100);
  const instruction = exerciseInstruction(current.type);

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
    if (!answerComplete) return;
    setChecked(true);
    playUiSound(correct ? "correct" : "incorrect", soundEnabled);

    if (submittedAnswer === expectedAnswer(current)) {
      setEarned(x => x + (current.retry ? 5 : 10));
      setResults(items => [...items, { questionId: current.id, skill: skillForQuestion(current), correct: true, retryAttempt: current.retryAttempt || 0 }]);
      if (current.retry) onStrengthenQuestion?.(current);
    } else {
      setMistakes(m => m + 1);
      setResults(items => [...items, { questionId: current.id, skill: skillForQuestion(current), correct: false, retryAttempt: current.retryAttempt || 0 }]);
      onLoseHeart();
      onReviewQuestion?.(current);
      setQueue(items => scheduleAdaptiveRetry(items, index, current));
    }
  };

  return (
    <div className="mx-auto max-w-3xl pb-28 sm:pb-8">
      <div className={`sticky top-0 z-20 -mx-4 mb-6 flex items-center gap-3 border-b px-4 py-3 backdrop-blur-xl sm:static sm:mx-0 sm:mb-8 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 ${dark ? "border-white/8 bg-[#101312]/90" : "border-black/8 bg-[#FFF8EE]/90"}`}>
        <button aria-label="Exit lesson" onClick={onExit} className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition hover:scale-105 ${dark ? "bg-white/6" : "bg-black/5"}`}>
          <X size={22} />
        </button>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.14em]">
            <span className={dark ? "text-white/45" : "text-black/45"}>{current.retry ? `Adaptive review · attempt ${current.retryAttempt}` : lesson.title}</span>
            <span className="text-[#F28C28]">{index + 1} / {queue.length}</span>
          </div>
          <div role="progressbar" aria-label="Lesson progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)} className={`h-3 flex-1 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/10"}`}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-[#F28C28] to-[#F6C445]" animate={{ width: `${progress}%` }} transition={{ type:"spring", stiffness:150, damping:22 }} />
          </div>
        </div>
        <div aria-label={`${hearts} hearts remaining`} className="flex min-w-12 items-center justify-end gap-1.5 font-black text-[#EF5B5B]">
          <Heart size={22} fill="currentColor" /> {hearts}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.section
          ref={questionRef}
          tabIndex={-1}
          aria-labelledby="lesson-question-prompt"
          key={`${current.id}-${current.retryAttempt || 0}`}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24, scale: .985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -20, scale: .985 }}
          transition={{ duration: .22, ease: "easeOut" }}
        >
          {current.retry && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#4338CA]/12 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-[#7067FF]">
              <RotateCcw size={15} /> Review
            </div>
          )}

          <div className={`mb-5 rounded-[1.6rem] border p-4 sm:rounded-[1.75rem] sm:p-7 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white shadow-sm"}`}>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#4338CA] sm:text-xs sm:tracking-[0.2em]">
              <span className="grid size-7 place-items-center rounded-lg bg-[#4338CA]/10">{current.retry ? <RotateCcw size={14} /> : "✦"}</span>
              {instruction}
            </div>
            <h1 id="lesson-question-prompt" className="mt-3 text-[1.45rem] font-black leading-[1.15] sm:mt-4 sm:text-4xl">{current.prompt}</h1>
          </div>

          <QuestionRenderer question={current} dark={dark} checked={checked} value={selected} onChange={setSelected} />

          {checked && (
            <motion.div
              role="status"
              aria-live="polite"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`mt-5 rounded-[1.5rem] border p-4 sm:mt-6 sm:p-5 ${
                correct
                  ? "border-[#24745B]/30 bg-[#24745B]/12"
                  : "border-[#C95D3A]/30 bg-[#C95D3A]/12"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`grid size-10 shrink-0 place-items-center rounded-xl ${correct ? "bg-[#24745B] text-white" : "bg-[#C95D3A] text-white"}`}>
                  {correct ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                </div>
                <div className="min-w-0">
                  <div className={`text-lg font-black ${correct ? dark ? "text-[#53B98A]" : "text-[#17664F]" : dark ? "text-[#E98B72]" : "text-[#9F3D27]"}`}>
                    {correct ? "Excellent!" : "Not quite."}
                  </div>
                  <div className={`mt-1 text-sm font-semibold leading-5 ${dark ? "text-white/60" : "text-black/60"}`}>
                    {current.explanation}
                  </div>
                  {!correct && (
                    <div className="mt-2 text-sm font-black">
                      Correct answer: <span className="text-[#24745B]">{current.answer || "Match each pair"}</span>
                    </div>
                  )}
                </div>
              </div>
              <LessonReaction correct={correct} questionIndex={index} languageId={languageId} dark={dark} />
            </motion.div>
          )}
        </motion.section>
      </AnimatePresence>

      <div className={`fixed inset-x-0 bottom-0 z-30 border-t p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:static sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0 ${dark ? "border-white/10 bg-[#101312]/95" : "border-black/8 bg-[#FFF8EE]/95"}`}>
        <div className="mx-auto max-w-3xl">
        {!checked ? (
          <button
            disabled={!answerComplete}
            onClick={checkAnswer}
            onPointerDown={hapticPress}
            data-tone={!answerComplete ? dark ? "locked-night" : "locked" : "orange"}
            className={`afri-press min-h-14 w-full rounded-[1.4rem] px-5 py-3 text-base font-black uppercase tracking-wide ${
              answerComplete
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
            className={`afri-press min-h-14 w-full rounded-[1.4rem] px-5 py-3 text-base font-black uppercase tracking-wide text-white ${
              correct ? "bg-[#24745B]" : "bg-[#C95D3A]"
            }`}
          >
            {index + 1 >= queue.length ? "Finish lesson" : "Continue"}
          </button>
        )}
        </div>
      </div>
    </div>
  );
}

function exerciseInstruction(type) {
  const labels = {
    "multiple-choice": "Choose the best answer",
    translate: "Choose the translation",
    "native-to-english": "Translate into English",
    "english-to-native": "Translate into the language",
    "fill-in-the-blank": "Complete the sentence",
    conversation: "Choose the natural response",
    "mini-conversation": "Continue the conversation",
    challenge: "Challenge question",
    "sentence-builder": "Build the sentence",
    match: "Match the pairs",
    matching: "Match the pairs",
    listening: "Listen and choose",
    "listen-and-select": "Listen and choose",
    "image-to-word": "Name what you see",
    "image-choice": "Choose the matching picture"
  };
  return labels[type] || type.replaceAll("-", " ");
}

function VisualWarmup({ vocabulary = [], dark }) {
  const words = vocabulary.filter(word => word.iconId || Number.isFinite(word.number)).slice(0, 10);
  if (!words.length) return null;
  return <section className="mt-6" aria-labelledby="visual-warmup-title"><div className="mb-3 flex items-end justify-between gap-3"><div><div className="text-xs font-black uppercase tracking-[.2em] text-[#4338CA]">See it. Say it.</div><h2 id="visual-warmup-title" className="mt-1 text-xl font-black">Visual warm-up</h2></div><span className={`text-xs font-bold ${dark ? "text-white/40" : "text-black/40"}`}>{words.length} words</span></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">{words.map((word, index) => <motion.article key={`${word.native}-${index}`} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:index*.035}} className={`overflow-hidden rounded-2xl border p-2 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}><LearningVisual iconId={word.iconId} number={word.number} label={word.english} className="aspect-square w-full"/><div className="px-1 pb-1 pt-2 text-center"><div className="truncate font-black">{word.native}</div><div className={`truncate text-xs font-semibold ${dark ? "text-white/45" : "text-black/45"}`}>{word.english}</div></div></motion.article>)}</div></section>;
}

function OutOfHearts({ dark, onExit, onRefill }) {
  return <div className="mx-auto max-w-xl text-center"><motion.div initial={{scale:.7, opacity:0}} animate={{scale:1, opacity:1}} className="mx-auto grid h-24 w-24 place-items-center rounded-[2rem] bg-[#EF5B5B]/15 text-5xl">💔</motion.div><h1 className="mt-6 text-4xl font-black">Out of hearts</h1><p className={`mx-auto mt-3 max-w-md leading-7 ${dark ? "text-white/55" : "text-black/55"}`}>One heart regenerates every 30 minutes. Recover one now with a quick practice refill and continue from the same question.</p><button onClick={onRefill} onPointerDown={hapticPress} data-tone="green" className="afri-press mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-[1.4rem] bg-[#24745B] px-5 text-lg font-black text-white"><Sparkles size={20}/>Practice refill · +1 heart</button><button onClick={onExit} className={`mt-3 min-h-12 w-full rounded-[1.2rem] font-black ${dark ? "bg-white/6" : "bg-black/5"}`}>Return to path</button></div>;
}

function Completion({ dark, lesson, unit, languageId, earned, mistakes, mastery, soundEnabled, isFirstLesson, isUnitChallenge, isCourseFinal, onContinue }) {
  const reduceMotion = useReducedMotion();
  const headingRef = useRef(null);
  const learnedWords = new Set((unit?.lessons || []).flatMap(item => item.vocabulary || []).map(item => item.native)).size;
  useEffect(() => playUiSound(isUnitChallenge ? "unit" : "complete", soundEnabled), [isUnitChallenge, soundEnabled]);
  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, []);
  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] px-1 pb-2 text-center" aria-live="polite">
      <ConfettiBurst count={isUnitChallenge ? 42 : 28} />
      <motion.div initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 170, damping: 12 }} className="relative mx-auto h-44 w-44 sm:h-60 sm:w-60">
        <div className="absolute inset-6 rounded-full bg-[#F6C445]/20 blur-sm" />
        {!reduceMotion && <motion.div aria-hidden className="absolute inset-0 rounded-full border-2 border-dashed border-[#F6C445]/45" animate={{rotate:360,scale:[.94,1.03,.94]}} transition={{rotate:{duration:12,repeat:Infinity,ease:"linear"},scale:{duration:2.2,repeat:Infinity,ease:"easeInOut"}}}/>} 
        <Lebo pose="celebrate" reaction="celebrate" languageId={languageId} className="relative h-full w-full" decorative />
        <motion.span initial={reduceMotion?false:{scale:0,rotate:-20}} animate={{scale:1,rotate:0}} transition={{delay:.35,type:"spring",stiffness:220}} className="absolute bottom-3 right-2 grid h-14 w-14 place-items-center rounded-2xl bg-[#F6C445] text-3xl shadow-xl" aria-hidden>🏆</motion.span>
      </motion.div>

      <h1 ref={headingRef} tabIndex={-1} className="mt-4 text-3xl font-black sm:mt-6 sm:text-4xl">{isCourseFinal ? "Course path complete!" : isUnitChallenge ? "Unit complete!" : "Lesson complete!"}</h1>
      <p className={`mt-2 font-semibold ${dark ? "text-white/55" : "text-black/55"}`}>
        {mistakes === 0 ? "Perfect run. Beautiful work." : "You finished strong — and reviewed what you missed."}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
        <Reward dark={dark} label="Lesson XP" value={`+${lesson.xp + (isUnitChallenge ? 50 : 0)} XP`} accent="#F6C445" />
        <Reward dark={dark} label="Practice XP" value={`+${earned} XP`} accent="#F28C28" />
        <Reward dark={dark} label="Accuracy" value={`${Math.round((lesson.questions.length / (lesson.questions.length + mistakes)) * 100)}%`} accent="#53B98A" />
      </div>

      {mastery.recovered > 0 && <div className={`mt-5 rounded-[1.5rem] border p-4 text-left ${dark ? "border-[#4338CA]/30 bg-[#4338CA]/12" : "border-[#4338CA]/20 bg-[#4338CA]/10"}`}><div className="text-xs font-black uppercase tracking-wider text-[#7067FF]">Adaptive practice complete</div><div className="mt-1 text-base font-black sm:text-lg">{mastery.recovered} {mastery.recovered === 1 ? "concept" : "concepts"} recovered before finishing</div><p className="mt-1 hidden text-sm font-semibold opacity-55 sm:block">Missed ideas returned after a short gap, so you had to recall them—not simply copy the correction.</p></div>}

      {isUnitChallenge && <div className={`mt-5 rounded-[1.5rem] border p-4 text-left sm:p-5 ${dark ? "border-white/10 bg-white/5" : "border-black/8 bg-white"}`}><div className="text-xs font-black uppercase tracking-[.18em] text-[#4338CA]">What you can do now</div><div className="mt-2 text-xl font-black">{unit?.title}</div><p className="mt-2 hidden text-sm font-semibold leading-6 opacity-55 sm:block">{unit?.subtitle || "Use this unit’s language in context."}</p><div className="mt-3 inline-flex rounded-full bg-[#24745B]/15 px-3 py-1.5 text-xs font-black text-[#24745B]">{learnedWords} key expressions practised</div></div>}

      {(isFirstLesson || isUnitChallenge || mistakes === 0) && <motion.div initial={{opacity:0, scale:.96}} animate={{opacity:1, scale:1}} className={`mt-5 rounded-[1.5rem] border p-4 text-left ${dark ? "border-[#F6C445]/25 bg-[#F6C445]/10" : "border-[#F6C445]/35 bg-[#F6C445]/15"}`}><div className="text-xs font-black uppercase tracking-wider text-[#F28C28]">{isFirstLesson ? "New achievement" : isUnitChallenge ? "Unit reward" : "Perfect lesson"}</div><div className="mt-1 text-lg font-black">{isFirstLesson ? "👣 First Steps unlocked" : isUnitChallenge ? "🏆 Challenge cleared · +50 bonus XP" : "✨ Flawless finish"}</div></motion.div>}

      <div className="mt-5 text-left">
        <CultureCard card={lesson.cultureCard} dark={dark} collectible />
      </div>

      <button
        onClick={onContinue}
        onPointerDown={hapticPress}
        className="afri-press mt-6 w-full rounded-[1.4rem] bg-[#F28C28] py-4 text-lg font-black uppercase text-white"
      >
        {isCourseFinal ? "Claim graduation reward" : "Collect & continue"}
      </button>
    </div>
  );
}

function Reward({ dark, label, value, accent }) {
  return (
    <div className={`rounded-[1.1rem] border p-2.5 sm:rounded-[1.5rem] sm:p-4 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}>
      <div className={`text-[9px] font-black uppercase tracking-wide sm:text-xs sm:tracking-wider ${dark ? "text-white/40" : "text-black/40"}`}>{label}</div>
      <div className="mt-1 text-lg font-black sm:text-2xl" style={{ color: accent }}>{value}</div>
    </div>
  );
}
