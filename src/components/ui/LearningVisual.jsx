import ConceptIcon from "./ConceptIcon";

export default function LearningVisual({ iconId, number, label, className = "" }) {
  if (Number.isFinite(number)) {
    const dots = number > 0 && number <= 10 ? Array.from({ length: number }) : [];
    return (
      <span role="img" aria-label={`${label || number}: ${number}`} className={`grid place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#4338CA]/12 via-[#F6C445]/12 to-[#F28C28]/15 ${className}`}>
        <span className="text-center">
          <span className="block text-4xl font-black leading-none text-[#4338CA] sm:text-5xl">{number}</span>
          {dots.length > 0 && <span className="mx-auto mt-2 flex max-w-24 flex-wrap justify-center gap-1" aria-hidden="true">{dots.map((_, index) => <i key={index} className="size-2 rounded-full bg-[#F28C28]" />)}</span>}
        </span>
      </span>
    );
  }
  return <ConceptIcon iconId={iconId} label={label} className={className} />;
}
