"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FileLoading } from "@/components/file-loading";
import { classified } from "@/data/classified";
import type { Document } from "@/utils/government-data";

const CLASS_ACCENT: Record<string, { chip: string; border: string; text: string }> = {
  PÚBLICO:       { chip: "bg-[var(--c-public)] text-white",       border: "border-l-[var(--c-public)]",       text: "text-[var(--c-public)]" },
  CONFIDENCIAL:  { chip: "bg-[var(--c-confidential)] text-white", border: "border-l-[var(--c-confidential)]", text: "text-[var(--c-confidential)]" },
  SECRETO:       { chip: "bg-[var(--c-secret)] text-white",       border: "border-l-[var(--c-secret)]",       text: "text-[var(--c-secret)]" },
  ULTRASSECRETO: { chip: "bg-[var(--c-ultra)] text-white",        border: "border-l-[var(--c-ultra)]",        text: "text-[var(--c-ultra)]" },
};

const STATUS_COLOR: Record<string, string> = {
  "ATIVO":      "text-[var(--c-public)]",
  "SUSPENSO":   "text-[var(--c-confidential)]",
  "ENCERRADO":  "text-muted-foreground",
  "COMPROMETIDO": "text-[var(--c-ultra)]",
};

function hasAnyMdx(entity: typeof classified[number]): boolean {
  const docs = (entity.documents as Document[]).concat(
    ...(entity.documentGroups ?? []).map((g) => g.documents as Document[]),
  );
  return docs.some((d) => d.mdxSlug);
}

function countDocs(entity: typeof classified[number]): number {
  const docs = (entity.documents as Document[]).concat(
    ...(entity.documentGroups ?? []).map((g) => g.documents as Document[]),
  );
  return docs.filter((d) => d.mdxSlug).length;
}

export function ClassifiedInner() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectParam = searchParams.get("project");

  const entity = projectParam
    ? classified.find((e) => e.slug === projectParam)
    : null;

  const handleProjectClick = (slug: string) => {
    router.push(`?project=${slug}`, { scroll: false });
  };

  const handleDocumentClick = (mdxSlug: string) => {
    router.push(`/government/classified/${mdxSlug}`);
  };

  const handleBack = () => {
    router.push("/government/classified", { scroll: false });
  };

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <FileLoading
          fileName="ARQUIVOS CLASSIFICADOS"
          onComplete={handleLoadingComplete}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      {entity ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{entity.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {entity.id} · {entity.department}
              </p>
            </div>
            <button
              onClick={handleBack}
              className="rounded-xs border border-foreground bg-background px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
            >
              ← VOLTAR
            </button>
          </div>

          {entity.documents.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {entity.name} › DOSSIÊ
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                {entity.documents.map((doc) => {
                  const d = doc as Document;
                  return (
                  <button
                    key={d.id}
                    onClick={() => {
                      if (d.mdxSlug) handleDocumentClick(d.mdxSlug);
                    }}
                    className={`group relative flex flex-col border-2 border-border bg-background texture-item overflow-hidden shadow-[6px_6px_0_0_color-mix(in_oklab,var(--foreground)_8%,transparent)] transition-all hover:-translate-y-0.5 hover:border-foreground/70 hover:shadow-[8px_8px_0_0_color-mix(in_oklab,var(--foreground)_14%,transparent)] text-left w-full rounded-xs ${
                      !d.mdxSlug ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div className="flex items-stretch border-b-2 border-border">
                      <div className="flex items-center justify-center px-3 py-1.5 font-mono text-xs font-extrabold tracking-tight bg-[var(--c-ultra)] text-white">
                        ARQ
                      </div>
                      <div className="flex flex-1 items-center border-l-2 border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                        DOSSIÊ CLASSIFICADO
                      </div>
                      <div className="flex items-center gap-1.5 border-l-2 border-border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--c-ultra)]">
                        <span className="h-1.5 w-1.5 rotate-45 bg-current" />
                        ULTRASSECRETO
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                        {entity.department ?? "DIVISÃO CLASSIFICADA"}
                      </div>
                      <h3 className="mt-2 font-mono text-base font-bold uppercase tracking-wider text-foreground">
                        {d.name}
                      </h3>
                      {!d.mdxSlug && (
                        <p className="mt-3 text-xs text-muted-foreground border-l-2 border-l-[var(--c-ultra)] pl-3">
                          Acesso indisponível · documento não catalogado
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {entity.id}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--c-ultra)]">
                        {d.mdxSlug ? "ACESSAR →" : "RESTRITO"}
                      </span>
                    </div>
                  </button>
                  );
                })}
              </div>
            </div>
          )}

          {entity.documentGroups?.map((group) => (
            <div key={group.groupId} className="space-y-3">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {entity.name} › {group.groupName}
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                {group.documents.map((doc) => {
                  const d = doc as Document;
                  return (
                  <button
                    key={d.id}
                    onClick={() => {
                      if (d.mdxSlug) handleDocumentClick(d.mdxSlug);
                    }}
                    className={`group text-left flex flex-col border border-border border-l-4 border-l-[var(--c-ultra)] bg-background texture-item overflow-hidden shadow-[4px_4px_0_0_color-mix(in_oklab,var(--foreground)_6%,transparent)] transition-all hover:-translate-y-0.5 hover:border-foreground hover:shadow-[6px_6px_0_0_color-mix(in_oklab,var(--foreground)_12%,transparent)] rounded-xs w-full min-h-[100px] ${
                      !d.mdxSlug ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div className="flex items-stretch border-b border-border">
                      <div className="flex items-center justify-center px-3 py-1.5 font-mono text-xs font-extrabold tracking-tight bg-[var(--c-ultra)] text-white">
                        DOC
                      </div>
                      <div className="flex flex-1 items-center border-l border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                        {group.groupName.toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1 p-3">
                      <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground group-hover:underline">
                        {d.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between border-t border-border bg-muted/40 px-3 py-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {entity.id} · {group.groupName}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--c-ultra)]">
                        {d.mdxSlug ? "→" : "—"}
                      </span>
                    </div>
                  </button>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      ) : projectParam ? (
        <div className="text-center opacity-50 py-12">
          <p>PROJETO NÃO ENCONTRADO</p>
          <button
            onClick={handleBack}
            className="mt-4 rounded-xs border border-foreground bg-background px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
          >
            ← VOLTAR
          </button>
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-2xl font-bold">ARQUIVOS CLASSIFICADOS</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Projetos e operações de acesso restrito
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {classified.map((entity) => {
              const anyMdx = hasAnyMdx(entity);
              const total = countDocs(entity);
              return (
                <button
                  key={entity.slug}
                  onClick={() => {
                    if (anyMdx) handleProjectClick(entity.slug);
                  }}
                  className={`group text-left flex flex-col border border-border border-l-4 bg-background texture-item overflow-hidden shadow-[4px_4px_0_0_color-mix(in_oklab,var(--foreground)_6%,transparent)] transition-all hover:-translate-y-0.5 hover:border-foreground hover:shadow-[6px_6px_0_0_color-mix(in_oklab,var(--foreground)_12%,transparent)] rounded-xs w-full min-h-[180px] ${
                    anyMdx
                      ? "border-l-[var(--c-ultra)]"
                      : "border-l-foreground/20"
                  } ${!anyMdx ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-stretch border-b border-border">
                    <div className="flex items-center justify-center px-3 py-1.5 font-mono text-xs font-extrabold tracking-tight bg-[var(--c-ultra)] text-white">
                      CLASS
                    </div>
                    <div className="flex flex-1 items-center border-l border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      PROJETO CLASSIFICADO · {entity.id}
                    </div>
                    <div className="flex items-center gap-1.5 border-l border-border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--c-ultra)]">
                      {total} DOCS
                    </div>
                  </div>
                  <div className="flex-1 p-4 space-y-2">
                    <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      {entity.department ?? "DIVISÃO CLASSIFICADA"}
                    </div>
                    <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-foreground group-hover:underline">
                      {entity.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {entity.id}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-widest ${STATUS_COLOR[entity.status] ?? "text-foreground"}`}
                    >
                      ● {entity.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
