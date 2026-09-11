import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CultureCard({ card, dark, collectible = false, onSelect }) {
  return (
    <motion.div
      initial={collectible ? { opacity: 0, scale: 0.9, rotate: -2 } : false}
      animate={collectible ? { opacity: 1, scale: 1, rotate: 0 } : false}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={onSelect ? `Open culture card: ${card.title}` : undefined}
      onClick={onSelect}
      onKeyDown={event => { if (onSelect && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); onSelect(); } }}
      className={`afri-pattern overflow-hidden rounded-[2rem] border p-5 ${
        dark ? "border-[#F6C445]/25 bg-[#1A201E]" : "border-[#F6C445]/35 bg-white"
      } ${onSelect ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F6C445] text-3xl text-[#252525]">
          {card.emoji}
        </div>
        <span className="rounded-full bg-[#F28C28]/12 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#F28C28]">
          {card.category}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2 text-[#F6C445]">
        <Sparkles size={18} />
        <span className="text-xs font-black uppercase tracking-[0.2em]">
          {collectible ? "Culture Card Unlocked" : "Learn Through Culture"}
        </span>
      </div>

      <h3 className="mt-2 text-2xl font-black">{card.title}</h3>
      <p className={`mt-3 leading-7 ${dark ? "text-white/60" : "text-black/60"}`}>{card.text}</p>
    </motion.div>
  );
}
