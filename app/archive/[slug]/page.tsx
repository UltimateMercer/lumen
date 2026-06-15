import Link from "next/link";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { getDocument, getAllSlugs, getBatchItems } from "@/lib/archive/registry";
import { CLASSIFICATION_TOKEN, DOCUMENT_TYPE_LABEL, type ArchiveDocument } from "@/lib/archive/documents";
import { TEMPLATES } from "@/components/documents/index";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function ArchiveDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocument(slug);
  if (!doc) notFound();

  const allSlugs = getAllSlugs().sort();
  const idx = allSlugs.indexOf(slug);
  const prevSlug = idx > 0 ? allSlugs[idx - 1] : null;
  const nextSlug = idx < allSlugs.length - 1 ? allSlugs[idx + 1] : null;

  const mdxSource = await serialize(doc.mdx);
  const docWithSource = { ...doc, mdxSource } as ArchiveDocument & { batchItems?: Array<{ slug: string; role?: string; note?: string; doc?: ArchiveDocument }> };

  // Pre-serialize each batch item's MDX so child templates receive mdxSource
  if (doc.frontmatter.type === "batch") {
    const items = getBatchItems(doc.frontmatter);
    docWithSource.batchItems = await Promise.all(
      items.map(async (it) => {
        if (!it.doc) return it;
        const itemSource = await serialize(it.doc.mdx);
        return { ...it, doc: { ...it.doc, mdxSource: itemSource } };
      }),
    );
  }

  const Template = TEMPLATES[doc.frontmatter.type];

  return (
    <div className="min-h-screen">
      <nav className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4 text-xs uppercase tracking-[0.2em]">
        <Link
          href="/archive"
          className="text-muted-foreground hover:text-amber-crt transition-colors"
        >
          ← Arquivo
        </Link>
        <div className="flex items-center gap-4">
          {prevSlug ? (
            <Link
              href={`/archive/${prevSlug}`}
              className="text-muted-foreground hover:text-amber-crt transition-colors"
            >
              ← anterior
            </Link>
          ) : (
            <span className="text-muted-foreground/30">← anterior</span>
          )}
          <span className="text-muted-foreground/50">|</span>
          {nextSlug ? (
            <Link
              href={`/archive/${nextSlug}`}
              className="text-muted-foreground hover:text-amber-crt transition-colors"
            >
              próximo →
            </Link>
          ) : (
            <span className="text-muted-foreground/30">próximo →</span>
          )}
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 pb-2 text-center">
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${CLASSIFICATION_TOKEN[doc.frontmatter.classification]}`}>
          {doc.frontmatter.classification}
        </span>
        <span className="mx-2 text-muted-foreground/40">·</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {DOCUMENT_TYPE_LABEL[doc.frontmatter.type]}
        </span>
      </div>

      <Template doc={docWithSource} />
    </div>
  );
}
