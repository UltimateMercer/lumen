import type { ReactNode } from "react";

export function Pullquote({ children, by }: { children: ReactNode; by?: string }) {
  return (
    <blockquote className="my-4 break-inside-avoid border-y-2 border-paper-foreground/50 py-3 text-center font-display text-lg italic leading-snug text-paper-foreground">
      &ldquo;{children}&rdquo;
      {by && <footer className="mt-1 text-[10px] not-italic uppercase tracking-[0.3em] text-paper-muted">&mdash; {by}</footer>}
    </blockquote>
  );
}
