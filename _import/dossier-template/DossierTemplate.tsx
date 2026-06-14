"use client";
import type { ArchiveDocument } from "../lib/documents";
import { RenderMdx } from "../lib/mdx-components";
import { PaperSheet } from "../general-components/paper/PaperSheet";
import { ClassificationBar } from "../general-components/stamps/ClassificationBar";

export function DossierTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />
      <div className="mt-6 grid grid-cols-[120px_1fr] gap-6">
        <div className="flex h-36 w-28 items-center justify-center border-2 border-paper-foreground/70 bg-paper-muted/20 text-[10px] uppercase tracking-widest text-paper-muted">
          [foto<br/>arquivada]
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
            Ficha de indivíduo · {fm.issued_by}
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-wider text-paper-foreground">
            {fm.subject_name ?? fm.title}
          </h1>
          <div className="mt-2 grid grid-cols-2 gap-x-6 text-xs uppercase tracking-wider text-paper-muted">
            <div>Ref. {fm.reference ?? "—"}</div>
            <div>Status: <span className="text-paper-foreground">{fm.status ?? "ativo"}</span></div>
            <div>Aberto em {fm.date}</div>
            <div>Classif. {fm.classification}</div>
          </div>
        </div>
      </div>

      <hr className="my-6 border-paper-foreground/30" />

      <div className="text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </div>
    </PaperSheet>
  );
}
