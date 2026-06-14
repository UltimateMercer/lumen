"use client";
import type { ArchiveDocument } from "../lib/documents";
import { RenderMdx } from "../lib/mdx-components";
import { PaperSheet } from "../general-components/paper/PaperSheet";
import { ClassificationBar } from "../general-components/stamps/ClassificationBar";

export function MemoTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />
      <div className="mt-6 flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.25em] text-paper-muted">
          Memorando interno · {fm.issued_by}
        </div>
        <div className="text-xs uppercase tracking-widest text-paper-muted">
          {fm.reference ?? "MEM-???"}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[80px_1fr] gap-y-2 border border-paper-foreground/30 p-4 text-sm">
        <div className="text-xs font-bold uppercase tracking-wider text-paper-muted">De:</div>
        <div className="text-paper-foreground">{fm.from ?? fm.issued_by}</div>
        <div className="text-xs font-bold uppercase tracking-wider text-paper-muted">Para:</div>
        <div className="text-paper-foreground">{fm.to ?? "—"}</div>
        <div className="text-xs font-bold uppercase tracking-wider text-paper-muted">Data:</div>
        <div className="text-paper-foreground">{fm.date}</div>
        <div className="text-xs font-bold uppercase tracking-wider text-paper-muted">Assunto:</div>
        <div className="font-bold text-paper-foreground">{fm.subject ?? fm.title}</div>
      </div>

      <div className="mt-6 text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </div>
    </PaperSheet>
  );
}
