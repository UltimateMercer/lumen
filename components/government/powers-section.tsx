"use client";

import { useState, useRef, useCallback } from "react";
import { FileLoading } from "@/components/file-loading";
import { DocumentNavigator } from "@/components/document-navigator";
import { FolderOpen, Folder } from "lucide-react";
import { generatePowerDocuments } from "@/data/power-generators";
import { powers } from "@/data/powers";

interface PowersSectionProps {
  onCloseMobileSidebar?: () => void;
}

export function PowersSection({ onCloseMobileSidebar }: PowersSectionProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedPower, setSelectedPower] = useState<string | null>(null);
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

  const handlePowerDocumentClick = (powerName: string, docId: string) => {
    console.log("[v0] Clicking individual document:", powerName, docId);

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    const newFileName = `${powerName}-${docId}`;
    console.log("[v0] Setting file to:", newFileName);

    setSelectedFile(newFileName);
    setSelectedPower(powerName);
    setIsLoadingFile(true);

    onCloseMobileSidebar?.();
  };

  const renderSidebar = () => {
    return (
      <div className="space-y-1">
        <div className="text-xs font-bold text-muted-foreground mb-2 px-2">
          PODERES:
        </div>
        {powers.map((power) => (
          <div key={power.name}>
            <button
              onClick={() => toggleExpanded(power.name)}
              className="w-full text-left px-2 py-2 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors flex items-center justify-between"
            >
              <span className="truncate uppercase">{power.name}</span>
              {expandedItems.has(power.name) ? (
                <FolderOpen className="w-4 h-4 shrink-0" />
              ) : (
                <Folder className="w-4 h-4 shrink-0" />
              )}
            </button>
            {expandedItems.has(power.name) && (
              <div className="ml-4 space-y-1 mt-1">
                {power.documents.map((doc: any) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      console.log(
                        "[v0] Document clicked:",
                        doc.name,
                        doc.id,
                        power.name
                      );
                      handlePowerDocumentClick(power.name, doc.id);
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

    if (selectedPower && selectedFile) {
      console.log(
        "[v0] Rendering DocumentNavigator for:",
        selectedPower,
        selectedFile
      );

      const documentId = selectedFile.replace(`${selectedPower}-`, "");
      const power = powers.find((pow) => pow.name === selectedPower);
      const initialIndex =
        power?.documents.findIndex((doc: any) => doc.id === documentId) ?? 0;

      console.log(
        "[v0] Document ID:",
        documentId,
        "Initial Index:",
        initialIndex
      );

      return (
        <DocumentNavigator
          documents={generatePowerDocuments(selectedPower, powers)}
          initialIndex={initialIndex}
          onBack={() => {
            setSelectedFile(null);
            setSelectedPower(null);
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
            Escolha um poder na barra lateral para visualizar seus documentos
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
