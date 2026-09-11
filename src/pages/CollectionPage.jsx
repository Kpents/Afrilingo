import { useMemo, useRef, useState } from "react";
import { LibraryBig, Lock, Search, X } from "lucide-react";
import CultureCard from "../components/CultureCard";
import { availableLanguageList } from "../data/languages";
import useDialogFocus from "../hooks/useDialogFocus";

export default function CollectionPage({ dark, progressByLanguage }) {
  const [languageFilter, setLanguageFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const categories = useMemo(() => [...new Set(availableLanguageList.flatMap(language => language.units.flatMap(unit => unit.lessons.map(lesson => lesson.cultureCard.category))))].sort(), []);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);
  const dialogRef = useRef(null);
  useDialogFocus(dialogRef, Boolean(selectedCard), () => setSelectedCard(null));
  const visibleLanguages = languageFilter === "all" ? availableLanguageList : availableLanguageList.filter(item => item.id === languageFilter);
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F6C445] text-[#252525]">
          <LibraryBig size={28} />
        </div>
        <div>
          <div className="text-xs font-black uppercase tracking-[0.25em] text-[#F28C28]">Learn Through Culture</div>
          <h1 className="mt-1 text-3xl font-black">Culture Collection</h1>
        </div>
      </div>

      <p className={`mt-4 max-w-2xl leading-7 ${dark ? "text-white/55" : "text-black/55"}`}>
        Every completed lesson unlocks a collectible cultural insight.
      </p>

      <div className={`mt-6 rounded-[1.5rem] border p-3 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}>
        <label className="flex min-h-12 items-center gap-3 px-2"><Search size={19} className="opacity-40"/><span className="sr-only">Search culture cards</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search culture cards" className="min-w-0 flex-1 bg-transparent outline-none placeholder:opacity-40"/></label>
        <div className="mt-2 flex flex-wrap gap-2 pb-1">
          <FilterButton active={languageFilter === "all"} onClick={() => setLanguageFilter("all")} dark={dark}>All languages</FilterButton>
          {availableLanguageList.map(item => <FilterButton key={item.id} active={languageFilter === item.id} onClick={() => setLanguageFilter(item.id)} dark={dark}>{item.flag} {item.language}</FilterButton>)}
        </div>
        <div className="mt-2 flex flex-wrap gap-2 pb-1">
          {[['all','All cards'],['unlocked','Unlocked'],['locked','Locked']].map(([id,label]) => <FilterButton key={id} active={statusFilter === id} onClick={() => setStatusFilter(id)} dark={dark}>{label}</FilterButton>)}
          <select aria-label="Culture category" value={categoryFilter} onChange={event => setCategoryFilter(event.target.value)} className={`min-h-11 min-w-max rounded-xl border px-3 text-sm font-black outline-none ${dark ? "border-white/10 bg-[#232B28]" : "border-black/10 bg-white"}`}><option value="all">All categories</option>{categories.map(category => <option key={category}>{category}</option>)}</select>
        </div>
      </div>

      {visibleLanguages.map(language => {
        const lessons = language.units.flatMap(unit => unit.lessons);
        const unlockedIds = progressByLanguage[language.id]?.unlockedCultureCards || [];
        const filteredLessons = lessons.filter(lesson => {
          const unlocked = unlockedIds.includes(lesson.cultureCard.id);
          const matchesStatus = statusFilter === "all" || (statusFilter === "unlocked" ? unlocked : !unlocked);
          const matchesCategory = categoryFilter === "all" || lesson.cultureCard.category === categoryFilter;
          const haystack = `${lesson.cultureCard.title} ${lesson.cultureCard.category} ${lesson.cultureCard.text}`.toLowerCase();
          return matchesStatus && matchesCategory && haystack.includes(query.trim().toLowerCase());
        });
        if (!filteredLessons.length) return null;
        return <section key={language.id} className="mt-8">
          <div className="flex items-center gap-3"><span className="text-2xl">{language.flag}</span><h2 className="text-2xl font-black">{language.language}</h2><span className="rounded-full bg-[#24745B]/15 px-3 py-1 text-xs font-black text-[#53B98A]">{unlockedIds.length}/{lessons.length}</span></div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
        {filteredLessons.map((lesson) => {
          const unlocked = unlockedIds.includes(lesson.cultureCard.id);

          return unlocked ? (
            <CultureCard key={lesson.cultureCard.id} card={lesson.cultureCard} dark={dark} onSelect={() => setSelectedCard(lesson.cultureCard)} />
          ) : (
            <div key={lesson.cultureCard.id} className={`grid min-h-64 place-items-center rounded-[2rem] border border-dashed p-6 text-center ${dark ? "border-white/12 bg-[#1A201E]" : "border-black/10 bg-white"}`}>
              <div>
                <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${dark ? "bg-white/7" : "bg-black/5"}`}>
                  <Lock size={24} className={dark ? "text-white/30" : "text-black/30"} />
                </div>
                <div className="mt-4 font-black">Locked Culture Card</div>
                <div className={`mt-2 text-sm font-semibold ${dark ? "text-white/40" : "text-black/40"}`}>
                  Complete “{lesson.title}” to unlock.
                </div>
              </div>
            </div>
          );
        })}</div></section>;
      })}
      {selectedCard && <div onClick={() => setSelectedCard(null)} className="fixed inset-0 z-[70] grid place-items-center bg-black/65 p-4 backdrop-blur-sm"><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="culture-card-title" onClick={event => event.stopPropagation()} className={`max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border p-6 shadow-2xl ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/10 bg-[#FFF8EE]"}`}><div className="flex items-start justify-between"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#F6C445] text-4xl">{selectedCard.emoji}</div><button aria-label="Close culture card" onClick={() => setSelectedCard(null)} className={`grid h-11 w-11 place-items-center rounded-xl ${dark ? "bg-white/8" : "bg-black/5"}`}><X/></button></div><div className="mt-5 text-xs font-black uppercase tracking-[.2em] text-[#F28C28]">{selectedCard.category} · {selectedCard.language}</div><h2 id="culture-card-title" className="mt-2 text-3xl font-black">{selectedCard.title}</h2><p className={`mt-4 text-lg leading-8 ${dark ? "text-white/65" : "text-black/65"}`}>{selectedCard.text}</p><div className={`mt-5 rounded-2xl p-4 text-sm font-bold ${dark ? "bg-white/6 text-white/50" : "bg-black/5 text-black/50"}`}>Region: {selectedCard.region}</div></div></div>}
    </div>
  );
}

function FilterButton({ active, onClick, dark, children }) {
  return <button onClick={onClick} className={`min-h-11 min-w-max rounded-xl px-3 text-sm font-black transition ${active ? "bg-[#F28C28] text-white" : dark ? "bg-white/6 text-white/55" : "bg-black/5 text-black/55"}`}>{children}</button>;
}
