"use client";
import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { TEMPLATES } from "../index";

interface BatchItem {
  slug: string;
  role?: string;
  note?: string;
  doc?: ArchiveDocument;
}

interface BatchStackViewerProps {
  items: BatchItem[];
  activeIndex: number | null;
  onActiveIndexChange: (index: number | null) => void;
  children?: React.ReactNode;
}

const BTN =
  "rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors";
const BTN_DISABLED =
  "rounded-xs border dark:border-[#eaeaea]/30 border-[#252525]/30 bg-transparent px-3 py-1.5 text-xs font-mono text-muted-foreground opacity-30 cursor-not-allowed";
const LABEL_CLASS = "text-xs font-mono text-muted-foreground";
const TRANSITION = { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

export function BatchStackViewer({
  items,
  activeIndex,
  onActiveIndexChange,
  children,
}: BatchStackViewerProps) {
  const dir = useRef(1);
  const reduceMotion = useReducedMotion();

  const showNav = activeIndex !== null;
  const d = dir.current;

  const goNext = () => {
    if (activeIndex === null || activeIndex >= items.length - 1) return;
    dir.current = 1;
    onActiveIndexChange(activeIndex + 1);
  };

  const goPrev = () => {
    if (activeIndex === null || activeIndex <= 0) return;
    dir.current = -1;
    onActiveIndexChange(activeIndex - 1);
  };

  const goToNull = () => {
    dir.current = -1;
    onActiveIndexChange(null);
  };

  const handleItemClick = (idx: number) => {
    dir.current = idx > (activeIndex ?? -1) ? 1 : -1;
    onActiveIndexChange(idx);
  };

  const anim = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, x: d * 60, rotate: d * 2 },
        animate: { opacity: 1, x: 0, rotate: 0 },
        exit: { opacity: 0, x: d * -60, rotate: d * -2 },
      };

  return (
    <div>
      {showNav && (
        <div className="sticky top-2 z-10 -mx-6 mb-4 flex w-[calc(100%+3rem)] items-center justify-between rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-card/95 p-4 backdrop-blur shadow-[0_8px_24px_-12px_oklch(0_0_0/0.5)]">
          <button onClick={goToNull} className={BTN}>
            ↑ ÍNDICE
          </button>

          <div className="flex items-center gap-2 truncate">
            <span className={LABEL_CLASS}>
              PEÇA {String(activeIndex! + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-muted-foreground/60">·</span>
            <span className="truncate text-[10px] font-medium uppercase tracking-wider text-foreground/80">
              {items[activeIndex]?.doc?.frontmatter?.title}
            </span>
          </div>

          <div className="flex gap-2">
            {activeIndex! > 0 ? (
              <button onClick={goPrev} className={BTN}>
                ← ANTERIOR
              </button>
            ) : (
              <span className={BTN_DISABLED}>← ANTERIOR</span>
            )}
            {activeIndex! < items.length - 1 ? (
              <button onClick={goNext} className={BTN}>
                PRÓXIMO →
              </button>
            ) : (
              <span className={BTN_DISABLED}>PRÓXIMO →</span>
            )}
          </div>
        </div>
      )}

      <div className="relative">
        <AnimatePresence mode="wait">
          {activeIndex === null ? (
            <motion.div key="index" {...anim} transition={TRANSITION}>
              {children}
            </motion.div>
          ) : (
            <motion.div
              key={items[activeIndex].slug}
              {...anim}
              transition={TRANSITION}
            >
              {(() => {
                  const item = items[activeIndex];
                  if (!item.doc) return null;
                  const Template = TEMPLATES[item.doc.frontmatter.type];
                  if (!Template) return null;
                  return <Template doc={item.doc} />;
                })()}
            </motion.div>
          )}
        </AnimatePresence>

        {showNav && activeIndex! > 0 && (
          <div
            className="absolute -left-6 -right-6 -top-1 z-[-1] h-72 scale-[0.97] -rotate-1 overflow-hidden rounded-sm border border-border/60 bg-card/60 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]"
            aria-hidden
          />
        )}
        {showNav && activeIndex! < items.length - 1 && (
          <div
            className="absolute -left-4 -right-8 top-4 z-[-2] h-72 scale-[0.95] rotate-[1.1deg] overflow-hidden rounded-sm border border-border/40 bg-card/40 shadow-[0_8px_20px_-16px_rgba(0,0,0,0.3)]"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}
