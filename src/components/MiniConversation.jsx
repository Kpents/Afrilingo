import { motion } from "framer-motion";
import { MessageCircleMore } from "lucide-react";
import AudioButton from "./ui/AudioButton";

export default function MiniConversation({ conversation, dark }) {
  return (
    <div className={`rounded-[2rem] border p-5 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white"}`}>
      <div className="flex items-center gap-2 text-[#4338CA]">
        <MessageCircleMore size={20} />
        <span className="text-xs font-black uppercase tracking-[0.22em]">Mini Conversation</span>
      </div>

      <div className="mt-5 space-y-4">
        {conversation.map((line, index) => (
          <motion.div
            key={`${line.speaker}-${index}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`flex gap-3 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
          >
            <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl ${dark ? "bg-white/7" : "bg-black/5"}`}>
              {line.avatar}
            </div>
            <div className={`max-w-[78%] rounded-[1.25rem] px-4 py-3 ${index % 2 === 1 ? "bg-[#24745B] text-white" : "bg-[#F28C28] text-white"}`}>
              <div className="text-xs font-black uppercase tracking-wider opacity-65">{line.speaker}</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg font-black">{line.native}</span>
                <AudioButton src={line.audio} label={line.native} compact className="bg-white/10 opacity-80 hover:opacity-100" />
              </div>
              <div className="mt-1 text-sm font-semibold opacity-75">{line.english}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
