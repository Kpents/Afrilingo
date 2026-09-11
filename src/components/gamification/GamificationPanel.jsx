import { CheckCircle2, Circle, Shield, Swords } from "lucide-react";
import { dateKey } from "../../utils/dateKey";
import { HEART_REGEN_MS } from "../../hooks/useCourseProgress";

const rivals = [
  ["Ama", "🇬🇭", 680], ["Zuri", "🇰🇪", 540], ["Chidi", "🇳🇬", 420], ["Kofi", "🇬🇭", 260]
];

export default function GamificationPanel({ dark, progress }) {
  const questTarget = 3;
  const today = dateKey();
  const questProgress = progress.daily?.date === today ? Math.min(questTarget, progress.daily.completed) : 0;
  const players = [...rivals, ["You", "⚡", progress.xp]].sort((a, b) => b[2] - a[2]);
  const league = progress.xp >= 2500 ? "Diamond" : progress.xp >= 1500 ? "Platinum" : progress.xp >= 800 ? "Gold" : progress.xp >= 300 ? "Silver" : "Bronze";
  const card = dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";
  const heartMinutes = progress.hearts < 5 && progress.heartUpdatedAt ? Math.max(1, Math.ceil((HEART_REGEN_MS - (Date.now() - progress.heartUpdatedAt)) / 60000)) : null;

  return <>
    {heartMinutes && <div className={`rounded-[1.75rem] border p-4 ${card}`}><div className="text-xs font-black uppercase tracking-wider text-[#EF5B5B]">Heart recovery</div><div className="mt-1 font-black">Next heart in ~{heartMinutes} min</div><div className={`mt-1 text-xs font-semibold ${dark ? "text-white/40" : "text-black/40"}`}>{progress.hearts}/5 hearts available</div></div>}
    <div className={`rounded-[1.75rem] border p-5 ${card}`}>
      <div className="flex items-center gap-2 text-[#F6C445]"><Swords size={20}/><span className="text-xs font-black uppercase tracking-wider">Daily challenge</span></div>
      <h3 className="mt-3 text-xl font-black">Complete 3 lessons</h3>
      <p className={`mt-1 text-sm font-semibold ${dark ? "text-white/45" : "text-black/45"}`}>{progress.daily?.date === today && progress.daily.claimed ? "Completed — 30 bonus XP collected!" : "Build momentum today and earn a 30 XP bonus."}</p>
      <div className="mt-4 flex gap-2">{Array.from({length:questTarget}, (_, i) => i < questProgress ? <CheckCircle2 key={i} className="text-[#53B98A]"/> : <Circle key={i} className={dark ? "text-white/20" : "text-black/20"}/>)}</div>
    </div>
    <div className={`rounded-[1.75rem] border p-5 ${card}`}>
      <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-[#7067FF]"><Shield size={20}/><span className="text-xs font-black uppercase tracking-wider">{league} League</span></div><span className="text-xs font-black opacity-45">Weekly</span></div>
      <div className="mt-4 space-y-2">{players.map(([name, flag, xp], index) => <div key={name} className={`flex items-center gap-3 rounded-xl px-3 py-2 ${name === "You" ? "bg-[#F28C28]/15" : ""}`}><span className="w-5 text-sm font-black opacity-45">{index + 1}</span><span>{flag}</span><span className="flex-1 font-black">{name}</span><span className="text-sm font-black text-[#F28C28]">{xp} XP</span></div>)}</div>
    </div>
  </>;
}
