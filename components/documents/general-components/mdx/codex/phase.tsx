import type { ReactNode } from "react";

export function Phase({ n, name, children }: { n: number; name: string; children?: ReactNode }) {
  return (
    <div className="my-3 grid grid-cols-[5ch_1fr] gap-3 border-l-2 border-paper-foreground/40 py-1.5 pl-3">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-paper-muted">E.{String(n).padStart(2, "0")}</div>
      <div>
        <div className="font-display text-sm font-bold uppercase tracking-wider text-paper-foreground">{name}</div>
        {children && <div className="mt-1 text-sm text-paper-foreground/90">{children}</div>}
      </div>
    </div>
  );
}
