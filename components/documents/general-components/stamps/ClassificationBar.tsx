"use client";
import type { DocumentFrontmatter } from "@/lib/archive/documents";
import { CLASSIFICATION_TOKEN, DOCUMENT_TYPE_LABEL } from "@/lib/archive/documents";
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
