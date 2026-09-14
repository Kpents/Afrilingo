import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getLeboTheme } from "../../data/leboThemes";
import { assetPath } from "../../utils/assetPath";
import LeboRive from "./LeboRive";

const poses = {
  wave: "/mascot/lebo-wave.png",
  learn: "/mascot/lebo-learn.png",
  encourage: "/mascot/lebo-encourage.png",
  celebrate: "/mascot/lebo-celebrate.png"
};

const loopTransitions = {
  idle: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
  wave: { duration: 2.6, repeat: Infinity, repeatDelay: 0.7, ease: "easeInOut" },
  learn: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  correct: { duration: 0.62, repeat: 1, repeatDelay: 0.25, ease: "easeOut" },
  encourage: { duration: 1.8, repeat: Infinity, repeatDelay: 0.7, ease: "easeInOut" },
  celebrate: { duration: 1.15, repeat: Infinity, repeatDelay: 0.55, ease: "easeOut" }
};

const reactionDecor = {
  idle: [],
  wave: [{ glyph: "✦", x: 82, y: 14, delay: 0 }, { glyph: "•", x: 94, y: 31, delay: .35 }],
  learn: [{ glyph: "a", x: 4, y: 20, delay: 0 }, { glyph: "?", x: 90, y: 12, delay: .55 }],
  correct: [{ glyph: "✦", x: 2, y: 14, delay: 0 }, { glyph: "★", x: 87, y: 9, delay: .18 }, { glyph: "✦", x: 94, y: 58, delay: .36 }],
  encourage: [{ glyph: "♥", x: 88, y: 15, delay: 0 }, { glyph: "✦", x: 5, y: 36, delay: .42 }],
  celebrate: [{ glyph: "★", x: 0, y: 12, delay: 0 }, { glyph: "✦", x: 88, y: 4, delay: .14 }, { glyph: "●", x: 96, y: 52, delay: .3 }, { glyph: "◆", x: 7, y: 65, delay: .46 }]
};

export default function Lebo({
  pose = "wave",
  reaction,
  languageId,
  className = "",
  animate = true,
  decorative = false
}) {
  const reduceMotion = useReducedMotion();
  const state = reaction || pose;
  const shouldMove = animate && !reduceMotion;
  const activeLanguage = languageId || (typeof document !== "undefined" ? document.documentElement.dataset.afriLanguage : "twi") || "twi";
  const theme = getLeboTheme(activeLanguage);
  const outfitImage = theme.poses?.[pose] || theme.outfit || poses[pose] || poses.wave;

  return (
    <motion.span title={shouldMove ? "Lebo, your learning companion" : theme.label} role={decorative ? undefined : "img"} aria-label={decorative ? undefined : "Lebo, your learning companion"} aria-hidden={decorative || undefined} className={`relative isolate inline-block ${className}`} initial={shouldMove ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: .25 }}>
      <motion.span aria-hidden className="absolute inset-[14%] -z-10 rounded-full blur-xl" style={{background:`radial-gradient(circle, ${theme.colors[1]}55 0%, ${theme.colors[0]}22 48%, transparent 72%)`}} animate={shouldMove?{scale:[.92,1.05,.92],opacity:[.55,.82,.55]}:{opacity:.55}} transition={{duration:3.2,repeat:Infinity,ease:"easeInOut"}}/>
      <motion.span aria-hidden className="absolute bottom-[4%] left-[20%] -z-10 h-[11%] w-[60%] rounded-[50%] bg-black/20 blur-sm" animate={shouldMove?{scaleX:[1,.9,1],opacity:[.22,.14,.22]}:{opacity:.2}} transition={{duration:loopTransitions[state]?.duration||3,repeat:Infinity,ease:"easeInOut"}}/>
      {shouldMove ? <LeboRive reaction={state} fallback={<img src={assetPath(outfitImage)} alt={decorative ? "" : "Lebo the lion"} className="h-full w-full object-contain" />} /> : <AnimatePresence mode="sync" initial={false}>
        <motion.img key={outfitImage} src={assetPath(outfitImage)} alt={decorative ? "" : `Lebo the lion in the ${theme.label} course outfit`} aria-hidden={decorative || undefined} initial={shouldMove?{opacity:0,scale:.92,rotate:-2}:false} animate={{opacity:1,scale:1,rotate:0}} exit={shouldMove?{opacity:0,scale:1.04,rotate:2}:undefined} transition={{duration:.32,ease:"easeOut"}} className="relative h-full w-full select-none object-contain drop-shadow-[0_14px_18px_rgba(70,35,10,0.18)]" draggable="false" />
      </AnimatePresence>}
      {shouldMove && reactionDecor[state]?.length > 0 && <span aria-hidden className="pointer-events-none absolute inset-0">{reactionDecor[state].map((item,index)=><motion.span key={`${state}-${index}`} className="absolute font-black" style={{left:`${item.x}%`,top:`${item.y}%`,color:theme.colors[index%theme.colors.length]}} initial={{opacity:0,scale:.2}} animate={{opacity:[0,1,0],scale:[.2,1.15,.55],y:[8,-8,-18],rotate:[-12,8,24]}} transition={{duration:1.65,repeat:Infinity,repeatDelay:state === "celebrate" ? .15 : .65,delay:item.delay,ease:"easeOut"}}>{item.glyph}</motion.span>)}</span>}
    </motion.span>
  );
}

export function LeboTip({ children, dark, pose = "encourage", reaction, languageId, className = "" }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 ${className}`}
      aria-label="Tip from Lebo"
    >
      <Lebo pose={pose} reaction={reaction} languageId={languageId} className="h-20 w-20 shrink-0 sm:h-24 sm:w-24" decorative />
      <motion.div animate={{y:[0,-2,0]}} transition={{duration:3.4,repeat:Infinity,ease:"easeInOut"}} className={`relative rounded-2xl border px-4 py-3 text-sm font-bold leading-5 shadow-sm before:absolute before:-left-2 before:top-1/2 before:h-4 before:w-4 before:-translate-y-1/2 before:rotate-45 before:border-b before:border-l ${dark ? "border-white/10 bg-[#1A201E] before:border-white/10 before:bg-[#1A201E] text-white/75" : "border-black/10 bg-white before:border-black/10 before:bg-white text-black/70"}`}>
        {children}
      </motion.div>
    </motion.aside>
  );
}
