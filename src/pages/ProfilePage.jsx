import { Flame, Heart, Star, Zap } from "lucide-react";
import { achievements, getAchievementStats } from "../data/achievements";
import { availableLanguageList } from "../data/languages";

export default function ProfilePage({ dark, progress, progressByLanguage = {}, language, preferences, onPreferencesChange }) {
  const card = dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";
  const totals = getAchievementStats(progressByLanguage);
  const persistedAchievements = new Set(Object.values(progressByLanguage).flatMap(item => item?.unlockedAchievementIds || []));
  const startedIds = new Set(preferences?.startedLanguageIds?.length ? preferences.startedLanguageIds : [language.id]);
  const startedCourses = availableLanguageList.filter(item => startedIds.has(item.id));

  return (
    <div className="mx-auto max-w-3xl">
      <div className={`rounded-[2rem] border p-6 text-center ${card}`}>
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[#F28C28] text-4xl shadow-xl">⚡</div>
        <h1 className="mt-4 text-3xl font-black">Learner Profile</h1>
        <p className={`mt-1 font-semibold ${dark ? "text-white/50" : "text-black/50"}`}>
          Building {language.language} fluency one lesson at a time.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric icon={<Zap />} label="Total XP" value={totals.xp} dark={dark} />
          <Metric icon={<Flame />} label="Streak" value={`${progress.streak}d`} dark={dark} />
          <Metric icon={<Heart />} label="Hearts" value={progress.hearts} dark={dark} />
          <Metric icon={<Star />} label="Lessons" value={totals.lessons} dark={dark} />
        </div>
      </div>

      {preferences && <><h2 className="mt-8 text-2xl font-black">Learning preferences</h2><div className={`mt-4 rounded-[1.5rem] border p-5 ${card}`}><label className="text-sm font-black">Display name<input value={preferences.name} onChange={event=>onPreferencesChange({...preferences,name:event.target.value})} className={`mt-2 min-h-12 w-full rounded-xl border px-4 font-bold outline-none focus:border-[#F28C28] ${dark?"border-white/10 bg-white/5":"border-black/10 bg-[#FFF8EE]"}`}/></label><div className="mt-5 text-sm font-black">Daily activity goal</div><div className="mt-2 grid grid-cols-3 gap-2">{[1,3,5].map(value=><button key={value} onClick={()=>onPreferencesChange({...preferences,dailyTarget:value})} className={`min-h-12 rounded-xl font-black ${preferences.dailyTarget===value?"bg-[#F28C28] text-white":dark?"bg-white/6":"bg-black/5"}`}>{value} / day</button>)}</div></div></>}

      <h2 className="mt-8 text-2xl font-black">Achievements</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {achievements.map((achievement) => {
          const unlocked = persistedAchievements.has(achievement.id) || achievement.test(totals);
          return <div key={achievement.id} className={`flex items-center gap-4 rounded-[1.5rem] border p-4 ${card} ${!unlocked ? "opacity-45" : ""}`}>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F6C445]/20 text-3xl">{achievement.emoji}</div>
            <div className="min-w-0 flex-1">
              <div className="font-black">{achievement.title}</div>
              <div className={`mt-1 text-sm font-semibold ${dark ? "text-white/45" : "text-black/45"}`}>{achievement.description}</div>
            </div>
            {unlocked && <span className="rounded-full bg-[#24745B]/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#53B98A]">Unlocked</span>}
          </div>;
        })}
      </div>

      <h2 className="mt-8 text-2xl font-black">My course progress</h2>
      <div className="mt-4 space-y-3">{startedCourses.map(item => {
        const course = progressByLanguage[item.id];
        const lessonTotal = item.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
        const percent = Math.round(((course?.completedLessonIds.length || 0) / lessonTotal) * 100);
        return <div key={item.id} className={`rounded-[1.5rem] border p-4 ${card}`}><div className="flex items-center justify-between"><div className="font-black">{item.flag} {item.language}</div><div className="text-sm font-black text-[#F28C28]">{course?.xp || 0} XP</div></div><div className={`mt-3 h-2 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/10"}`}><div className="h-full rounded-full bg-[#24745B]" style={{width:`${percent}%`}}/></div><div className={`mt-2 text-xs font-bold ${dark ? "text-white/40" : "text-black/40"}`}>{course?.completedLessonIds.length || 0}/{lessonTotal} lessons · {percent}%</div></div>;
      })}</div>
    </div>
  );
}

function Metric({ icon, label, value, dark }) {
  return (
    <div className={`rounded-2xl p-4 ${dark ? "bg-white/6" : "bg-black/4"}`}>
      <div className="mx-auto flex justify-center text-[#F28C28]">{icon}</div>
      <div className="mt-2 text-2xl font-black">{value}</div>
      <div className={`text-[10px] font-bold uppercase tracking-widest ${dark ? "text-white/35" : "text-black/35"}`}>{label}</div>
    </div>
  );
}
