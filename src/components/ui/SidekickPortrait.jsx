import { assetPath } from "../../utils/assetPath";
import SafeArtwork from "./SafeArtwork";

export default function SidekickPortrait({ character, className = "", eager = false }) {
  return <span className={`relative block shrink-0 overflow-hidden ${character.framed ? "bg-white" : ""} ${className}`} role="img" aria-label={`${character.name} the ${character.species}`}>
    <SafeArtwork src={assetPath(character.image)} alt="" loading={eager ? "eager" : "lazy"} fallbackLabel={character.name} className="h-full w-full object-contain object-bottom" />
  </span>;
}
