"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { TEMPLATES } from "@/components/documents/index";
import type { ArchiveDocument, DocumentType } from "@/lib/archive/documents";
import { CODEX_CATEGORIES } from "@/data/codex";
import { DocumentNavigator } from "@/components/government/document-navigator";

function findItemSlugs(slug: string): string[] {
  for (const cat of CODEX_CATEGORIES) {
    for (const item of cat.items) {
      const found = item.documents.find((d) => d.mdxSlug === slug);
      if (found) return item.documents.map((d) => d.mdxSlug);
    }
  }
  return [];
}

interface CodexDocViewerProps {
  doc: ArchiveDocument;
}

export function CodexDocViewer({ doc }: CodexDocViewerProps) {
  const router = useRouter();
  const type = doc.frontmatter.type as DocumentType;
  const Template = TEMPLATES[type];
  const slug = doc.frontmatter.slug;
  const itemSlugs = type !== "batch" ? findItemSlugs(slug) : [];

  if (!Template) {
    return (
      <div className="p-8 text-center opacity-50">
        TEMPLATE NÃO ENCONTRADO
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 border dark:border-[#eaeaea] border-[#252525] rounded-xs p-4">
        <button
          onClick={() => router.back()}
          className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
        >
          ← VOLTAR
        </button>

        {itemSlugs.length > 1 && (
          <div className="flex items-center gap-4">
            <DocumentNavigator
              slugs={itemSlugs}
              currentSlug={slug}
              basePath="/government/codex"
            />
          </div>
        )}
      </div>

      <div className="overflow-hidden px-6 max-w-3xl mx-auto no-overlay">
        <motion.div
          key={slug}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.15 }}
        >
          <Template doc={doc} />
        </motion.div>
      </div>
    </div>
  );
}
