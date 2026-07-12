"use client";

import type React from "react";
import { PaperSheet } from "@/components/documents/general-components/paper/paper-sheet";
import { DigitalSignature } from "@/components/documents/general-components/signatures/digital-signature";
import { CLASSIFICATION_TOKEN } from "@/lib/archive/documents";
import type { Classification } from "@/lib/archive/documents";
import { parseLumenDate, formatDate } from "@/lib/in-universe-rules/calendar";
import { cn } from "@/lib/utils";

interface DocumentViewerProps {
  title: string;
  classification?: string;
  department: string;
  content: React.ReactNode;
  signedBy?: string;
  date: string;
}

export function DocumentViewer({
  title,
  classification,
  department,
  content,
  signedBy,
  date,
}: DocumentViewerProps) {
  return (
    <PaperSheet>
      {classification && (
        <div
          className={cn(
            "flex items-center justify-between border-y-2 border-current px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em]",
            CLASSIFICATION_TOKEN[classification as Classification] ?? "",
          )}
        >
          <span>◆ {classification}</span>
          <span>◆ {classification}</span>
        </div>
      )}

      <div className="mt-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          {department}
        </div>
        <h1 className="mt-1 font-display text-2xl font-bold uppercase tracking-wider text-paper-foreground">
          {title}
        </h1>
        <div className="mt-2 text-xs uppercase tracking-wider text-paper-muted">
          {formatDate(parseLumenDate(date, { fallbackEra: "N.E.C.", fallbackHemisphere: "S" }), "official-abbr")}
        </div>
      </div>

      <hr className="my-5 border-paper-foreground/30" />

      <div className="text-paper-foreground">{content}</div>

      {signedBy && (
        <div className="mt-8">
          <DigitalSignature name={signedBy} registry="—" timestamp={date} />
        </div>
      )}
    </PaperSheet>
  );
}
