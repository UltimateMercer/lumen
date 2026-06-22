"use client";

import { useState, useRef, useCallback } from "react";
import { FileLoading } from "@/components/file-loading";
import { DocumentNavigator } from "@/components/document-navigator";
import { FolderOpen, Folder } from "lucide-react";
import type { Entity } from "@/utils/government-data";
import { classified } from "@/data/classified";
import { generateEntityDocuments } from "@/data/document-generators";

interface ClassifiedSectionProps {
  onCloseMobileSidebar?: () => void;
}

const statusColors: Record<string, string> = {
  ATIVO: "text-green-600 dark:text-green-400",
  INATIVO: "text-gray-500 dark:text-gray-400",
  DESCLASSIFICADO: "text-blue-600 dark:text-blue-400",
};

export function ClassifiedSection({
  onCloseMobileSidebar,
}: ClassifiedSectionProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
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
    setIsLoadingFile(false);
  }, []);

  const handleEntityDocumentClick = (
    entityName: string,
    docId: string
  ) => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    const entity = classified.find((c) => c.name === entityName) ?? null;

    const newFileName = `${entityName}-${docId}`;

    setSelectedFile(newFileName);
    setSelectedEntity(entity);
    setIsLoadingFile(true);

    onCloseMobileSidebar?.();
  };

  const renderSidebar = () => {
    return (
      <div className="space-y-1">
        <div className="text-xs font-bold text-muted-foreground mb-2 px-2">
          ARQUIVOS:
        </div>
        {classified.map((entity) => (
          <div key={entity.name}>
            <button
              onClick={() => toggleExpanded(entity.name)}
              className="w-full text-left px-2 py-2 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="truncate uppercase font-bold">{entity.name}</span>
                {expandedItems.has(entity.name) ? (
                  <FolderOpen className="w-4 h-4 shrink-0" />
                ) : (
                  <Folder className="w-4 h-4 shrink-0" />
                )}
              </div>
              <div className={`text-[10px] mt-0.5 ${statusColors[entity.status] || ""}`}>
                {entity.status}
              </div>
            </button>
            {expandedItems.has(entity.name) && (
              <div className="ml-4 space-y-1 mt-1">
                {entity.documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      handleEntityDocumentClick(entity.name, doc.id);
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
      return (
        <FileLoading
          key={selectedFile}
          fileName={selectedFile || ""}
          onComplete={handleLoadingComplete}
        />
      );
    }

    if (selectedEntity && selectedFile) {
      const documentId = selectedFile.replace(`${selectedEntity.name}-`, "");
      const initialIndex =
        selectedEntity.documents.findIndex((doc) => doc.id === documentId) ?? 0;

      return (
        <DocumentNavigator
          documents={generateEntityDocuments(selectedEntity)}
          initialIndex={initialIndex}
          onBack={() => {
            setSelectedFile(null);
            setSelectedEntity(null);
          }}
        />
      );
    }

    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="text-6xl">🔒</div>
          <div className="text-xl font-bold text-foreground">
            SELECIONE UM ARQUIVO
          </div>
          <div className="text-sm text-muted-foreground">
            Escolha um arquivo sigiloso na barra lateral para visualizar
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
