"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CODEX_CATEGORIES } from "@/data/codex";
import type { CodexCategory, CodexItem } from "@/data/codex";
import { getDocument } from "@/lib/archive/registry";

const TYPE_CODE: Record<string, string> = {
  codex_entry: "CDX",
  classified_project: "PRJ",
  batch: "ARQ",
  memo: "MEM",
};

const CLASS_ACCENT = {
  PÚBLICO: { chip: "bg-[--c-public] text-white", text: "text-[--c-public]", rule: "border-[--c-public]" },
  CONFIDENCIAL: { chip: "bg-[--c-confidential] text-white", text: "text-[--c-confidential]", rule: "border-[--c-confidential]" },
  SECRETO: { chip: "bg-[--c-secret] text-white", text: "text-[--c-secret]", rule: "border-[--c-secret]" },
  ULTRASSECRETO: { chip: "bg-[--c-ultra] text-white", text: "text-[--c-ultra]", rule: "border-[--c-ultra]" },
} as const;

const THREAT_LABEL: Record<string, string> = {
  baixa: "BAIXA",
  moderada: "MODERADA",
  severa: "SEVERA",
  crítica: "CRÍTICA",
  apocalíptica: "APOCALÍPTICA",
};

type View = "categories" | "items" | "documents";

export default function CodexIndex() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto p-8 opacity-50 text-center">
          CARREGANDO...
        </div>
      }
    >
      <CodexIndexInner />
    </Suspense>
  );
}

function CodexIndexInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const itemParam = searchParams.get("item");

  const [view, setView] = useState<View>("categories");
  const [selectedCategory, setSelectedCategory] =
    useState<CodexCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<CodexItem | null>(null);

  useEffect(() => {
    if (!categoryParam) {
      setView("categories");
      setSelectedCategory(null);
      setSelectedItem(null);
      return;
    }
    const cat =
      CODEX_CATEGORIES.find((c) => c.id === categoryParam) ?? null;
    setSelectedCategory(cat);
    if (itemParam && cat) {
      const item = cat.items.find((i) => i.id === itemParam) ?? null;
      setSelectedItem(item);
      setView(item ? "documents" : "items");
    } else {
      setSelectedItem(null);
      setView(cat ? "items" : "categories");
    }
  }, [categoryParam, itemParam]);

  const handleCategoryClick = (cat: CodexCategory) => {
    router.push(`?category=${cat.id}`, { scroll: false });
  };

  const handleItemClick = (item: CodexItem) => {
    if (!selectedCategory) return;
    router.push(`?category=${selectedCategory.id}&item=${item.id}`, {
      scroll: false,
    });
  };

  const handleDocumentClick = (mdxSlug: string) => {
    router.push(`/government/codex/${mdxSlug}`);
  };

  const handleBack = () => {
    if (view === "documents" && selectedCategory) {
      router.push(`?category=${selectedCategory.id}`, { scroll: false });
    } else {
      router.push("/government/codex", { scroll: false });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">CODEX</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Registro de anomalias, transformações e fenômenos documentados
          </p>
        </div>
        {view !== "categories" && (
          <button
            onClick={handleBack}
            className="rounded-xs border border-foreground bg-background px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
          >
            ← VOLTAR
          </button>
        )}
      </div>

      {view === "categories" && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
          {CODEX_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className="group text-left border border-border bg-background border-l-2 border-l-foreground/30 hover:bg-muted hover:border-foreground transition-colors rounded-xs p-4 space-y-2 w-full"
            >
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                CAT · {String(idx + 1).padStart(3, "0")}
              </div>
              <div className="text-lg font-bold uppercase group-hover:underline">
                {cat.name}
              </div>
              {cat.description && (
                <div className="text-xs text-muted-foreground">
                  {cat.description}
                </div>
              )}
              <div className="text-xs font-mono text-muted-foreground pt-2">
                {cat.items.length} ENTRADAS ·{" "}
                {cat.items.reduce(
                  (acc, item) => acc + item.documents.length,
                  0,
                )}{" "}
                DOCUMENTOS
              </div>
            </button>
          ))}
        </div>
      )}

      {view === "items" && selectedCategory && (
        <div className="space-y-3">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {selectedCategory.name} › ITENS
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {selectedCategory.items.map((item) => {
              const itemDoc = item.documents[0]
                ? getDocument(item.documents[0].mdxSlug)
                : undefined;
              const itemFm = itemDoc?.frontmatter;
              const accent = itemFm
                ? CLASS_ACCENT[itemFm.classification]
                : null;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`group text-left border border-border bg-background border-l-2 transition-colors rounded-xs p-4 space-y-2 w-full hover:bg-muted hover:border-foreground ${
                    accent ? accent.rule : "border-l-foreground/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex-1">
                      ENTRADA
                    </div>
                    {itemFm?.threat_tier && (
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wider ${
                          itemFm.threat_tier === "apocalíptica"
                            ? "text-[--c-ultra]"
                            : itemFm.threat_tier === "crítica"
                              ? "text-[--c-secret]"
                              : "text-muted-foreground"
                        }`}
                      >
                        {THREAT_LABEL[itemFm.threat_tier]}
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-bold uppercase group-hover:underline">
                    {item.name}
                  </div>
                  {itemFm?.codex_class && (
                    <div className="text-xs italic text-muted-foreground">
                      classificação técnica · {itemFm.codex_class}
                    </div>
                  )}
                  {item.description && (
                    <div
                      className={`border-l-2 pl-3 text-xs text-muted-foreground ${
                        accent ? accent.rule : "border-l-foreground/30"
                      }`}
                    >
                      {item.description}
                    </div>
                  )}
                  <div className="text-xs font-mono text-muted-foreground pt-2">
                    {itemFm?.designation
                      ? `${TYPE_CODE.codex_entry}/${itemFm.designation} · `
                      : ""}
                    {item.documents.length} DOCS
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {view === "documents" && selectedItem && (
        <div className="space-y-3">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {selectedCategory?.name} › {selectedItem.name} › DOCUMENTOS
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {selectedItem.documents.map((doc) => {
              const docData = getDocument(doc.mdxSlug);
              if (!docData) return null;
              const fm = docData.frontmatter;
              const a = CLASS_ACCENT[fm.classification];
              return (
                <button
                  key={doc.id}
                  onClick={() => handleDocumentClick(doc.mdxSlug)}
                  className="group relative flex flex-col border-2 border-border bg-background shadow-[6px_6px_0_0_rgba(0,0,0,0.10)] transition-all hover:-translate-y-0.5 hover:border-foreground/70 hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.18)] text-left w-full rounded-xs"
                >
                  <div className="flex items-stretch border-b-2 border-border">
                    <div
                      className={`flex items-center justify-center px-3 py-1.5 font-mono text-xs font-extrabold tracking-tight ${a.chip}`}
                    >
                      {TYPE_CODE[fm.type] ?? TYPE_CODE.codex_entry}
                    </div>
                    <div className="flex flex-1 items-center border-l-2 border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      REGISTRO DE CODEX
                    </div>
                    <div
                      className={`flex items-center gap-1.5 border-l-2 border-border px-3 py-1.5 ${a.text}`}
                    >
                      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.22em]">
                        {fm.classification}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      {fm.issued_by}
                    </div>
                    <h3 className="mt-2 font-mono text-base font-bold uppercase tracking-wider text-foreground">
                      {fm.designation} · {fm.codex_name}
                    </h3>
                    {fm.summary && (
                      <p
                        className={`mt-3 line-clamp-2 border-l-2 pl-3 text-xs leading-relaxed text-muted-foreground ${a.rule}`}
                      >
                        {fm.summary}
                      </p>
                    )}
                  </div>
                  <div className="flex items-end justify-between gap-3 border-t border-border bg-muted/40 px-4 py-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      ref ·{" "}
                      <span className="text-foreground">
                        {fm.reference ?? "—"}
                      </span>
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-foreground">
                      {fm.signed_at ?? fm.date}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
