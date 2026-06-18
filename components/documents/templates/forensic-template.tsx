"use client";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { RenderMdx } from "../general-components/mdx/render-mdx";
import { PaperSheet } from "../general-components/paper/paper-sheet";
import { ClassificationBar } from "../general-components/stamps/classification-bar";

export function ForensicTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />
      <div className="mt-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          Relatório Forense · Divisão de Anomalias · {fm.issued_by}
        </div>
        <h1 className="mt-1 font-display text-2xl font-bold uppercase tracking-wider text-paper-foreground">
          {fm.title}
        </h1>
        <div className="mt-2 grid grid-cols-3 gap-x-6 text-xs uppercase tracking-wider text-paper-muted">
          <div>Cena: <span className="text-paper-foreground">{fm.location ?? "—"}</span></div>
          <div>Data: <span className="text-paper-foreground">{fm.date}</span></div>
          <div>Ref. <span className="text-paper-foreground">{fm.reference ?? "—"}</span></div>
        </div>
      </div>
      <hr className="my-5 border-paper-foreground/30" />
      <div className="text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </div>
    </PaperSheet>
  );
}