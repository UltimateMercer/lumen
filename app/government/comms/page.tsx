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
    <div className="max-w-2xl mx-auto p-4">
      <div className="border border-amber-crt/40 bg-chrome scanlines">
        <div className="flex items-center justify-between border-b border-amber-crt/30 px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-amber-crt">
          <span>registro de canais</span>
          <span>{commThreads.length} ativo(s)</span>
        </div>

        <div className="px-6 py-4 text-amber-crt crt-glow">
          <h1 className="font-display text-xl font-bold uppercase tracking-wider">
            Comunicações Criptografadas
          </h1>
          <p className="mt-1 text-xs uppercase tracking-widest opacity-70">
            transmissões seguras entre agentes · canais protegidos
          </p>
        </div>

        <div className="divide-y divide-amber-crt/20 border-t border-amber-crt/30">
          {commThreads.map((thread) => {
            const lastMessage = thread.messages[thread.messages.length - 1];
            return (
              <button
                key={thread.slug}
                onClick={() => router.push(`/government/comms/${thread.slug}`)}
                className="group flex w-full items-center gap-3 px-6 py-3 text-left text-amber-crt transition-colors hover:bg-amber-crt/5"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-crt animate-pulse" aria-hidden />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-mono text-sm font-medium uppercase tracking-wide group-hover:crt-glow">
                      {thread.title}
                    </span>
                    <span className="shrink-0 text-[10px] uppercase tracking-widest opacity-60">
                      {thread.channel}
                    </span>
                  </div>
                  {lastMessage && (
                    <p className="mt-0.5 truncate text-xs opacity-60">
                      {lastMessage.sender}: {lastMessage.text}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
