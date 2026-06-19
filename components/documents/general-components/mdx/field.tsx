import type { ReactNode } from "react";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-3 border-b border-paper-muted/30 py-2 text-sm">
      <div className="text-xs font-bold uppercase tracking-wider text-paper-muted">{label}</div>
      <div className="text-paper-foreground">{children}</div>
    </div>
  );
}
