"use client";

import { useState } from "react";
import { FileText, ExternalLink, X } from "lucide-react";
import { useIndividualsContext } from "@/components/government/contexts/individual-contenxt";
import { DocumentViewer } from "@/components/document-viewer";
import { generateIndividualDocuments } from "@/data/document-generators";
import { individuals } from "@/data/individuals";

interface DocumentPreviewProps {
  individualId: string;
  documentId: string;
  children: React.ReactNode;
  triggerAsIcon?: boolean;
}

export function DocumentPreview({
  individualId,
  documentId,
  children,
  triggerAsIcon = false,
}: DocumentPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { navigateToDocument } = useIndividualsContext();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleOpenFull = () => {
    setIsOpen(false);
    navigateToDocument(individualId, documentId);
  };

  // Find the document to preview
  const individual = individuals.find(
    (ind) => ind.name === individualId || ind.knownAs === individualId
  );
  const documents = individual
    ? generateIndividualDocuments(individualId, individuals)
    : [];
  const documentIndex =
    individual?.documents.findIndex((doc) => doc.id === documentId) ?? -1;
  const document = documents[documentIndex];

  if (!document || documentIndex === -1) {
    return (
      <span className="text-muted-foreground italic">
        [documento não encontrado]
      </span>
    );
  }

  return (
    <>
      {/* Trigger Button */}
      {triggerAsIcon ? (
        <button
          onClick={handleOpen}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          title="Visualizar documento"
        >
          <FileText className="h-3 w-3" />
        </button>
      ) : (
        <button
          onClick={handleOpen}
          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors underline decoration-dotted"
        >
          <FileText className="h-3 w-3" />
          {children}
        </button>
      )}

      {/* Floating Card Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative z-10 w-full max-w-4xl max-h-[85vh] bg-background border-2 border-foreground shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-foreground bg-muted/50">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="font-mono text-sm font-bold">
                  VISUALIZAÇÃO RÁPIDA
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
                title="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Document Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <DocumentViewer
                title={document.title}
                classification={document.classification}
                department={document.department}
                date={document.date}
                signedBy={document.signedBy}
                content={document.content}
              />
            </div>

            {/* Footer with action button */}
            <div className="flex items-center justify-end gap-3 p-4 border-t-2 border-foreground bg-muted/50">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 font-mono text-sm hover:bg-muted rounded transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={handleOpenFull}
                className="px-4 py-2 font-mono text-sm bg-foreground text-background hover:bg-foreground/90 rounded transition-colors inline-flex items-center gap-2"
              >
                Abrir Documento Completo
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
