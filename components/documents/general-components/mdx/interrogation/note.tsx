import type { ReactNode } from "react";

export function Note({ kind = "pause", children }: { kind?: "pause" | "inaudible" | "off-record" | "action"; children?: ReactNode }) {
  const label = kind === "pause" ? "pausa" : kind === "inaudible" ? "inaudível" : kind === "off-record" ? "fora do registro" : "ação";
  return (
    <div className="my-3 flex justify-center">
      <span className="border border-dashed border-paper-foreground/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-muted">
        [ {label}{children ? <> &middot; <span className="text-paper-foreground/70">{children}</span></> : null} ]
      </span>
    </div>
  );
}
