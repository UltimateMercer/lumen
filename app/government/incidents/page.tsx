"use client";

import { useState, useCallback } from "react";
import { FileLoading } from "@/components/file-loading";

export default function IncidentsIndex() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <FileLoading
          fileName="REGISTRO DE INCIDENTES"
          onComplete={handleLoadingComplete}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center space-y-2 opacity-40">
        <div className="font-mono text-xs uppercase tracking-widest">
          SISTEMA DE MONITORAMENTO
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">
          › Selecione um registro para visualizar
        </div>
      </div>
    </div>
  );
}
