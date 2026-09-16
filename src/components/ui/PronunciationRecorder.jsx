import { useEffect, useRef, useState } from "react";
import { Mic, Play, RotateCcw, Square } from "lucide-react";
import { hapticPress } from "../../utils/hapticFeedback";

export default function PronunciationRecorder({ label, dark }) {
  const [status, setStatus] = useState("idle");
  const [audioUrl, setAudioUrl] = useState("");
  const [message, setMessage] = useState("");
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const clearStream = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  };

  useEffect(() => () => {
    clearStream();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  const start = async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setStatus("error");
      setMessage("Recording is not supported in this browser.");
      return;
    }
    try {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl("");
      chunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = event => { if (event.data.size) chunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        setStatus("ready");
        clearStream();
      };
      recorder.start();
      setMessage("");
      setStatus("recording");
    } catch (error) {
      clearStream();
      setStatus("error");
      setMessage(error?.name === "NotAllowedError" ? "Microphone permission was not granted." : "The microphone could not be started.");
    }
  };

  const stop = () => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  };

  const reset = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl("");
    setMessage("");
    setStatus("idle");
  };

  return <div className={`mt-4 rounded-2xl p-4 ${dark ? "bg-white/5" : "bg-black/[0.035]"}`}>
    <div className="flex flex-wrap items-center gap-3">
      {status !== "recording" && <button type="button" onClick={start} onPointerDown={hapticPress} className="afri-press flex min-h-11 items-center gap-2 rounded-xl bg-[#4338CA] px-4 font-black text-white"><Mic size={18}/>{audioUrl ? "Record again" : "Record myself"}</button>}
      {status === "recording" && <button type="button" onClick={stop} onPointerDown={hapticPress} className="afri-press flex min-h-11 items-center gap-2 rounded-xl bg-[#C95D3A] px-4 font-black text-white"><Square size={17} fill="currentColor"/>Stop recording</button>}
      {audioUrl && <button type="button" onClick={() => new Audio(audioUrl).play()} onPointerDown={hapticPress} className={`afri-press flex min-h-11 items-center gap-2 rounded-xl px-4 font-black ${dark ? "bg-white/10" : "bg-white shadow-sm"}`}><Play size={18} fill="currentColor"/>Play mine</button>}
      {audioUrl && <button type="button" onClick={reset} className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-black opacity-55"><RotateCcw size={16}/>Clear</button>}
      {status === "recording" && <span className="flex items-center gap-2 text-sm font-black text-[#C95D3A]"><span className="size-2 animate-pulse rounded-full bg-current"/>Recording “{label}”</span>}
    </div>
    <p className="mt-3 text-xs font-semibold leading-5 opacity-50">Your recording stays on this device and is discarded when you clear it or leave this page. AfriLingo does not score it yet.</p>
    {message && <div role="status" className="mt-3 rounded-xl bg-[#C95D3A]/12 p-3 text-sm font-bold text-[#C95D3A]">{message}</div>}
  </div>;
}
