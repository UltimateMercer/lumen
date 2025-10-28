"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/loading-screen";
import { FileLoading } from "@/components/file-loading";
import { DocumentViewer } from "@/components/document-viewer";
import { DocumentNavigator } from "@/components/document-navigator";
import { ChevronRight, ChevronDown } from "lucide-react";

import { individuals } from "@/data/individuals";
import { generateIndividualDocuments } from "@/data/document-generators";
import { RedactedText } from "./redacted-text";

interface GovernmentDashboardProps {
  user: { username: string; accessLevel: string };
  onLogout: () => void;
  section: string;
}

export function GovernmentDashboard({
  user,
  onLogout,
  section,
}: GovernmentDashboardProps) {
  const sectionMap: Record<string, string> = {
    classified: "sigiloso",
    profiles: "individuos",
    missions: "missoes",
    incidents: "incidentes",
  };

  const [activeSection, setActiveSection] = useState<string>(
    sectionMap[section] || section
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedIndividual, setSelectedIndividual] = useState<string | null>(
    null
  );
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // This prevents race conditions when clicking multiple files quickly
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: "sigiloso", name: "INFORMAÇÕES SIGILOSAS", icon: "🔒" },
    { id: "individuos", name: "INDIVÍDUOS DE DESTAQUE", icon: "👤" },
    { id: "missoes", name: "RELATÓRIOS DE MISSÕES", icon: "📋" },
    { id: "incidentes", name: "REGISTRO DE INCIDENTES", icon: "⚠️" },
  ];

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

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  // This function is called by FileLoading component when the loading animation completes
  // useCallback ensures the function reference stays stable across re-renders
  const handleLoadingComplete = useCallback(() => {
    console.log("[v0] Loading complete, hiding loading screen");
    setIsLoadingFile(false);
  }, []);

  // Instead of using setTimeout, we let the FileLoading component control when loading finishes
  const handleIndividualDocumentClick = (
    individualName: string,
    docId: string
  ) => {
    console.log("[v0] Clicking individual document:", individualName, docId);

    // If user clicks another file before the previous one finishes loading,
    // we cancel the previous timeout to avoid state conflicts
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    const newFileName = `${individualName}-${docId}`;
    console.log("[v0] Setting file to:", newFileName);

    // This ensures FileLoading component receives the correct fileName right away
    setSelectedFile(newFileName);
    setSelectedIndividual(individualName);

    // The FileLoading component will call handleLoadingComplete when done
    setIsLoadingFile(true);
  };

  // Same pattern as handleIndividualDocumentClick but for non-individual files
  const handleFileClick = (fileName: string) => {
    console.log("[v0] Clicking file:", fileName);

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    console.log("[v0] Setting file to:", fileName);

    setSelectedFile(fileName);

    // This prevents state conflicts between individual documents and other file types
    setSelectedIndividual(null);

    // The FileLoading component will call handleLoadingComplete when done
    setIsLoadingFile(true);
  };

  const renderFileContent = (fileName: string) => {
    return (
      <div className="mt-6">
        <Button
          onClick={() => {
            setSelectedFile(null);
            setSelectedIndividual(null);
          }}
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

  const renderContextualSidebar = () => {
    if (activeSection === "individuos") {
      return (
        <div className="space-y-1">
          <div className="text-xs font-bold text-muted-foreground mb-2 px-2">
            INDIVÍDUOS:
          </div>
          {individuals.map((individual) => (
            <div
              key={individual.knownAs ? individual.knownAs : individual.name}
            >
              <button
                onClick={() =>
                  toggleExpanded(
                    individual.knownAs ? individual.knownAs : individual.name
                  )
                }
                className="w-full text-left px-2 py-2 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors flex items-center justify-between"
              >
                <span className="truncate">
                  {individual.knownAs ? individual.knownAs : individual.name}
                </span>
                {expandedItems.has(
                  individual.knownAs ? individual.knownAs : individual.name
                ) ? (
                  <ChevronDown className="w-3 h-3 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
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
                      className="w-full text-left px-2 py-1.5 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors"
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
    }

    if (activeSection === "sigiloso") {
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
    }

    if (activeSection === "missoes") {
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
    }

    if (activeSection === "incidentes") {
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
    }

    return null;
  };

  const renderContent = () => {
    if (isLoadingFile) {
      console.log("[v0] Rendering FileLoading for:", selectedFile);
      // This ensures the loading animation restarts properly for each new file
      // This replaces the old setTimeout approach and provides better synchronization
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

      // Extract the document ID from selectedFile (e.g., "Dr. Elena Voss-projeto-aurora" -> "projeto-aurora")
      const documentId = selectedFile.replace(`${selectedIndividual}-`, "");

      // Find the individual's data to get their documents array
      const individual = individuals.find(
        (ind) => (ind.knownAs || ind.name) === selectedIndividual
      );

      // Find the index of the clicked document in the documents array
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

    if (selectedFile && activeSection !== "individuos") {
      console.log("[v0] Rendering file content for:", selectedFile);
      return renderFileContent(selectedFile);
    }

    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="text-6xl">📁</div>
          <div className="text-xl font-bold text-foreground">
            SELECIONE UM ARQUIVO
          </div>
          <div className="text-sm text-muted-foreground">
            Escolha um item na barra lateral para visualizar seu conteúdo
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <LoadingScreen
        section={sections.find((s) => s.id === activeSection)?.name || ""}
      />
    );
  }

  return (
    <div className="">
      <div className="">
        {/* Main Layout */}
        <div className="grid md:grid-cols-[250px_1fr] gap-px">
          <div className="sticky lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] lg:top-[57px] top-12 p-2 bg-[#eaeaea] dark:bg-[#252525] overflow-y-auto rounded-xs">
            {renderContextualSidebar()}
          </div>

          {/* Main Content */}
          <main className="bg-[#eaeaea] dark:bg-[#252525] p-4 min-h-[calc(100vh-200px)] rounded-xs">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
