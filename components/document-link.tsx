"use client";

import { FileText } from "lucide-react";
import { useIndividualsContext } from "@/components/government/contexts/individual-contenxt";

interface DocumentLinkProps {
  individualId: string;
  documentId: string;
  children: React.ReactNode;
}

export function DocumentLink({
  individualId,
  documentId,
  children,
}: DocumentLinkProps) {
  const { navigateToDocument } = useIndividualsContext();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToDocument(individualId, documentId);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline decoration-blue-400/50 hover:decoration-blue-300 transition-colors"
    >
      <FileText className="w-3.5 h-3.5" />
      <span>{children}</span>
    </button>
  );
}
