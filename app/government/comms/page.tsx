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
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">COMUNICAÇÕES CRIPTOGRAFADAS</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Transmissões seguras entre agentes • Canais protegidos
        </p>
      </div>

      <div className="divide-y divide-border border border-border rounded-xs overflow-hidden bg-background">
        {commThreads.map((thread) => {
          const lastMessage = thread.messages[thread.messages.length - 1];
          return (
            <button
              key={thread.slug}
              onClick={() => router.push(`/government/comms/${thread.slug}`)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" aria-hidden />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-medium truncate">{thread.title}</span>
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">{thread.channel}</span>
                </div>
                {lastMessage && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {lastMessage.sender}: {lastMessage.text}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
