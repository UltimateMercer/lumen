"use client";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { RenderMdx } from "../general-components/mdx/render-mdx";
import { DOCUMENT_TYPE_LABEL } from "@/lib/archive/documents";

export function AiLogTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <div className="mx-auto max-w-3xl border border-cyan-crt/40 bg-chrome p-8 scanlines">
      <div className="flex items-center justify-between border-b border-cyan-crt/30 pb-3 text-[10px] uppercase tracking-[0.3em] text-cyan-crt">
        <span>{DOCUMENT_TYPE_LABEL[fm.type]}</span>
        <span>fonte: {fm.log_source ?? "IA/INC-0414"}</span>
        <span>{fm.classification}</span>
      </div>
      <div className="mt-6 text-cyan-crt crt-glow">
        <div className="text-xs uppercase tracking-widest opacity-80">
          {fm.date}
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider">
          &gt;&gt;&gt; {fm.title}
        </h1>
        {fm.reference && (
          <div className="mt-1 text-xs uppercase tracking-widest opacity-80">
            ref. {fm.reference}
          </div>
        )}
      </div>
      <div className="mt-6 text-cyan-crt">
        <RenderMdx source={doc.mdxSource} />
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-cyan-crt/30 pt-3 text-[10px] uppercase tracking-[0.3em] text-cyan-crt/70">
        <span>[ máquina · sem assinatura humana ]</span>
        <span className="blink-caret">eof</span>
      </div>
    </div>
  );
}