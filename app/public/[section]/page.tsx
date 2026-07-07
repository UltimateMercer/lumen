import Link from "next/link";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { getAllDocuments } from "@/lib/archive/registry";
import { getDocumentsBySection } from "@/lib/archive/visibility";
import type { ArchiveDocument } from "@/lib/archive/documents";

const VALID_SECTIONS = ["library", "history", "news"] as const;

const SECTION_LABEL: Record<string, string> = {
  library: "Biblioteca Pública",
  history: "História de Arcanum",
  news: "Notícias e Comunicados",
};

const SECTION_DESC: Record<string, string> = {
  library: "Acervo de documentos públicos e registros do Codex",
  history: "Registros históricos oficiais",
  news: "Comunicados oficiais e boletins",
};

export function generateStaticParams() {
  return VALID_SECTIONS.map((section) => ({ section }));
}

export default async function PublicSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!VALID_SECTIONS.includes(section as typeof VALID_SECTIONS[number])) {
    notFound();
  }

  const allDocs = getAllDocuments();
  const sectionDocs = getDocumentsBySection(
    allDocs,
    section,
    { accessLevel: "public" },
  );

  const docsWithSource = await Promise.all(
    sectionDocs.map(async (doc) => ({
      ...doc,
      mdxSource: await serialize(doc.mdx),
    })),
  );

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{SECTION_LABEL[section]}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {SECTION_DESC[section]}
        </p>
      </div>

      {docsWithSource.length === 0 ? (
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-xs p-12 text-center">
          <p className="text-muted-foreground/50 text-sm">
            Nenhum documento disponível nesta seção.
          </p>
          <p className="text-muted-foreground/30 text-xs mt-2">
            Novos registros serão adicionados em atualizações futuras.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {docsWithSource.map((doc) => (
            <Link
              key={doc.frontmatter.slug}
              href={`/public/${section}/${doc.frontmatter.slug}`}
              className="block border-2 border-border rounded-xs p-4 hover:bg-muted transition-colors"
            >
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {doc.frontmatter.date}
              </div>
              <h2 className="text-lg font-bold mt-1">
                {doc.frontmatter.title}
              </h2>
              {doc.frontmatter.summary && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {doc.frontmatter.summary}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
