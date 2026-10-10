import { useEffect, useMemo, useState } from "react";
import { Check, Image, X } from "lucide-react";
import { motion } from "framer-motion";
import AudioButton from "../ui/AudioButton";
import ConceptIcon from "../ui/ConceptIcon";
import LearningVisual from "../ui/LearningVisual";
import SafeArtwork from "../ui/SafeArtwork";
import PronunciationRecorder from "../ui/PronunciationRecorder";
import { hapticPress } from "../../utils/hapticFeedback";
export { expectedAnswer, isAnswerComplete, normalizeAnswer } from "../../utils/answerEvaluation";

const choiceTypes = new Set(["multiple-choice", "translate", "native-to-english", "english-to-native", "fill-in-the-blank", "conversation", "mini-conversation", "challenge"]);
const shuffled = (values = []) => [...values].sort(() => Math.random() - 0.5);

export default function QuestionRenderer({ question, dark, checked, value, onChange, compact = false }) {
  const options = useMemo(() => shuffled(question.options), [question.id, question.retry, question.retryAttempt]);
  if (["sentence-builder", "word-bank"].includes(question.type)) return <SentenceBuilder question={question} value={value || []} onChange={onChange} dark={dark} checked={checked} compact={compact} />;
  if (["match", "matching"].includes(question.type)) return <Matching question={question} value={value || []} onChange={onChange} dark={dark} checked={checked} compact={compact} />;
  if (question.type === "listening") return <ChoiceGrid question={question} options={options} value={value} onChange={onChange} dark={dark} checked={checked} compact={compact} header={<AudioButton src={question.audio} label={question.prompt} className={`${compact ? "mb-3" : "mb-5"} bg-[#4338CA] font-black text-white`} />} />;
  if (question.type === "listen-and-select") return <ChoiceGrid question={question} options={options} value={value} onChange={onChange} dark={dark} checked={checked} compact={compact} images header={<AudioButton src={question.audio} label={question.prompt} className={`${compact ? "mb-3" : "mb-5"} bg-[#4338CA] font-black text-white`} />} />;
  if (question.type === "listen-and-type") return <TypedAnswer question={question} value={value || ""} onChange={onChange} dark={dark} checked={checked} listening />;
  if (question.type === "speaking") return <SpeakingExercise question={question} value={value} onChange={onChange} dark={dark} checked={checked} />;
  if (question.type === "image-to-word") return <ChoiceGrid question={question} options={options} value={value} onChange={onChange} dark={dark} checked={checked} compact={compact} header={<ConceptIcon iconId={question.iconId} className={`mx-auto w-full max-w-xs ${compact ? "mb-3 h-24 sm:h-32" : "mb-6 h-40"}`} />} />;
  if (question.type === "image-choice") return <ChoiceGrid question={question} options={options} value={value} onChange={onChange} dark={dark} checked={checked} compact={compact} images />;
  if (choiceTypes.has(question.type) || question.options) return <ChoiceGrid question={question} options={options} value={value} onChange={onChange} dark={dark} checked={checked} compact={compact} images={question.visualOptions} />;
  return <div className="rounded-2xl border border-[#C95D3A]/30 bg-[#C95D3A]/10 p-5 font-semibold">This exercise type is not available yet.</div>;
}
function TypedAnswer({ question, value, onChange, dark, checked, listening = false }) {
  return <div>{listening && <AudioButton src={question.audio} label={question.prompt} className="mb-5 bg-[#4338CA] font-black text-white" />}<label className="block"><span className="sr-only">Type your answer</span><input autoComplete="off" autoCapitalize="none" spellCheck="false" disabled={checked} value={value} onChange={event => onChange(event.target.value)} placeholder={question.placeholder || "Type what you hear"} className={`min-h-16 w-full rounded-[1.4rem] border-2 px-5 text-lg font-black outline-none transition focus:border-[#F28C28] ${dark ? "border-white/12 bg-[#1A201E] text-white placeholder:text-white/25" : "border-black/10 bg-white placeholder:text-black/30"}`} /></label></div>;
}

function SpeakingExercise({ question, value, onChange, dark, checked }) {
  return <div className={`rounded-[1.5rem] border p-5 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}><div className="text-sm font-bold opacity-55">Say this aloud</div><div className="mt-2 text-3xl font-black">{question.native || question.answer}</div>{question.audio && <AudioButton src={question.audio} label={`Hear ${question.native || question.answer}`} className="mt-4 bg-[#4338CA] font-black text-white" />}<PronunciationRecorder label={question.native || question.answer} dark={dark} onRecorded={recorded => !checked && onChange(recorded ? question.answer : null)} /><p className="mt-3 text-xs font-semibold opacity-45">Record and listen back. Pronunciation scoring will only be added after verified speech models are available.</p></div>;
}

function ChoiceGrid({ question, options, value, onChange, dark, checked, header, images = false, compact = false }) {
  return <>{header}<div className={`grid ${compact ? "gap-2.5" : "gap-3"} ${images ? "grid-cols-2" : "sm:grid-cols-2"}`}>{options.map((raw, index) => {
    const option = typeof raw === "object" ? raw.value ?? raw.label : raw;
    const label = typeof raw === "object" ? raw.label ?? raw.value : raw;
    const visualLabel = typeof raw === "object" ? raw.visualLabel ?? label : label;
    const showLabel = typeof raw !== "object" || raw.showLabel !== false;
    const correct = checked && option === question.answer;
    const wrong = checked && value === option && option !== question.answer;
    return <motion.button key={option} aria-pressed={value === option} disabled={checked} whileTap={checked ? undefined : { scale: .985 }} onPointerDown={hapticPress} onClick={() => onChange(option)} data-tone={correct ? "green" : wrong ? "clay" : dark ? "night" : "surface"} className={`afri-press group relative rounded-[1.25rem] border-2 text-left font-black transition ${compact ? images ? "min-h-0 p-2 text-sm" : "min-h-14 p-3 text-base" : "min-h-16 p-4 text-base sm:p-5 sm:text-lg"} ${correct ? "border-[#24745B] bg-[#24745B]/15" : wrong ? "border-[#C95D3A] bg-[#C95D3A]/12" : value === option ? "border-[#F28C28] bg-[#F28C28]/12" : dark ? "border-white/10 bg-[#1A201E] hover:border-white/20" : "border-black/8 bg-white hover:border-[#F28C28]/35"}`}>
      {images && <div className={`${compact ? "mb-2 aspect-[5/3]" : "mb-3 aspect-[4/3]"} grid place-items-center overflow-hidden rounded-xl bg-black/5`}>{raw.iconId || Number.isFinite(raw.number) ? <LearningVisual iconId={raw.iconId} number={raw.number} label={visualLabel} className="h-full w-full" /> : raw.image ? <SafeArtwork src={raw.image} alt={visualLabel} fallbackLabel={visualLabel} className="h-full w-full object-cover object-center" /> : raw.emoji ? <span role="img" aria-label={visualLabel} className={compact ? "text-4xl" : "text-5xl"}>{raw.emoji}</span> : <Image aria-label={visualLabel} className="opacity-30" />}</div>}<span className="flex items-center gap-2.5"><span aria-hidden className={`grid size-7 shrink-0 place-items-center rounded-lg text-[11px] font-black ${correct ? "bg-[#24745B] text-white" : wrong ? "bg-[#C95D3A] text-white" : value === option ? "bg-[#F28C28] text-white" : dark ? "bg-white/8 text-white/45" : "bg-black/5 text-black/40"}`}>{correct ? <Check size={16} strokeWidth={3}/> : wrong ? <X size={16} strokeWidth={3}/> : String.fromCharCode(65 + index)}</span><span className={showLabel ? "" : "sr-only"}>{label}</span></span>
    </motion.button>;
  })}</div></>;
}

function SentenceBuilder({ question, value, onChange, dark, checked, compact = false }) {
  const tiles = useMemo(() => shuffled(question.tiles || question.answer.split(" ")), [question.id, question.retry, question.retryAttempt]);
  return <div>
    <div className={`${compact ? "min-h-20" : "min-h-24"} rounded-2xl border-2 border-dashed p-3 ${dark ? "border-white/15 bg-white/[.025]" : "border-black/15 bg-black/[.02]"}`}>
      {!value.length && <div className={`grid ${compact ? "min-h-12" : "min-h-16"} place-items-center text-sm font-bold ${dark ? "text-white/55" : "text-black/55"}`}>Tap words below to build your answer</div>}
      {value.map((word, i) => <button disabled={checked} key={`${word}-${i}`} onPointerDown={hapticPress} onClick={() => onChange(value.filter((_, n) => n !== i))} className="afri-press m-1 rounded-xl bg-[#F28C28] px-4 py-3 font-black text-white">{word}</button>)}
    </div>
    <div className="mt-4 flex flex-wrap gap-3">{tiles.map((word, i) => <button disabled={checked || value.filter(v => v === word).length >= tiles.filter((v, n) => v === word && n <= i).length} key={`${word}-${i}`} onPointerDown={hapticPress} onClick={() => onChange([...value, word])} data-tone={dark ? "night" : "surface"} className={`afri-press rounded-xl px-4 py-3 font-black disabled:opacity-25 ${dark ? "bg-white/10" : "bg-black/8"}`}>{word}</button>)}</div>
  </div>;
}

function Matching({ question, value, onChange, dark, checked, compact = false }) {
  const pairs = question.pairs || [];
  const indexedPairs = useMemo(() => pairs.map((pair, index) => ({ ...pair, pairId: `${question.id || "match"}-${index}` })), [pairs, question.id]);
  const nativePairs = useMemo(() => shuffled(indexedPairs), [indexedPairs, question.retry, question.retryAttempt]);
  const englishPairs = useMemo(() => {
    if (nativePairs.length < 2) return nativePairs;
    const offset = 1 + Math.floor(Math.random() * (nativePairs.length - 1));
    return nativePairs.map((_, index) => nativePairs[(index + offset) % nativePairs.length]);
  }, [nativePairs]);
  const [pending, setPending] = useState(null);
  useEffect(() => setPending(null), [question.id, question.retry, question.retryAttempt]);
  const usedNative = new Set(value.map(match => typeof match === "object" ? match.nativeId : match.split("::")[0]));
  const usedEnglish = new Set(value.map(match => typeof match === "object" ? match.englishId : match.split("::")[1]));
  const choose = (side, item) => {
    const usedIndex = value.findIndex(match => typeof match === "object" && (side === "native" ? match.nativeId === item.pairId : match.englishId === item.pairId));
    if (usedIndex >= 0) {
      onChange(value.filter((_, index) => index !== usedIndex));
      setPending(null);
      return;
    }
    if (!pending || pending.side === side) {
      setPending({ side, item });
      return;
    }
    const nativeItem = side === "native" ? item : pending.item;
    const englishItem = side === "english" ? item : pending.item;
    onChange([...value, { nativeId: nativeItem.pairId, englishId: englishItem.pairId, native: nativeItem.native, english: englishItem.english }]);
    setPending(null);
  };
  return <div className="grid grid-cols-2 gap-2.5">
    <div className={compact ? "space-y-2" : "space-y-3"} aria-label="Native-language words">{nativePairs.map(p => { const selected = pending?.side === "native" && pending.item.pairId === p.pairId; const paired = usedNative.has(p.pairId); return <button key={`native-${p.pairId}`} aria-pressed={selected || paired} disabled={checked} onPointerDown={hapticPress} onClick={() => choose("native", p)} data-tone={selected ? "orange" : paired ? "green" : dark ? "night" : "surface"} className={`afri-press ${compact ? "min-h-12 p-2 text-sm" : "min-h-14 p-3"} w-full rounded-xl font-black ${selected ? "bg-[#F28C28] text-white" : paired ? "bg-[#24745B]/20 text-[#53B98A]" : dark ? "bg-white/8" : "bg-black/5"} disabled:opacity-55`}>{p.native}</button>})}</div>
    <div className={compact ? "space-y-2" : "space-y-3"} aria-label="English meanings">{englishPairs.map(p => { const selected = pending?.side === "english" && pending.item.pairId === p.pairId; const paired = usedEnglish.has(p.pairId); return <button key={`english-${p.pairId}`} aria-pressed={selected || paired} disabled={checked} onPointerDown={hapticPress} onClick={() => choose("english", p)} data-tone={selected ? "orange" : paired ? "green" : dark ? "night" : "surface"} className={`afri-press ${compact ? "min-h-12 p-2 text-sm" : "min-h-14 p-3"} w-full rounded-xl font-black ${selected ? "bg-[#F28C28] text-white" : paired ? "bg-[#24745B]/20 text-[#53B98A]" : dark ? "bg-white/8" : "bg-black/5"} disabled:opacity-55`}>{p.english}</button>})}</div>
  </div>;
}

