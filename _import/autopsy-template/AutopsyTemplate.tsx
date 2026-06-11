"use client";
import type { ArchiveDocument } from "../lib/documents";
import { RenderMdx } from "../lib/mdx-components";
import { ClassificationBar, PaperSheet } from "../components/DocumentHeader";

export function AutopsyTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />
      <div className="mt-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          Laudo Necroscópico · {fm.issued_by}
        </div>
        <h1 className="mt-1 font-display text-2xl font-bold uppercase tracking-wider text-paper-foreground">
          {fm.title}
        </h1>
      </div>

      <div className="mt-4 grid grid-cols-2 border border-paper-foreground/40 text-sm">
        <Cell label="Caso" value={fm.case_id ?? fm.reference ?? "—"} />
        <Cell label="Data" value={fm.date} />
        <Cell label="Decedente" value={fm.decedent ?? "—"} />
        <Cell label="Local" value={fm.location ?? "—"} />
        <Cell label="Causa preliminar" value={fm.cause_of_death ?? "indeterminada"} full />
      </div>

      <div className="mt-6 text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </div>
    </PaperSheet>
  );
}

function Cell({ label, value, full = false }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={`border-b border-paper-foreground/30 px-3 py-2 ${full ? "col-span-2" : ""} odd:border-r odd:border-paper-foreground/30`}>
      <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-paper-muted">{label}</div>
      <div className="text-paper-foreground">{value}</div>
    </div>
  );
}