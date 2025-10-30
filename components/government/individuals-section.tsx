"use client";

import { useState, useRef, useCallback } from "react";
import { FileLoading } from "@/components/file-loading";
import { DocumentNavigator } from "@/components/document-navigator";
import { FolderOpen, Folder } from "lucide-react";
import { individuals } from "@/data/individuals";
import { generateIndividualDocuments } from "@/data/document-generators";

interface IndividualsSectionProps {
  onCloseMobileSidebar?: () => void;
}

export function IndividualsSection({
  onCloseMobileSidebar,
}: IndividualsSectionProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedIndividual, setSelectedIndividual] = useState<string | null>(
    null
  );
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const handleLoadingComplete = useCallback(() => {
    console.log("[v0] Loading complete, hiding loading screen");
    setIsLoadingFile(false);
  }, []);

  const handleIndividualDocumentClick = (
    individualName: string,
    docId: string
  ) => {
    console.log("[v0] Clicking individual document:", individualName, docId);

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    const newFileName = `${individualName}-${docId}`;
    console.log("[v0] Setting file to:", newFileName);

    setSelectedFile(newFileName);
    setSelectedIndividual(individualName);
    setIsLoadingFile(true);

    onCloseMobileSidebar?.();
  };

  const renderSidebar = () => {
    return (
      <div className="space-y-1">
        <div className="text-xs font-bold text-muted-foreground mb-2 px-2">
          INDIVÍDUOS:
        </div>
        {individuals.map((individual) => (
          <div key={individual.knownAs ? individual.knownAs : individual.name}>
            <button
              onClick={() =>
                toggleExpanded(
                  individual.knownAs ? individual.knownAs : individual.name
                )
              }
              className="w-full text-left px-2 py-2 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors flex items-center justify-between"
            >
              <span className="truncate uppercase">
                {individual.knownAs ? individual.knownAs : individual.name}
              </span>
              {expandedItems.has(
                individual.knownAs ? individual.knownAs : individual.name
              ) ? (
                <FolderOpen className="w-4 h-4 shrink-0" />
              ) : (
                <Folder className="w-4 h-4 shrink-0" />
              )}
            </button>
            {expandedItems.has(
              individual.knownAs ? individual.knownAs : individual.name
            ) && (
              <div className="ml-4 space-y-1 mt-1">
                {individual.documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      console.log(
                        "[v0] Document clicked:",
                        doc.name,
                        doc.id,
                        individual.knownAs
                          ? individual.knownAs
                          : individual.name
                      );
                      handleIndividualDocumentClick(
                        individual.knownAs
                          ? individual.knownAs
                          : individual.name,
                        doc.id
                      );
                    }}
                    className="w-full text-left px-2 py-1.5 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors flex items-center gap-2 uppercase"
                  >
                    → {doc.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (isLoadingFile) {
      console.log("[v0] Rendering FileLoading for:", selectedFile);
      return (
        <FileLoading
          key={selectedFile}
          fileName={selectedFile || ""}
          onComplete={handleLoadingComplete}
        />
      );
    }

    if (selectedIndividual && selectedFile) {
      console.log(
        "[v0] Rendering DocumentNavigator for:",
        selectedIndividual,
        selectedFile
      );

      const documentId = selectedFile.replace(`${selectedIndividual}-`, "");
      const individual = individuals.find(
        (ind) => (ind.knownAs || ind.name) === selectedIndividual
      );
      const initialIndex =
        individual?.documents.findIndex((doc) => doc.id === documentId) ?? 0;

      console.log(
        "[v0] Document ID:",
        documentId,
        "Initial Index:",
        initialIndex
      );

      return (
        <DocumentNavigator
          documents={generateIndividualDocuments(
            selectedIndividual,
            individuals
          )}
          initialIndex={initialIndex}
          onBack={() => {
            setSelectedFile(null);
            setSelectedIndividual(null);
          }}
        />
      );
    }

    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="text-6xl">📁</div>
          <div className="text-xl font-bold text-foreground">
            SELECIONE UM ARQUIVO
          </div>
          <div className="text-sm text-muted-foreground">
            Escolha um indivíduo na barra lateral para visualizar seus
            documentos
          </div>
        </div>
      </div>
    );
  };

  return {
    sidebar: renderSidebar(),
    content: renderContent(),
  };
}
