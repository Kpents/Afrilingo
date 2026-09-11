import { motion, useReducedMotion } from "framer-motion";

const colors = ["#F28C28", "#F6C445", "#24745B", "#C95D3A", "#4338CA", "#53B98A"];

export default function ConfettiBurst({ count = 28, className = "" }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return <div aria-hidden className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${className}`}>
    {Array.from({ length: count }, (_, index) => {
      const left = (index * 37 + 7) % 100;
      const drift = ((index * 29) % 90) - 45;
      const delay = (index % 9) * .055;
      return <motion.i
        key={index}
        className="absolute -top-4 block h-3 w-2 rounded-sm"
        style={{ left: `${left}%`, backgroundColor: colors[index % colors.length] }}
        initial={{ y: -20, x: 0, rotate: 0, opacity: 0 }}
        animate={{ y: [0, 180, 520], x: [0, drift, drift * .35], rotate: [0, 210, 520], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.25 + (index % 4) * .18, delay, ease: "easeOut" }}
      />;
    })}
  </div>;
}
