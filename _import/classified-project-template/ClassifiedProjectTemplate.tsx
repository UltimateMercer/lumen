"use client";
import type { ArchiveDocument, DocumentFrontmatter } from "../lib/documents";
import { RenderMdx, Stamp, Redacted, ProjectTOC } from "../lib/mdx-components";
import { ClassificationBar, PaperSheet } from "../components/DocumentHeader";
import { DigitalSignature } from "../components/DigitalSignature";
import { cn } from "@/lib/utils";

type ProjectStatus = NonNullable<DocumentFrontmatter["project_status"]>;

const STATUS_META: Record<
  ProjectStatus,
  { dot: string; label: string; integrity: number; tone: string }
> = {
  ativo:         { dot: "bg-amber-crt",   label: "OPERAÇÃO ATIVA",     integrity: 100, tone: "text-amber-crt" },
  suspenso:     { dot: "bg-amber-crt/60", label: "EM SUSPENSÃO",       integrity: 40,  tone: "text-amber-crt" },
  encerrado:    { dot: "bg-paper-muted",  label: "ENCERRADO",          integrity: 0,   tone: "text-paper-muted" },
  comprometido: { dot: "bg-stamp-red",    label: "COMPROMETIDO",       integrity: 15,  tone: "text-stamp-red" },
};

function StatusPanel({
  status,
  code,
  phase,
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
        <div
          className={cn("status-panel-bar-fill", meta.dot)}
          style={{ width: `${meta.integrity}%` }}
        />
      </div>
      <div className="status-panel-foot">
        <span>integridade · {meta.integrity}%</span>
        <span>{phase ?? "fase —"}</span>
      </div>
    </div>
  );
}

function MetaCell({
  label,
  value,
  emphasis = false,
  fullWidth = false,
}: {
  label: string;
  value?: React.ReactNode;
  emphasis?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div className={cn("meta-cell", fullWidth && "meta-cell--full")}>
      <span className="meta-cell-corner meta-cell-corner-tl">◤</span>
      <span className="meta-cell-corner meta-cell-corner-br">◢</span>
      <div className="meta-cell-label">{label}</div>
      <div className={cn("meta-cell-value", emphasis && "meta-cell-value--em")}>
        {value ?? "—"}
      </div>
    </div>
  );
}

export function ClassifiedProjectTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  const sections = fm.sections ?? [];
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />

      <div className="mt-3 flex items-center justify-between border-y-2 border-paper-foreground bg-paper-foreground px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-paper">
        <span>◆ programa não reconhecido</span>
        <span>negação plausível aplicável</span>
        <span>{fm.deniability_clause ?? "cláusula 14-B"}</span>
      </div>

      <header className="mt-6 grid gap-6 border-b-2 border-paper-foreground/60 pb-5 md:grid-cols-[1fr_auto]">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper-muted">
            ◆ projeto classificado
          </div>
          <div className="mt-2 font-mono text-3xl font-bold tracking-[0.18em] text-paper-foreground md:text-4xl">
            {fm.project_code ?? "—"}
          </div>
          <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-[0.2em] text-stamp-red md:text-3xl">
            {fm.project_codename ?? fm.title}
          </h1>
          {fm.project_class && (
            <div className="mt-1 text-xs uppercase tracking-[0.25em] text-paper-muted">
              {fm.project_class}
            </div>
          )}
        </div>
        <StatusPanel
          status={fm.project_status}
          code={fm.project_code}
          phase={fm.current_phase}
        />
      </header>

      <section className="meta-grid mt-6">
        <MetaCell label="supervisão" value={fm.oversight} emphasis />
        <MetaCell label="diretiva-mãe" value={fm.directive_origin} emphasis />
        <MetaCell label="em vigor desde" value={fm.operational_since} />
        <MetaCell label="fase atual" value={fm.current_phase} />
        <MetaCell label="ativos" value={fm.asset_count} />
        <MetaCell label="recrutamento" value={fm.recruit_pool} />
        <MetaCell label="métrica primária" value={fm.success_metric} fullWidth />
        <MetaCell
          label="linha orçamentária"
          value={fm.budget_line ? fm.budget_line : <Redacted length={20} />}
          fullWidth
        />
      </section>

      <div
        className={cn(
          "classified-project-body mt-8 text-paper-foreground",
          sections.length > 0 && "md:grid md:grid-cols-[14rem_1fr] md:gap-8",
        )}
      >
        {sections.length > 0 && (
          <aside className="project-toc-wrap">
            <ProjectTOC items={sections} />
          </aside>
        )}
        <div className="min-w-0">
          <RenderMdx source={doc.mdxSource} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-paper-foreground/30 pt-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          ▸ fim do verbete de programa
        </div>
        <Stamp variant="black" shape="rect" subtitle={fm.deniability_clause ?? "14-B"}>
          Não reconhecido
        </Stamp>
      </div>

      {fm.signed_by && (
        <DigitalSignature
          name={fm.signed_by}
          role={fm.oversight ?? "Diretoria de Operações Especiais"}
          registry={fm.registry_id ?? fm.project_code ?? "—"}
          timestamp={fm.signed_at ?? fm.date}
        />
      )}
    </PaperSheet>
  );
}