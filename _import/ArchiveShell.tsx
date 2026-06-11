"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ThemeToggle } from "./components/ThemeToggle";

function SessionCode() {
  // Evita mismatch de hydration: gera só no cliente.
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    setCode(String(Math.floor(Math.random() * 9000 + 1000)));
  }, []);
  return (
    <span className="text-cyan-crt">
      SESSÃO::OP-{code ?? "————"}
    </span>
  );
}

export function ArchiveShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-chrome/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 text-xs uppercase tracking-[0.2em]">
          <Link href="/" className="flex items-center gap-3 text-amber-crt crt-glow">
            <span className="inline-block h-2.5 w-2.5 bg-amber-crt flicker" />
            <span className="font-bold">MINCONT-OS · v.7.42</span>
          </Link>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Link href="/" className="hidden hover:text-amber-crt md:inline">/arquivo</Link>
            <span className="hidden md:inline">/diretoria-central</span>
            <SessionCode />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>

      <footer className="mt-16 border-t border-border bg-chrome/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>
            República Autônoma de Nova-Aurélia · Ministério da Continuidade · A.R. 2187
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dev/componentes"
              className="opacity-60 hover:text-amber-crt hover:opacity-100"
            >
              /dev/componentes
            </Link>
            <span className="text-amber-crt/70">
              ⚠ violação da cláusula 14-B
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
