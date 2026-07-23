"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FileLoading } from "@/components/file-loading";
import { commThreads } from "@/data/comms";

export default function CommsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <FileLoading
          fileName="CANAL DE COMUNICAÇÕES"
          onComplete={handleLoadingComplete}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">COMUNICAÇÕES CRIPTOGRAFADAS</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Transmissões seguras entre agentes • Canais protegidos
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {commThreads.map((thread) => (
          <button
            key={thread.slug}
            onClick={() => router.push(`/government/comms/${thread.slug}`)}
            className="group text-left flex flex-col border border-border border-l-4 bg-background texture-item overflow-hidden shadow-[4px_4px_0_0_color-mix(in_oklab,var(--foreground)_6%,transparent)] transition-all hover:-translate-y-0.5 hover:border-foreground hover:shadow-[6px_6px_0_0_color-mix(in_oklab,var(--foreground)_12%,transparent)] rounded-xs w-full min-h-[180px] border-l-[var(--c-confidential)]"
          >
            <div className="flex items-stretch border-b border-border">
              <div className="flex items-center justify-center px-3 py-1.5 font-mono text-xs font-extrabold tracking-tight bg-[var(--c-confidential)] text-white">
                CHAN
              </div>
              <div className="flex flex-1 items-center border-l border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                TRANSMISSÃO SEGURA
              </div>
              <div className="flex items-center gap-1.5 border-l border-border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--c-confidential)]">
                <span className="h-1.5 w-1.5 rotate-45 bg-current" />
                {thread.messages.length} MSG
              </div>
            </div>
            <div className="flex-1 p-4 space-y-2">
              <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                {thread.channel} • {thread.protocol}
              </div>
              <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-foreground group-hover:underline">
                {thread.title}
              </h3>
              <div className="text-xs text-muted-foreground">
                Última transmissão registrada
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {thread.slug}
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--c-confidential)]">
                ACESSAR →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
