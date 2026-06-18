"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MetaCell({
  label, value, emphasis = false, fullWidth = false,
}: {
  label: string;
  value?: ReactNode;
  emphasis?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div className={cn("meta-cell", fullWidth && "meta-cell--full")}>
      <span className="meta-cell-corner meta-cell-corner-tl">◤</span>
      <span className="meta-cell-corner meta-cell-corner-br">◢</span>
      <div className="meta-cell-label">{label}</div>
      <div className={cn("meta-cell-value", emphasis && "meta-cell-value--em")}>{value ?? "—"}</div>
    </div>
  );
}
