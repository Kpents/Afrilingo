import { useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import LeboRigStudy from "../components/ui/LeboRigStudy";

const reactions = ["idle", "wave", "celebrate", "encourage", "curious", "disappointed"];

export default function LeboRigPreview() {
  const [reaction, setReaction] = useState("idle");
  const [playing, setPlaying] = useState(true);
  return <main className="min-h-screen bg-[#FFF8EE] px-4 py-7 text-[#252525] sm:py-12">
    <div className="mx-auto max-w-5xl">
      <a href={import.meta.env.BASE_URL} className="text-sm font-black text-[#24745B]">← Back to AfriLingo</a>
      <div className="mt-7"><div className="text-xs font-black uppercase tracking-[.2em] text-[#C95D3A]">Isolated motion study · not in lessons</div><h1 className="mt-2 text-4xl font-black sm:text-5xl">Meet a moveable Lebo</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-black/60">A first layered-vector character study. The head, face, body, paws, and tail are separate parts; tap each reaction to test its personality. This is not yet a Rive file or final character art.</p></div>
      <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#FFE4B0] via-[#FFF1D9] to-white p-4 shadow-xl ring-1 ring-[#F28C28]/20">
          <div className="absolute left-6 top-6 text-xs font-black uppercase tracking-wider text-[#8C4A21]">{reaction} / active</div>
          <LeboRigStudy reaction={reaction} playing={playing} className="mx-auto mt-5 block h-[min(70vh,30rem)] w-full max-w-md"/>
          <div className="absolute bottom-5 right-5 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-black/50">Prototype · SVG rig study</div>
        </div>
        <div className="rounded-[2rem] bg-white p-5 shadow-lg ring-1 ring-black/5"><h2 className="text-xl font-black">Try a reaction</h2><div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1">{reactions.map(value=><button key={value} onClick={()=>{setReaction(value);setPlaying(true)}} aria-pressed={reaction===value} className={`min-h-12 rounded-xl px-4 text-left text-sm font-black capitalize transition ${reaction===value?"bg-[#F28C28] text-white":"bg-[#FFF8EE] hover:bg-[#F6C445]/25"}`}>{value}</button>)}</div><button onClick={()=>setPlaying(value=>!value)} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-black/10 font-black">{playing?<Pause size={18}/>:<Play size={18}/>} {playing?"Pause":"Play"}</button><button onClick={()=>{setReaction("idle");setPlaying(true)}} className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-black/50"><RotateCcw size={16}/> Reset</button></div>
      </div>
      <p className="mt-6 max-w-3xl text-xs leading-5 text-black/50">This concept is deliberately isolated from lesson screens. If the style and movement feel right, the next production step is to refine the character parts in Rive, export a .riv state machine, and replace this preview renderer while preserving these reaction names.</p>
    </div>
  </main>;
}
