"use client";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { RenderMdx } from "../general-components/mdx/render-mdx";
import { Stamp } from "../general-components/mdx/stamp";
import { ClassificationBar } from "../general-components/stamps/classification-bar";
import { CrestSvg } from "../general-components/ui/crest-svg";

export function ForeignLetterTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <div className="paper-foreign relative mx-auto max-w-3xl border border-paper-muted/40 p-10 shadow-[0_24px_64px_-32px_oklch(0_0_0/0.6)] md:p-14">
      {/* watermark diagonal */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="rotate-[-22deg] font-display text-[5rem] font-black uppercase tracking-[0.4em] text-paper-foreground/[0.04]">
          via diplomática
        </div>
      </div>

      <div className="relative">
        <ClassificationBar fm={fm} />

        {/* Cabeçalho institucional bilíngue */}
        <header className="mt-8 flex items-start gap-6">
          <div className="text-paper-foreground">
            <CrestSvg motif={fm.seal_motif ?? "star"} size={90} />
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
              {fm.language_code ?? "FRN"} · Documento estrangeiro
            </div>
            <div className="mt-1 font-display text-xs italic uppercase tracking-[0.25em] text-paper-muted">
              {fm.origin_country_native ?? "—"}
            </div>
            <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-paper-foreground">
              {fm.origin_country ?? "Origem desconhecida"}
            </h1>
            <div className="mt-1 text-xs uppercase tracking-widest text-paper-foreground">
              {fm.origin_authority ?? fm.issued_by}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-4 text-[10px] uppercase tracking-[0.25em] text-paper-muted">
              <div>Ref. {fm.reference ?? "—"}</div>
              <div>{fm.date}</div>
              {fm.delivered_via && <div className="col-span-2">via: {fm.delivered_via}</div>}
            </div>
          </div>
        </header>

        <div className="mt-6 border-y border-paper-foreground/40 py-2 text-[10px] uppercase tracking-[0.3em] text-paper-foreground">
          Ao: {fm.recipient ?? "Conselho do Continente"}
        </div>

        <h2 className="mt-6 font-display text-2xl font-bold uppercase italic tracking-wider text-paper-foreground">
          {fm.title}
        </h2>

        <div className="foreign-body mt-6 text-paper-foreground">
          <RenderMdx source={doc.mdxSource} />
        </div>

        {/* Rodapé com selos */}
        <footer className="mt-12 grid grid-cols-2 items-end gap-6 border-t border-paper-foreground/40 pt-6">
          <div className="text-[10px] uppercase tracking-[0.25em] text-paper-muted">
            <div>tradução oficial</div>
            <div className="mt-1 text-paper-foreground">
              {fm.translator ?? "MINCONT · Div. Linguística"}
            </div>
            <div className="mt-3 text-paper-muted">
              Verificado · selo bilíngue n° {fm.reference ?? "—"}
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Stamp variant="blue" shape="circle" subtitle="chancelaria">
              {fm.origin_country?.split(" ").slice(-1)[0]?.toUpperCase() ?? "ESTRANGEIRO"}
            </Stamp>
            <Stamp variant="red" shape="rect" subtitle={fm.date}>
              alfândega · visto
            </Stamp>
          </div>
        </footer>
      </div>
    </div>
  );
}