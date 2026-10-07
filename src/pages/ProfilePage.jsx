import { ArrowRight, BookOpenText, Compass, Flame, Heart, LibraryBig, Mic, Star, Trophy, Zap } from "lucide-react";
import { achievements, getAchievementStats } from "../data/achievements";
import { availableLanguageList } from "../data/languages";
import Lebo from "../components/ui/Lebo";
import { hapticPress } from "../utils/hapticFeedback";
import { masteryInsights, skillDefinitions } from "../utils/learnerMastery";
import { learningInsights } from "../utils/learningTelemetry";

export default function ProfilePage({ dark, progress, progressByLanguage = {}, language, preferences, onPreferencesChange, onContinue }) {
  const card = dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";
  const totals = getAchievementStats(progressByLanguage);
  const persistedAchievements = new Set(Object.values(progressByLanguage).flatMap(item => item?.unlockedAchievementIds || []));
  const startedIds = new Set(preferences?.startedLanguageIds?.length ? preferences.startedLanguageIds : [language.id]);
  const startedCourses = availableLanguageList.filter(item => startedIds.has(item.id));
  const immersion = progress.immersion || {};
  const unlockedCount = achievements.filter(achievement => persistedAchievements.has(achievement.id) || achievement.test(totals)).length;
  const courseLessonTotal = language.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
  const activePercent = courseLessonTotal ? Math.round((progress.completedLessonIds.length / courseLessonTotal) * 100) : 0;
  const activeStats = [
    ["Vocabulary", progress.explore?.masteredEntryIds?.length || 0, "words mastered", LibraryBig, "#24745B"],
    ["Adventures", immersion.completedAdventures?.length || 0, "scenes completed", Compass, "#F28C28"],
    ["Stories", (immersion.completedStories?.length || 0) + (immersion.completedWorldStories?.length || 0), "stories completed", BookOpenText, "#C95D3A"],
    ["Pronunciation", immersion.completedPronunciation?.length || 0, "practices completed", Mic, "#4338CA"]
  ];
  const skills = Object.entries(progress.mastery?.skills || {}).filter(([, value]) => value.attempts > 0);
  const insights = masteryInsights(progress.mastery);
  const evidence = learningInsights(progress.learning);

  return (
    <div className="mx-auto max-w-3xl">
      <section className="afri-pattern relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#4338CA] via-[#5548D8] to-[#24745B] p-5 text-white sm:p-8">
        <div className="absolute -right-12 -top-16 size-64 rounded-full bg-[#F6C445]/15" />
        <div className="relative sm:grid sm:grid-cols-[minmax(0,1fr)_12rem] sm:items-center sm:gap-5">
          <div className="relative z-10 pr-20 sm:pr-0"><div className="text-[10px] font-black uppercase tracking-[.2em] text-[#F6C445] sm:text-xs sm:tracking-[.24em]">{language.flag} {language.language} learner profile</div><h1 className="mt-2 text-3xl font-black sm:text-5xl">Keep your momentum.</h1><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-white/70 sm:mt-3 sm:text-base sm:leading-7"><span className="sm:hidden">{preferences?.name ? `${preferences.name}, keep` : "Keep"} building real confidence.</span><span className="hidden sm:inline">{preferences?.name ? `${preferences.name}, you’re` : "You’re"} building real language confidence one useful moment at a time.</span></p><div className="mt-4 max-w-md sm:mt-5"><div className="flex justify-between text-xs font-black"><span>Course journey</span><span>{activePercent}%</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-black/20"><div className="h-full rounded-full bg-[#F6C445]" style={{width:`${activePercent}%`}}/></div></div>{onContinue&&<button onClick={onContinue} onPointerDown={hapticPress} className="afri-press mt-4 flex min-h-12 items-center gap-2 rounded-xl bg-[#F6C445] px-4 text-sm font-black text-[#1A201E] sm:mt-5 sm:min-h-14 sm:rounded-2xl sm:px-5 sm:text-base">Continue learning <ArrowRight size={18}/></button>}</div>
          <div className="absolute -right-4 top-12 size-32 sm:relative sm:right-auto sm:top-auto sm:mx-auto sm:size-44"><Lebo languageId={language.id} pose="encourage" animate={false} className="h-full w-full" decorative/></div>
        </div>
        <div className="relative mt-6 grid grid-cols-4 gap-2">
          <Metric icon={<Zap />} label="Total XP" value={totals.xp} inverse />
          <Metric icon={<Flame />} label="Streak" value={`${progress.streak}d`} inverse />
          <Metric icon={<Heart />} label="Hearts" value={progress.hearts} inverse />
          <Metric icon={<Star />} label="Lessons" value={totals.lessons} inverse />
        </div>
      </section>

      <section className={`mt-5 flex items-center gap-4 rounded-[1.5rem] border p-4 sm:p-5 ${card}`}><span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#F6C445]/20 text-[#C95D3A]"><Trophy size={26}/></span><div className="min-w-0 flex-1"><div className="font-black">Achievement collection</div><p className="mt-1 text-sm font-semibold opacity-50">{unlockedCount} of {achievements.length} badges unlocked across your courses.</p><div className={`mt-3 h-2 overflow-hidden rounded-full ${dark?"bg-white/10":"bg-black/8"}`}><div className="h-full rounded-full bg-[#F6C445]" style={{width:`${Math.round(unlockedCount/achievements.length*100)}%`}}/></div></div></section>

      <h2 className="mt-8 text-2xl font-black">{language.language} learning footprint</h2>
      <p className={`mt-2 hidden text-sm font-semibold leading-6 sm:block ${dark ? "text-white/45" : "text-black/45"}`}>Your progress beyond the lesson path—words explored, situations handled, stories followed, and speaking practice completed.</p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">{activeStats.map(([title,value,label,Icon,color]) => <div key={title} className={`relative overflow-hidden rounded-[1.3rem] border p-3 sm:rounded-[1.5rem] sm:p-5 ${card}`}><div className="absolute -bottom-6 -right-4 size-24 rounded-full opacity-10" style={{backgroundColor:color}}/><div className="relative flex items-center gap-3 sm:gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl text-white sm:size-12 sm:rounded-2xl" style={{backgroundColor:color}}><Icon size={20}/></span><div><div className="text-xl font-black sm:text-2xl">{value}</div><div className="text-sm font-black sm:text-base">{title}</div><div className="hidden text-xs font-semibold opacity-45 sm:block">{label}</div></div></div></div>)}</div>

      <h2 className="mt-8 text-2xl font-black">Skill mastery</h2>
      <p className={`mt-2 hidden text-sm font-semibold leading-6 sm:block ${dark ? "text-white/45" : "text-black/45"}`}>Built from your answers across lessons, checkpoints, review, and focused practice.</p>
      {evidence.attempts > 0 && <section className={`mt-4 rounded-[1.5rem] border p-5 ${card}`}><div className="text-xs font-black uppercase tracking-wider text-[#F28C28]">Learning insights</div><div className="mt-4 grid grid-cols-3 gap-3 text-center"><Metric label="Answers" value={evidence.attempts}/><Metric label="Concepts" value={evidence.concepts}/><Metric label="7-day accuracy" value={evidence.recentAccuracy == null ? "—" : `${evidence.recentAccuracy}%`}/></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-[#C95D3A]/10 p-4"><div className="text-xs font-black uppercase tracking-wider text-[#C95D3A]">Weak concepts</div><div className="mt-2 text-sm font-semibold">{evidence.weakest.length ? evidence.weakest.slice(0,3).map(item => `${item.id.split(":").at(-1)} · ${item.accuracy}%`).join(" · ") : "Keep answering to reveal patterns."}</div></div><div className="rounded-2xl bg-[#4338CA]/10 p-4"><div className="text-xs font-black uppercase tracking-wider text-[#4338CA]">Memory refresh</div><div className="mt-2 text-sm font-semibold">{evidence.stale.length ? `${evidence.stale.length} concepts have been quiet for at least a week.` : "Nothing is stale yet—keep your rhythm."}</div></div></div>{evidence.previousAccuracy != null && evidence.recentAccuracy != null && <p className="mt-4 text-sm font-bold opacity-55">Recent accuracy is {evidence.recentAccuracy >= evidence.previousAccuracy ? "up" : "down"} {Math.abs(evidence.recentAccuracy-evidence.previousAccuracy)} points versus the previous week.</p>}</section>}
      {skills.length ? <><div className="mt-4 grid gap-3 sm:grid-cols-2">{skills.map(([id,value]) => { const definition=skillDefinitions[id]; return <div key={id} className={`rounded-[1.5rem] border p-4 ${card}`}><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="text-2xl">{definition.emoji}</span><div><div className="font-black">{definition.label}</div><div className="text-xs font-black uppercase tracking-wider text-[#4338CA]">{value.level}</div></div></div><div className="text-xl font-black">{value.accuracy}%</div></div><div className={`mt-3 h-2 overflow-hidden rounded-full ${dark?"bg-white/10":"bg-black/8"}`}><div className="h-full rounded-full bg-gradient-to-r from-[#F28C28] to-[#24745B]" style={{width:`${value.accuracy}%`}}/></div><div className="mt-2 text-xs font-semibold opacity-40">{value.correct} correct across {value.attempts} attempts</div></div>; })}</div>{(insights.strongest || insights.weakest) && <div className={`mt-4 rounded-[1.5rem] border p-5 ${card}`}><div className="text-xs font-black uppercase tracking-wider text-[#F28C28]">Your next best move</div>{insights.strongest && <p className="mt-2 font-semibold"><strong>Strength:</strong> {skillDefinitions[insights.strongest[0]].label} at {insights.strongest[1].accuracy}%.</p>}{insights.weakest && <p className="mt-1 font-semibold"><strong>Focus next:</strong> {skillDefinitions[insights.weakest[0]].label} at {insights.weakest[1].accuracy}%.</p>}</div>}</> : <div className={`mt-4 rounded-[1.5rem] border p-5 text-sm font-semibold opacity-60 ${card}`}>Complete a lesson to begin building your skill profile.</div>}

      {preferences && <><h2 className="mt-8 text-2xl font-black">Learning preferences</h2><div className={`mt-4 rounded-[1.5rem] border p-5 ${card}`}><label className="text-sm font-black">Display name<input value={preferences.name} onChange={event=>onPreferencesChange({...preferences,name:event.target.value})} className={`mt-2 min-h-12 w-full rounded-xl border px-4 font-bold outline-none focus:border-[#F28C28] ${dark?"border-white/10 bg-white/5":"border-black/10 bg-[#FFF8EE]"}`}/></label><div className="mt-5 text-sm font-black">Daily activity goal</div><div className="mt-2 grid grid-cols-3 gap-2">{[1,3,5].map(value=><button key={value} onClick={()=>onPreferencesChange({...preferences,dailyTarget:value})} className={`min-h-12 rounded-xl font-black ${preferences.dailyTarget===value?"bg-[#F28C28] text-white":dark?"bg-white/6":"bg-black/5"}`}>{value} / day</button>)}</div></div></>}

      <h2 className="mt-8 text-2xl font-black">Achievements</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {achievements.map((achievement) => {
          const unlocked = persistedAchievements.has(achievement.id) || achievement.test(totals);
          return <div key={achievement.id} className={`flex items-center gap-4 rounded-[1.5rem] border p-4 ${card} ${!unlocked ? "opacity-45" : ""}`}>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F6C445]/20 text-3xl">{achievement.emoji}</div>
            <div className="min-w-0 flex-1">
              <div className="font-black">{achievement.title}</div>
              <div className={`mt-1 hidden text-sm font-semibold sm:block ${dark ? "text-white/45" : "text-black/45"}`}>{achievement.description}</div>
            </div>
            {unlocked && <span className="rounded-full bg-[#24745B]/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#53B98A]">Unlocked</span>}
          </div>;
        })}
      </div>

      <h2 className="mt-8 text-2xl font-black">My course progress</h2>
      <div className="mt-4 space-y-3">{startedCourses.map(item => {
        const course = progressByLanguage[item.id];
        const lessonTotal = item.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
        const percent = Math.round(((course?.completedLessonIds?.length || 0) / lessonTotal) * 100);
        const extras = (course?.explore?.masteredEntryIds?.length || 0) + (course?.immersion?.completedAdventures?.length || 0) + (course?.immersion?.completedStories?.length || 0) + (course?.immersion?.completedWorldStories?.length || 0);
        return <div key={item.id} className={`rounded-[1.5rem] border p-4 ${card}`}><div className="flex items-center justify-between"><div className="font-black">{item.flag} {item.language}</div><div className="text-sm font-black text-[#F28C28]">{course?.xp || 0} XP</div></div><div className={`mt-3 h-2 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/10"}`}><div className="h-full rounded-full bg-[#24745B]" style={{width:`${percent}%`}}/></div><div className={`mt-2 flex flex-wrap justify-between gap-2 text-xs font-bold ${dark ? "text-white/55" : "text-black/55"}`}><span>{course?.completedLessonIds?.length || 0}/{lessonTotal} lessons · {percent}%</span><span className="hidden sm:inline">{extras} Explore & Immersion moments</span></div></div>;
      })}</div>
    </div>
  );
}

function Metric({ icon, label, value, dark, inverse = false }) {
  return (
    <div className={`rounded-xl p-2 text-center sm:rounded-2xl sm:p-4 ${inverse ? "bg-white/12" : dark ? "bg-white/6" : "bg-black/4"}`}>
      <div className={`mx-auto flex justify-center ${inverse ? "text-[#F6C445]" : "text-[#F28C28]"}`}>{icon}</div>
      <div className="mt-1 text-lg font-black sm:mt-2 sm:text-2xl">{value}</div>
      <div className={`text-[9px] font-bold uppercase tracking-wider sm:text-[10px] sm:tracking-widest ${inverse ? "text-white/70" : dark ? "text-white/55" : "text-black/55"}`}>{label}</div>
    </div>
  );
}
