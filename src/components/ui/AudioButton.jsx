import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Volume2, VolumeX } from "lucide-react";
import { assetPath } from "../../utils/assetPath";

export default function AudioButton({ src, label, compact = false, className = "" }) {
  const [status, setStatus] = useState(src ? "ready" : "pending");
  const playerRef = useRef(null);

  useEffect(() => {
    setStatus(src ? "ready" : "pending");
    return () => playerRef.current?.pause();
  }, [src]);

  const play = () => {
    if (!src || status === "loading") return;
    setStatus("loading");
    const player = new Audio(assetPath(src));
    playerRef.current = player;
    player.onplaying = () => setStatus("playing");
    player.onended = () => setStatus("ready");
    player.onerror = () => setStatus("unavailable");
    player.play().catch(() => setStatus("unavailable"));
  };

  const unavailable = status === "pending" || status === "unavailable";
  const text = status === "pending" ? "Audio pending" : status === "unavailable" ? "Audio unavailable" : status === "loading" ? "Loading audio" : status === "playing" ? "Playing" : "Play audio";
  const Icon = unavailable ? VolumeX : status === "loading" ? LoaderCircle : Volume2;

  return <button type="button" onClick={play} disabled={unavailable} aria-label={`${text}: ${label}`} title={text} className={`${compact ? "grid h-9 w-9 place-items-center" : "flex min-h-14 items-center gap-3 px-5"} rounded-xl transition disabled:cursor-not-allowed disabled:opacity-45 ${className}`}><Icon size={compact ? 17 : 21} className={status === "loading" ? "animate-spin" : ""}/>{!compact && <span>{text}</span>}</button>;
}
