"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ArchiveDocument, DocumentType } from "@/lib/archive/documents";
import { DOCUMENT_TYPE_LABEL } from "@/lib/archive/documents";
import { RenderMdx } from "../general-components/mdx/render-mdx";
import { PaperSheet } from "../general-components/paper/paper-sheet";
import { ClassificationBar } from "../general-components/stamps/classification-bar";
import { DossierFolder, CLASSIFICATION_STAMP_MAP } from "../general-components/ui/dossier-folder";
import { cn } from "@/lib/utils";
import { BatchStackViewer } from "./batch-stack-viewer";
import { parseLumenDate, formatDate } from "@/lib/in-universe-rules/calendar";

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      <AnimatePresence>
        {!opened && (
          <div className="-mx-6 w-[calc(100%+3rem)] max-w-5xl">
          <DossierFolder
            title={fm.title}
            caseId={fm.case_id ?? fm.reference}
            date={formatDate(parseLumenDate(fm.date, { fallbackEra: "N.E.C.", fallbackHemisphere: "S" }), "official-abbr")}
            classification={CLASSIFICATION_STAMP_MAP[fm.classification] ?? "CLASSIFIED"}
            animation="flip3d"
            aspect="16:9"
            surface="paper"
            layout="default"
            trigger="click"
            showBarcode
            showHud
            dismissible={true}
            onOpenChange={(next) => { setOpened(next); if (!next) setActiveIndex(null); }}
          />
          </div>
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
            <BatchStackViewer
              items={items}
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
            >
              {/* ÍNDICE */}
              <PaperSheet>
                <section>
                  <ClassificationBar fm={fm} />

                  <div className="mt-8 text-center">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
                      {fm.issued_by}
                    </div>
                    <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-wider text-paper-foreground">
                      {fm.title}
                    </h1>
                    <div className="mt-2 text-xs uppercase tracking-widest text-paper-muted">
                      arquivo · {fm.case_id ?? fm.reference ?? "—"} · {formatDate(parseLumenDate(fm.date, { fallbackEra: "N.E.C.", fallbackHemisphere: "S" }), "official-abbr")}
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
                              <button
                                onClick={() => setActiveIndex(idx)}
                                className="batch-row group"
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
                                <span className="batch-row-date">{formatDate(parseLumenDate(fmt!.date, { fallbackEra: "N.E.C.", fallbackHemisphere: "S" }), "official-abbr")}</span>
                                <span className="batch-row-chev">›</span>
                              </button>
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
            </BatchStackViewer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
