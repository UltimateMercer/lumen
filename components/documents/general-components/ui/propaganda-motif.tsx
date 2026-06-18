import type { DocumentFrontmatter } from "@/lib/archive/documents";

export function PropagandaMotif({ motif = "star", size = 180 }: { motif?: DocumentFrontmatter["motif"]; size?: number }) {
  const stroke = "currentColor";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={stroke} strokeWidth={2.2} aria-hidden className="text-stamp-red">
      <circle cx="50" cy="50" r="46" />
      <circle cx="50" cy="50" r="40" strokeDasharray="2 3" />
      {motif === "fist" && (
        <g fill="currentColor" stroke="none">
          <path d="M30 56 L30 76 L70 76 L70 56 Z" />
          <path d="M32 56 L32 42 Q32 38 36 38 Q40 38 40 42 L40 56 Z" />
          <path d="M42 56 L42 36 Q42 32 46 32 Q50 32 50 36 L50 56 Z" />
          <path d="M52 56 L52 38 Q52 34 56 34 Q60 34 60 38 L60 56 Z" />
          <path d="M62 56 L62 42 Q62 38 66 38 Q70 38 70 42 L70 56 Z" />
          <path d="M28 56 L28 50 Q28 44 24 44 Q20 44 22 50 L26 60 Z" />
        </g>
      )}
      {motif === "eye" && (
        <>
          <path d="M14 50 Q50 18 86 50 Q50 82 14 50 Z" />
          <circle cx="50" cy="50" r="14" />
          <circle cx="50" cy="50" r="6" fill="currentColor" />
          <path d="M50 22 L50 30 M50 70 L50 78 M22 50 L30 50 M70 50 L78 50" />
        </>
      )}
      {motif === "gear" && (
        <>
          <circle cx="50" cy="50" r="22" />
          <circle cx="50" cy="50" r="8" fill="currentColor" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            const x1 = 50 + Math.cos(a) * 24;
            const y1 = 50 + Math.sin(a) * 24;
            const x2 = 50 + Math.cos(a) * 36;
            const y2 = 50 + Math.sin(a) * 36;
            return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} strokeWidth={6} />;
          })}
        </>
      )}
      {motif === "star" && (
        <g fill="currentColor" stroke="none">
          <path d="M50 18 L58 42 L84 42 L63 57 L71 81 L50 66 L29 81 L37 57 L16 42 L42 42 Z" />
        </g>
      )}
    </svg>
  );
}
