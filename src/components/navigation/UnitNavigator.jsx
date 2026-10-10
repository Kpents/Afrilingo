import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Clock3, Layers3, Lock } from "lucide-react";

export default function UnitNavigator({ dark, language, units, activeUnit, completedLessonIds, isUnitUnlocked, onUnitChange }) {
  const [open, setOpen] = useState(false);
  const active = units[activeUnit];
  const completedInUnit = active.lessons.filter(lesson => completedLessonIds.includes(lesson.id)).length;
  const percent = active.lessons.length ? Math.round(completedInUnit / active.lessons.length * 100) : 0;
  const curriculum = language.curriculum;
  const activeCurriculumUnit = curriculum?.units.find(unit => unit.courseUnitIndex === activeUnit);
  const phaseGroups = curriculum?.sections?.length
    ? curriculum.sections.map(section => ({
        id: section.id,
        title: section.title,
        range: section.unitRange,
        outcome: section.outcome,
        units: section.units.map(curriculumUnit => ({
          unit: curriculumUnit.courseUnit,
          index: curriculumUnit.courseUnitIndex,
          curriculumUnit
        }))
      }))
    : language.phases?.length
    ? language.phases.map((phase, phaseIndex) => ({
        id: phase.id || `phase-${phaseIndex}`,
        title: phase.title || `Section ${phaseIndex + 1}`,
        units: phase.units.map((phaseUnit) => {
          const index = units.findIndex((unit) => unit.id === phaseUnit.id);
          return index >= 0 ? { unit: units[index], index, curriculumUnit: null } : null;
        }).filter(Boolean)
      }))
    : [{ id: "course", title: "Course units", units: units.map((unit, index) => ({ unit, index, curriculumUnit: null })) }];

  const selectUnit = (index) => {
    if (!isUnitUnlocked(index)) return;
    onUnitChange(index);
    setOpen(false);
  };

  return (
    <div className="mb-5">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="course-unit-map"
        className={`afri-pattern flex min-h-32 w-full items-center gap-4 rounded-[1.8rem] border p-5 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F28C28]/25 ${dark ? "border-white/10 bg-[#1A201E] hover:bg-[#232B28]" : "border-black/8 bg-white hover:bg-[#FFF4E5]"}`}>
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#F28C28] text-white shadow-lg shadow-orange-500/20"><Layers3 size={25} /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-[#F28C28]">{language.flag} {language.language} · {activeCurriculumUnit ? `Master Unit ${activeCurriculumUnit.number} of ${curriculum.totalUnitCount}` : `Unit ${activeUnit + 1} of ${units.length}`}</span>
          <span className="mt-1 block text-xl font-black sm:text-2xl">{active.title}</span>
          <span className={`mt-1 line-clamp-2 text-sm font-semibold ${dark ? "text-white/48" : "text-black/48"}`}>{active.subtitle}</span>
          <span className="mt-3 flex items-center gap-3"><span className={`h-2 flex-1 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/8"}`}><span className="block h-full rounded-full bg-[#24745B]" style={{width:`${percent}%`}}/></span><span className="text-xs font-black text-[#24745B]">{completedInUnit}/{active.lessons.length}</span></span>
        </span>
        <span className={`hidden text-xs font-black sm:block ${dark ? "text-white/45" : "text-black/45"}`}>{open ? "Hide units" : "View all units"}</span>
        <ChevronDown size={20} className={`shrink-0 text-[#F28C28] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div id="course-unit-map" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeOut" }} className="overflow-hidden">
            <div className={`mt-3 rounded-[1.6rem] border p-4 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}>
              {curriculum && (
                <div className={`mb-5 rounded-2xl border p-4 ${dark ? "border-white/8 bg-white/[.035]" : "border-black/8 bg-[#FFF8EE]"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-black">Master Curriculum v{curriculum.version}</span>
                    <span className="rounded-full bg-[#24745B]/12 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#24745B]">{curriculum.playableUnitCount} playable · {curriculum.upcomingUnitCount} upcoming</span>
                  </div>
                  <p className={`mt-1 text-xs font-semibold ${dark ? "text-white/48" : "text-black/50"}`}>Verified lessons stay playable. Roadmap objectives without reviewed {language.language} content are clearly marked upcoming.</p>
                </div>
              )}
              {phaseGroups.map((phase, phaseIndex) => (
                <div key={phase.id} className={phaseIndex > 0 ? "mt-5 border-t border-current/10 pt-5" : ""}>
                  <div className="mb-3">
                    <div className={`text-xs font-black uppercase tracking-[0.18em] ${dark ? "text-white/55" : "text-black/55"}`}>Section {phaseIndex + 1} · {phase.title}{phase.range ? ` · Units ${phase.range[0]}–${phase.range[1]}` : ""}</div>
                    {phase.outcome && <p className={`mt-1 text-xs font-semibold ${dark ? "text-white/38" : "text-black/42"}`}>{phase.outcome}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
                    {phase.units.map(({ unit, index, curriculumUnit }) => {
                      const upcoming = curriculumUnit?.status === "upcoming";
                      const unlocked = !upcoming && isUnitUnlocked(index);
                      const selected = !upcoming && index === activeUnit;
                      const completed = !upcoming && unit.lessons.every((lesson) => completedLessonIds.includes(lesson.id));
                      const stateClass = selected
                        ? "border-[#F28C28] bg-[#F28C28] text-white shadow-md shadow-orange-500/15"
                        : completed
                          ? dark ? "border-[#53B98A]/30 bg-[#24745B]/20 hover:bg-[#24745B]/30" : "border-[#24745B]/15 bg-[#24745B]/10 hover:bg-[#24745B]/15"
                          : upcoming
                            ? dark ? "cursor-not-allowed border-dashed border-white/10 bg-white/[0.02] text-white/35" : "cursor-not-allowed border-dashed border-black/10 bg-black/[0.018] text-black/38"
                          : unlocked
                            ? dark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/8 bg-black/[0.03] hover:bg-black/[0.06]"
                            : dark ? "cursor-not-allowed border-white/5 bg-white/[0.025] text-white/25" : "cursor-not-allowed border-black/5 bg-black/[0.025] text-black/25";

                      return (
                        <button key={curriculumUnit?.id ?? unit.id} type="button" onClick={() => selectUnit(index)} disabled={!unlocked} aria-current={selected ? "step" : undefined}
                          className={`min-h-20 rounded-2xl border p-3 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F28C28]/25 ${stateClass}`}>
                          <span className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black uppercase tracking-wider">Unit {curriculumUnit?.number ?? index + 1}</span>
                            {completed ? <CheckCircle2 size={16} /> : upcoming ? <Clock3 size={15} /> : !unlocked ? <Lock size={15} /> : null}
                          </span>
                          <span className="mt-2 block text-sm font-black leading-tight">{curriculumUnit?.title ?? unit.title}</span>
                          {curriculumUnit?.courseUnitTitle && curriculumUnit.courseUnitTitle !== curriculumUnit.title && <span className={`mt-1 block text-[10px] font-semibold leading-tight ${selected ? "text-white/75" : dark ? "text-white/42" : "text-black/45"}`}>Lesson: {curriculumUnit.courseUnitTitle}</span>}
                          {upcoming ? <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider">Upcoming · content review needed</span> : !unlocked ? <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider">Locked</span> : null}
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
