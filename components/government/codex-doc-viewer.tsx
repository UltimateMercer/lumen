"use client";

import { useRouter } from "next/navigation";
import { TEMPLATES } from "@/components/documents/index";
import type { ArchiveDocument, DocumentType } from "@/lib/archive/documents";

interface CodexDocViewerProps {
  doc: ArchiveDocument;
}

export function CodexDocViewer({ doc }: CodexDocViewerProps) {
  const router = useRouter();
  const type = doc.frontmatter.type as DocumentType;
  const Template = TEMPLATES[type];

  if (!Template) {
    return (
      <div className="p-8 text-center opacity-50">
        TEMPLATE NÃO ENCONTRADO
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-4 border dark:border-[#eaeaea] border-[#252525] rounded-xs p-4">
        <button
          onClick={() => router.back()}
          className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
        >
          ← VOLTAR
        </button>
      </div>

      <div className="overflow-hidden px-6 max-w-3xl mx-auto no-overlay">
        <Template doc={doc} />
      </div>
    </div>
  );
}
