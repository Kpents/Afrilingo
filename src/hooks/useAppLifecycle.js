import { useEffect, useRef, useState } from "react";

export default function useAppLifecycle() {
  const [online, setOnline] = useState(() => navigator.onLine);
  const [installEvent, setInstallEvent] = useState(null);
  const [updateReady, setUpdateReady] = useState(false);
  const [reconnected, setReconnected] = useState(false);
  const wasOffline = useRef(!navigator.onLine);
  const reconnectTimer = useRef(null);
  useEffect(() => {
    const onOnline=()=>{setOnline(true);if(wasOffline.current){setReconnected(true);window.clearTimeout(reconnectTimer.current);reconnectTimer.current=window.setTimeout(()=>setReconnected(false),4500)}wasOffline.current=false};
    const onOffline=()=>{setOnline(false);setReconnected(false);wasOffline.current=true};
    const onInstall=event=>{event.preventDefault();setInstallEvent(event)};
    window.addEventListener("online",onOnline); window.addEventListener("offline",onOffline); window.addEventListener("beforeinstallprompt",onInstall);
    if (import.meta.env.PROD && "serviceWorker" in navigator) navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).then(registration=>{
      registration.addEventListener("updatefound",()=>{const worker=registration.installing;worker?.addEventListener("statechange",()=>{if(worker.state==="installed"&&navigator.serviceWorker.controller)setUpdateReady(true)})});
    }).catch(error=>console.warn("Offline support could not start",error));
    return()=>{window.clearTimeout(reconnectTimer.current);window.removeEventListener("online",onOnline);window.removeEventListener("offline",onOffline);window.removeEventListener("beforeinstallprompt",onInstall)};
  },[]);
  const install=async()=>{if(!installEvent)return;await installEvent.prompt();await installEvent.userChoice;setInstallEvent(null)};
  return {online,reconnected,canInstall:Boolean(installEvent),install,updateReady,reload:()=>window.location.reload()};
}
