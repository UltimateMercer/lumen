"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ArchiveDocument, DocumentType } from "@/lib/archive/documents";
import { DOCUMENT_TYPE_LABEL } from "@/lib/archive/documents";
import { RenderMdx } from "../general-components/mdx/render-mdx";
import { PaperSheet } from "../general-components/paper/paper-sheet";
import { ClassificationBar } from "../general-components/stamps/classification-bar";
import { DossierFolder, CLASSIFICATION_STAMP_MAP } from "../general-components/ui/dossier-folder";
import { TEMPLATES } from "../index";
import { cn } from "@/lib/utils";

const TYPE_ACCENT: Partial<Record<DocumentType, string>> = {
  decree: "bg-stamp-red",
  memo: "bg-amber-crt",
  incident: "bg-stamp-red",
  forensic: "bg-cyan-crt",
  autopsy: "bg-cyan-crt",
  interrogation: "bg-amber-crt",
  ai_log: "bg-cyan-crt",
  news: "bg-paper-foreground",
  bulletin: "bg-stamp-red",
  transmission: "bg-cyan-crt",
  bounty: "bg-stamp-red",
  manifesto: "bg-stamp-red",
  broadcast: "bg-amber-crt",
  order: "bg-stamp-red",
  dossier: "bg-amber-crt",
  id_card: "bg-cyan-crt",
  foreign_letter: "bg-amber-crt",
  batch: "bg-stamp-red",
  propaganda: "bg-stamp-red",
  monitored_thread: "bg-cyan-crt",
  codex_entry: "bg-stamp-red",
  medical_record: "bg-cyan-crt",
  classified_project: "bg-stamp-red",
};

export function BatchTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  const items =
    (
      doc as ArchiveDocument & {
        batchItems?: Array<{
          slug: string;
          role?: string;
          note?: string;
          doc?: ArchiveDocument;
        }>;
      }
    ).batchItems ?? [];
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence>
        {!opened && (
          <DossierFolder
            title={fm.title}
            caseId={fm.case_id ?? fm.reference}
            date={fm.date}
            classification={CLASSIFICATION_STAMP_MAP[fm.classification] ?? "CLASSIFIED"}
            animation="flip3d"
            aspect="16:9"
            surface="paper"
            layout="default"
            trigger="click"
            showBarcode
            showHud
            dismissible={false}
            onOpenChange={(isOpen) => { if (isOpen) setOpened(true); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            key="batch-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
        {/* ÍNDICE */}
        <PaperSheet>
          <section id="indice">
            <ClassificationBar fm={fm} />

            <div className="mt-8 text-center">
              <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
                {fm.issued_by}
              </div>
              <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-wider text-paper-foreground">
                {fm.title}
              </h1>
              <div className="mt-2 text-xs uppercase tracking-widest text-paper-muted">
                arquivo · {fm.case_id ?? fm.reference ?? "—"} · {fm.date}
              </div>
            </div>

            {fm.cover_note && (
              <div className="mt-6 border-y border-dashed border-paper-foreground/40 py-3 text-center text-xs italic text-paper-muted">
                {fm.cover_note}
              </div>
            )}

            <div className="mt-8">
              <div className="mb-3 flex items-baseline justify-between border-b border-paper-foreground/40 pb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-paper-muted">
                <span>◆ índice de peças</span>
                <span>{items.length} item(s)</span>
              </div>
              <ol className="batch-index space-y-2">
                {items.map((it, idx) => {
                  const missing = !it.doc;
                  const fmt = it.doc?.frontmatter;
                  const accent = fmt
                    ? (TYPE_ACCENT[fmt.type] ?? "bg-paper-foreground")
                    : "bg-paper-muted";
                  return (
                    <li
                      key={it.slug}
                      className="batch-index-row"
                      style={{ animationDelay: `${0.04 * idx}s` }}
                    >
                      {missing ? (
                        <div className="batch-row batch-row--missing">
                          <span
                            className="batch-row-accent bg-paper-muted/40"
                            aria-hidden
                          />
                          <span className="batch-row-num">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="batch-row-main">
                            <span className="batch-row-type">[ausente]</span>
                            <span className="batch-row-title">
                              peça expurgada · slug "{it.slug}"
                            </span>
                          </span>
                          <span className="batch-row-date">—</span>
                          <span className="batch-row-chev opacity-60">×</span>
                        </div>
                      ) : (
                        <a
                          href={`#peca-${it.slug}`}
                          className="batch-row batch-row--link group"
                          aria-label={`Abrir peça ${idx + 1}: ${fmt!.title}`}
                        >
                          <span
                            className={cn("batch-row-accent", accent)}
                            aria-hidden
                          />
                          <span className="batch-row-num">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="batch-row-main">
                            <span className="batch-row-type">
                              {DOCUMENT_TYPE_LABEL[fmt!.type]}
                            </span>
                            <span className="batch-row-title">
                              {fmt!.title}
                            </span>
                            {it.role && (
                              <span className="batch-row-role">
                                — {it.role}
                              </span>
                            )}
                          </span>
                          <span className="batch-row-date">{fmt!.date}</span>
                          <span className="batch-row-chev">›</span>
                        </a>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="text-paper-foreground">
              <RenderMdx source={doc.mdxSource} />
            </div>
          </section>
        </PaperSheet>

        {/* PEÇAS — todas renderizadas em sequência */}
        {items.map((it, idx) => {
          if (!it.doc) return null;
          const Template = TEMPLATES[it.doc.frontmatter.type];
          return (
            <div
              key={it.slug}
              id={`peca-${it.slug}`}
              className="relative scroll-mt-6"
            >
              {/* Cabeçalho da peça */}
              <div className="sticky top-2 z-10 mb-2 flex flex-wrap items-center justify-between gap-2 border border-border bg-card/95 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground shadow-[0_8px_24px_-12px_oklch(0_0_0/0.5)] backdrop-blur">
                <a
                  href="#indice"
                  className="border border-amber-crt/60 px-3 py-1 font-bold text-amber-crt transition-colors hover:bg-amber-crt hover:text-primary-foreground"
                >
                  ↑ Índice
                </a>
                <div className="flex items-center gap-2 truncate">
                  <span>
                    ◆ arquivo · {fm.case_id ?? fm.reference ?? fm.slug}
                  </span>
                  <span className="opacity-70">›</span>
                  <span className="text-foreground">
                    peça {String(idx + 1).padStart(2, "0")} /{" "}
                    {String(items.length).padStart(2, "0")}
                  </span>
                  <span className="opacity-70">·</span>
                  <span className="truncate normal-case tracking-normal text-foreground/80">
                    {it.doc.frontmatter.title}
                  </span>
                </div>
              </div>
              <div className="paper-stack-bed">
                <Template doc={it.doc} />
              </div>
            </div>
          );
        })}
      </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}
