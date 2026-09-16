import { useMemo, useRef, useState } from "react";
import { BookMarked, LibraryBig, Lock, Search, Sparkles, X } from "lucide-react";
import CultureCard from "../components/CultureCard";
import { availableLanguageList } from "../data/languages";
import { languageWorlds } from "../data/worlds";
import useDialogFocus from "../hooks/useDialogFocus";

export default function CollectionPage({ dark, progressByLanguage, activeLanguage }) {
  const [languageFilter, setLanguageFilter] = useState(activeLanguage || "all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const categories = useMemo(() => [...new Set([
    ...availableLanguageList.flatMap(language => language.units.flatMap(unit => unit.lessons.map(lesson => lesson.cultureCard.category))),
    ...Object.values(languageWorlds).flatMap(world => (world.cultureCards || []).map(card => card.category)),
  ])].sort(), []);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);
  const dialogRef = useRef(null);
  useDialogFocus(dialogRef, Boolean(selectedCard), () => setSelectedCard(null));
  const visibleLanguages = languageFilter === "all" ? availableLanguageList : availableLanguageList.filter(item => item.id === languageFilter);
  const collectionStats = useMemo(() => {
    const total = visibleLanguages.reduce((sum, language) => sum + language.units.flatMap(unit => unit.lessons).length + (languageWorlds[language.id]?.cultureCards?.length || 0), 0);
    const unlocked = visibleLanguages.reduce((sum, language) => sum + (progressByLanguage[language.id]?.unlockedCultureCards?.length || 0) + (progressByLanguage[language.id]?.immersion?.unlockedWorldCultureCards?.length || 0), 0);
    return { total, unlocked, percent: total ? Math.round(unlocked / total * 100) : 0 };
  }, [progressByLanguage, visibleLanguages]);
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
        Lessons, stories, and cultural discoveries unlock collectible insights.
      </p>

      <section className="mt-6 overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-[#7C3F18] via-[#C95D3A] to-[#F28C28] p-5 text-white sm:p-6"><div className="flex items-center gap-4"><span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white/15 text-3xl"><BookMarked/></span><div className="min-w-0 flex-1"><div className="text-xs font-black uppercase tracking-[.2em] text-white/65">Your cultural atlas</div><div className="mt-1 text-2xl font-black">{collectionStats.unlocked} of {collectionStats.total} discoveries</div><div className="mt-3 h-3 overflow-hidden rounded-full bg-black/20"><div className="h-full rounded-full bg-[#F6C445] transition-[width]" style={{width:`${collectionStats.percent}%`}}/></div></div><div className="text-right"><div className="text-3xl font-black">{collectionStats.percent}%</div><div className="text-xs font-bold text-white/60">collected</div></div></div></section>

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
        const unlockedWorldIds = progressByLanguage[language.id]?.immersion?.unlockedWorldCultureCards || [];
        const lessonCards = lessons.map(lesson => ({
          ...lesson.cultureCard,
          unlocked: unlockedIds.includes(lesson.cultureCard.id),
          unlockLabel: `Complete “${lesson.title}” to unlock.`,
        }));
        const worldCards = (languageWorlds[language.id]?.cultureCards || []).map(card => ({
          ...card,
          unlocked: unlockedWorldIds.includes(card.id),
          unlockLabel: "Complete its interactive story to unlock.",
        }));
        const cards = [...lessonCards, ...worldCards];
        const filteredCards = cards.filter(card => {
          const unlocked = card.unlocked;
          const matchesStatus = statusFilter === "all" || (statusFilter === "unlocked" ? unlocked : !unlocked);
          const matchesCategory = categoryFilter === "all" || card.category === categoryFilter;
          const haystack = `${card.title} ${card.category} ${card.text}`.toLowerCase();
          return matchesStatus && matchesCategory && haystack.includes(query.trim().toLowerCase());
        });
        if (!filteredCards.length) return null;
        return <section key={language.id} className="mt-8">
          <div className="flex items-center gap-3"><span className="text-2xl">{language.flag}</span><h2 className="text-2xl font-black">{language.language}</h2><span className="rounded-full bg-[#24745B]/15 px-3 py-1 text-xs font-black text-[#53B98A]">{cards.filter(card => card.unlocked).length}/{cards.length}</span></div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
        {filteredCards.map((card) => {
          return card.unlocked ? (
            <CultureCard key={card.id} card={card} dark={dark} onSelect={() => setSelectedCard(card)} />
          ) : (
            <div key={card.id} className={`grid min-h-64 place-items-center rounded-[2rem] border border-dashed p-6 text-center ${dark ? "border-white/12 bg-[#1A201E]" : "border-black/10 bg-white"}`}>
              <div>
                <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${dark ? "bg-white/7" : "bg-black/5"}`}>
                  <Lock size={24} className={dark ? "text-white/30" : "text-black/30"} />
                </div>
                <div className="mt-4 font-black">Locked Culture Card</div>
                <div className="mt-2 text-xs font-black uppercase tracking-wider text-[#F28C28]">{card.category}{card.unitNumber ? ` · Unit ${card.unitNumber}` : " · Story reward"}</div>
                <div className={`mt-2 text-sm font-semibold ${dark ? "text-white/40" : "text-black/40"}`}>
                  {card.unlockLabel}
                </div>
              </div>
            </div>
          );
        })}</div></section>;
      })}
      {selectedCard && <div onClick={() => setSelectedCard(null)} className="fixed inset-0 z-[70] grid place-items-center bg-black/65 p-4 backdrop-blur-sm"><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="culture-card-title" onClick={event => event.stopPropagation()} className={`max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border p-6 shadow-2xl ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/10 bg-[#FFF8EE]"}`}><div className="flex items-start justify-between"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#F6C445] text-4xl">{selectedCard.emoji}</div><button aria-label="Close culture card" onClick={() => setSelectedCard(null)} className={`grid h-11 w-11 place-items-center rounded-xl ${dark ? "bg-white/8" : "bg-black/5"}`}><X/></button></div><div className="mt-5 text-xs font-black uppercase tracking-[.2em] text-[#F28C28]">{selectedCard.category} · {selectedCard.language}</div><h2 id="culture-card-title" className="mt-2 text-3xl font-black">{selectedCard.title}</h2>{selectedCard.unitNumber && <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#4338CA]/10 px-3 py-1.5 text-xs font-black text-[#4338CA]"><Sparkles size={14}/>Unit {selectedCard.unitNumber}: {selectedCard.unitTitle} · {selectedCard.lessonTitle}</div>}<p className={`mt-4 text-lg leading-8 ${dark ? "text-white/65" : "text-black/65"}`}>{selectedCard.text}</p><div className={`mt-5 grid gap-2 rounded-2xl p-4 text-sm font-bold sm:grid-cols-2 ${dark ? "bg-white/6 text-white/50" : "bg-black/5 text-black/50"}`}><span>Region: {selectedCard.region}</span><span>{selectedCard.provenance || (selectedCard.sourceUrl ? "Sourced cultural reference" : "Course cultural context")}</span></div>{selectedCard.sourceUrl && <a href={selectedCard.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[#F28C28] px-4 text-sm font-black text-white shadow-[0_4px_0_#B95716] active:translate-y-1 active:shadow-none">View source: {selectedCard.sourceTitle || "Reference"}</a>}</div></div>}
    </div>
  );
}

function FilterButton({ active, onClick, dark, children }) {
  return <button onClick={onClick} className={`min-h-11 min-w-max rounded-xl px-3 text-sm font-black transition ${active ? "bg-[#F28C28] text-white" : dark ? "bg-white/6 text-white/55" : "bg-black/5 text-black/55"}`}>{children}</button>;
}
