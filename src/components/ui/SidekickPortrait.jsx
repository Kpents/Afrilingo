import { assetPath } from "../../utils/assetPath";

export default function SidekickPortrait({ character, className = "", eager = false }) {
  return <span className={`relative block shrink-0 overflow-hidden ${character.framed ? "bg-white" : ""} ${className}`} role="img" aria-label={`${character.name} the ${character.species}`}>
    <img src={assetPath(character.image)} alt="" loading={eager ? "eager" : "lazy"} className="h-full w-full object-contain object-bottom" />
  </span>;
}
