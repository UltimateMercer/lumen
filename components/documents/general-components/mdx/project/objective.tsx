import type { ReactNode } from "react";

export function Objective({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 border-l-4 border-paper-foreground/70 bg-paper-foreground/[0.04] px-4 py-3 text-sm text-paper-foreground">
      <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-paper-muted">&#9670; objetivo declarado</div>
      {children}
    </div>
  );
}
