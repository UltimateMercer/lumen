"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { ThemeToggle } from "@/components/theme-toggle";
import { LoadingScreen } from "@/components/loading-screen";
import { FileLoading } from "@/components/file-loading";
import { DocumentViewer } from "@/components/document-viewer";
import { ArrowLeft } from "lucide-react";

interface PublicDashboardProps {
  user: { username: string; accessLevel: string };
  onLogout: () => void;
  section: string;
}

export function PublicDashboard({
  user,
  onLogout,
  section,
}: PublicDashboardProps) {
  const sectionMap: Record<string, string> = {
    library: "biblioteca",
    maps: "mapas",
    history: "historia",
    news: "noticias",
  };

  const [activeSection] = useState<string>(sectionMap[section] || section);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isLoadingFile, setIsLoadingFile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: "biblioteca", name: "BIBLIOTECA", icon: "📚" },
    { id: "mapas", name: "MAPAS", icon: "🗺️" },
    { id: "historia", name: "HISTÓRIA", icon: "📜" },
    { id: "noticias", name: "NOTÍCIAS", icon: "📰" },
  ];

  const handleFileClick = (fileName: string) => {
    setIsLoadingFile(true);
    setTimeout(() => {
      setSelectedFile(fileName);
      setIsLoadingFile(false);
    }, 3000);
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
          classification="PÚBLICO"
          department="DEPARTAMENTO DE EDUCAÇÃO E CULTURA"
          date="2024.03.15"
          signedBy="Prof. Alexandre Dumont - Ministro da Educação"
          content={
            <div className="space-y-4 font-mono text-xs leading-relaxed">
              <div className="border-l-2 border-foreground pl-4">
                <div className="text-muted-foreground mb-2">
                  CLASSIFICAÇÃO: PÚBLICO
                </div>
                <div className="text-muted-foreground mb-2">
                  ÚLTIMA ATUALIZAÇÃO: 2024.03.15
                </div>
              </div>

              <div className="space-y-3">
                <p>
                  Este documento contém informações de acesso público sobre o
                  funcionamento e história do nosso mundo. Todo cidadão tem
                  direito ao acesso desta informação.
                </p>

                <div className="border-t-2 border-foreground pt-3">
                  <div className="font-bold mb-2">CAPÍTULO 1: FUNDAMENTOS</div>
                  <p>
                    A sociedade atual foi estabelecida após os eventos de 2150,
                    quando a Grande Unificação trouxe paz e prosperidade para
                    todos os territórios. O sistema de governo implementado
                    garante direitos iguais e acesso à informação para todos os
                    cidadãos.
                  </p>
                </div>

                <div className="border-t-2 border-foreground pt-3">
                  <div className="font-bold mb-2">
                    CAPÍTULO 2: ESTRUTURA SOCIAL
                  </div>
                  <p>
                    Nossa sociedade é organizada em setores especializados, cada
                    um contribuindo para o bem-estar coletivo. O acesso à
                    educação, saúde e recursos básicos é garantido
                    constitucionalmente.
                  </p>
                </div>

                <div className="border-t-2 border-foreground pt-3">
                  <div className="font-bold mb-2">
                    CAPÍTULO 3: DIREITOS E DEVERES
                  </div>
                  <p>
                    Todo cidadão possui direitos fundamentais incluindo
                    liberdade de expressão, acesso à informação pública, e
                    participação nas decisões comunitárias. Os deveres incluem
                    respeito às leis e contribuição para o bem comum.
                  </p>
                </div>
              </div>
            </div>
          }
        />
      </div>
    );
  };

  const renderContent = () => {
    if (isLoadingFile) {
      return <FileLoading fileName={selectedFile || ""} />;
    }

    switch (activeSection) {
      case "biblioteca":
        return (
          <div className="space-y-4">
            <h2 className="text-[#252525] dark:text-[#eaeaea] text-xl font-bold border-b border-[#252525] dark:border-[#eaeaea] pb-2">
              BIBLIOTECA PÚBLICA
            </h2>
            {!selectedFile ? (
              <div className="grid gap-4">
                {[
                  "Fundamentos do Mundo",
                  "Guia de Sobrevivência",
                  "Atlas Cultural",
                  "Compêndio de Leis",
                ].map((item) => (
                  <div
                    key={item}
                    onClick={() => handleFileClick(item)}
                    className="border-2 border-foreground p-4 bg-background hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="text-sm font-bold">{item}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Acesso público • Última atualização: 2024
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              renderFileContent(selectedFile)
            )}
          </div>
        );
      case "mapas":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b-2 border-foreground pb-2">
              MAPAS TERRITORIAIS
            </h2>
            <div className="border-2 border-foreground p-8 bg-muted flex items-center justify-center min-h-[400px]">
              <div className="text-center text-muted-foreground">
                <div className="text-4xl mb-4">🗺️</div>
                <div>MAPA INTERATIVO</div>
                <div className="text-xs mt-2">
                  Clique nas regiões para mais informações
                </div>
              </div>
            </div>
          </div>
        );
      case "historia":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b-2 border-foreground pb-2">
              LINHA DO TEMPO
            </h2>
            <div className="space-y-4">
              {[
                { year: "2150", event: "Fundação da Nova Era" },
                { year: "2175", event: "Primeiro Contato" },
                { year: "2200", event: "Grande Unificação" },
                { year: "2225", event: "Era Atual" },
              ].map((item) => (
                <div
                  key={item.year}
                  className="border-l-4 border-foreground pl-4 py-2"
                >
                  <div className="text-sm font-bold">{item.year}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "noticias":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b-2 border-foreground pb-2">
              NOTÍCIAS RECENTES
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Novo protocolo de segurança implementado",
                  date: "2024.03.15",
                },
                {
                  title: "Expansão do setor educacional aprovada",
                  date: "2024.03.10",
                },
                { title: "Celebração do Dia da Fundação", date: "2024.03.01" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-2 border-foreground p-4 bg-background"
                >
                  <div className="text-sm font-bold">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <LoadingScreen
        section={sections.find((s) => s.id === activeSection)?.name || ""}
      />
    );
  }

  return (
    <main className="bg-[#eaeaea] dark:bg-[#252525] p-6">
      {renderContent()}
    </main>
  );
}
