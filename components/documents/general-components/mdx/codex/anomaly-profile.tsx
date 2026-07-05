import type { DocumentFrontmatter } from "@/lib/archive/documents";

function StatChip({ label, value }: { label: string; value?: string }) {
  return (
    <div className="border border-paper-foreground px-3 py-2">
      <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-paper-muted">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-xs uppercase text-paper-foreground">
        {value ?? "—"}
      </div>
    </div>
  );
}

export function AnomalyProfile({
  autonomy,
  contagion,
  host_required,
  containment_status,
}: {
  autonomy?: DocumentFrontmatter["autonomy"];
  contagion?: DocumentFrontmatter["contagion"];
  host_required?: DocumentFrontmatter["host_required"];
  containment_status?: DocumentFrontmatter["containment_status"];
}) {
  return (
    <section className="grid gap-2 md:grid-cols-3">
      <StatChip label="autonomia" value={autonomy} />
      <StatChip label="contagiosidade" value={contagion} />
      <StatChip
        label="hospedeiro"
        value={
          host_required === false
            ? "dispensável"
            : host_required
              ? "obrigatório"
              : "—"
        }
      />
      <StatChip label="contenção" value={containment_status} />
    </section>
  );
}
