import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Compass, LibraryBig, Lock, RotateCcw, Search, Sparkles, X } from "lucide-react";
import { languages } from "../../data/languages";
import { exploreLibraries } from "../../data/explore";
import { immersionLibraries } from "../../data/immersion";
import { isLessonUnlocked, isUnitUnlocked } from "../../utils/courseProgress";
import useDialogFocus from "../../hooks/useDialogFocus";

const typeMeta = {
  lesson: [BookOpen, "Lesson", "#F28C28"], culture: [LibraryBig, "Culture", "#F6C445"],
  vocabulary: [Compass, "Vocabulary", "#24745B"], immersion: [Sparkles, "Immersion", "#4338CA"],
  review: [RotateCcw, "Review", "#C95D3A"]
};

function haystack(...values) { return values.flat(Infinity).filter(Boolean).join(" ").toLocaleLowerCase(); }

function buildIndex(progressByLanguage) {
  const results = [];
  Object.values(languages).forEach(language => {
    const saved = progressByLanguage[language.id] || { completedLessonIds: [], reviewQueue: [] };
    language.units.forEach((unit, unitIndex) => unit.lessons.forEach((lesson, lessonIndex) => {
      const unlocked = isUnitUnlocked(language.units, unitIndex, saved.completedLessonIds) && isLessonUnlocked(unit.lessons, lessonIndex, saved.completedLessonIds);
      const conversation = Array.isArray(lesson.conversation) ? lesson.conversation : [];
      results.push({ id: `${language.id}:lesson:${lesson.id}`, type: "lesson", languageId: language.id, language, unitIndex, lesson, unlocked, title: lesson.title, subtitle: `Unit ${unitIndex + 1} · ${unit.title}`, search: haystack(language.language, language.nativeName, unit.title, unit.subtitle, lesson.title, conversation.map(line => [line.native, line.english]), lesson.questions?.map(q => [q.prompt, q.answer, q.options])) });
      if (lesson.cultureCard) results.push({ id: `${language.id}:culture:${lesson.cultureCard.id}`, type: "culture", languageId: language.id, language, title: lesson.cultureCard.title, subtitle: lesson.cultureCard.category || "Culture card", search: haystack(language.language, lesson.cultureCard.title, lesson.cultureCard.category, lesson.cultureCard.description, lesson.cultureCard.explanation) });
    }));
    (saved.reviewQueue || []).forEach(item => results.push({ id: `${language.id}:review:${item.reviewKey}`, type: "review", languageId: language.id, language, title: item.question.prompt, subtitle: item.sourceTitle, search: haystack(language.language, item.question.prompt, item.question.answer, item.question.options, item.sourceTitle) }));
    const explore = exploreLibraries[language.id];
    explore?.entries?.forEach(entry => results.push({ id: `${language.id}:vocab:${entry.id}`, type: "vocabulary", languageId: language.id, language, title: entry.native, subtitle: entry.english, search: haystack(language.language, entry.native, entry.english, entry.exampleNative, entry.exampleEnglish, entry.theme, entry.wordType) }));
    const immersion = immersionLibraries[language.id];
    immersion?.dailyPhrases?.forEach(item => results.push({ id: `${language.id}:phrase:${item.id}`, type: "immersion", languageId: language.id, language, title: item.native, subtitle: item.english, search: haystack(language.language, item.native, item.english, item.context, item.exampleNative, item.exampleEnglish) }));
    immersion?.stories?.forEach(item => results.push({ id: `${language.id}:story:${item.id}`, type: "immersion", languageId: language.id, language, title: item.title, subtitle: item.englishTitle, search: haystack(language.language, item.title, item.englishTitle, item.sentences?.map(sentence => [sentence.native, sentence.english])) }));
  });
  return results;
}

export default function GlobalSearch({ dark, progressByLanguage, onClose, onSelect }) {
  const dialogRef = useRef(null);
  const [query, setQuery] = useState("");
  const index = useMemo(() => buildIndex(progressByLanguage), [progressByLanguage]);
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const matches = words.length ? index.filter(item => words.every(word => item.search.includes(word))).slice(0, 30) : [];
  const surface = dark ? "border-white/10 bg-[#101312]" : "border-black/10 bg-[#FFF8EE]";
  useDialogFocus(dialogRef, true, onClose);
  return <motion.div className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 p-3 pt-[8vh] backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={onClose}>
    <motion.section ref={dialogRef} role="dialog" aria-modal="true" aria-label="Search AfriLingo" initial={{y:-20,scale:.98}} animate={{y:0,scale:1}} onMouseDown={event => event.stopPropagation()} className={`flex max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.8rem] border shadow-2xl ${surface}`}>
      <div className="flex items-center gap-3 border-b border-current/10 p-4"><Search className="shrink-0 text-[#F28C28]"/><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search lessons, words, phrases, and culture…" className="min-w-0 flex-1 bg-transparent py-2 text-base font-bold outline-none sm:text-lg"/><button onClick={onClose} aria-label="Close search" className={`grid size-11 shrink-0 place-items-center rounded-xl ${dark ? "bg-white/7" : "bg-black/5"}`}><X size={19}/></button></div>
      <div className="overflow-y-auto p-3 sm:p-4">{!words.length ? <div className="py-12 text-center"><div className="text-5xl">🔎</div><div className="mt-4 text-xl font-black">Search all 14 languages</div><p className="mt-2 font-semibold opacity-45">Try “family,” “thank you,” or a word in the language you’re learning.</p></div> : !matches.length ? <div className="py-12 text-center font-bold opacity-45">No learning content matched “{query}”.</div> : <div className="space-y-2">{matches.map(item => { const [Icon,label,color] = typeMeta[item.type]; return <button key={item.id} disabled={item.type === "lesson" && !item.unlocked} onClick={() => onSelect(item)} className={`flex min-h-16 w-full items-center gap-3 rounded-2xl border border-current/10 p-3 text-left transition ${item.type === "lesson" && !item.unlocked ? "cursor-not-allowed opacity-45" : dark ? "hover:bg-white/6" : "hover:bg-black/5"}`}><span className="grid size-11 shrink-0 place-items-center rounded-xl" style={{backgroundColor:`${color}20`,color}}><Icon size={20}/></span><span className="min-w-0 flex-1"><span className="flex items-center gap-2"><span className="truncate font-black">{item.title}</span>{item.type === "lesson" && !item.unlocked && <Lock size={13}/>}</span><span className="mt-1 block truncate text-xs font-semibold opacity-45">{item.language.flag} {item.language.language} · {item.subtitle}</span></span><span className="rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-wider" style={{backgroundColor:`${color}18`,color}}>{label}</span></button>})}</div>}</div>
    </motion.section>
  </motion.div>;
}
