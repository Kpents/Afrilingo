import { useEffect, useMemo, useState } from "react";
import { Check, Image, X } from "lucide-react";
import { motion } from "framer-motion";
import AudioButton from "../ui/AudioButton";
import ConceptIcon from "../ui/ConceptIcon";
import LearningVisual from "../ui/LearningVisual";
import SafeArtwork from "../ui/SafeArtwork";
import { hapticPress } from "../../utils/hapticFeedback";

const choiceTypes = new Set(["multiple-choice", "translate", "native-to-english", "english-to-native", "fill-in-the-blank", "conversation", "mini-conversation", "challenge"]);
const shuffled = (values = []) => [...values].sort(() => Math.random() - 0.5);

export default function QuestionRenderer({ question, dark, checked, value, onChange }) {
  const options = useMemo(() => shuffled(question.options), [question.id, question.retry, question.retryAttempt]);
  if (question.type === "sentence-builder") return <SentenceBuilder question={question} value={value || []} onChange={onChange} dark={dark} checked={checked} />;
  if (["match", "matching"].includes(question.type)) return <Matching question={question} value={value || []} onChange={onChange} dark={dark} checked={checked} />;
  if (question.type === "listening") return <ChoiceGrid question={question} options={options} value={value} onChange={onChange} dark={dark} checked={checked} header={<AudioButton src={question.audio} label={question.prompt} className="mb-5 bg-[#4338CA] font-black text-white" />} />;
  if (question.type === "listen-and-select") return <ChoiceGrid question={question} options={options} value={value} onChange={onChange} dark={dark} checked={checked} images header={<AudioButton src={question.audio} label={question.prompt} className="mb-5 bg-[#4338CA] font-black text-white" />} />;
  if (question.type === "image-to-word") return <ChoiceGrid question={question} options={options} value={value} onChange={onChange} dark={dark} checked={checked} header={<ConceptIcon iconId={question.iconId} className="mx-auto mb-6 h-40 w-full max-w-xs" />} />;
  if (question.type === "image-choice") return <ChoiceGrid question={question} options={options} value={value} onChange={onChange} dark={dark} checked={checked} images />;
  if (choiceTypes.has(question.type) || question.options) return <ChoiceGrid question={question} options={options} value={value} onChange={onChange} dark={dark} checked={checked} images={question.visualOptions} />;
  return <div className="rounded-2xl border border-[#C95D3A]/30 bg-[#C95D3A]/10 p-5 font-semibold">This exercise type is not available yet.</div>;
}

function ChoiceGrid({ question, options, value, onChange, dark, checked, header, images = false }) {
  return <>{header}<div className="grid gap-3 sm:grid-cols-2">{options.map((raw, index) => {
    const option = typeof raw === "object" ? raw.value ?? raw.label : raw;
    const label = typeof raw === "object" ? raw.label ?? raw.value : raw;
    const visualLabel = typeof raw === "object" ? raw.visualLabel ?? label : label;
    const showLabel = typeof raw !== "object" || raw.showLabel !== false;
    const correct = checked && option === question.answer;
    const wrong = checked && value === option && option !== question.answer;
    return <motion.button key={option} aria-pressed={value === option} disabled={checked} whileTap={checked ? undefined : { scale: .985 }} onPointerDown={hapticPress} onClick={() => onChange(option)} data-tone={correct ? "green" : wrong ? "clay" : dark ? "night" : "surface"} className={`afri-press group relative min-h-16 rounded-[1.4rem] border-2 p-4 text-left text-base font-black transition sm:p-5 sm:text-lg ${correct ? "border-[#24745B] bg-[#24745B]/15" : wrong ? "border-[#C95D3A] bg-[#C95D3A]/12" : value === option ? "border-[#F28C28] bg-[#F28C28]/12" : dark ? "border-white/10 bg-[#1A201E] hover:border-white/20" : "border-black/8 bg-white hover:border-[#F28C28]/35"}`}>
      {images && <div className="mb-3 grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-black/5">{raw.iconId || Number.isFinite(raw.number) ? <LearningVisual iconId={raw.iconId} number={raw.number} label={visualLabel} className="h-full w-full" /> : raw.image ? <SafeArtwork src={raw.image} alt={visualLabel} fallbackLabel={visualLabel} className="h-full w-full object-cover object-center" /> : raw.emoji ? <span role="img" aria-label={visualLabel} className="text-5xl">{raw.emoji}</span> : <Image aria-label={visualLabel} className="opacity-30" />}</div>}<span className="flex items-center gap-3"><span aria-hidden className={`grid size-8 shrink-0 place-items-center rounded-lg text-xs font-black ${correct ? "bg-[#24745B] text-white" : wrong ? "bg-[#C95D3A] text-white" : value === option ? "bg-[#F28C28] text-white" : dark ? "bg-white/8 text-white/45" : "bg-black/5 text-black/40"}`}>{correct ? <Check size={17} strokeWidth={3}/> : wrong ? <X size={17} strokeWidth={3}/> : String.fromCharCode(65 + index)}</span><span className={showLabel ? "" : "sr-only"}>{label}</span></span>
    </motion.button>;
  })}</div></>;
}

function SentenceBuilder({ question, value, onChange, dark, checked }) {
  const tiles = useMemo(() => shuffled(question.tiles || question.answer.split(" ")), [question.id, question.retry, question.retryAttempt]);
  return <div>
    <div className={`min-h-24 rounded-2xl border-2 border-dashed p-3 ${dark ? "border-white/15 bg-white/[.025]" : "border-black/15 bg-black/[.02]"}`}>
      {!value.length && <div className={`grid min-h-16 place-items-center text-sm font-bold ${dark ? "text-white/55" : "text-black/55"}`}>Tap words below to build your answer</div>}
      {value.map((word, i) => <button disabled={checked} key={`${word}-${i}`} onPointerDown={hapticPress} onClick={() => onChange(value.filter((_, n) => n !== i))} className="afri-press m-1 rounded-xl bg-[#F28C28] px-4 py-3 font-black text-white">{word}</button>)}
    </div>
    <div className="mt-4 flex flex-wrap gap-3">{tiles.map((word, i) => <button disabled={checked || value.filter(v => v === word).length >= tiles.filter((v, n) => v === word && n <= i).length} key={`${word}-${i}`} onPointerDown={hapticPress} onClick={() => onChange([...value, word])} data-tone={dark ? "night" : "surface"} className={`afri-press rounded-xl px-4 py-3 font-black disabled:opacity-25 ${dark ? "bg-white/10" : "bg-black/8"}`}>{word}</button>)}</div>
  </div>;
}

function Matching({ question, value, onChange, dark, checked }) {
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
  return <div className="grid grid-cols-2 gap-3">
    <div className="space-y-3" aria-label="Native-language words">{nativePairs.map(p => { const selected = pending?.side === "native" && pending.item.pairId === p.pairId; const paired = usedNative.has(p.pairId); return <button key={`native-${p.pairId}`} aria-pressed={selected || paired} disabled={checked} onPointerDown={hapticPress} onClick={() => choose("native", p)} data-tone={selected ? "orange" : paired ? "green" : dark ? "night" : "surface"} className={`afri-press min-h-14 w-full rounded-xl p-3 font-black ${selected ? "bg-[#F28C28] text-white" : paired ? "bg-[#24745B]/20 text-[#53B98A]" : dark ? "bg-white/8" : "bg-black/5"} disabled:opacity-55`}>{p.native}</button>})}</div>
    <div className="space-y-3" aria-label="English meanings">{englishPairs.map(p => { const selected = pending?.side === "english" && pending.item.pairId === p.pairId; const paired = usedEnglish.has(p.pairId); return <button key={`english-${p.pairId}`} aria-pressed={selected || paired} disabled={checked} onPointerDown={hapticPress} onClick={() => choose("english", p)} data-tone={selected ? "orange" : paired ? "green" : dark ? "night" : "surface"} className={`afri-press min-h-14 w-full rounded-xl p-3 font-black ${selected ? "bg-[#F28C28] text-white" : paired ? "bg-[#24745B]/20 text-[#53B98A]" : dark ? "bg-white/8" : "bg-black/5"} disabled:opacity-55`}>{p.english}</button>})}</div>
  </div>;
}

export function normalizeAnswer(question, value) {
  if (question.type === "sentence-builder") return (value || []).join(" ");
  if (["match", "matching"].includes(question.type)) return [...(value || [])].map(match => typeof match === "object" ? `${match.native}::${match.english}` : match).sort().join("|");
  return value;
}

export function expectedAnswer(question) {
  if (["match", "matching"].includes(question.type)) return (question.pairs || []).map(p => `${p.native}::${p.english}`).sort().join("|");
  return question.answer;
}

export function isAnswerComplete(question, value) {
  if (value == null) return false;
  if (["match", "matching"].includes(question.type)) return Array.isArray(value) && value.length === (question.pairs || []).length;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}
