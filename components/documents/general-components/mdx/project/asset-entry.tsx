import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Redacted } from "../redacted";

export function AssetEntry({ codename, age, intake, status = "ativo", children }: {
  codename: string; age?: string | number; intake?: string;
  status?: "ativo" | "embedded" | "descontinuado" | "comprometido"; children?: ReactNode;
}) {
  const statusTone = status === "descontinuado" ? "text-paper-muted" : status === "comprometido" ? "text-stamp-red" : status === "embedded" ? "text-cyan-crt" : "text-paper-foreground";
  return (
    <div className="asset-row my-2 grid grid-cols-[12ch_4ch_1fr_auto] items-baseline gap-3 border-b border-dashed border-paper-foreground/25 py-2 text-sm">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper-foreground">{codename}</span>
      <span className="font-mono text-[10px] text-paper-muted">{age ?? "—"}</span>
      <span className="text-paper-foreground/90">{children ?? <Redacted length={18} />}{intake ? <span className="ml-2 text-[10px] uppercase tracking-widest text-paper-muted">ingresso {intake}</span> : null}</span>
      <span className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.25em]", statusTone)}>{status}</span>
    </div>
  );
}
