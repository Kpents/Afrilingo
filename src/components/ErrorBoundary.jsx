import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) { return { error }; }

  componentDidCatch(error, details) {
    console.error("AfriLingo recovered from a screen error", error, details);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return <main className="grid min-h-screen place-items-center bg-[#101312] p-5 text-[#F8F4EA]" role="alert"><section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#1A201E] p-7 text-center shadow-2xl"><div className="text-5xl">🦁</div><h1 className="mt-4 text-3xl font-black">Lebo hit a snag</h1><p className="mt-3 font-semibold leading-7 text-white/55">Your learning progress is still saved. Reload AfriLingo to return to your course.</p><button onClick={() => window.location.reload()} className="mt-6 min-h-14 w-full rounded-2xl bg-[#F28C28] font-black text-white">Reload AfriLingo</button></section></main>;
  }
}
