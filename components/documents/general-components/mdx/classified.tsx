import type { ReactNode } from "react";

export function Classified({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 border-2 border-stamp-red/70 p-4 relative">
      <div className="mb-2 flex items-center justify-between gap-2 border-b border-stamp-red/30 pb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-stamp-red">
        <span>◆ acesso restrito · cláusula 14-B</span>
        <span className="opacity-75">// confidencial</span>
      </div>
      <div className="text-sm text-paper-foreground">{children}</div>
    </div>
  );
}
