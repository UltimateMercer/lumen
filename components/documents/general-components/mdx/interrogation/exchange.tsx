import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Exchange({
  speaker, ts, tone = "calm", children,
}: {
  speaker: string; ts?: string; tone?: "calm" | "tense" | "redacted"; children: ReactNode;
}) {
  const toneClass = tone === "tense" ? "text-stamp-red" : tone === "redacted" ? "text-paper-muted italic" : "text-paper-foreground";
  const accent = tone === "tense" ? "before:bg-stamp-red" : tone === "redacted" ? "before:bg-paper-muted/50" : "before:bg-paper-foreground/20";
  return (
    <div className={cn("exchange-row relative grid gap-x-4 gap-y-1 border-b border-dashed border-paper-foreground/15 py-2.5 pl-3 text-sm md:grid-cols-[6ch_14ch_1fr]", "before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px]", accent)}>
      <span className="font-mono text-[10px] uppercase tracking-wider text-paper-muted">{ts ?? "--:--"}</span>
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-paper-foreground">{speaker}</span>
      <span className={cn("leading-relaxed", toneClass)}>{children}</span>
    </div>
  );
}
