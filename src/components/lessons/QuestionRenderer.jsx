import { useEffect, useMemo, useState } from "react";
import { Image } from "lucide-react";
import { motion } from "framer-motion";
import AudioButton from "../ui/AudioButton";
import ConceptIcon from "../ui/ConceptIcon";
import LearningVisual from "../ui/LearningVisual";
import { hapticPress } from "../../utils/hapticFeedback";

const choiceTypes = new Set(["multiple-choice", "translate", "native-to-english", "english-to-native", "fill-in-the-blank", "conversation", "mini-conversation", "challenge"]);
const shuffled = (values = []) => [...values].sort(() => Math.random() - 0.5);

export default function QuestionRenderer({ question, dark, checked, value, onChange }) {
  const options = useMemo(() => shuffled(question.options), [question.id, question.retry]);
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
  return <>{header}<div className="grid gap-3 sm:grid-cols-2">{options.map((raw) => {
    const option = typeof raw === "object" ? raw.value ?? raw.label : raw;
    const label = typeof raw === "object" ? raw.label ?? raw.value : raw;
    const correct = checked && option === question.answer;
    const wrong = checked && value === option && option !== question.answer;
    return <motion.button key={option} disabled={checked} onPointerDown={hapticPress} onClick={() => onChange(option)} data-tone={correct ? "green" : wrong ? "clay" : dark ? "night" : "surface"} className={`afri-press min-h-16 rounded-[1.4rem] border-2 p-5 text-left text-lg font-black ${correct ? "border-[#24745B] bg-[#24745B]/15" : wrong ? "border-[#C95D3A] bg-[#C95D3A]/12" : value === option ? "border-[#F28C28] bg-[#F28C28]/12" : dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}>
      {images && <div className="mb-3 grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-black/5">{raw.iconId || Number.isFinite(raw.number) ? <LearningVisual iconId={raw.iconId} number={raw.number} label={label} className="h-full w-full" /> : raw.image ? <img src={raw.image} alt="" className="h-full w-full object-cover" /> : raw.emoji ? <span className="text-5xl" aria-hidden="true">{raw.emoji}</span> : <Image className="opacity-30" />}</div>}{label}
    </motion.button>;
  })}</div></>;
}

function SentenceBuilder({ question, value, onChange, dark, checked }) {
  const tiles = useMemo(() => shuffled(question.tiles || question.answer.split(" ")), [question.id, question.retry]);
  return <div>
    <div className={`min-h-20 rounded-2xl border-2 border-dashed p-3 ${dark ? "border-white/15" : "border-black/15"}`}>
      {value.map((word, i) => <button disabled={checked} key={`${word}-${i}`} onPointerDown={hapticPress} onClick={() => onChange(value.filter((_, n) => n !== i))} className="afri-press m-1 rounded-xl bg-[#F28C28] px-4 py-3 font-black text-white">{word}</button>)}
    </div>
    <div className="mt-4 flex flex-wrap gap-3">{tiles.map((word, i) => <button disabled={checked || value.filter(v => v === word).length >= tiles.filter((v, n) => v === word && n <= i).length} key={`${word}-${i}`} onPointerDown={hapticPress} onClick={() => onChange([...value, word])} data-tone={dark ? "night" : "surface"} className={`afri-press rounded-xl px-4 py-3 font-black disabled:opacity-25 ${dark ? "bg-white/10" : "bg-black/8"}`}>{word}</button>)}</div>
  </div>;
}

function Matching({ question, value, onChange, dark, checked }) {
  const pairs = question.pairs || [];
  const [native, setNative] = useState(null);
  useEffect(() => setNative(null), [question.id]);
  const add = (english) => { if (!native) return; onChange([...value, `${native}::${english}`]); setNative(null); };
  const usedNative = new Set(value.map(v => v.split("::")[0]));
  const usedEnglish = new Set(value.map(v => v.split("::")[1]));
  return <div className="grid grid-cols-2 gap-3">
    <div className="space-y-3">{pairs.map(p => <button key={p.native} disabled={checked || usedNative.has(p.native)} onPointerDown={hapticPress} onClick={() => setNative(p.native)} data-tone={native === p.native ? "orange" : dark ? "night" : "surface"} className={`afri-press min-h-14 w-full rounded-xl p-3 font-black ${native === p.native ? "bg-[#F28C28] text-white" : dark ? "bg-white/8" : "bg-black/5"} disabled:opacity-30`}>{p.native}</button>)}</div>
    <div className="space-y-3">{pairs.map(p => <button key={p.english} disabled={checked || usedEnglish.has(p.english)} onPointerDown={hapticPress} onClick={() => add(p.english)} data-tone={dark ? "night" : "surface"} className={`afri-press min-h-14 w-full rounded-xl p-3 font-black ${dark ? "bg-white/8" : "bg-black/5"} disabled:opacity-30`}>{p.english}</button>)}</div>
  </div>;
}

export function normalizeAnswer(question, value) {
  if (question.type === "sentence-builder") return (value || []).join(" ");
  if (["match", "matching"].includes(question.type)) return [...(value || [])].sort().join("|");
  return value;
}

export function expectedAnswer(question) {
  if (["match", "matching"].includes(question.type)) return (question.pairs || []).map(p => `${p.native}::${p.english}`).sort().join("|");
  return question.answer;
}
