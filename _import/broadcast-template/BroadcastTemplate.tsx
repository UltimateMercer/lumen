"use client";
import type { ArchiveDocument } from "../lib/documents";
import { RenderMdx } from "../lib/mdx-components";
import { ClassificationBar, PaperSheet } from "../components/DocumentHeader";

export function BroadcastTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />
      <div className="mt-6 flex items-end justify-between border-b border-paper-foreground/40 pb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
            Pauta de rádio estatal · {fm.station ?? "RNC-1"}
          </div>
          <h1 className="mt-1 font-display text-2xl font-bold uppercase tracking-wider text-paper-foreground">
            {fm.title}
          </h1>
        </div>
        <div className="text-right text-[10px] uppercase tracking-widest text-paper-muted">
          <div>no ar :: {fm.airtime ?? fm.date}</div>
          <div>ref. {fm.reference ?? "—"}</div>
        </div>
      </div>
      <div className="mt-5 text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </div>
    </PaperSheet>
  );
}