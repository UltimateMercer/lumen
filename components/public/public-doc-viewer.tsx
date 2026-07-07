import Link from "next/link";
import type { ArchiveDocument, DocumentType } from "@/lib/archive/documents";
import { DOCUMENT_TYPE_LABEL } from "@/lib/archive/documents";
import { TEMPLATES } from "@/components/documents/index";

interface PublicDocViewerProps {
  doc: ArchiveDocument;
  section: string;
}

export function PublicDocViewer({ doc, section }: PublicDocViewerProps) {
  const type = doc.frontmatter.type as DocumentType;
  const Template = TEMPLATES[type];

  if (!Template) {
    return (
      <div className="p-8 text-center opacity-50">
        CONTEÚDO INDISPONÍVEL
      </div>
    );
  }

  const sectionLabel: Record<string, string> = {
    library: "Biblioteca",
    history: "História",
    news: "Notícias",
  };

  return (
    <div className="min-h-screen pb-10">
      <nav className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-4 text-xs uppercase tracking-[0.2em]">
        <Link
          href={`/public/${section}`}
          className="text-muted-foreground hover:text-amber-crt transition-colors"
        >
          ← {sectionLabel[section] ?? section}
        </Link>
      </nav>

      <div className="mx-auto max-w-4xl px-6 pb-2 text-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {DOCUMENT_TYPE_LABEL[doc.frontmatter.type]}
        </span>
      </div>

      <Template doc={doc} />
    </div>
  );
}
