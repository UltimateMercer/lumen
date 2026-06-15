import type { ReactNode } from "react";

export function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-2 border-b border-dashed border-paper-foreground/20 py-1 text-sm">
      <div className="text-[10px] font-bold uppercase tracking-wider text-paper-muted">{label}</div>
      <div className="text-paper-foreground">{children}</div>
    </div>
  );
}
