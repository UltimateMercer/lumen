import type { ReactNode } from "react";

export function Warning({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 border-l-4 border-stamp-red bg-stamp-red/[0.06] px-4 py-3 text-sm text-paper-foreground">
      <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-stamp-red">&#9888; advertência do conselho</div>
      {children}
    </div>
  );
}
