import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LogLine({ ts, level = "INFO", children }: { ts: string; level?: "INFO" | "WARN" | "ERR" | "REDACT"; children: ReactNode }) {
  const tone = level === "ERR" ? "text-stamp-red" : level === "WARN" ? "text-amber-crt" : level === "REDACT" ? "text-paper-muted" : "text-cyan-crt";
  return (
    <div className="grid grid-cols-[140px_60px_1fr] gap-2 border-b border-cyan-crt/20 py-1 font-mono text-xs">
      <span className="text-cyan-crt/70">{ts}</span>
      <span className={cn("font-bold", tone)}>[{level}]</span>
      <span className="text-cyan-crt">{children}</span>
    </div>
  );
}
