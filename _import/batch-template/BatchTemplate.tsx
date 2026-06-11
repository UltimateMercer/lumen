"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ArchiveDocument, DocumentType } from "../lib/documents";
import { getBatchItems } from "../lib/registry";
import { DOCUMENT_TYPE_LABEL } from "../lib/documents";
import { RenderMdx } from "../lib/mdx-components";
import { ClassificationBar, PaperSheet } from "../components/DocumentHeader";
import { Folder } from "../components/batch/Folder";
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

const HASH_KEY = "peca";

function readHashSlug(): string | null {
  if (typeof window === "undefined") return null;
  const m = window.location.hash.match(new RegExp(`${HASH_KEY}=([^&]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export function BatchTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  const items = useMemo(() => getBatchItems(fm), [fm]);
  const [opened, setOpened] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const pieceRef = useRef<HTMLDivElement>(null);

  // sync from hash on mount + popstate
  useEffect(() => {
    const sync = () => {
      const slug = readHashSlug();
      if (slug && items.some((it) => it.slug === slug && it.doc)) {
        setActiveSlug(slug);
      } else {
        setActiveSlug(null);
      }
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [items]);

  // ESC fecha peça
  useEffect(() => {
    if (!activeSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeItem();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug]);

  const openItem = useCallback((slug: string) => {
    setActiveSlug((prev) => {
      const url = `${window.location.pathname}#${HASH_KEY}=${encodeURIComponent(slug)}`;
      if (prev === null) {
        window.history.pushState(null, "", url);
      } else {
        window.history.replaceState(null, "", url);
      }
      requestAnimationFrame(() => {
        pieceRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
      return slug;
    });
  }, []);

  const closeItem = useCallback(() => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", window.location.pathname);
    }
    setActiveSlug(null);
  }, []);

  const activeIndex = activeSlug
    ? items.findIndex((i) => i.slug === activeSlug)
    : -1;
  const activeItem = activeIndex >= 0 ? items[activeIndex] : null;
  const prevItem =
    activeIndex > 0
      ? (items
          .slice(0, activeIndex)
          .reverse()
          .find((i) => i.doc) ?? null)
      : null;
  const nextItem =
    activeIndex >= 0
      ? (items.slice(activeIndex + 1).find((i) => i.doc) ?? null)
      : null;

  return (
    <div className="relative">
      {!opened && (
        <Folder
          caseId={fm.case_id ?? fm.reference}
          title={fm.title}
          classification={fm.classification}
          sealColor={fm.seal_color ?? "red"}
          storageKey={`batch:${fm.slug}`}
          onOpened={() => setOpened(true)}
        />
      )}

      <div
        className={cn(
          "transition-opacity duration-500",
          opened
            ? "opacity-100"
            : "pointer-events-none absolute inset-0 opacity-0",
        )}
      >
        <div className="relative">
          {/* CAPA (índice) */}
          <div
            className={cn(activeSlug && "hidden")}
            aria-hidden={!!activeSlug}
          >
            <PaperSheet>
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
                                peça expurgada · slug “{it.slug}”
                              </span>
                            </span>
                            <span className="batch-row-date">—</span>
                            <span className="batch-row-chev opacity-30">×</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openItem(it.slug)}
                            className="batch-row batch-row--btn group"
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
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>

              {fm.editor_notes && (
                <div className="mt-10 border-t border-paper-foreground/40 pt-6">
                  <h2 className="mb-2 font-display text-xs font-bold uppercase tracking-[0.3em] text-paper-muted">
                    ◆ notas do investigador
                  </h2>
                  <div className="text-paper-foreground">
                    <RenderMdx source={doc.mdxSource} />
                  </div>
                </div>
              )}
            </PaperSheet>
          </div>

          {/* PEÇA ATIVA — empilhada sobre a capa */}
          {activeItem?.doc && (
            <div
              ref={pieceRef}
              className="paper-stack-piece relative"
              role="dialog"
              aria-modal="false"
              aria-label={`Peça ${activeIndex + 1} de ${items.length}: ${activeItem.doc.frontmatter.title}`}
            >
              <BatchPieceChrome
                current={activeIndex + 1}
                total={items.length}
                caseId={fm.case_id ?? fm.reference ?? fm.slug}
                title={activeItem.doc.frontmatter.title}
                onBack={closeItem}
                onPrev={prevItem ? () => openItem(prevItem.slug) : undefined}
                onNext={nextItem ? () => openItem(nextItem.slug) : undefined}
                prevTitle={prevItem?.doc?.frontmatter.title}
                nextTitle={nextItem?.doc?.frontmatter.title}
              />
              <div className="mt-3">
                {(() => {
                  const Template = TEMPLATES[activeItem.doc.frontmatter.type];
                  return (
                    <div className="paper-stack-bed">
                      <Template doc={activeItem.doc} />
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BatchPieceChrome({
  current,
  total,
  caseId,
  title,
  onBack,
  onPrev,
  onNext,
  prevTitle,
  nextTitle,
}: {
  current: number;
  total: number;
  caseId: string;
  title: string;
  onBack: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  prevTitle?: string;
  nextTitle?: string;
}) {
  return (
    <div className="sticky top-2 z-10 mb-2 flex flex-wrap items-center justify-between gap-2 border border-border bg-card/95 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground shadow-[0_8px_24px_-12px_oklch(0_0_0/0.5)] backdrop-blur">
      <button
        type="button"
        onClick={onBack}
        className="border border-amber-crt/60 px-3 py-1 font-bold text-amber-crt transition-colors hover:bg-amber-crt hover:text-primary-foreground"
        aria-keyshortcuts="Escape"
      >
        ← voltar ao índice
      </button>
      <div className="flex items-center gap-2 truncate">
        <span>◆ arquivo · {caseId}</span>
        <span className="opacity-50">›</span>
        <span className="text-foreground">
          peça {String(current).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
        <span className="opacity-50">·</span>
        <span className="truncate normal-case tracking-normal text-foreground/80">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPrev}
          disabled={!onPrev}
          title={prevTitle}
          className="border border-border px-2 py-1 hover:border-amber-crt hover:text-amber-crt disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
        >
          ‹ ant
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!onNext}
          title={nextTitle}
          className="border border-border px-2 py-1 hover:border-amber-crt hover:text-amber-crt disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
        >
          próx ›
        </button>
      </div>
    </div>
  );
}
