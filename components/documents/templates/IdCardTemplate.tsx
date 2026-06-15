"use client";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { RenderMdx } from "../general-components/mdx/RenderMdx";
import { PaperSheet } from "../general-components/paper/PaperSheet";
import { ClassificationBar } from "../general-components/stamps/ClassificationBar";

export function IdCardTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />

      {/* CARTEIRA — frente */}
      <div className="mt-8 border-2 border-paper-foreground/80 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
             style={{
               backgroundImage:
                 "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 6px), repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 6px)",
             }}
        />
        <div className="relative flex items-center justify-between border-b-2 border-paper-foreground/70 bg-paper-foreground text-paper px-3 py-1.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
            República Autônoma de Nova-Aurélia
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Identidade Civil · Mod. C-7
          </span>
        </div>
        <div className="relative grid grid-cols-[140px_1fr] gap-4 p-4">
          <div className="flex flex-col items-center">
            <div className="flex h-40 w-32 items-center justify-center border-2 border-paper-foreground/70 bg-paper-foreground/[0.04] text-[10px] uppercase tracking-widest text-paper-muted text-center">
              {fm.photo_status ?? "foto\nredigida"}
            </div>
            <div className="mt-2 text-[9px] uppercase tracking-[0.2em] text-paper-muted text-center">
              biom :: {fm.biometric_hash ?? "—"}
            </div>
          </div>
          <div className="space-y-1.5 text-sm">
            <IdField label="Nome" value={fm.holder_name ?? "—"} mono />
            <IdField label="Reg. Cívico" value={fm.holder_id ?? "—"} mono />
            <IdField label="Classe" value={fm.civic_class ?? "—"} />
            <IdField label="Lealdade" value={fm.loyalty_tier ?? "—"} />
            <IdField label="Emitida" value={fm.issued_on ?? fm.date} />
            <IdField label="Validade" value={fm.valid_until ?? "—"} />
            {fm.restrictions && fm.restrictions.length > 0 && (
              <div className="pt-1">
                <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-paper-muted">
                  restrições
                </div>
                <ul className="mt-0.5 list-disc pl-4 text-[11px] uppercase tracking-wider text-paper-foreground">
                  {fm.restrictions.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="relative border-t border-paper-foreground/40 px-3 py-1.5 text-[9px] uppercase tracking-[0.3em] text-paper-muted flex justify-between">
          <span>Documento sob tutela do Ministério da Continuidade</span>
          <span>{fm.reference ?? "—"}</span>
        </div>
      </div>

      {/* Verso / observações */}
      <div className="mt-6 text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </div>
    </PaperSheet>
  );
}

function IdField({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="grid grid-cols-[100px_1fr] items-baseline gap-2 border-b border-dotted border-paper-foreground/30 pb-0.5">
      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-paper-muted">
        {label}
      </span>
      <span className={`text-paper-foreground ${mono ? "font-mono text-xs" : "text-sm font-bold uppercase tracking-wider"}`}>
        {value}
      </span>
    </div>
  );
}