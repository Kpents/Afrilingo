import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Layers3, Lock } from "lucide-react";

export default function UnitNavigator({ dark, language, units, activeUnit, completedLessonIds, isUnitUnlocked, onUnitChange }) {
  const [open, setOpen] = useState(false);
  const active = units[activeUnit];
  const phaseGroups = language.phases?.length
    ? language.phases.map((phase, phaseIndex) => ({
        id: phase.id || `phase-${phaseIndex}`,
        title: phase.title || `Section ${phaseIndex + 1}`,
        units: phase.units.map((phaseUnit) => {
          const index = units.findIndex((unit) => unit.id === phaseUnit.id);
          return index >= 0 ? { unit: units[index], index } : null;
        }).filter(Boolean)
      }))
    : [{ id: "course", title: "Course units", units: units.map((unit, index) => ({ unit, index })) }];

  const selectUnit = (index) => {
    if (!isUnitUnlocked(index)) return;
    onUnitChange(index);
    setOpen(false);
  };

  return (
    <div className="mb-5">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="course-unit-map"
        className={`flex min-h-20 w-full items-center gap-4 rounded-[1.6rem] border p-4 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F28C28]/25 ${dark ? "border-white/10 bg-[#1A201E] hover:bg-[#232B28]" : "border-black/8 bg-white hover:bg-[#FFF4E5]"}`}>
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#F28C28] text-white shadow-lg shadow-orange-500/20"><Layers3 size={23} /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-[#F28C28]">Current unit · {activeUnit + 1} of {units.length}</span>
          <span className="mt-1 block truncate text-base font-black sm:text-lg">{active.title}</span>
        </span>
        <span className={`hidden text-xs font-black sm:block ${dark ? "text-white/45" : "text-black/45"}`}>{open ? "Hide units" : "View all units"}</span>
        <ChevronDown size={20} className={`shrink-0 text-[#F28C28] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div id="course-unit-map" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeOut" }} className="overflow-hidden">
            <div className={`mt-3 rounded-[1.6rem] border p-4 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}>
              {phaseGroups.map((phase, phaseIndex) => (
                <div key={phase.id} className={phaseIndex > 0 ? "mt-5 border-t border-current/10 pt-5" : ""}>
                  <div className={`mb-3 text-xs font-black uppercase tracking-[0.18em] ${dark ? "text-white/40" : "text-black/40"}`}>Section {phaseIndex + 1} · {phase.title}</div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
                    {phase.units.map(({ unit, index }) => {
                      const unlocked = isUnitUnlocked(index);
                      const selected = index === activeUnit;
                      const completed = unit.lessons.every((lesson) => completedLessonIds.includes(lesson.id));
                      const stateClass = selected
                        ? "border-[#F28C28] bg-[#F28C28] text-white shadow-md shadow-orange-500/15"
                        : completed
                          ? dark ? "border-[#53B98A]/30 bg-[#24745B]/20 hover:bg-[#24745B]/30" : "border-[#24745B]/15 bg-[#24745B]/10 hover:bg-[#24745B]/15"
                          : unlocked
                            ? dark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/8 bg-black/[0.03] hover:bg-black/[0.06]"
                            : dark ? "cursor-not-allowed border-white/5 bg-white/[0.025] text-white/25" : "cursor-not-allowed border-black/5 bg-black/[0.025] text-black/25";

                      return (
                        <button key={unit.id} type="button" onClick={() => selectUnit(index)} disabled={!unlocked} aria-current={selected ? "step" : undefined}
                          className={`min-h-20 rounded-2xl border p-3 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F28C28]/25 ${stateClass}`}>
                          <span className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black uppercase tracking-wider">Unit {index + 1}</span>
                            {completed ? <CheckCircle2 size={16} /> : !unlocked ? <Lock size={15} /> : null}
                          </span>
                          <span className="mt-2 block text-sm font-black leading-tight">{unit.title}</span>
                          {!unlocked && <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider">Locked</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
