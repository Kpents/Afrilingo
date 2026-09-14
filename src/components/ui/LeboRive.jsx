import { useEffect, useRef, useState } from "react";
import { assetPath } from "../../utils/assetPath";

export const leboArtboards = {
  idle: "Idle", wave: "Wave", correct: "Correct", celebrate: "Celebrate",
  encourage: "Encourage", curious: "Curious", learn: "Learn"
};

let runtime;
function loadRuntime() {
  if (!runtime) runtime = Promise.all([
    import("@rive-app/canvas"), import("@rive-app/canvas/rive.wasm?url")
  ]).then(([rive, wasm]) => {
    rive.RuntimeLoader.setWasmUrl(wasm.default);
    return rive;
  }).catch(error => { runtime = undefined; throw error; });
  return runtime;
}

// A single renderer for every course. Only visible mascots load a Rive instance.
// Failures leave the existing course outfit visible and never block learning.
export default function LeboRive({ reaction, fallback, playing = true }) {
  const canvas = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const player = useRef(null);
  const active = useRef(playing);
  active.current = playing;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(canvas.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let disposed = false;
    let instance;
    let resize;
    const timeout = setTimeout(() => {
      if (!instance?.loaded) { disposed = true; instance?.cleanup(); setReady(false); }
    }, 15000);
    const visibility = () => {
      if (!instance?.loaded) return;
      if (document.hidden || !active.current) instance.pause();
      else instance.play("Reaction");
    };
    loadRuntime().then(rive => {
      if (disposed) return;
      instance = new rive.Rive({
        src: assetPath("/mascot/lebo-2d.riv"),
        artboard: leboArtboards[reaction] || "Wave",
        canvas: canvas.current,
        animations: "Reaction",
        autoplay: active.current && !document.hidden,
        layout: new rive.Layout({ fit: rive.Fit.Contain, alignment: rive.Alignment.Center }),
        onLoad() {
          if (disposed) return;
          clearTimeout(timeout);
          instance.resizeDrawingSurfaceToCanvas(Math.min(devicePixelRatio || 1, 2));
          setReady(true);
          visibility();
        },
        onLoadError() { setReady(false); }
      });
      player.current = instance;
      resize = new ResizeObserver(() => {
        if (instance.loaded) instance.resizeDrawingSurfaceToCanvas(Math.min(devicePixelRatio || 1, 2));
      });
      resize.observe(canvas.current);
      document.addEventListener("visibilitychange", visibility);
    }).catch(() => setReady(false));
    return () => {
      disposed = true;
      clearTimeout(timeout);
      resize?.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      instance?.cleanup();
      player.current = null;
      setReady(false);
    };
  }, [visible, reaction]);

  useEffect(() => {
    const instance = player.current;
    if (!instance?.loaded) return;
    if (playing && !document.hidden) instance.play("Reaction");
    else instance.pause();
  }, [playing]);

  return <span className="relative block h-full w-full" data-lebo-reaction={reaction} data-lebo-ready={ready}>
    <span className={`absolute inset-0 ${ready ? "invisible" : ""}`}>{fallback}</span>
    <canvas ref={canvas} aria-hidden="true" className={`relative block h-full w-full ${ready ? "" : "invisible"}`} />
  </span>;
}
