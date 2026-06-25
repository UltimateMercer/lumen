"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { AuthGuard } from "@/components/auth-guard";
import { FolderOpen, Folder, ChevronDown } from "lucide-react";
import { CODEX_CATEGORIES } from "@/data/codex";

function findBreadcrumb(slug: string) {
  for (const cat of CODEX_CATEGORIES) {
    for (const item of cat.items) {
      const found = item.documents.find((d) => d.mdxSlug === slug);
      if (found) return { categoryId: cat.id, itemId: item.id };
    }
  }
  return null;
}

export default function CodexDocLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const currentSlug = params.slug as string | undefined;

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    if (!currentSlug) return;
    for (const cat of CODEX_CATEGORIES) {
      for (const item of cat.items) {
        if (item.documents.some((d) => d.mdxSlug === currentSlug)) {
          setExpandedCategory(cat.id);
          setExpandedItem(item.id);
          return;
        }
      }
    }
  }, [currentSlug]);

  const toggleCategory = (catId: string) => {
    if (expandedCategory === catId) {
      setExpandedCategory(null);
      setExpandedItem(null);
    } else {
      setExpandedCategory(catId);
      setExpandedItem(null);
    }
  };

  const toggleItem = (itemId: string) => {
    setExpandedItem((prev) => (prev === itemId ? null : itemId));
  };

  const breadcrumb = currentSlug ? findBreadcrumb(currentSlug) : null;

  const sidebar = (
    <div className="space-y-1">
      <div className="text-xs font-bold text-muted-foreground mb-2 px-2">
        CODEX
      </div>
      {CODEX_CATEGORIES.map((cat) => {
        const isCategoryExpanded = expandedCategory === cat.id;
        return (
          <div key={cat.id}>
            <button
              onClick={() => toggleCategory(cat.id)}
              className="w-full text-left px-2 py-2 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="truncate uppercase font-bold">
                  {cat.name}
                </span>
                {isCategoryExpanded ? (
                  <FolderOpen className="w-4 h-4 shrink-0" />
                ) : (
                  <Folder className="w-4 h-4 shrink-0" />
                )}
              </div>
            </button>
            {isCategoryExpanded && (
              <div className="ml-4 space-y-1 mt-1">
                {cat.items.map((item) => {
                  const isItemExpanded = expandedItem === item.id;
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full text-left px-2 py-1.5 text-[10px] font-mono border border-foreground/60 bg-background hover:bg-muted transition-colors flex items-center justify-between uppercase tracking-wider text-muted-foreground"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            isItemExpanded ? "rotate-0" : "-rotate-90"
                          }`}
                        />
                      </button>
                      {isItemExpanded && (
                        <div className="ml-2 space-y-1 mt-1">
                          {item.documents.map((doc) => {
                            const isActive = doc.mdxSlug === currentSlug;
                            return (
                              <Link
                                key={doc.id}
                                href={`/government/codex/${doc.mdxSlug}`}
                                className={`w-full text-left px-2 py-1.5 text-xs font-mono border transition-colors flex items-center gap-2 uppercase ${
                                  isActive
                                    ? "border-foreground bg-foreground/10 text-foreground"
                                    : "border-foreground bg-background hover:bg-muted text-foreground"
                                }`}
                              >
                                → {doc.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <AuthGuard requireGovernment>
      <div className="grid md:grid-cols-[250px_1fr] gap-px h-full">
        <div className="hidden md:block sticky lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] lg:top-[57px] top-12 p-2 bg-[#eaeaea] dark:bg-[#252525] overflow-y-auto rounded-xs">
          {breadcrumb && (
            <Link
              href={`/government/codex?category=${breadcrumb.categoryId}&item=${breadcrumb.itemId}`}
              className="block mb-2 px-2 text-[10px] font-mono text-muted-foreground hover:underline"
            >
              ← VOLTAR AO CODEX
            </Link>
          )}
          {sidebar}
        </div>
        <main className="bg-[#eaeaea] dark:bg-[#252525] p-4 lg:min-h-[calc(100vh-65px)] min-h-[calc(100vh-56px)] rounded-xs">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlug ?? "empty"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.15 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </AuthGuard>
  );
}
