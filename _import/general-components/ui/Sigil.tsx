import type { DocumentFrontmatter } from "../../lib/documents";

export function Sigil({ motif = "crimson" }: { motif?: DocumentFrontmatter["sigil_motif"] }) {
  const stroke = "currentColor";
  const common = { width: 96, height: 96, viewBox: "0 0 100 100", fill: "none" as const, stroke, strokeWidth: 1.6 };
  switch (motif) {
    case "eye":
      return (
        <svg {...common}>
          <path d="M5 50 Q50 10 95 50 Q50 90 5 50 Z" />
          <circle cx="50" cy="50" r="14" />
          <circle cx="50" cy="50" r="5" fill={stroke} />
        </svg>
      );
    case "spiral":
      return (
        <svg {...common}>
          <path d="M50 50 m-30 0 a30 30 0 1 1 60 0 a22 22 0 1 1 -44 0 a15 15 0 1 1 30 0 a8 8 0 1 1 -16 0" />
        </svg>
      );
    case "thorn":
      return (
        <svg {...common}>
          <path d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" />
        </svg>
      );
    case "mask":
      return (
        <svg {...common}>
          <path d="M15 30 Q50 10 85 30 L80 70 Q50 95 20 70 Z" />
          <path d="M30 45 L42 52 M70 45 L58 52" />
          <path d="M40 70 Q50 78 60 70" />
        </svg>
      );
    case "circuit":
      return (
        <svg {...common}>
          <rect x="15" y="15" width="70" height="70" />
          <path d="M15 35 H40 V55 H60 V75 H85 M35 15 V35 M65 85 V65" />
          <circle cx="40" cy="35" r="3" fill={stroke} />
          <circle cx="60" cy="55" r="3" fill={stroke} />
        </svg>
      );
    case "crimson":
    default:
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="42" />
          <path d="M50 8 L50 92 M8 50 L92 50 M20 20 L80 80 M80 20 L20 80" />
          <circle cx="50" cy="50" r="10" fill={stroke} />
        </svg>
      );
  }
}
