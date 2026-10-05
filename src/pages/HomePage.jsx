import { CheckCircle2, Flame, Gift, LibraryBig, Sparkles, Target, Trophy } from "lucide-react";
import LessonPath from "../components/LessonPath";
import GamificationPanel from "../components/gamification/GamificationPanel";
import LeboCoach from "../components/gamification/LeboCoach";
import CourseGraduation from "../components/gamification/CourseGraduation";
import CourseSwitcher from "../components/navigation/CourseSwitcher";
import UnitNavigator from "../components/navigation/UnitNavigator";
import { getFurthestUnlockedUnit, isUnitUnlocked as getUnitUnlocked } from "../utils/courseProgress";
import { dateKey } from "../utils/dateKey";
import DailyLearningPlan from "../components/gamification/DailyLearningPlan";

const motivationLabels = { travel:"Travel", family:"Family", culture:"Culture", relationships:"Relationships", general:"Balanced growth" };
const focusPatterns = {
  travel:/travel|transport|direction|place|market|food|restaurant/i,
  family:/family|people|home|relationship|introduction/i,
  culture:/culture|story|food|music|name|greeting|festival|proverb/i,
  relationships:/relationship|social|conversation|family|greeting|people/i,
  general:/.*/i
};

export default function HomePage({ dark, progress, language, activeLanguage, onLanguageChange, onStartLesson, onNavigate, activeUnit, onUnitChange, progressByLanguage, startedLanguageIds, languageId, learnerName, dailyTarget, courseProfile, exploreLibrary, hasImmersion }) {
  const units = language.units;
  const unit = units[activeUnit];
  const card = dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";
  const completedIds = progress.completedLessonIds || [];
  const completedLessonsInUnit = unit.lessons.filter(lesson => completedIds.includes(lesson.id)).length;
  const isUnitUnlocked = index => getUnitUnlocked(units, index, completedIds, progress.placement?.unitIndex || 0);
  const recommendedUnitIndex = getFurthestUnlockedUnit(units, completedIds, progress.placement?.unitIndex || 0);
  const recommendedUnit = units[recommendedUnitIndex];
  const nextLesson = recommendedUnit.lessons.find((lesson, index) => !completedIds.includes(lesson.id) && (index === 0 || completedIds.includes(recommendedUnit.lessons[index - 1].id))) || recommendedUnit.lessons.at(-1);
  const courseComplete = units.every(courseUnit => courseUnit.lessons.every(lesson => completedIds.includes(lesson.id)));
  const currentUnitComplete = completedLessonsInUnit === unit.lessons.length;
  const nextUnitUnlocked = activeUnit < units.length - 1 && isUnitUnlocked(activeUnit + 1);
  const cultureIds = unit.lessons.map(lesson => lesson.cultureCard.id);
  const cultureCount = progress.unlockedCultureCards.filter(id => cultureIds.includes(id)).length;
  const motivations = courseProfile?.motivations || [];
  const focusUnitIndex = motivations.map(id => units.findIndex(item => focusPatterns[id]?.test(`${item.title} ${item.subtitle}`))).find(index => index >= 0) ?? -1;
  const focusUnit = focusUnitIndex >= 0 ? units[focusUnitIndex] : recommendedUnit;
  const focusUnlocked = isUnitUnlocked(focusUnitIndex >= 0 ? focusUnitIndex : recommendedUnitIndex);
  const todayCount = progress.daily?.date === dateKey() ? progress.daily.completed : 0;
  const dailyPercent = Math.min(100, todayCount / Math.max(1, dailyTarget) * 100);
  const unitPercent = Math.round(completedLessonsInUnit / unit.lessons.length * 100);

  return <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
    <section className="min-w-0">
      <CourseSwitcher dark={dark} activeLanguage={activeLanguage} startedLanguageIds={startedLanguageIds} progressByLanguage={progressByLanguage} learnerName={learnerName} onLanguageChange={onLanguageChange} onContinue={() => { onUnitChange(recommendedUnitIndex); onStartLesson(nextLesson); }} nextLessonTitle={nextLesson?.title} nextUnitTitle={`Unit ${recommendedUnitIndex + 1} · ${recommendedUnit.title}`}/>
      <UnitNavigator dark={dark} language={language} units={units} activeUnit={activeUnit} completedLessonIds={completedIds} isUnitUnlocked={isUnitUnlocked} onUnitChange={onUnitChange}/>
      <LessonPath lessons={unit.lessons} progress={progress} dark={dark} onStart={onStartLesson} languageId={languageId}/>
      {courseComplete && <CourseGraduation dark={dark} language={language} learnerName={learnerName} units={units} onReview={onStartLesson}/>}
    </section>

    <aside className="min-w-0 space-y-4" aria-label="Learning progress">
      <LeboCoach dark={dark} progress={progress} completedInUnit={completedLessonsInUnit} totalInUnit={unit.lessons.length} languageId={languageId}/>

      <DailyLearningPlan dark={dark} progress={progress} motivations={motivations} library={exploreLibrary} hasImmersion={hasImmersion} onNavigate={onNavigate}/>

      <section className={`rounded-[1.75rem] border p-5 ${card}`} aria-labelledby="today-title">
        <div className="flex items-center justify-between gap-3"><div><div className="text-xs font-black uppercase tracking-[.18em] text-[#F28C28]">Today</div><h2 id="today-title" className="mt-1 text-xl font-black">Keep your rhythm</h2></div><span className="grid size-12 place-items-center rounded-2xl bg-[#F28C28]/12 text-[#F28C28]"><Flame fill="currentColor"/></span></div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center"><Metric value={progress.streak || 0} label="day streak" tone="#F28C28"/><Metric value={`${Math.min(todayCount, dailyTarget)}/${dailyTarget}`} label="daily goal" tone="#24745B"/><Metric value={progress.xp || 0} label="course XP" tone="#4338CA"/></div>
        <Progress label="Daily activity" value={dailyPercent} dark={dark}/><Progress label={`${unit.title} progress`} value={unitPercent} dark={dark} color="#24745B"/>
      </section>

      {motivations.length > 0 && <section className={`rounded-[1.75rem] border p-5 ${card}`}>
        <div className="flex items-center gap-2 text-[#24745B]"><Target size={19}/><span className="text-xs font-black uppercase tracking-[.18em]">Your learning plan</span></div>
        <div className="mt-3 flex flex-wrap gap-2">{motivations.map(id => <span key={id} className="rounded-full bg-[#24745B]/12 px-3 py-1.5 text-xs font-black text-[#24745B]">{motivationLabels[id] || id}</span>)}</div>
        <h3 className="mt-4 text-lg font-black">{focusUnit.title}</h3><p className={`mt-1 text-sm font-semibold leading-6 ${dark ? "text-white/48" : "text-black/48"}`}>{focusUnlocked ? "Recommended from the goals you chose." : "This goal-focused unit unlocks later in your path."}</p>
        {focusUnlocked && focusUnit.id !== unit.id && <button onClick={() => onUnitChange(focusUnitIndex >= 0 ? focusUnitIndex : recommendedUnitIndex)} data-tone="green" className="afri-press mt-4 min-h-11 w-full rounded-xl bg-[#24745B] px-4 font-black text-white">Open unit</button>}
      </section>}

      {currentUnitComplete && activeUnit < units.length - 1 && nextUnitUnlocked && <section className="rounded-[1.75rem] border border-[#24745B]/25 bg-[#24745B]/10 p-5"><div className="flex items-center gap-2 text-[#24745B]"><CheckCircle2/><span className="text-xs font-black uppercase tracking-wider">Unit complete</span></div><h3 className="mt-3 text-xl font-black">{units[activeUnit + 1].title} is ready</h3><button onClick={() => onUnitChange(activeUnit + 1)} className="afri-press mt-4 min-h-12 w-full rounded-xl bg-[#F28C28] font-black text-white">Start Unit {activeUnit + 2}</button></section>}

      <details className={`group rounded-[1.75rem] border ${card}`}>
        <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 px-5 py-4 font-black"><span className="grid size-10 place-items-center rounded-xl bg-[#F6C445]/18 text-[#A66A00]"><Trophy size={20}/></span><span className="min-w-0 flex-1">Goals, league & rewards</span><Sparkles size={18} className="text-[#F28C28] transition group-open:rotate-45"/></summary>
        <div className="space-y-4 border-t border-current/10 p-4"><div className="grid grid-cols-2 gap-3"><MiniStat Icon={Gift} value={`${completedLessonsInUnit}/${unit.lessons.length}`} label="Unit lessons"/><MiniStat Icon={LibraryBig} value={`${cultureCount}/${unit.lessons.length}`} label="Culture cards"/></div><GamificationPanel dark={dark} progress={progress} dailyTarget={dailyTarget} languageName={language.language}/></div>
      </details>

      {language.sourceNotes && <p title={language.sourceNotes.varietyNote} className={`px-2 text-center text-[11px] font-bold leading-5 ${dark ? "text-white/32" : "text-black/35"}`}>Text is source-aligned. Native-speaker audio remains pending.</p>}
    </aside>
  </div>;
}

function Metric({ value, label, tone }) { return <div className="rounded-2xl bg-current/[.035] px-2 py-3"><div className="text-xl font-black" style={{color:tone}}>{value}</div><div className="mt-1 text-[10px] font-black uppercase tracking-wide opacity-45">{label}</div></div>; }
function Progress({ label, value, dark, color="#F28C28" }) { return <div className="mt-4"><div className="flex justify-between text-xs font-black"><span>{label}</span><span>{Math.round(value)}%</span></div><div role="progressbar" aria-label={label} aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(value)} className={`mt-2 h-2.5 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/8"}`}><div className="h-full rounded-full transition-all" style={{width:`${value}%`,backgroundColor:color}}/></div></div>; }
function MiniStat({ Icon, value, label }) { return <div className="rounded-2xl bg-current/[.04] p-3"><Icon size={18} className="text-[#F28C28]"/><div className="mt-2 text-lg font-black">{value}</div><div className="text-[10px] font-black uppercase tracking-wide opacity-40">{label}</div></div>; }
