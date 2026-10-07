import { useEffect, useState } from "react";
import { CheckCircle2, Download, RefreshCw, WifiOff, X } from "lucide-react";

export default function AppStatus({ dark, lifecycle }) {
  const kind = lifecycle.updateReady ? "update" : !lifecycle.online ? "offline" : lifecycle.reconnected ? "reconnected" : lifecycle.canInstall ? "install" : null;
  const [dismissed, setDismissed] = useState(null);
  useEffect(() => { if (kind !== dismissed) setDismissed(null); }, [kind, dismissed]);
  if (!kind || dismissed === kind) return null;
  const surface = dark ? "border-white/10 bg-[#232B28] text-[#F8F4EA]" : "border-black/10 bg-white text-[#191C1A]";
  if (kind === "update") return <Notice surface={surface} icon={<RefreshCw className="text-[#F28C28]"/>} title="Update ready" text="A fresh AfriLingo version is ready." action="Update" onAction={lifecycle.reload} onDismiss={()=>setDismissed(kind)}/>;
  if (kind === "offline") return <Notice surface={surface} icon={<WifiOff className="text-[#F6C445]"/>} title="Learning offline" text="Saved lessons and progress remain available on this device." action="Keep learning" onAction={()=>setDismissed(kind)}/>;
  if (kind === "reconnected") return <Notice surface={surface} icon={<CheckCircle2 className="text-[#53B98A]"/>} title="You’re back online" text="AfriLingo can sync fresh app content again." onDismiss={()=>setDismissed(kind)}/>;
  if (kind === "install") return <Notice surface={surface} icon={<Download className="text-[#24745B]"/>} title="Learn anywhere" text="Install AfriLingo for quicker access." action="Install" onAction={lifecycle.install} onDismiss={()=>setDismissed(kind)}/>;
  return null;
}

function Notice({ surface, icon, title, text, action, onAction, onDismiss }) {
  return <aside role="status" aria-live="polite" className={`fixed inset-x-3 bottom-24 z-[65] mx-auto flex max-w-md items-center gap-3 rounded-2xl border p-3 shadow-2xl ${surface}`}>
    <span className="shrink-0">{icon}</span><div className="min-w-0 flex-1"><div className="text-sm font-black">{title}</div><div className="mt-0.5 text-xs font-semibold opacity-55">{text}</div></div>
    {action && <button onClick={onAction} className="min-h-11 shrink-0 rounded-xl bg-[#F28C28] px-3 text-xs font-black text-white">{action}</button>}
    <button onClick={onDismiss} aria-label={`Dismiss ${title}`} className="grid size-11 shrink-0 place-items-center rounded-xl opacity-50 hover:bg-current/5 hover:opacity-100"><X size={17}/></button>
  </aside>;
}
