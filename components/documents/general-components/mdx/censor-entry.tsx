import type { ReactNode } from "react";

export function CensorEntry({ num, title, author, clause, children }: {
  num: string | number; title: string; author?: string; clause: string; children?: ReactNode;
}) {
  return (
    <div className="my-3 grid grid-cols-[40px_1fr_120px] gap-3 border-b border-paper-foreground/20 py-2 text-sm">
      <div className="font-bold text-paper-muted">{num}.</div>
      <div>
        <div className="font-bold uppercase tracking-wider text-paper-foreground">{title}</div>
        {author && <div className="text-[10px] uppercase tracking-widest text-paper-muted">atribuído a {author}</div>}
        {children && <div className="mt-1 text-xs opacity-80">{children}</div>}
      </div>
      <div className="text-right text-[10px] uppercase tracking-widest text-stamp-red">{clause}</div>
    </div>
  );
}
