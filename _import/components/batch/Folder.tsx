"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Capa de pasta lacrada com animação de abertura.
 * Estado inicial: fechada (SSR-safe). Anima após mount.
 * Respeita prefers-reduced-motion. Pula com tecla/click.
 */
export function Folder({
  caseId,
  title,
  classification,
  sealColor = "red",
  onOpened,
  storageKey,
}: {
  caseId?: string;
  title: string;
  classification: string;
  sealColor?: "red" | "black" | "amber";
  onOpened: () => void;
  storageKey?: string;
}) {
  // 0 = pasta fechada, 1 = lacre rompido, 2 = abrindo, 3 = aberto
  const [stage, setStage] = useState(0);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen = storageKey
      ? sessionStorage.getItem(storageKey) === "1"
      : false;
    if (reduced || seen) {
      setSkipped(true);
      onOpened();
      return;
    }
  }, [onOpened, storageKey]);

  useEffect(() => {
    if (skipped) return;
    if (stage === 0) {
      const t = setTimeout(() => setStage(1), 700);
      return () => clearTimeout(t);
    }
    if (stage === 1) {
      const t = setTimeout(() => setStage(2), 550);
      return () => clearTimeout(t);
    }
    if (stage === 2) {
      const t = setTimeout(() => {
        setStage(3);
        if (storageKey) sessionStorage.setItem(storageKey, "1");
        onOpened();
      }, 700);
      return () => clearTimeout(t);
    }
  }, [stage, skipped, onOpened, storageKey]);

  if (skipped) return null;

  const skip = () => {
    setSkipped(true);
    if (storageKey) sessionStorage.setItem(storageKey, "1");
    onOpened();
  };

  const sealClass =
    sealColor === "black"
      ? "bg-stamp-ink-black"
      : sealColor === "amber"
        ? "bg-stamp-ink-amber"
        : "bg-stamp-ink-red";

  return (
    <div
      className="folder-stage relative mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center py-10"
      role="button"
      tabIndex={0}
      onClick={skip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") skip();
      }}
      aria-label="Pular abertura do arquivo"
    >
      <div
        className={cn(
          "folder relative h-[420px] w-full",
          stage >= 2 && "folder--opening",
          stage >= 3 && "folder--open",
        )}
      >
        {/* corpo da pasta */}
        <div className="folder-body absolute inset-0 border-2 border-paper-foreground/60 bg-[oklch(0.78_0.05_70)] shadow-[0_24px_64px_-24px_oklch(0_0_0/0.6)]">
          {/* aba superior */}
          <div className="absolute -top-3 left-8 right-8 h-8 border-x-2 border-t-2 border-paper-foreground/60 bg-[oklch(0.82_0.05_70)]" />
          {/* etiqueta */}
          <div className="absolute left-1/2 top-12 w-3/4 -translate-x-1/2 border border-paper-foreground/40 bg-[oklch(0.92_0.03_85)] p-4 text-center text-paper-foreground">
            <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
              MINCONT · Divisão 14-B
            </div>
            <div className="mt-1 font-display text-[10px] uppercase tracking-[0.25em] text-paper-muted">
              arquivo · {caseId ?? "—"}
            </div>
            <div className="mt-3 font-display text-base font-bold uppercase leading-tight tracking-wider">
              {title}
            </div>
            <div className="mt-2 text-[9px] uppercase tracking-[0.3em] text-stamp-ink-red">
              ◆ {classification}
            </div>
          </div>
          {/* marca diagonal */}
          <div className="pointer-events-none absolute inset-x-0 bottom-14 text-center font-display text-[10px] uppercase tracking-[0.4em] text-stamp-ink-red opacity-70">
            // não remover lacre sem autorização
          </div>
          {/* lacre de cera */}
          <div className="seal-wrap absolute bottom-8 left-1/2 -translate-x-1/2">
            <div
              className={cn(
                "seal relative h-16 w-16 rounded-full",
                sealClass,
                stage >= 1 && "seal--broken",
              )}
            >
              <span className="absolute inset-0 flex items-center justify-center font-display text-[9px] font-black uppercase tracking-widest text-[oklch(0.98_0.01_85)]">
                14-B
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-2 left-0 right-0 text-center text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        [ clique/enter para pular ]
      </div>
    </div>
  );
}
