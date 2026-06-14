import type { ReactNode } from "react";

export function Signature({ name, role }: { name: string; role: string }) {
  return (
    <div className="mt-10 max-w-xs">
      <div className="border-b border-paper-foreground/60 pb-1 font-display text-2xl italic text-paper-foreground">{name}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-paper-muted">{role}</div>
    </div>
  );
}
