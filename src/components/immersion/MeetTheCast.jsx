import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { sidekicks } from "../../data/sidekicks";
import SidekickPortrait from "../ui/SidekickPortrait";

export default function MeetTheCast({ dark, companionId, onCompanionChange }) {
  const activeCompanion = sidekicks.find(item => item.id === companionId) || sidekicks[0];
  const [selected, setSelected] = useState(activeCompanion.id);
  const [message, setMessage] = useState("intro");
  const reduceMotion = useReducedMotion();
  const character = sidekicks.find(item => item.id === selected);
  return <div className="mx-auto max-w-5xl">
    <div className="text-xs font-black uppercase tracking-[.22em] text-[#F28C28]">AfriLingo friends</div>
    <h1 className="mt-2 text-3xl font-black sm:text-4xl">Meet the cast</h1>
    <p className="mt-3 max-w-2xl leading-7 opacity-60">Every friend has a different way of helping you explore. Tap a character to get to know them.</p>
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{sidekicks.map(item => <button key={item.id} onClick={() => {setSelected(item.id);setMessage("intro")}} aria-pressed={selected === item.id} className={`min-w-0 rounded-2xl border p-3 text-center transition ${selected===item.id ? "border-[#F28C28] bg-[#F28C28]/10" : dark ? "border-white/10 bg-[#1A201E]" : "border-black/10 bg-white"}`}><SidekickPortrait character={item} className="mx-auto h-28 w-28 rounded-xl sm:h-32 sm:w-32"/><span className="mt-2 block font-black">{item.name}</span><span className="text-xs opacity-50">{item.species}</span></button>)}</div>
    <motion.section key={selected} initial={reduceMotion ? false : {opacity:0,y:12}} animate={{opacity:1,y:0}} className={`mt-5 grid gap-4 overflow-hidden rounded-[1.75rem] border p-5 sm:grid-cols-[14rem_1fr] sm:p-7 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/10 bg-white"}`}>
      <div className="rounded-2xl" style={{backgroundColor:`${character.color}22`}}><SidekickPortrait character={character} eager className="mx-auto h-56 w-full max-w-56 rounded-2xl"/></div>
      <div className="self-center"><div className="text-xs font-black uppercase tracking-wider" style={{color:character.color}}>{character.role}</div><h2 className="mt-1 text-3xl font-black">{character.name}</h2><p className="mt-2 opacity-65">{character.description}</p><div role="status" className={`mt-4 rounded-xl p-4 text-sm font-semibold ${dark ? "bg-white/5" : "bg-[#FFF8EE]"}`}>{message === "tip" ? character.tip : `Hi, I'm ${character.name}! Come explore with me.`}</div><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => setMessage(value => value === "tip" ? "intro" : "tip")} className="min-h-12 rounded-xl bg-[#F28C28] px-5 font-black text-white">{message === "tip" ? "Say hello" : "Ask for a tip"}</button><button onClick={() => onCompanionChange?.(character.id)} disabled={activeCompanion.id === character.id} className={`min-h-12 rounded-xl border px-5 font-black ${activeCompanion.id === character.id ? "border-[#24745B] bg-[#24745B]/15 text-[#24745B]" : dark ? "border-white/20" : "border-black/15"}`}>{activeCompanion.id === character.id ? "My Adventure companion ✓" : `Choose ${character.name} for Adventures`}</button></div></div>
    </motion.section>
  </div>;
}
