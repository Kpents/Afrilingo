import { useMemo, useState } from "react";
import { CheckCircle2, ImageOff, Search } from "lucide-react";
import ConceptIcon from "../components/ui/ConceptIcon";
import { iconCategoryLabels, iconLibrary, missingIconIds } from "../data/iconLibrary";
import { languages } from "../data/languages";
import { exploreLibraries } from "../data/explore";

function usageIndex() {
  const usage = {};
  const visit = (value, languageId) => {
    if (!value) return;
    if (Array.isArray(value)) return value.forEach(item => visit(item, languageId));
    if (typeof value !== "object") return;
    if (value.iconId) {
      usage[value.iconId] ||= { count: 0, languages: new Set() };
      usage[value.iconId].count += 1;
      usage[value.iconId].languages.add(languageId);
    }
    Object.values(value).forEach(item => visit(item, languageId));
  };
  Object.entries(languages).forEach(([id, course]) => visit(course, id));
  Object.entries(exploreLibraries).forEach(([id, library]) => visit(library, id));
  return usage;
}

export default function IconGalleryPage({ dark }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const usage = useMemo(usageIndex, []);
  const icons = Object.values(iconLibrary).filter(icon =>
    (category === "all" || icon.category === category) &&
    (status === "all" || icon.status === status) &&
    `${icon.id} ${icon.label} ${icon.tags.join(" ")}`.includes(query.trim().toLowerCase())
  );
  const card = dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";

  return <main className={`min-h-screen px-4 py-8 ${dark ? "bg-[#101312] text-[#F8F4EA]" : "bg-[#FFF8EE] text-[#252525]"}`}>
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-[.24em] text-[#F28C28]">AfriLingo developer tools</div><h1 className="mt-2 text-4xl font-black">Visual Icon Library</h1><p className="mt-2 font-semibold opacity-55">Semantic, language-independent concepts for visual learning.</p></div><div className="flex gap-2 text-sm font-black"><span className="rounded-xl bg-[#24745B]/15 px-3 py-2 text-[#53B98A]">{Object.keys(iconLibrary).length - missingIconIds.length} ready</span><span className="rounded-xl bg-[#C95D3A]/15 px-3 py-2 text-[#E47A5D]">{missingIconIds.length} pending</span></div></div>
      <div className={`mt-6 grid gap-3 rounded-2xl border p-3 md:grid-cols-[1fr_auto_auto] ${card}`}><label className="flex min-h-12 items-center gap-2 rounded-xl bg-black/5 px-4"><Search size={18}/><input className="w-full bg-transparent outline-none" placeholder="Search icon IDs or tags" value={query} onChange={event => setQuery(event.target.value)}/></label><select className="min-h-12 rounded-xl bg-black/5 px-4 font-bold" value={category} onChange={event => setCategory(event.target.value)}><option value="all">All categories</option>{Object.entries(iconCategoryLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select><select className="min-h-12 rounded-xl bg-black/5 px-4 font-bold" value={status} onChange={event => setStatus(event.target.value)}><option value="all">All statuses</option><option value="ready">Ready</option><option value="placeholder">Artwork pending</option></select></div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{icons.map(icon => { const used = usage[icon.id]; return <article key={icon.id} className={`rounded-2xl border p-3 ${card}`}><ConceptIcon iconId={icon.id} showPlaceholderLabel className="aspect-square w-full"/><div className="mt-3 break-all text-sm font-black">{icon.id}</div><div className="mt-1 text-[11px] font-bold opacity-45">{iconCategoryLabels[icon.category]}</div><div className="mt-3 flex items-center justify-between text-[10px] font-black uppercase"><span className={icon.status === "ready" ? "text-[#53B98A]" : "text-[#E47A5D]"}>{icon.status === "ready" ? <><CheckCircle2 className="mr-1 inline" size={12}/>Ready</> : <><ImageOff className="mr-1 inline" size={12}/>Pending</>}</span><span className="opacity-45">{used?.count || 0} uses</span></div>{used && <div className="mt-1 text-[9px] font-bold uppercase opacity-35">{[...used.languages].join(", ")}</div>}</article>; })}</div>
    </div>
  </main>;
}
