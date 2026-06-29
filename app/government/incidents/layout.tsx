"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { AuthGuard } from "@/components/auth-guard";
import { INCIDENTS, CLASS_ACCENT } from "@/data/incidents";

export default function IncidentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentSlug = params.slug as string | undefined;

  const total = INCIDENTS.length;
  const ativos = INCIDENTS.filter((i) => i.status.includes("ativo")).length;
  const contidos = INCIDENTS.filter((i) => i.status.includes("contido")).length;

  const getStatusDot = (status: string) => {
    if (status.includes("ativo")) return "bg-[var(--c-ultra)] animate-pulse";
    if (status.includes("contido")) return "bg-[var(--c-public)]";
    if (status.includes("encerrado")) return "bg-muted-foreground";
    return "bg-[var(--c-confidential)]";
  };

  const sidebar = (
    <div className="space-y-1">
      <div className="px-2 pb-2 border-b incident-item-border mb-2">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-foreground">
          <span className="size-1.5 rounded-full bg-[var(--c-ultra)] animate-pulse" />
          MONITORAMENTO ATIVO
        </div>
        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
          {total} REGISTROS · {ativos} ATIVOS · {contidos} CONTIDOS
        </div>
      </div>
      {INCIDENTS.map((inc) => {
        const isActive = currentSlug === inc.mdxSlug;
        const accent = CLASS_ACCENT[inc.classification];
        return (
          <Link
            key={inc.mdxSlug}
            href={`/government/incidents/${inc.mdxSlug}`}
            className={`block border incident-item-border border-l-4 p-3 min-h-[88px] transition-colors ${
              isActive
                ? "border-foreground bg-foreground/10"
                : "hover:bg-muted"
            } ${accent?.border ?? "border-l-border"}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-muted-foreground">
                {inc.incident_code}
              </span>
              <span
                className={`px-1.5 py-0.5 text-[10px] font-mono uppercase leading-none ${
                  accent?.chip ?? ""
                }`}
              >
                {inc.classification}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`size-1.5 rounded-full shrink-0 ${getStatusDot(inc.status)}`}
              />
              <span className="font-bold uppercase text-xs leading-tight">
                {inc.title}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] text-muted-foreground truncate">
                {inc.location}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground shrink-0 ml-1">
                {inc.date}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <AuthGuard requireGovernment>
      <div className="grid md:grid-cols-[300px_1fr] gap-px h-full">
        <div className="hidden md:block sticky lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] lg:top-[57px] top-12 p-2 bg-[#eaeaea] dark:bg-[#252525] overflow-y-auto rounded-xs">
          {sidebar}
        </div>
        <main className="bg-[#eaeaea] dark:bg-[#252525] p-4 lg:min-h-[calc(100vh-65px)] min-h-[calc(100vh-56px)] rounded-xs">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
