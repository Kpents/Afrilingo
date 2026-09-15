import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpenText, CheckCircle2, ChevronRight, Gamepad2, Globe2, Lock, MapPinned, MessageCircle, Sparkles, Star, XCircle } from "lucide-react";
import SidekickPortrait from "../ui/SidekickPortrait";
import ConfettiBurst from "../ui/ConfettiBurst";
import { sidekicks } from "../../data/sidekicks";
import { hapticPress } from "../../utils/hapticFeedback";
import { playUiSound } from "../../services/uiSound";
import StoryQuest from "./StoryQuest";

const icons = { adventure: MapPinned, story: BookOpenText, storyQuest: BookOpenText, culture: Globe2, game: Gamepad2, conversation: MessageCircle, phrase: Sparkles };

export default function LanguageWorld({ dark, world, progress, companionId, soundEnabled, onLoseHeart, onReward, onOpenActivity }) {
  const [culture, setCulture] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [storyQuestId, setStoryQuestId] = useState(null);
  const [reviewingWords, setReviewingWords] = useState(false);
  const companion = sidekicks.find(item => item.id === companionId) || sidekicks[0];
  const immersion = progress.immersion || {};
  const completedGames = immersion.completedWorldGames || [];
  const savedWorldWords = immersion.savedWorldWords || [];
  const wordBank = Object.values(world.storyQuests || {}).flatMap(quest => Object.values(quest.nodes).flatMap(node => (node.vocabulary || []).map(word => ({...word,id:`${quest.id}:${word.native}`}))));
  const reviewWords = savedWorldWords.map(id => wordBank.find(word => word.id === id)).filter(Boolean);
  const reviewDay = `world-words-${new Date().toISOString().slice(0,10)}`;
  const isDone = activity => activity.type === "game" ? completedGames.includes(activity.gameId) : activity.type === "storyQuest" ? (immersion.completedWorldStories || []).includes(activity.storyQuestId) : activity.type === "culture" ? (immersion.completedWorldMoments || []).includes(activity.id) : activity.progressField ? (immersion[activity.progressField] || []).includes(activity.missionId || activity.progressId || activity.id) : false;
  const trackable = world.chapters.flatMap(chapter => chapter.activities).filter(activity => ["game","culture","storyQuest"].includes(activity.type) || activity.progressField);
  const completed = trackable.filter(isDone).length;
  const total = trackable.length;
  const chapterProgress = world.chapters.map(chapter => {
    const activities = chapter.activities.filter(activity => ["game","culture","storyQuest"].includes(activity.type) || activity.progressField);
    const done = activities.filter(isDone).length;
    return { done, total: activities.length, complete: activities.length > 0 && done === activities.length };
  });

  if (gameId) return <WorldGame dark={dark} game={world.games[gameId]} gameId={gameId} completed={completedGames.includes(gameId)} soundEnabled={soundEnabled} onReward={onReward} onExit={() => setGameId(null)}/>;
  if (storyQuestId) return <StoryQuest dark={dark} quest={world.storyQuests[storyQuestId]} companion={companion} hearts={progress.hearts} completed={(immersion.completedWorldStories||[]).includes(storyQuestId)} savedWords={savedWorldWords} soundEnabled={soundEnabled} onLoseHeart={onLoseHeart} onReward={onReward} onExit={()=>setStoryQuestId(null)}/>;
  if (reviewingWords) return <WorldWordsReview dark={dark} words={reviewWords} wordBank={wordBank} hearts={progress.hearts} completedToday={(immersion.completedWorldWordReviews||[]).includes(reviewDay)} reviewDay={reviewDay} soundEnabled={soundEnabled} onLoseHeart={onLoseHeart} onReward={onReward} onExit={()=>setReviewingWords(false)}/>;

  const open = activity => {
    if (activity.type === "culture") { if (!(immersion.completedWorldMoments || []).includes(activity.id)) onReward({field:"completedWorldMoments",id:activity.id,xp:0}); return setCulture(culture === activity.id ? null : activity.id); }
    if (activity.type === "game") return setGameId(activity.gameId);
    if (activity.type === "storyQuest") return setStoryQuestId(activity.storyQuestId);
    onOpenActivity(activity);
  };

  return <div className="mx-auto max-w-5xl">
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#24745B] via-[#1d5947] to-[#4338CA] p-6 text-white sm:p-9"><div className="absolute -right-10 -top-12 size-64 rounded-full bg-[#F6C445]/15"/><div className="relative grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_11rem]"><div><div className="text-xs font-black uppercase tracking-[.24em] text-[#F6C445]">{world.eyebrow}</div><h1 className="mt-2 text-4xl font-black sm:text-5xl">{world.title}</h1><p className="mt-4 max-w-2xl font-semibold leading-7 text-white/70">{world.intro}</p><div className="mt-5 max-w-md"><div className="flex justify-between text-xs font-black"><span>{completed} moments complete</span><span>{total}</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-black/25"><motion.div className="h-full rounded-full bg-[#F6C445]" animate={{width:`${Math.round(completed/total*100)}%`}}/></div></div></div><SidekickPortrait character={companion} className="mx-auto size-40 rounded-[2rem] bg-white/10" eager/></div></section>

    <details className={`mt-4 rounded-2xl border p-4 ${dark?"border-white/10 bg-[#1A201E]":"border-black/8 bg-white"}`}><summary className="cursor-pointer font-black">📒 My World Words · {savedWorldWords.length} saved</summary><div className="mt-3 flex flex-wrap gap-2">{savedWorldWords.length?savedWorldWords.map(id=>{const native=id.split(":").slice(1).join(":");return <span key={id} className="rounded-full bg-[#F6C445]/20 px-3 py-2 text-sm font-black">{native}</span>}):<span className="text-sm font-semibold opacity-50">Tap a highlighted word inside a story, then save it here.</span>}</div>{reviewWords.length>0&&<button onClick={()=>setReviewingWords(true)} onPointerDown={hapticPress} className="afri-press mt-4 min-h-12 w-full rounded-xl bg-[#4338CA] px-4 font-black text-white">Practice saved words · {reviewWords.length} ready</button>}</details>

    <div className="mt-8 space-y-6">{world.chapters.map((chapter,index) => { const chapterState=chapterProgress[index]; const unlocked=index===0||chapterProgress[index-1].complete||chapterState.done>0; return <motion.section key={chapter.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:index*.06}} className={`overflow-hidden rounded-[1.8rem] border ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}>
      <div className="relative h-44 overflow-hidden"><img src={`${import.meta.env.BASE_URL}${chapter.image}`} alt="" className={`h-full w-full object-cover ${unlocked?"":"grayscale"}`}/><div className={`absolute inset-0 ${unlocked?"bg-gradient-to-r from-black/80 via-black/45 to-transparent":"bg-black/75"}`}/><div className="absolute inset-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6"><div><div className="text-xs font-black uppercase tracking-[.2em]" style={{color:unlocked?chapter.color:"#D1D5DB"}}>Chapter {chapter.number}</div><h2 className="mt-1 text-3xl font-black">{chapter.title}</h2><p className="mt-1 text-sm font-semibold text-white/65">{unlocked?chapter.subtitle:"Complete the previous chapter to unlock."}</p></div><div className="shrink-0 text-right">{chapterState.complete?<div className="flex gap-1 text-[#F6C445]" aria-label="Chapter complete"><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/></div>:unlocked?<div className="rounded-full bg-black/35 px-3 py-2 text-xs font-black">{chapterState.done}/{chapterState.total}</div>:<div className="grid size-11 place-items-center rounded-full bg-white/15"><Lock/></div>}</div></div></div>
      <div className="space-y-2 p-4 sm:p-5">{chapter.activities.map(activity => { const Icon=icons[activity.type] || Sparkles; const done=isDone(activity); return <div key={activity.id}><button disabled={!unlocked} onClick={() => open(activity)} onPointerDown={hapticPress} className={`afri-press flex min-h-20 w-full items-center gap-4 rounded-2xl p-3 text-left disabled:cursor-not-allowed disabled:opacity-45 ${dark ? "bg-white/5" : "bg-[#FFF8EE]"}`}><span className="grid size-12 shrink-0 place-items-center rounded-2xl text-white" style={{backgroundColor:unlocked?chapter.color:"#9CA3AF"}}>{done ? <CheckCircle2/> : unlocked?<Icon/>:<Lock/>}</span><span className="min-w-0 flex-1"><span className="block font-black">{activity.label}</span><span className="mt-1 block text-xs font-semibold opacity-45">{unlocked?activity.detail:"Locked"}</span></span>{unlocked&&<ChevronRight className={`shrink-0 opacity-30 transition ${culture===activity.id ? "rotate-90" : ""}`}/>}</button><AnimatePresence>{activity.type === "culture" && culture === activity.id && <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden"><div className="mx-3 rounded-b-2xl bg-[#F6C445]/15 p-4 text-sm font-semibold leading-6"><strong className="text-[#C95D3A]">Culture moment:</strong> {activity.note}</div></motion.div>}</AnimatePresence></div>; })}</div>
    </motion.section>;})}</div>
  </div>;
}

function WorldWordsReview({ dark, words, wordBank, hearts, completedToday, reviewDay, soundEnabled, onLoseHeart, onReward, onExit }) {
  const wasCompleted = useRef(completedToday);
  const questions = words.slice(0,5).map((word,index) => {
    const distractors=[...new Set(wordBank.map(item=>item.english).filter(value=>value!==word.english))].slice(index,index+2);
    while(distractors.length<2)distractors.push("A different expression");
    const options=[word.english,...distractors];
    return {...word,options:[...options.slice(index%3),...options.slice(0,index%3)]};
  });
  const [index,setIndex]=useState(0); const [choice,setChoice]=useState(null); const [finished,setFinished]=useState(false); const question=questions[index]; const correct=choice===question.english;
  const choose=value=>{setChoice(value);const right=value===question.english;playUiSound(right?"correct":"incorrect",soundEnabled);if(!right)onLoseHeart?.();};
  const next=()=>{if(!correct)return;if(index+1<questions.length){setIndex(value=>value+1);setChoice(null);return;}if(!wasCompleted.current)onReward({field:"completedWorldWordReviews",id:reviewDay,xp:15});playUiSound("complete",soundEnabled);setFinished(true);};
  if(finished)return <div className="relative mx-auto max-w-xl overflow-hidden py-8 text-center"><ConfettiBurst/><div className="text-7xl">📒</div><h1 className="mt-4 text-4xl font-black">World Words reviewed!</h1><p className="mt-2 font-semibold opacity-55">{questions.length} saved {questions.length===1?"expression":"expressions"} recalled.</p><div className="mt-3 text-2xl font-black text-[#F28C28]">{wasCompleted.current?"Today’s review complete":"+15 XP"}</div><button onClick={onExit} className="afri-press mt-6 min-h-14 w-full rounded-2xl bg-[#F28C28] font-black text-white">Return to Twi world</button></div>;
  return <div className="mx-auto max-w-2xl"><div className="flex items-center justify-between"><button onClick={onExit} className="font-black text-[#F28C28]">← Twi world</button><span className="font-black text-[#EF5B5B]">♥ {hearts}</span></div><div className="mt-6 text-xs font-black uppercase tracking-[.2em] text-[#4338CA]">World Words · {index+1}/{questions.length}</div><div className="mt-3 h-3 overflow-hidden rounded-full bg-black/10"><div className="h-full rounded-full bg-[#F6C445]" style={{width:`${(index+(choice?1:0))/questions.length*100}%`}}/></div><div className={`mt-6 rounded-[2rem] border p-6 text-center ${dark?"border-white/10 bg-[#1A201E]":"border-black/8 bg-white"}`}><div className="text-sm font-black uppercase tracking-wider opacity-45">Choose the meaning</div><h1 className="mt-3 text-4xl font-black">{question.native}</h1></div><div className="mt-5 space-y-3">{question.options.map(value=><button key={value} disabled={correct||hearts<=0} onClick={()=>choose(value)} onPointerDown={hapticPress} className={`afri-press min-h-14 w-full rounded-2xl border p-4 text-left font-black ${choice===value?(value===question.english?"border-[#24745B] bg-[#24745B]/15":"border-[#C95D3A] bg-[#C95D3A]/15"):dark?"border-white/10 bg-[#1A201E]":"border-black/8 bg-white"}`}>{value}</button>)}</div>{choice&&<div className={`mt-4 rounded-2xl p-4 font-semibold ${correct?"bg-[#24745B]/15":"bg-[#C95D3A]/15"}`}>{correct?"That’s it — keep the meaning connected to the moment.":`Not quite. “${question.native}” means “${question.english}.” Try again.`}</div>}{hearts<=0&&!correct&&<div className="mt-3 rounded-xl bg-[#C95D3A]/15 p-3 text-sm font-bold">Out of hearts. Return after recovering a heart.</div>}{correct&&<button onClick={next} className="afri-press mt-5 min-h-14 w-full rounded-2xl bg-[#F28C28] font-black text-white">{index+1===questions.length?"Finish review":"Next word"}</button>}</div>;
}

function WorldGame({ dark, game, gameId, completed, soundEnabled, onReward, onExit }) {
  const [index,setIndex]=useState(0); const [choice,setChoice]=useState(null); const [finished,setFinished]=useState(false); const question=game.questions[index]; const correct=choice===question.answer;
  const choose=value=>{setChoice(value);playUiSound(value===question.answer?"correct":"incorrect",soundEnabled)};
  const next=()=>{if(!correct)return;if(index+1<game.questions.length){setIndex(value=>value+1);setChoice(null);return;}if(!completed)onReward({field:"completedWorldGames",id:gameId,xp:game.xp});playUiSound("complete",soundEnabled);setFinished(true)};
  if(finished)return <div className="relative mx-auto max-w-xl py-8 text-center"><ConfettiBurst/><div className="text-7xl">🏆</div><h1 className="mt-4 text-4xl font-black">Market Dash complete!</h1><p className="mt-2 font-semibold opacity-55">Four practical choices handled · {completed?"practice complete":`+${game.xp} XP`}</p><button onClick={onExit} className="afri-press mt-6 min-h-14 w-full rounded-2xl bg-[#F28C28] font-black text-white">Return to Twi world</button></div>;
  return <div className="mx-auto max-w-2xl"><button onClick={onExit} className="font-black text-[#F28C28]">← Twi world</button><div className="mt-5 text-xs font-black uppercase tracking-[.2em] text-[#24745B]">Mini-game · {index+1}/{game.questions.length}</div><h1 className="mt-2 text-3xl font-black">{game.title}</h1><div className="mt-4 h-3 overflow-hidden rounded-full bg-black/10"><div className="h-full rounded-full bg-[#F28C28]" style={{width:`${(index+(choice?1:0))/game.questions.length*100}%`}}/></div><h2 className="mt-7 text-2xl font-black">{question.prompt}</h2><div className={`mt-5 ${question.visuals?"grid grid-cols-3 gap-3":"space-y-3"}`}>{question.options.map(value=><button key={value} disabled={correct} onClick={()=>choose(value)} onPointerDown={hapticPress} className={`afri-press min-h-14 w-full rounded-2xl border p-4 text-center font-black ${choice===value?(correct?"border-[#24745B] bg-[#24745B]/15":"border-[#C95D3A] bg-[#C95D3A]/15"):dark?"border-white/10 bg-[#1A201E]":"border-black/8 bg-white"}`}>{question.visuals?.[value]&&<span className="mb-2 block text-4xl">{question.visuals[value]}</span>}{value}</button>)}</div>{choice&&<div className={`mt-4 flex gap-3 rounded-2xl p-4 ${correct?"bg-[#24745B]/15":"bg-[#C95D3A]/15"}`}>{correct?<CheckCircle2 className="text-[#24745B]"/>:<XCircle className="text-[#C95D3A]"/>}<span className="font-semibold">{correct?question.explanation:"That does not fit this moment yet. Try another response."}</span></div>}{correct&&<button onClick={next} className="afri-press mt-5 min-h-14 w-full rounded-2xl bg-[#F28C28] font-black text-white">{index+1===game.questions.length?"Finish game":"Next moment"}</button>}</div>;
}
