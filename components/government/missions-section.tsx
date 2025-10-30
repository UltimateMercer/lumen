"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FileLoading } from "@/components/file-loading";
import { DocumentViewer } from "@/components/document-viewer";
import { RedactedText } from "@/components/redacted-text";

interface MissionsSectionProps {
  onCloseMobileSidebar?: () => void;
}

const missoesData = [
  {
    code: "M-2024-047",
    name: "Operação Tempestade",
    status: "CONCLUÍDA",
    success: "SIM",
  },
  {
    code: "M-2024-048",
    name: "Resgate Setor 7",
    status: "EM ANDAMENTO",
    success: "N/A",
  },
  {
    code: "M-2024-049",
    name: "Infiltração Delta",
    status: "CONCLUÍDA",
    success: "PARCIAL",
  },
  {
    code: "M-2024-050",
    name: "Reconhecimento Norte",
    status: "PLANEJAMENTO",
    success: "N/A",
  },
];

export function MissionsSection({
  onCloseMobileSidebar,
}: MissionsSectionProps) {
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
          classification="SECRETO"
          department="DEPARTAMENTO DE OPERAÇÕES TÁTICAS"
          date="2024.03.15 14:32:07"
          signedBy="Cmdr. Sarah Chen - Coordenadora de Missões"
          content={
            <div className="space-y-4 font-mono text-xs">
              <div className="border-l-2 border-foreground pl-4">
                <div className="text-muted-foreground mb-2">
                  CLASSIFICAÇÃO: SECRETO
                </div>
                <div className="text-muted-foreground mb-2">
                  CÓDIGO DE MISSÃO: {fileName}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold">RELATÓRIO DE MISSÃO:</div>
                <div className="leading-relaxed">
                  Missão executada conforme planejamento inicial. Equipe
                  composta por <RedactedText redacted>NÚMERO</RedactedText>{" "}
                  agentes operacionais.
                </div>
              </div>

              <div className="border-t-2 border-foreground pt-4 mt-4">
                <div className="text-destructive font-bold">
                  ⚠️ DOCUMENTO CLASSIFICADO
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
          MISSÕES:
        </div>
        {missoesData.map((item) => (
          <button
            key={item.code}
            onClick={() => handleFileClick(item.code)}
            className="w-full text-left px-2 py-2 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors"
          >
            <div className="font-bold">{item.code}</div>
            <div className="text-muted-foreground text-[10px] mt-0.5">
              {item.name}
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
          <div className="text-6xl">📋</div>
          <div className="text-xl font-bold text-foreground">
            SELECIONE UMA MISSÃO
          </div>
          <div className="text-sm text-muted-foreground">
            Escolha uma missão na barra lateral para visualizar o relatório
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
