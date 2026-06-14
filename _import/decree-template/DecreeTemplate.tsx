"use client";
import type { ArchiveDocument } from "../lib/documents";
import { RenderMdx } from "../lib/mdx-components";
import { PaperSheet } from "../general-components/paper/PaperSheet";
import { ClassificationBar } from "../general-components/stamps/ClassificationBar";

export function DecreeTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />
      <div className="mt-8 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center border-2 border-paper-foreground/80 text-2xl text-paper-foreground">
          ⚙
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          República Autônoma de Nova-Aurélia
        </div>
        <div className="text-xs uppercase tracking-[0.25em] text-paper-foreground">
          {fm.issued_by}
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold uppercase tracking-wider text-paper-foreground">
          {fm.title}
        </h1>
        {fm.reference && (
          <div className="mt-2 text-xs uppercase tracking-widest text-paper-muted">
            Ref. {fm.reference} · {fm.date}
          </div>
        )}
      </div>

      <div className="mt-10 text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </div>
    </PaperSheet>
  );
}
