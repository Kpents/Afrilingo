import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";

export default function SafeArtwork({ src, alt = "", className = "", loading = "lazy", fallbackLabel = "Artwork unavailable" }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed || !src) return <span role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true} className={`grid place-items-center bg-gradient-to-br from-[#F6C445]/20 via-[#F28C28]/10 to-[#24745B]/15 text-current/45 ${className}`}><span className="grid place-items-center gap-1 text-center"><ImageOff aria-hidden="true"/><span className="px-2 text-[10px] font-black uppercase tracking-wider">{fallbackLabel}</span></span></span>;
  return <img src={src} alt={alt} loading={loading} onError={() => setFailed(true)} className={className} />;
}
