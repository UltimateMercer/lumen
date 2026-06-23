"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CODEX_CATEGORIES } from "@/data/codex";
import type { CodexCategory, CodexItem } from "@/data/codex";

type View = "categories" | "items" | "documents";

export default function CodexIndex() {
  const router = useRouter();
  const [view, setView] = useState<View>("categories");
  const [selectedCategory, setSelectedCategory] = useState<CodexCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<CodexItem | null>(null);

  const handleCategoryClick = (cat: CodexCategory) => {
    setSelectedCategory(cat);
    setView("items");
  };

  const handleItemClick = (item: CodexItem) => {
    setSelectedItem(item);
    setView("documents");
  };

  const handleDocumentClick = (mdxSlug: string) => {
    router.push(`/government/codex/${mdxSlug}`);
  };

  const handleBack = () => {
    if (view === "documents") {
      setView("items");
      setSelectedItem(null);
    } else if (view === "items") {
      setView("categories");
      setSelectedCategory(null);
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
          {CODEX_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className="group text-left border border-foreground bg-background hover:bg-muted transition-colors rounded-xs p-4 space-y-2"
            >
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                CATEGORIA
              </div>
              <div className="text-lg font-bold group-hover:underline">
                {cat.name}
              </div>
              {cat.description && (
                <div className="text-sm text-muted-foreground">
                  {cat.description}
                </div>
              )}
              <div className="text-xs font-mono text-muted-foreground pt-2">
                {cat.items.reduce((acc, item) => acc + item.documents.length, 0)}{" "}
                {cat.items.reduce((acc, item) => acc + item.documents.length, 0) === 1 ? "DOCUMENTO" : "DOCUMENTOS"}
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
            {selectedCategory.items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="group text-left border border-foreground bg-background hover:bg-muted transition-colors rounded-xs p-4 space-y-2"
              >
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  ENTRADA
                </div>
                <div className="text-lg font-bold group-hover:underline">
                  {item.name}
                </div>
                {item.description && (
                  <div className="text-sm text-muted-foreground">
                    {item.description}
                  </div>
                )}
                <div className="text-xs font-mono text-muted-foreground pt-2">
                  {item.documents.length}{" "}
                  {item.documents.length === 1 ? "DOCUMENTO" : "DOCUMENTOS"}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {view === "documents" && selectedItem && (
        <div className="space-y-3">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {selectedCategory?.name} › {selectedItem.name} › DOCUMENTOS
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {selectedItem.documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => handleDocumentClick(doc.mdxSlug)}
                className="group text-left border border-foreground bg-background hover:bg-muted transition-colors rounded-xs p-4 space-y-2"
              >
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  CODEX ENTRY
                </div>
                <div className="text-lg font-bold group-hover:underline">
                  {doc.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
