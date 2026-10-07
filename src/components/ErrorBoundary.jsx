import React from "react";

function preferredDarkMode() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("afrilingo:preferences") || "{}");
    if (typeof saved.darkMode === "boolean") return saved.darkMode;
  } catch {
    // A damaged preference should never stop the recovery screen from rendering.
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
}

export default class ErrorBoundary extends React.Component {
  state = { error: null, dark: preferredDarkMode() };

  static getDerivedStateFromError(error) { return { error }; }

  componentDidCatch(error, details) {
    console.error("AfriLingo recovered from a screen error", error, details);
  }

  render() {
    if (!this.state.error) return this.props.children;
    const { dark } = this.state;
    const online = navigator.onLine;
    return <main className={`grid min-h-screen place-items-center p-5 ${dark ? "bg-[#101312] text-[#F8F4EA]" : "bg-[#FFF8EE] text-[#191C1A]"}`} role="alert">
      <section className={`afri-pattern relative w-full max-w-md overflow-hidden rounded-[2rem] border p-7 text-center shadow-2xl sm:p-9 ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/10 bg-white"}`}>
        <div aria-hidden className="mx-auto grid size-20 place-items-center rounded-full bg-[#F28C28]/15 text-5xl">🦁</div>
        <div className="mt-5 text-xs font-black uppercase tracking-[.2em] text-[#F28C28]">Your progress is safe</div>
        <h1 className="mt-2 text-3xl font-black">Lebo hit a snag</h1>
        <p className={`mt-3 font-semibold leading-7 ${dark ? "text-white/60" : "text-black/60"}`}>{online ? "AfriLingo could not finish opening this screen. Reload to return to your course." : "You appear to be offline. Saved learning remains on this device; reconnect, then reload this screen."}</p>
        <button onClick={() => window.location.reload()} className="afri-press mt-6 min-h-14 w-full rounded-2xl bg-[#F28C28] px-5 font-black text-white shadow-lg shadow-orange-950/15">{online ? "Reload AfriLingo" : "Try again"}</button>
        <p className={`mt-4 text-xs font-bold ${dark ? "text-white/55" : "text-black/55"}`}>If this keeps happening, your course data can still be restored from Settings → Learning data.</p>
      </section>
    </main>;
  }
}
