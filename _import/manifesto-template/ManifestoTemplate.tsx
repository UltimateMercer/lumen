"use client";
import type { ArchiveDocument } from "../lib/documents";
import { RenderMdx } from "../lib/mdx-components";

export function ManifestoTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <div className="paper-texture relative mx-auto max-w-2xl border border-paper-foreground/40 p-8 shadow-[0_24px_64px_-32px_oklch(0_0_0/0.6)] md:p-12"
         style={{ filter: "contrast(1.05)" }}>
      <div className="absolute -top-4 left-4 -rotate-3 border-2 border-stamp-red bg-paper px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-stamp-red">
        ⚠ panfleto interceptado · não-oficial
      </div>
      <div className="mt-6 text-center">
        <h1 className="font-display text-4xl font-black uppercase tracking-[0.15em] text-paper-foreground"
            style={{ textShadow: "2px 2px 0 oklch(0.50 0.20 27 / 0.4)" }}>
          {fm.title}
        </h1>
        <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          distribuído em {fm.date} · {fm.issued_by}
        </div>
      </div>
      <hr className="my-6 border-paper-foreground/40" />
      <div className="text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </div>
    </div>
  );
}