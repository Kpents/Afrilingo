import { useEffect, useRef } from "react";

const selector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
let scrollLockCount = 0;
let originalBodyOverflow = "";

function lockPageScroll() {
  if (scrollLockCount === 0) originalBodyOverflow = document.body.style.overflow;
  scrollLockCount += 1;
  document.body.style.overflow = "hidden";
}

function unlockPageScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) document.body.style.overflow = originalBodyOverflow;
}

export default function useDialogFocus(ref, active, onClose) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!active || !ref.current) return;
    const previous = document.activeElement;
    lockPageScroll();
    const dialog = ref.current;
    const focusables = () => [...dialog.querySelectorAll(selector)].filter(element => !element.hidden);
    focusables()[0]?.focus();
    const handleKey = event => {
      if (event.key === "Escape") { event.preventDefault(); closeRef.current(); return; }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0]; const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => { document.removeEventListener("keydown", handleKey); unlockPageScroll(); previous?.focus?.(); };
  }, [active, ref]);
}
