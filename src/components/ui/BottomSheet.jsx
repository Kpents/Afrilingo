import { forwardRef } from "react";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "framer-motion";

const BottomSheet = forwardRef(function BottomSheet({
  open,
  onClose,
  dark = false,
  label,
  children,
  className = "",
  zIndex = "z-[85]"
}, forwardedRef) {
  const dragControls = useDragControls();
  const reduceMotion = useReducedMotion();

  const closeFromDrag = (_, info) => {
    if (info.offset.y > 90 || info.velocity.y > 650) onClose?.();
  };

  return <AnimatePresence>
    {open && <motion.div
      className={`fixed inset-0 ${zIndex} flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-4`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
      onClick={onClose}
    >
      <motion.section
        ref={forwardedRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={event => event.stopPropagation()}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 42, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 42, scale: 0.985 }}
        transition={reduceMotion ? { duration: 0.01 } : { type: "spring", stiffness: 380, damping: 34, mass: 0.8 }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.35 }}
        onDragEnd={closeFromDrag}
        className={`max-h-[92dvh] w-full overflow-hidden rounded-t-[2rem] border shadow-2xl sm:max-h-[88vh] sm:rounded-[2rem] ${dark ? "border-white/10 bg-[#101312] text-[#F8F4EA]" : "border-black/10 bg-[#FFF8EE] text-[#191C1A]"} ${className}`}
      >
        <div
          className="flex h-8 cursor-grab touch-none items-center justify-center active:cursor-grabbing sm:hidden"
          onPointerDown={event => dragControls.start(event)}
          aria-hidden="true"
        >
          <span className={`h-1.5 w-11 rounded-full ${dark ? "bg-white/20" : "bg-black/15"}`} />
        </div>
        {children}
      </motion.section>
    </motion.div>}
  </AnimatePresence>;
});

export default BottomSheet;
