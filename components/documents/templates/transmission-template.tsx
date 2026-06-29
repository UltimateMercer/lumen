"use client";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { RenderMdx } from "../general-components/mdx/render-mdx";
import { DOCUMENT_TYPE_LABEL } from "@/lib/archive/documents";

export function TransmissionTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <div className="mx-auto max-w-3xl border border-amber-crt/40 bg-chrome p-8 scanlines">
      <div className="flex items-center justify-between border-b border-amber-crt/30 pb-3 text-[10px] uppercase tracking-[0.3em] text-amber-crt">
        <span>{DOCUMENT_TYPE_LABEL[fm.type]}</span>
        <span>canal: {fm.channel ?? "desconhecido"}</span>
        <span>{fm.classification}</span>
      </div>

      <div className="mt-6 text-amber-crt crt-glow">
        <div className="text-xs uppercase tracking-widest opacity-80">
          interceptação :: {fm.intercepted_at ?? fm.date}
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider">
          {fm.title}
        </h1>
        {fm.reference && (
          <div className="mt-1 text-xs uppercase tracking-widest opacity-80">
            ref. {fm.reference}
          </div>
        )}
      </div>

      <div className="mt-8 text-amber-crt">
        <RenderMdx source={doc.mdxSource} />
      </div>

      <div className="mt-8 border-t border-amber-crt/30 pt-3 text-[10px] uppercase tracking-[0.3em] text-amber-crt/70">
        <span className="blink-caret">fim da transmissão</span>
      </div>
    </div>
  );
}
