"use client";
import type { DocumentFrontmatter } from "@/lib/archive/documents";
import { cn } from "@/lib/utils";

const THREAT_BARS: Record<NonNullable<DocumentFrontmatter["threat_tier"]>, number> = {
  baixa: 1,
  moderada: 2,
  severa: 3,
  crítica: 4,
  apocalíptica: 5,
};

export { THREAT_BARS };

export function ThreatGauge({ tier }: { tier?: DocumentFrontmatter["threat_tier"] }) {
  const filled = tier ? THREAT_BARS[tier] : 0;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={cn("h-2 w-3 border border-paper-foreground/40", i < filled ? "bg-stamp-red" : "bg-transparent")} />
      ))}
    </div>
  );
}
