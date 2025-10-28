"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  section: string;
}

export function LoadingScreen({ section }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INICIALIZANDO...");

  useEffect(() => {
    const messages = [
      "INICIALIZANDO...",
      "VERIFICANDO CREDENCIAIS...",
      "DESCRIPTOGRAFANDO DADOS...",
      "CARREGANDO ARQUIVOS...",
      "ESTABELECENDO CONEXÃO SEGURA...",
      "CONCLUÍDO",
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });

      if (currentIndex < messages.length) {
        setLoadingText(messages[currentIndex]);
        currentIndex++;
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scanline absolute w-full h-1 bg-foreground opacity-10" />
      </div>

      <div className="w-full max-w-2xl border-2 border-foreground p-8 bg-background">
        {/* Header */}
        <div className="mb-8 border-b-2 border-foreground pb-4">
          <div className="text-xs mb-2 text-muted-foreground">
            SISTEMA DE ACESSO GOVERNAMENTAL
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            CARREGANDO: {section}
          </h1>
        </div>

        {/* Loading Animation */}
        <div className="space-y-6">
          <div className="text-center text-foreground font-mono text-sm">
            {loadingText}
          </div>

          {/* Progress Bar */}
          <div className="border-2 border-foreground h-8 relative overflow-hidden">
            <div
              className="h-full bg-foreground transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold mix-blend-difference text-background">
              {progress}%
            </div>
          </div>

          {/* Loading Details */}
          <div className="border-2 border-foreground p-4 bg-muted">
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <div className="text-muted-foreground">STATUS:</div>
                <div className="text-foreground font-bold">PROCESSANDO</div>
              </div>
              <div>
                <div className="text-muted-foreground">PROTOCOLO:</div>
                <div className="text-foreground font-bold">SEC-256</div>
              </div>
              <div>
                <div className="text-muted-foreground">ARQUIVOS:</div>
                <div className="text-foreground font-bold">
                  {Math.floor(progress / 10)} / 10
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">CONEXÃO:</div>
                <div className="text-foreground font-bold">SEGURA</div>
              </div>
            </div>
          </div>

          {/* Terminal-like output */}
          <div className="border-2 border-foreground p-4 bg-background h-32 overflow-hidden font-mono text-xs text-foreground">
            <div className="space-y-1">
              <div>{">"} Verificando permissões de acesso...</div>
              <div>{">"} Estabelecendo túnel criptografado...</div>
              <div>{">"} Carregando base de dados...</div>
              <div>{">"} Sincronizando com servidor central...</div>
              <div className="blink">{">"} _</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
