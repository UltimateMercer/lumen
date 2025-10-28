"use client";

import { useEffect, useState, useRef } from "react";

interface FileLoadingProps {
  fileName: string;
  onComplete?: () => void;
}

export function FileLoading({
  fileName,
  onComplete = () => {},
}: FileLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const onCompleteRef = useRef(onComplete);

  const stages = [
    "LOCALIZANDO ARQUIVO...",
    "VERIFICANDO INTEGRIDADE...",
    "DESCRIPTOGRAFANDO DADOS...",
    "CARREGANDO CONTEÚDO...",
    "CONCLUÍDO",
  ];

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    console.log("[v0] FileLoading: Starting animation for", fileName);
    setProgress(0);
    setStage(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          console.log(
            "[v0] FileLoading: Animation complete, calling onComplete"
          );
          setTimeout(() => onCompleteRef.current(), 300);
          return 100;
        }
        return newProgress;
      });
    }, 80);

    return () => {
      console.log("[v0] FileLoading: Cleaning up interval");
      clearInterval(interval);
    };
  }, [fileName]);

  useEffect(() => {
    setStage(Math.floor((progress / 100) * (stages.length - 1)));
  }, [progress, stages.length]);

  return (
    <div className="border-2 border-foreground bg-background p-8">
      <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-2">
          ACESSANDO ARQUIVO
        </div>
        <div className="text-lg font-bold text-foreground">{fileName}</div>
      </div>

      <div className="space-y-4">
        <div className="text-sm font-mono text-foreground">{stages[stage]}</div>

        <div className="border-2 border-foreground h-8 relative overflow-hidden">
          <div
            className="h-full bg-foreground transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold mix-blend-difference text-background">
            {progress}%
          </div>
        </div>

        <div className="border-2 border-foreground p-4 bg-muted font-mono text-xs space-y-1">
          <div>{">"} Protocolo de segurança: AES-256</div>
          <div>{">"} Verificando assinatura digital...</div>
          <div>
            {">"} Hash:{" "}
            {Math.random().toString(36).substring(2, 15).toUpperCase()}
          </div>
          <div className="blink">{">"} _</div>
        </div>
      </div>
    </div>
  );
}
