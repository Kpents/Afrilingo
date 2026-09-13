import { motion, useReducedMotion } from "framer-motion";

const reactions = {
  idle: { body: [0, -2, 0], head: [0, -2, 0], left: [-7, 0, -7], right: [7, 0, 7], eyes: [1, 1, .08, 1] },
  wave: { body: [0, -3, 0], head: [0, -4, 0], left: [-7, 0, -7], right: [12, -32, 12], eyes: [1, 1, .08, 1] },
  celebrate: { body: [0, -19, 0, -12, 0], head: [0, -8, 0, -5, 0], left: [-10, -55, -10, -55, -10], right: [10, 55, 10, 55, 10], eyes: [1, .08, 1, .08, 1] },
  encourage: { body: [0, -5, 0], head: [-4, 4, -4], left: [-7, -17, -7], right: [7, 25, 7], eyes: [1, 1, .08, 1] },
  curious: { body: [0, -2, 0], head: [-9, 9, -9], left: [-7, 0, -7], right: [7, 0, 7], eyes: [1, 1, 1] },
  disappointed: { body: [0, 4, 0], head: [7, 10, 7], left: [5, 12, 5], right: [-5, -12, -5], eyes: [1, .7, 1] }
};

export default function LeboRigStudy({ reaction = "idle", playing = true, className = "" }) {
  const reduceMotion = useReducedMotion();
  const state = reactions[reaction] || reactions.idle;
  const active = playing && !reduceMotion;
  const duration = reaction === "celebrate" ? 1.25 : reaction === "wave" ? 1.8 : 2.5;
  const transition = { duration, repeat: active ? Infinity : 0, ease: "easeInOut" };
  const motionValue = (values, fallback = 0) => active ? values : fallback;
  return <svg viewBox="0 0 320 340" role="img" aria-label={`Lebo the lion: ${reaction} animation study`} className={className}>
    <defs>
      <linearGradient id="lebo-fur" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#FFD069"/><stop offset="1" stopColor="#F28C28"/></linearGradient>
      <linearGradient id="lebo-mane" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9C4C20"/><stop offset="1" stopColor="#653015"/></linearGradient>
    </defs>
    <ellipse cx="160" cy="318" rx="80" ry="11" fill="#382219" opacity=".15"/>
    <motion.g style={{ transformOrigin: "160px 220px" }} animate={{ y: motionValue(state.body) }} transition={transition}>
      <path d="M218 242 Q288 227 265 283 Q257 302 238 292" fill="none" stroke="#A55220" strokeWidth="15" strokeLinecap="round"/>
      <circle cx="238" cy="291" r="11" fill="#653015"/>
      <ellipse cx="160" cy="245" rx="67" ry="74" fill="url(#lebo-fur)"/>
      <path d="M104 221 Q160 197 216 221 L221 273 Q160 293 99 273Z" fill="#202623"/>
      <path d="M160 235 L149 253 L160 263 L171 253Z" fill="#C95D3A"/>
      <path d="M149 253 L138 270 L160 278 L182 270 L171 253Z" fill="#F6C445"/>
      <path d="M160 265 L151 280 L160 285 L169 280Z" fill="#24745B"/>
      <motion.g style={{ transformOrigin: "109px 216px" }} animate={{ rotate: motionValue(state.left, -7) }} transition={transition}>
        <path d="M112 212 Q75 219 73 260" fill="none" stroke="#F3A335" strokeWidth="26" strokeLinecap="round"/>
        <ellipse cx="73" cy="262" rx="19" ry="21" fill="url(#lebo-fur)"/>
        <circle cx="67" cy="258" r="3" fill="#C67522"/><circle cx="75" cy="254" r="3" fill="#C67522"/><circle cx="83" cy="258" r="3" fill="#C67522"/>
      </motion.g>
      <motion.g style={{ transformOrigin: "211px 216px" }} animate={{ rotate: motionValue(state.right, 7) }} transition={transition}>
        <path d="M208 212 Q245 219 247 260" fill="none" stroke="#F3A335" strokeWidth="26" strokeLinecap="round"/>
        <ellipse cx="247" cy="262" rx="19" ry="21" fill="url(#lebo-fur)"/>
        <circle cx="239" cy="258" r="3" fill="#C67522"/><circle cx="247" cy="254" r="3" fill="#C67522"/><circle cx="255" cy="258" r="3" fill="#C67522"/>
      </motion.g>
      <ellipse cx="126" cy="309" rx="29" ry="13" fill="#F5A536"/><ellipse cx="194" cy="309" rx="29" ry="13" fill="#F5A536"/>
      <motion.g style={{ transformOrigin: "160px 178px" }} animate={{ rotate: motionValue(state.head), y: active && reaction === "celebrate" ? state.head.map(v => v / 2) : 0 }} transition={transition}>
        <circle cx="160" cy="123" r="100" fill="url(#lebo-mane)"/>
        <circle cx="70" cy="114" r="28" fill="#7B3A19"/><circle cx="250" cy="114" r="28" fill="#7B3A19"/>
        <circle cx="70" cy="114" r="16" fill="#D38137"/><circle cx="250" cy="114" r="16" fill="#D38137"/>
        <path d="M101 46 Q116 2 153 29 Q178 -4 199 37 Q235 45 226 80 Q254 111 226 142 Q234 191 194 209 Q162 230 127 210 Q82 198 88 154 Q56 119 83 88 Q73 59 101 46Z" fill="#7B3A19"/>
        <ellipse cx="160" cy="122" rx="75" ry="77" fill="url(#lebo-fur)"/>
        <path d="M136 74 Q153 91 177 73 Q188 86 203 76" fill="none" stroke="#8F471E" strokeWidth="8" strokeLinecap="round"/>
        <motion.g style={{ transformOrigin: "160px 125px" }} animate={{ scaleY: motionValue(state.eyes, 1) }} transition={transition}>
          <ellipse cx="132" cy="119" rx="17" ry="23" fill="white"/><ellipse cx="188" cy="119" rx="17" ry="23" fill="white"/>
          <circle cx={reaction === "curious" ? "137" : "132"} cy="121" r="10" fill="#211C18"/><circle cx={reaction === "curious" ? "193" : "188"} cy="121" r="10" fill="#211C18"/>
          <circle cx="136" cy="116" r="3" fill="white"/><circle cx="192" cy="116" r="3" fill="white"/>
        </motion.g>
        <path d={reaction === "disappointed" ? "M114 95 Q129 92 144 99 M176 99 Q191 92 206 95" : "M114 95 Q129 86 144 93 M176 93 Q191 86 206 95"} fill="none" stroke="#723516" strokeWidth="7" strokeLinecap="round"/>
        <ellipse cx="139" cy="166" rx="32" ry="26" fill="#FFE3A0"/><ellipse cx="181" cy="166" rx="32" ry="26" fill="#FFE3A0"/>
        <path d="M145 149 Q160 141 175 149 L163 162 Q157 164 145 149Z" fill="#63301C"/>
        <path d={reaction === "disappointed" ? "M143 188 Q160 175 177 188" : reaction === "curious" ? "M152 181 Q160 189 168 181" : "M139 174 Q160 203 181 174"} fill="none" stroke="#63301C" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="115" cy="153" r="8" fill="#E98D45" opacity=".6"/><circle cx="205" cy="153" r="8" fill="#E98D45" opacity=".6"/>
      </motion.g>
    </motion.g>
  </svg>;
}
