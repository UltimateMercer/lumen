"use client";
import type { ArchiveDocument } from "../lib/documents";
import { RenderMdx } from "../lib/mdx-components";
import { PaperSheet } from "../general-components/paper/PaperSheet";

export function NewsTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <PaperSheet>
      {/* Masthead */}
      <header className="border-b-4 border-double border-paper-foreground pb-3">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          <span>ed. {fm.edition ?? "—"}</span>
          <span>{fm.date}</span>
          <span>preço · 0,30 cred</span>
        </div>
        <h1 className="mt-2 text-center font-display text-5xl font-black uppercase tracking-[0.05em] text-paper-foreground md:text-6xl">
          {fm.outlet ?? "Tribuna Continental"}
        </h1>
        {fm.motto && (
          <div className="mt-1 text-center text-[10px] italic uppercase tracking-[0.3em] text-paper-muted">
            « {fm.motto} »
          </div>
        )}
      </header>

      {/* Section bar */}
      <div className="mt-3 flex items-center justify-between border-y border-paper-foreground/60 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-paper-foreground">
        <span>seç. {fm.section ?? "geral"}</span>
        <span className="text-paper-muted">{fm.issued_by}</span>
        <span>{fm.reference ?? "—"}</span>
      </div>

      {/* Headline */}
      <section className="mt-6 text-center">
        <h2 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-paper-foreground md:text-4xl">
          {fm.title}
        </h2>
        {fm.summary && (
          <p className="mx-auto mt-3 max-w-2xl text-sm italic leading-snug text-paper-muted">
            {fm.summary}
          </p>
        )}
        <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          {fm.byline && <span>por {fm.byline}</span>}
          {fm.dateline && <span> · {fm.dateline}</span>}
        </div>
      </section>

      <hr className="my-5 border-paper-foreground/40" />

      {/* Body — 2 columns w/ drop cap */}
      <article className="news-columns news-dropcap text-justify text-[13px] leading-relaxed text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </article>

      {/* Footer / censura */}
      <footer className="mt-8 flex flex-col items-center gap-3 border-t border-paper-foreground/40 pt-4 text-[10px] uppercase tracking-[0.3em] text-paper-muted md:flex-row md:justify-between">
        <span>{fm.outlet ?? "Tribuna Continental"} · todos os direitos reservados ao Estado</span>
        <span>{fm.approved_by ? `aprovado · ${fm.approved_by}` : "div. censura · cláusula 14-B"}</span>
      </footer>
    </PaperSheet>
  );
}