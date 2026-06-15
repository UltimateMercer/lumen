import type { ReactNode } from "react";

export function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className="my-3 break-inside-avoid border-l-2 border-paper-foreground/50 bg-paper-foreground/[0.04] px-3 py-2 text-[11px] italic leading-snug text-paper-muted">
      {children}
    </figcaption>
  );
}
