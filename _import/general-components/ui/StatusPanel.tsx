"use client";
import type { DocumentFrontmatter } from "../../lib/documents";
import { cn } from "@/lib/utils";

type ProjectStatus = NonNullable<DocumentFrontmatter["project_status"]>;

const STATUS_META: Record<ProjectStatus, { dot: string; label: string; integrity: number; tone: string }> = {
  ativo:         { dot: "bg-amber-crt",   label: "OPERAÇÃO ATIVA",     integrity: 100, tone: "text-amber-crt" },
  suspenso:     { dot: "bg-amber-crt/60", label: "EM SUSPENSÃO",       integrity: 40,  tone: "text-amber-crt" },
  encerrado:    { dot: "bg-paper-muted",  label: "ENCERRADO",          integrity: 0,   tone: "text-paper-muted" },
  comprometido: { dot: "bg-stamp-red",    label: "COMPROMETIDO",       integrity: 15,  tone: "text-stamp-red" },
};

export { type ProjectStatus, STATUS_META };

export function StatusPanel({
  status, code, phase,
}: {
  status?: ProjectStatus;
  code?: string;
  phase?: string;
}) {
  const s = status ?? "ativo";
  const meta = STATUS_META[s];
  return (
    <div className="status-panel">
      <div className="status-panel-head">
        <span className="status-panel-head-l">programa // status</span>
        <span className="status-panel-head-r">{code ?? "—"}</span>
      </div>
      <div className="status-panel-body">
        <span className={cn("status-led", meta.dot, s === "ativo" && "status-led-pulse")} />
        <div>
          <div className={cn("status-panel-state", meta.tone)}>{s}</div>
          <div className="status-panel-sub">{meta.label}</div>
        </div>
      </div>
      <div className="status-panel-bar" aria-hidden>
        <div className={cn("status-panel-bar-fill", meta.dot)} style={{ width: `${meta.integrity}%` }} />
      </div>
      <div className="status-panel-foot">
        <span>integridade · {meta.integrity}%</span>
        <span>{phase ?? "fase —"}</span>
      </div>
    </div>
  );
}
