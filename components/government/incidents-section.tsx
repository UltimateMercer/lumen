"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FileLoading } from "@/components/file-loading";
import { DocumentViewer } from "@/components/document-viewer";
import { RedactedText } from "@/components/redacted-text";

interface IncidentsSectionProps {
  onCloseMobileSidebar?: () => void;
}

const incidentesData = [
  {
    id: "INC-2024-089",
    type: "VIOLAÇÃO DE SEGURANÇA",
    severity: "CRÍTICO",
    date: "2024.03.15",
  },
  {
    id: "INC-2024-090",
    type: "ANOMALIA DETECTADA",
    severity: "ALTO",
    date: "2024.03.14",
  },
  {
    id: "INC-2024-091",
    type: "FALHA DE SISTEMA",
    severity: "MÉDIO",
    date: "2024.03.12",
  },
  {
    id: "INC-2024-092",
    type: "ACESSO NÃO AUTORIZADO",
    severity: "ALTO",
    date: "2024.03.10",
  },
];

export function IncidentsSection({
  onCloseMobileSidebar,
}: IncidentsSectionProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isLoadingFile, setIsLoadingFile] = useState(false);

  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLoadingComplete = useCallback(() => {
    setIsLoadingFile(false);
  }, []);

  const handleFileClick = (fileName: string) => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    setSelectedFile(fileName);
    setIsLoadingFile(true);

    onCloseMobileSidebar?.();
  };

  const renderFileContent = (fileName: string) => {
    return (
      <div className="mt-6">
        <Button
          onClick={() => setSelectedFile(null)}
          variant="outline"
          size="sm"
          className="border-2 border-foreground mb-4"
        >
          ← VOLTAR
        </Button>
        <DocumentViewer
          title={fileName}
          classification="CONFIDENCIAL"
          department="DEPARTAMENTO DE SEGURANÇA INTERNA"
          date="2024.03.15 14:32:07"
          signedBy="Dr. James Morrison - Chefe de Segurança"
          content={
            <div className="space-y-4 font-mono text-xs">
              <div className="border-l-2 border-foreground pl-4">
                <div className="text-muted-foreground mb-2">
                  CLASSIFICAÇÃO: CONFIDENCIAL
                </div>
                <div className="text-muted-foreground mb-2">
                  CÓDIGO DE INCIDENTE: {fileName}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold">RELATÓRIO DE INCIDENTE:</div>
                <div className="leading-relaxed">
                  Incidente registrado em{" "}
                  <RedactedText redacted>DATA/HORA</RedactedText>. Investigação
                  em andamento.
                </div>
              </div>

              <div className="border-t-2 border-foreground pt-4 mt-4">
                <div className="text-destructive font-bold">
                  ⚠️ DOCUMENTO CONFIDENCIAL
                </div>
                <div className="text-muted-foreground mt-1">
                  Acesso restrito a pessoal autorizado.
                </div>
              </div>
            </div>
          }
        />
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="space-y-1">
        <div className="text-xs font-bold text-muted-foreground mb-2 px-2">
          INCIDENTES:
        </div>
        {incidentesData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleFileClick(item.id)}
            className="w-full text-left px-2 py-2 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors"
          >
            <div className="font-bold">{item.id}</div>
            <div className="text-muted-foreground text-[10px] mt-0.5">
              {item.type}
            </div>
          </button>
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

    if (selectedFile) {
      return renderFileContent(selectedFile);
    }

    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="text-6xl">⚠️</div>
          <div className="text-xl font-bold text-foreground">
            SELECIONE UM INCIDENTE
          </div>
          <div className="text-sm text-muted-foreground">
            Escolha um incidente na barra lateral para visualizar o relatório
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
