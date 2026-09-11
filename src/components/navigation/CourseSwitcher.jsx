import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, ChevronRight, MapPin, Search, X } from "lucide-react";
import { languageList } from "../../data/languages";
import { initialProgress } from "../../hooks/useCourseProgress";
import Lebo from "../ui/Lebo";
import useDialogFocus from "../../hooks/useDialogFocus";

function courseStats(course, progressByLanguage) {
  if (!course?.units?.length) return { completed: 0, total: 0, percent: 0 };
  const saved = progressByLanguage?.[course.id] || initialProgress;
  const lessons = course.units.flatMap(unit => unit.lessons);
  const completed = lessons.filter(lesson => saved.completedLessonIds.includes(lesson.id)).length;
  return { completed, total: lessons.length, percent: lessons.length ? Math.round((completed / lessons.length) * 100) : 0 };
}

export default function CourseSwitcher({ dark, activeLanguage, startedLanguageIds = [], progressByLanguage, onLanguageChange, onContinue, learnerName }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [previewCourse, setPreviewCourse] = useState(null);
  const dialogRef = useRef(null);
  useDialogFocus(dialogRef, open, () => setOpen(false));
  const courses = languageList;
  const readyCourses = courses.filter(course => course.available);
  const comingSoonCount = courses.length - readyCourses.length;
  const active = readyCourses.find(course => course.id === activeLanguage) || readyCourses[0];
  const activeStats = courseStats(active, progressByLanguage);
  const startedIds = new Set([activeLanguage, ...startedLanguageIds]);
  const myCourses = readyCourses.filter(course => startedIds.has(course.id));
  const preview = [active, ...myCourses.filter(course => course.id !== active.id)];
  const filtered = useMemo(() => courses.filter(course =>
    `${course.language} ${course.nativeName}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [courses, query]);
  const card = dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";

  const choose = courseId => {
    if (!courses.find(course => course.id === courseId)?.available) return;
    onLanguageChange(courseId);
    setOpen(false);
    setQuery("");
    setPreviewCourse(null);
  };

  const openCatalog = () => { setPreviewCourse(null); setOpen(true); };
  const inspectCourse = course => startedIds.has(course.id) ? choose(course.id) : setPreviewCourse(course);

  return <>
    <section className="mb-7">
      <div className="mb-5">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Hello, {learnerName || "learner"}! <span aria-hidden>👋🏾</span></h1>
        <p className={`mt-1 font-semibold ${dark ? "text-white/48" : "text-black/48"}`}>What do you want to learn today?</p>
      </div>

      <div className="afri-pattern relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#4338CA] via-[#5548D8] to-[#24745B] p-6 text-white shadow-xl shadow-indigo-950/15 sm:p-7">
        <div className="relative z-10 max-w-[72%] sm:max-w-[64%]">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-white/65">Pick up where you left off</div>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-3xl">{active.flag}</span>
            <div>
              <h2 className="text-2xl font-black">{active.language}</h2>
              <p className="text-sm font-bold text-white/65">{active.nativeName}</p>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-[#F6C445] transition-all" style={{ width: `${activeStats.percent}%` }} />
            </div>
            <span className="text-xs font-black">{activeStats.percent}%</span>
          </div>
          <button onClick={onContinue} className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#4338CA] shadow-lg transition hover:-translate-y-0.5">
            Continue learning <ArrowRight size={17} strokeWidth={3} />
          </button>
        </div>
        <div className="absolute -bottom-5 -right-7 h-48 w-48 sm:-bottom-8 sm:right-2 sm:h-60 sm:w-60">
          <div className="absolute inset-5 rounded-full bg-[#F6C445]/90 shadow-2xl" />
          <Lebo pose="wave" reaction="wave" languageId={activeLanguage} className="relative h-full w-full" decorative />
        </div>
        <button onClick={openCatalog} aria-label={`Switch from ${active.language} or add another course`} className="absolute right-5 top-4 flex min-h-11 items-center gap-2 rounded-2xl bg-white/15 px-3 py-2 text-sm font-black backdrop-blur transition hover:bg-white/25">{active.flag} {active.language}<ChevronDown size={15}/></button>
      </div>

      <div className="mt-7 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black">My Courses</h2>
          <p className={`text-sm font-semibold ${dark ? "text-white/40" : "text-black/40"}`}>{myCourses.length === 1 ? "Your learning journey starts here." : "Switch courses without losing your place."}</p>
        </div>
        <button onClick={openCatalog} className="min-h-11 rounded-xl px-3 text-sm font-black text-[#F28C28] transition hover:bg-[#F28C28]/10">{myCourses.length === 1 ? "Add a course" : "View all"}</button>
      </div>

      <div className="mt-3 grid gap-3">
        {preview.map(course => {
          const stats = courseStats(course, progressByLanguage);
          const selected = course.id === activeLanguage;
          return <button key={course.id} onClick={() => choose(course.id)} className={`flex min-h-[78px] items-center gap-4 rounded-[1.4rem] border p-4 text-left shadow-sm transition hover:-translate-y-0.5 ${selected ? "border-[#F28C28]/45 ring-2 ring-[#F28C28]/10" : ""} ${card}`}>
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-2xl ${dark ? "bg-white/7" : "bg-[#FFF8EE]"}`}>{course.flag}</span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 font-black"><span className="truncate">{course.language}</span>{selected && <span className="rounded-full bg-[#F28C28]/15 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#F28C28]">Active</span>}</span>
              <span className={`mt-1 block text-xs font-bold ${dark ? "text-white/42" : "text-black/42"}`}>{stats.completed}/{stats.total} lessons · {stats.percent}%</span>
              <span className={`mt-2 block h-1.5 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/8"}`}><span className="block h-full rounded-full bg-[#F28C28]" style={{ width: `${stats.percent}%` }} /></span>
            </span>
            <ChevronRight size={20} className={dark ? "text-white/25" : "text-black/25"} />
          </button>;
        })}
      </div>
    </section>

    <AnimatePresence>
      {open && <motion.div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setOpen(false); setPreviewCourse(null); }}>
        <motion.section ref={dialogRef} role="dialog" aria-modal="true" aria-label="All language courses" onClick={event => event.stopPropagation()} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className={`max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-t-[2rem] border shadow-2xl sm:rounded-[2rem] ${dark ? "border-white/10 bg-[#101312]" : "border-black/10 bg-[#FFF8EE]"}`}>
          <div className="flex items-center justify-between p-5 pb-3 sm:p-6 sm:pb-3">
            <div className="flex items-center gap-3">{previewCourse && <button onClick={()=>setPreviewCourse(null)} aria-label="Back to all courses" className={`grid size-11 place-items-center rounded-xl ${dark?"bg-white/7":"bg-black/5"}`}><ArrowLeft size={20}/></button>}<div><h2 className="text-2xl font-black">{previewCourse ? previewCourse.language : "All Courses"}</h2><p className={`mt-1 text-sm font-semibold ${dark ? "text-white/45" : "text-black/45"}`}>{previewCourse ? previewCourse.nativeName : `${readyCourses.length} ready · ${comingSoonCount} coming soon`}</p></div></div>
            <button onClick={() => { setOpen(false); setPreviewCourse(null); }} aria-label="Close all courses" className={`grid h-11 w-11 place-items-center rounded-xl ${dark ? "bg-white/7" : "bg-black/5"}`}><X size={20} /></button>
          </div>
          {!previewCourse && <><div className="px-5 pb-3 sm:px-6">
            <label className={`flex min-h-12 items-center gap-3 rounded-2xl border px-4 ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"}`}><Search size={18} className="opacity-45"/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search languages" className="w-full bg-transparent py-3 font-semibold outline-none" /></label>
          </div>
          <div className="max-h-[60vh] overflow-y-auto px-5 pb-6 sm:px-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {filtered.map(course => {
                const stats = courseStats(course, progressByLanguage);
                const selected = course.id === activeLanguage;
                return <button key={course.id} type="button" disabled={!course.available} onClick={() => inspectCourse(course)} aria-label={`${course.flag} ${course.language} ${course.nativeName}${course.available ? startedIds.has(course.id) ? ` ${stats.percent}% complete` : " Preview and start course" : " Coming Soon"}`} className={`flex min-h-[94px] items-center gap-3 rounded-2xl border p-4 text-left transition ${course.available ? "hover:border-[#F28C28]/50" : "cursor-not-allowed opacity-65"} ${selected ? "border-[#F28C28] bg-[#F28C28]/8" : card}`}>
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-3xl ${dark ? "bg-white/7" : "bg-[#FFF8EE]"}`}>{course.flag}</span><span className="min-w-0 flex-1"><span className="block font-black">{course.language}</span><span className={`block truncate text-xs font-bold ${dark ? "text-white/42" : "text-black/42"}`}>{course.nativeName}</span>{course.available ? <span className="mt-2 block text-xs font-black text-[#F28C28]">{startedIds.has(course.id) ? `${stats.percent}% complete` : "Start course"}</span> : <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${dark ? "bg-white/8 text-white/55" : "bg-black/6 text-black/50"}`}>Coming Soon</span>}</span>{selected ? <BookOpen size={19} className="text-[#F28C28]"/> : course.available ? <ChevronRight size={18} className="opacity-25"/> : null}
                </button>;
              })}
            </div>
          </div>
          </>}
          {previewCourse && <CoursePreview course={previewCourse} dark={dark} card={card} onStart={()=>choose(previewCourse.id)} />}
        </motion.section>
      </motion.div>}
    </AnimatePresence>
  </>;
}

function CoursePreview({ course, dark, card, onStart }) {
  const firstUnit = course.units[0];
  const totalLessons = course.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
  return <div className="max-h-[70vh] overflow-y-auto px-5 pb-6 sm:px-6"><div className="afri-pattern relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#4338CA] to-[#24745B] p-6 text-white"><div className="relative z-10 max-w-[65%]"><div className="text-5xl">{course.flag}</div><h3 className="mt-3 text-3xl font-black">Learn {course.language}</h3><div className="mt-2 flex items-center gap-2 text-sm font-bold text-white/70"><MapPin size={16}/>{course.region}</div></div><Lebo pose="wave" reaction="wave" languageId={course.id} className="absolute -bottom-7 -right-5 size-48" decorative/></div><div className="mt-4 grid grid-cols-2 gap-3"><div className={`rounded-2xl border p-4 ${card}`}><div className="text-2xl font-black">{course.units.length}</div><div className="text-xs font-bold opacity-45">Units</div></div><div className={`rounded-2xl border p-4 ${card}`}><div className="text-2xl font-black">{totalLessons}</div><div className="text-xs font-bold opacity-45">Lessons</div></div></div><div className={`mt-4 rounded-2xl border p-5 ${card}`}><div className="text-xs font-black uppercase tracking-[.2em] text-[#F28C28]">Your first step</div><h4 className="mt-2 text-xl font-black">Unit 1 · {firstUnit.title}</h4><p className={`mt-2 text-sm font-semibold ${dark?"text-white/50":"text-black/50"}`}>{firstUnit.subtitle}</p><div className="mt-4 flex flex-wrap gap-2">{firstUnit.lessons.slice(0,3).map(lesson=><span key={lesson.id} className={`rounded-full px-3 py-1.5 text-xs font-bold ${dark?"bg-white/7":"bg-black/5"}`}>{lesson.emoji} {lesson.title}</span>)}</div></div><button onClick={onStart} className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#F28C28] px-5 font-black text-white shadow-lg shadow-orange-500/20">Start this course <ArrowRight size={19}/></button></div>;
}
