import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Heart, LockKeyhole, MapPin, MessageCircle, Sparkles, XCircle } from "lucide-react";
import Lebo from "../ui/Lebo";
import ConfettiBurst from "../ui/ConfettiBurst";
import { playUiSound } from "../../services/uiSound";
import SceneMission from "./SceneMission";
import { zuluMarketPilot } from "../../data/adventures/zuluMarket";
import { zuluCafeMission } from "../../data/adventures/zuluCafe";
import { gaMarketMission } from "../../data/adventures/gaMarket";
import { twiMarketMission } from "../../data/adventures/twiMarket";

const featuredMissions = { zulu: [zuluMarketPilot, zuluCafeMission], ga: [gaMarketMission], twi: [twiMarketMission] };

const sceneLooks = [
  { id: "market", emoji: "🛍️", title: "Neighbourhood Market", accent: "#F28C28", image: "images/adventures/market-square.jpg" },
  { id: "cafe", emoji: "🍲", title: "Community Café", accent: "#C95D3A", image: "images/adventures/community-cafe.jpg" },
  { id: "taxi", emoji: "🚐", title: "Taxi Rank", accent: "#4338CA", image: "images/adventures/taxi-rank.jpg" },
  { id: "home", emoji: "🏠", title: "Family Visit", accent: "#24745B", image: "images/adventures/family-home.jpg" },
  { id: "work", emoji: "💼", title: "A Busy Workday", accent: "#24745B", image: "images/adventures/workplace.jpg" },
  { id: "plans", emoji: "⚽", title: "Plans With Friends", accent: "#F6C445", image: "images/adventures/community-park.jpg" }
];

const cast = [
  { id: "gogo-nandi", name: "Gogo Nandi", image: "images/characters/gogo-nandi.png" },
  { id: "ama", name: "Ama", image: "images/characters/ama.png" },
  { id: "kofi", name: "Kofi", image: "images/characters/kofi.png" }
];

function buildAdventures(data) {
  return data.conversations.slice(0, 6).map((conversation, index) => {
    const context = `${conversation.id} ${conversation.title} ${conversation.context}`.toLowerCase();
    const setting = /taxi|transport|travel|direction|bus/.test(context) ? "taxi"
      : /restaurant|café|cafe|food|order|drink/.test(context) ? "cafe"
      : /family|home|visit|elder/.test(context) ? "home"
      : /work|office|colleague|school/.test(context) ? "work"
      : /friend|plan|sport|park/.test(context) ? "plans" : "market";
    const look = sceneLooks.find(scene => scene.id === setting);
    return ({
    ...look,
    id: `adventure-${conversation.id}`,
    sourceId: conversation.id,
    level: conversation.level,
    context: conversation.context,
    turn: conversation.turns[0],
    xp: 20 + index * 5,
    people: [cast[index % 3], cast[(index + 1) % 3], cast[(index + 2) % 3]]
  });
  });
}

export default function Adventures({ dark, data, progress, soundEnabled, onLoseHeart, onReward }) {
  const adventures = useMemo(() => buildAdventures(data), [data]);
  const [active, setActive] = useState(null);
  const completed = progress.immersion?.completedAdventures || [];
  const featured = featuredMissions[data.languageId] || [];

  if (active && featured.some(mission => mission.id === active.id)) return <SceneMission mission={active} languageId={data.languageId} dark={dark} hearts={progress.hearts} completed={completed.includes(active.id)} soundEnabled={soundEnabled} onLoseHeart={onLoseHeart} onReward={onReward} onExit={()=>setActive(null)}/>;
  if (active) return <AdventureScene adventure={active} languageId={data.languageId} dark={dark} hearts={progress.hearts} completed={completed.includes(active.id)} soundEnabled={soundEnabled} onLoseHeart={onLoseHeart} onExit={() => setActive(null)} onReward={onReward}/>;

  return <div>
    <div className="flex items-end justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-[.22em] text-[#F28C28]">Walk in. Look around. Speak.</div><h1 className="mt-2 text-3xl font-black sm:text-4xl">{data.languageName} Adventures</h1><p className="mt-3 max-w-2xl leading-7 opacity-55">Enter everyday settings and talk with the people you meet. Adventures are optional and do not change your course path.</p></div><MapPin className="hidden text-[#F28C28] sm:block" size={38}/></div>
    {featured.length > 0 && <div className="mt-6 grid gap-3 sm:grid-cols-2">{featured.map((mission,index)=><button key={mission.id} onClick={()=>setActive(mission)} className={`flex w-full overflow-hidden rounded-[1.7rem] border text-left transition hover:-translate-y-0.5 ${dark ? "border-[#F6C445]/30 bg-[#1A201E]" : "border-[#F28C28]/30 bg-white"}`}><img src={`${import.meta.env.BASE_URL}${mission.image}`} alt="" className="h-40 w-28 shrink-0 object-cover sm:w-32"/><div className="flex min-w-0 flex-1 flex-col justify-center p-4"><div className="text-[10px] font-black uppercase tracking-wider text-[#F28C28]">Featured · {index+1} of {featured.length}</div><div className="mt-2 text-lg font-black">{mission.title}</div><p className={`mt-1 line-clamp-2 text-xs font-semibold ${dark ? "text-white/50" : "text-black/50"}`}>{mission.goal}</p><div className="mt-3 text-xs font-black text-[#24745B]">{completed.includes(mission.id) ? "Play again" : `Start mission · +${mission.xp} XP`} →</div></div></button>)}</div>}
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{adventures.map((item, index) => {
      const locked = index > 0 && !completed.includes(adventures[index - 1].id);
      const done = completed.includes(item.id);
      return <button key={item.id} disabled={locked} onClick={() => setActive(item)} className={`group overflow-hidden rounded-[1.7rem] border text-left transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-45 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}>
        <div className="relative h-40 overflow-hidden"><img src={`${import.meta.env.BASE_URL}${item.image}`} alt="" className="h-full w-full object-cover object-center"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/><span className="absolute left-4 top-4 grid size-11 place-items-center rounded-xl bg-white/90 text-2xl shadow">{locked ? <LockKeyhole size={20} className="text-black"/> : item.emoji}</span>{done&&<span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-[#24745B] text-white"><CheckCircle2 size={20}/></span>}<div className="absolute bottom-3 left-4 text-xs font-black uppercase tracking-wider text-white/70">{item.level}</div></div>
        <div className="p-4"><div className="text-xl font-black">{item.title}</div><p className={`mt-2 line-clamp-2 text-sm font-semibold ${dark ? "text-white/45" : "text-black/45"}`}>{item.context}</p><div className="mt-4 flex items-center justify-between text-xs font-black"><span style={{color:item.accent}}>{done ? "Play again" : `Earn ${item.xp} XP`}</span><span>{locked ? "Complete previous" : "Enter →"}</span></div></div>
      </button>;
    })}</div>
  </div>;
}

function AdventureScene({ adventure, languageId, dark, hearts, completed, soundEnabled, onLoseHeart, onExit, onReward }) {
  const [step, setStep] = useState("explore");
  const [choice, setChoice] = useState(null);
  const correct = choice === adventure.turn.answer;
  const finish = () => { playUiSound("complete", soundEnabled); onReward({ field: "completedAdventures", id: adventure.id, xp: adventure.xp }); setStep("complete"); };
  const choose = value => { if (hearts <= 0) return; setChoice(value); const isCorrect=value===adventure.turn.answer; playUiSound(isCorrect?"correct":"incorrect",soundEnabled); if(!isCorrect) onLoseHeart?.(); };

  if(step==="complete") return <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] px-4 py-8 text-center"><ConfettiBurst count={36}/><Lebo pose="celebrate" reaction="celebrate" languageId={languageId} className="mx-auto size-48" decorative/><h1 className="mt-3 text-4xl font-black">Adventure complete!</h1><p className="mt-2 font-semibold opacity-55">You handled a real-life interaction and earned {completed ? "more practice" : `${adventure.xp} XP`}.</p><button onClick={onExit} className="mt-6 min-h-14 w-full rounded-2xl bg-[#F28C28] font-black text-white">Back to adventures</button></div>;

  return <div className="mx-auto max-w-2xl"><div className="mb-4 flex items-center gap-3"><button onClick={onExit} aria-label="Exit adventure" className={`grid size-11 place-items-center rounded-xl ${dark?"bg-white/6":"bg-black/5"}`}><ArrowLeft size={20}/></button><div><div className="text-xs font-black uppercase tracking-wider text-[#F28C28]">{adventure.level} adventure</div><div className="font-black">{adventure.title}</div></div></div>
    <div className="relative mx-auto aspect-[3/5] w-full max-w-[28rem] overflow-hidden rounded-[2rem] border border-black/10 bg-[#F6C445]/20 shadow-2xl"><img src={`${import.meta.env.BASE_URL}${adventure.image}`} alt={`Illustrated ${adventure.title} setting`} className="absolute inset-0 h-full w-full object-cover object-center"/>
      <div className="absolute inset-x-4 top-4 rounded-2xl bg-black/65 p-4 text-white backdrop-blur"><div className="text-xs font-black uppercase tracking-wider text-[#F6C445]">Your mission</div><p className="mt-1 text-sm font-semibold">{step==="explore"?"Find the person with the orange conversation marker.":adventure.context}</p></div>
      {adventure.people.map((person,index)=><motion.button key={person.id} whileTap={{scale:.92}} onClick={()=>index===1&&setStep("talk")} aria-label={index===1?`Talk to ${adventure.turn.speaker}`:`Meet ${person.name}`} className={`absolute grid size-20 place-items-end overflow-visible rounded-full border-4 shadow-xl sm:size-24 ${index===1?"border-[#F28C28] bg-white":"border-white/80 bg-[#F6C445]"}`} style={{left:["10%","58%","31%"][index],top:["32%","47%","68%"][index]}}><img src={`${import.meta.env.BASE_URL}${person.image}`} alt="" className="h-[130%] w-[130%] max-w-none object-contain object-bottom drop-shadow-lg"/>{index===1&&step==="explore"&&<motion.span animate={{y:[0,-6,0]}} transition={{repeat:Infinity,duration:1.1}} className="absolute -right-2 -top-3 grid size-8 place-items-center rounded-full bg-[#F28C28] text-white"><MessageCircle size={17}/></motion.span>}</motion.button>)}
      <Lebo pose="explore" reaction="idle" languageId={languageId} className="absolute bottom-3 left-3 size-24 drop-shadow-xl" decorative/>
      <AnimatePresence>{step==="talk"&&<motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className={`absolute inset-x-3 bottom-3 z-20 max-h-[58%] overflow-y-auto rounded-[1.6rem] border p-4 shadow-2xl ${dark?"border-white/10 bg-[#1A201E]/95":"border-black/10 bg-white/95"}`}><div className="text-xs font-black uppercase tracking-wider text-[#4338CA]">{adventure.turn.speaker} says</div><div className="mt-2 text-xl font-black">{adventure.turn.native}</div><div className="mt-1 text-sm font-semibold opacity-50">{adventure.turn.english}</div><div className="mt-4 grid gap-2">{adventure.turn.choices.map(item=><button key={item} disabled={correct||hearts<=0} onClick={()=>choose(item)} className={`min-h-12 rounded-xl border p-3 text-left text-sm font-black disabled:cursor-not-allowed ${choice===item?(correct?"border-[#24745B] bg-[#24745B]/15":"border-[#C95D3A] bg-[#C95D3A]/15"):"border-current/10"}`}>{item}</button>)}</div>{hearts<=0&&!correct&&<div className="mt-3 rounded-xl bg-[#C95D3A]/15 p-3 text-sm font-bold">Out of hearts. Return to Immersion and recover a heart before trying again.</div>}{choice&&<div className={`mt-3 flex gap-2 rounded-xl p-3 text-sm font-semibold ${correct?"bg-[#24745B]/15":"bg-[#C95D3A]/15"}`}>{correct?<CheckCircle2 className="shrink-0 text-[#53B98A]"/>:<XCircle className="shrink-0 text-[#C95D3A]"/>}<span>{correct?adventure.turn.feedback:"That response does not fit yet. Try another choice."}</span></div>}{correct&&<button onClick={finish} className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F28C28] font-black text-white"><Sparkles size={18}/> Complete · +{completed?0:adventure.xp} XP</button>}</motion.div>}</AnimatePresence>
      <div className="absolute right-3 top-28 flex items-center gap-1 rounded-full bg-white/90 px-3 py-2 font-black text-[#EF5B5B] shadow"><Heart size={18} fill="currentColor"/> {hearts}</div>
    </div>
  </div>;
}
