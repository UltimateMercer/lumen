"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FileLoading } from "@/components/file-loading";
import { DocumentViewer } from "@/components/document-viewer";
import { RedactedText } from "@/components/redacted-text";

interface ClassifiedSectionProps {
  onCloseMobileSidebar?: () => void;
}

const sigilosoData = [
  {
    name: "PROJETO AURORA",
    classification: "ULTRA-SECRETO",
    date: "2024.03.15",
  },
  { name: "OPERAÇÃO ECLIPSE", classification: "SECRETO", date: "2024.03.10" },
  {
    name: "PROTOCOLO SIGMA",
    classification: "CONFIDENCIAL",
    date: "2024.03.05",
  },
  {
    name: "INICIATIVA NEXUS",
    classification: "ULTRA-SECRETO",
    date: "2024.02.28",
  },
];

export function ClassifiedSection({
  onCloseMobileSidebar,
}: ClassifiedSectionProps) {
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
          classification="ULTRA-SECRETO"
          department="DEPARTAMENTO DE DEFESA E SEGURANÇA NACIONAL"
          date="2024.03.15 14:32:07"
          signedBy="Gen. Marcus Valerius - Diretor de Operações Especiais"
          content={
            <div className="space-y-4 font-mono text-xs">
              <div className="border-l-2 border-foreground pl-4">
                <div className="text-muted-foreground mb-2">
                  CLASSIFICAÇÃO: ULTRA-SECRETO
                </div>
                <div className="text-muted-foreground mb-2">
                  CÓDIGO DE ACESSO:{" "}
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </div>
                <div className="text-muted-foreground mb-2">
                  AUTOR: <RedactedText redacted>NOME CENSURADO</RedactedText>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold">RESUMO EXECUTIVO:</div>
                <div className="leading-relaxed">
                  Operação conduzida no setor{" "}
                  <RedactedText redacted>LOCALIZAÇÃO</RedactedText> resultou em{" "}
                  <RedactedText redacted>RESULTADO</RedactedText>. Agente
                  responsável{" "}
                  <RedactedText redacted>NOME DO AGENTE</RedactedText> reportou
                  anomalias no sistema de{" "}
                  <RedactedText redacted>SISTEMA</RedactedText>.
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold">DETALHES DA OPERAÇÃO:</div>
                <div className="leading-relaxed">
                  Início: 2024.03.15 08:00:00
                  <br />
                  Término: 2024.03.15 14:15:23
                  <br />
                  Localização: <RedactedText redacted>COORDENADAS</RedactedText>
                  <br />
                  Equipe:{" "}
                  <RedactedText redacted>MEMBROS DA EQUIPE</RedactedText>
                  <br />
                  Objetivo: Investigação de{" "}
                  <RedactedText redacted>OBJETIVO CLASSIFICADO</RedactedText>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold">DESCOBERTAS:</div>
                <div className="leading-relaxed">
                  1. Evidências de{" "}
                  <RedactedText redacted>EVIDÊNCIA 1</RedactedText>
                  <br />
                  2. Confirmação de{" "}
                  <RedactedText redacted>EVIDÊNCIA 2</RedactedText>
                  <br />
                  3. Identificação de{" "}
                  <RedactedText redacted>EVIDÊNCIA 3</RedactedText>
                  <br />
                  4. Análise indica{" "}
                  <RedactedText redacted>CONCLUSÃO</RedactedText>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold">RECOMENDAÇÕES:</div>
                <div className="leading-relaxed">
                  Sugere-se <RedactedText redacted>RECOMENDAÇÃO 1</RedactedText>{" "}
                  e implementação imediata de{" "}
                  <RedactedText redacted>MEDIDA DE SEGURANÇA</RedactedText>.
                  Monitoramento contínuo de{" "}
                  <RedactedText redacted>ALVO</RedactedText> é essencial.
                </div>
              </div>

              <div className="border-t-2 border-foreground pt-4 mt-4">
                <div className="text-destructive font-bold">
                  ⚠️ ESTE DOCUMENTO É CLASSIFICADO
                </div>
                <div className="text-muted-foreground mt-1">
                  Acesso restrito a pessoal autorizado. Distribuição não
                  autorizada resultará em ação disciplinar.
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
          ARQUIVOS:
        </div>
        {sigilosoData.map((item) => (
          <button
            key={item.name}
            onClick={() => handleFileClick(item.name)}
            className="w-full text-left px-2 py-2 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors"
          >
            <div className="font-bold">{item.name}</div>
            <div className="text-muted-foreground text-[10px] mt-0.5">
              {item.classification}
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
