import type { ReactNode } from "react";

export function Safeguard({ code, children }: { code?: string; children: ReactNode }) {
  return (
    <div className="safeguard-block my-4 grid grid-cols-[auto_1fr] gap-3 border border-dashed border-stamp-red/60 bg-stamp-red/[0.04] p-3 text-sm text-paper-foreground">
      <div className="flex h-full items-start">
        <span className="rotate-180 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-stamp-red [writing-mode:vertical-rl]">salvaguarda {code ?? ""}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
