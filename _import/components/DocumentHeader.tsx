"use client";
import type { DocumentFrontmatter } from "../lib/documents";
import { CLASSIFICATION_TOKEN, DOCUMENT_TYPE_LABEL } from "../lib/documents";
import { cn } from "@/lib/utils";

export function ClassificationBar({ fm }: { fm: DocumentFrontmatter }) {
  const tone = CLASSIFICATION_TOKEN[fm.classification];
  return (
    <div className={cn("flex items-center justify-between border-y-2 border-current px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em]", tone)}>
      <span>◆ {fm.classification}</span>
      <span>{DOCUMENT_TYPE_LABEL[fm.type]}</span>
      <span>◆ {fm.classification}</span>
    </div>
  );
}

export function PaperSheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="paper-texture relative mx-auto max-w-3xl border border-paper-muted/40 p-10 shadow-[0_24px_64px_-32px_oklch(0_0_0/0.6)] md:p-14">
      {children}
    </div>
  );
}
