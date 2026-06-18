"use client";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { RenderMdx } from "../general-components/mdx/render-mdx";
import { PaperSheet } from "../general-components/paper/paper-sheet";
import { ClassificationBar } from "../general-components/stamps/classification-bar";

export function BountyTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />
      <div className="mt-8 border-4 border-double border-paper-foreground/80 p-6 text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-paper-muted">
          Ordem da Diretoria Cívica · {fm.issued_by}
        </div>
        <h1 className="mt-2 font-display text-5xl font-black uppercase tracking-wider text-paper-foreground">
          Procurado(a)
        </h1>
        <div className="mt-1 text-xs uppercase tracking-[0.4em] text-stamp-red">
          ◆ recompensa autorizada ◆
        </div>

        <div className="mx-auto mt-5 flex h-44 w-36 items-center justify-center border-2 border-paper-foreground/80 bg-paper-foreground/[0.04] text-[10px] uppercase tracking-widest text-paper-muted">
          retrato<br />redigido
        </div>

        <div className="mt-4 font-display text-3xl font-bold uppercase tracking-wider text-paper-foreground">
          {fm.holder_name ?? fm.title}
        </div>
        {fm.alias && (
          <div className="text-xs uppercase tracking-[0.3em] text-paper-muted">
            também conhecido(a) como “{fm.alias}”
          </div>
        )}

        <div className="mt-5 inline-block border-2 border-paper-foreground/70 px-6 py-2">
          <div className="text-[9px] uppercase tracking-[0.3em] text-paper-muted">
            recompensa
          </div>
          <div className="font-display text-2xl font-black uppercase tracking-wider text-paper-foreground">
            {fm.bounty_amount ?? "—"}
          </div>
        </div>

        {fm.crimes && fm.crimes.length > 0 && (
          <div className="mt-5 text-left">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-paper-muted">
              imputações
            </div>
            <ul className="mt-1 list-disc pl-5 text-sm text-paper-foreground">
              {fm.crimes.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </div>

      {fm.contact && (
        <div className="mt-6 border-t border-paper-foreground/40 pt-3 text-center text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          informe :: {fm.contact}
        </div>
      )}
    </PaperSheet>
  );
}