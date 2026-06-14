import type { ReactNode } from "react";

export function Trait({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="my-2 grid grid-cols-[12ch_1fr] gap-3 border-b border-paper-foreground/15 py-1.5 text-sm">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-paper-muted">{label}</div>
      <div className="text-paper-foreground">{children}</div>
    </div>
  );
}
