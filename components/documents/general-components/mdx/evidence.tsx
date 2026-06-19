import type { ReactNode } from "react";

export function Evidence({ code, custody, children }: { code: string; custody?: string; children: ReactNode }) {
  return (
    <div className="my-4 border border-paper-foreground/40 p-3 text-sm">
      <div className="flex items-center justify-between border-b border-dashed border-paper-foreground/30 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-paper-muted">
        <span>&#9670; evid. {code}</span>
        {custody && <span>custódia :: {custody}</span>}
      </div>
      <div className="mt-2 text-paper-foreground">{children}</div>
    </div>
  );
}
