"use client";
import type { ArchiveDocument, DocumentFrontmatter } from "../lib/documents";
import { RenderMdx } from "../lib/mdx-components";

function PropagandaMotif({
  motif = "star",
  size = 180,
}: {
  motif?: DocumentFrontmatter["motif"];
  size?: number;
}) {
  const stroke = "currentColor";
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke={stroke}
      strokeWidth={2.2}
      aria-hidden
      className="text-stamp-red"
    >
      <circle cx="50" cy="50" r="46" />
      <circle cx="50" cy="50" r="40" strokeDasharray="2 3" />
      {motif === "fist" && (
        <g fill="currentColor" stroke="none">
          <path d="M30 56 L30 76 L70 76 L70 56 Z" />
          <path d="M32 56 L32 42 Q32 38 36 38 Q40 38 40 42 L40 56 Z" />
          <path d="M42 56 L42 36 Q42 32 46 32 Q50 32 50 36 L50 56 Z" />
          <path d="M52 56 L52 38 Q52 34 56 34 Q60 34 60 38 L60 56 Z" />
          <path d="M62 56 L62 42 Q62 38 66 38 Q70 38 70 42 L70 56 Z" />
          <path d="M28 56 L28 50 Q28 44 24 44 Q20 44 22 50 L26 60 Z" />
        </g>
      )}
      {motif === "eye" && (
        <>
          <path d="M14 50 Q50 18 86 50 Q50 82 14 50 Z" />
          <circle cx="50" cy="50" r="14" />
          <circle cx="50" cy="50" r="6" fill="currentColor" />
          <path d="M50 22 L50 30 M50 70 L50 78 M22 50 L30 50 M70 50 L78 50" />
        </>
      )}
      {motif === "gear" && (
        <>
          <circle cx="50" cy="50" r="22" />
          <circle cx="50" cy="50" r="8" fill="currentColor" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            const x1 = 50 + Math.cos(a) * 24;
            const y1 = 50 + Math.sin(a) * 24;
            const x2 = 50 + Math.cos(a) * 36;
            const y2 = 50 + Math.sin(a) * 36;
            return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} strokeWidth={6} />;
          })}
        </>
      )}
      {motif === "star" && (
        <g fill="currentColor" stroke="none">
          <path d="M50 18 L58 42 L84 42 L63 57 L71 81 L50 66 L29 81 L37 57 L16 42 L42 42 Z" />
        </g>
      )}
    </svg>
  );
}

export function PropagandaTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <div className="paper-propaganda relative mx-auto max-w-3xl border-2 border-paper-foreground p-8 shadow-[0_30px_60px_-30px_oklch(0_0_0/0.7)] md:p-12">
      {/* corners */}
      <span className="propaganda-corner propaganda-corner--tl">◆</span>
      <span className="propaganda-corner propaganda-corner--tr">◆</span>
      <span className="propaganda-corner propaganda-corner--bl">◆</span>
      <span className="propaganda-corner propaganda-corner--br">◆</span>

      <div className="relative flex flex-col items-center text-center">
        <div className="border-y-4 border-double border-paper-foreground px-4 py-1 text-[10px] font-bold uppercase tracking-[0.4em] text-paper-foreground">
          {fm.issued_by} · campanha {fm.campaign_code ?? "—"}
        </div>

        <div className="mt-6">
          <PropagandaMotif motif={fm.motif ?? "star"} size={200} />
        </div>

        <h1 className="propaganda-slogan mt-6 font-display font-black uppercase leading-[0.9] text-paper-foreground">
          {fm.slogan ?? fm.title}
        </h1>

        {fm.subtitle && (
          <div className="mt-4 max-w-xl font-display text-base font-bold uppercase tracking-[0.2em] text-stamp-red">
            {fm.subtitle}
          </div>
        )}

        <div className="mt-8 h-[2px] w-2/3 bg-paper-foreground" />

        <div className="propaganda-body mt-6 max-w-xl text-paper-foreground">
          <RenderMdx source={doc.mdxSource} />
        </div>

        <footer className="mt-12 grid w-full grid-cols-3 items-end gap-4 border-t-2 border-paper-foreground pt-4 text-[10px] uppercase tracking-[0.3em] text-paper-foreground/80">
          <div className="text-left">
            tiragem ⋆ {fm.reference ?? "s/n"}
          </div>
          <div className="text-center font-bold">
            A.R. {fm.poster_year ?? fm.date}
          </div>
          <div className="text-right">
            impresso por {fm.printer ?? "Of. Gráfica Estatal"}
          </div>
        </footer>
      </div>
    </div>
  );
}