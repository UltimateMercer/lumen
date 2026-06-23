import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { getDocument, getBatchItems } from "@/lib/archive/registry";
import { TEMPLATES } from "@/components/documents/index";
import type { ArchiveDocument, DocumentType } from "@/lib/archive/documents";

const ALL_SLUGS = [
  "red-suns-batch",
  "red-suns-overview",
  "red-suns-training",
  "red-suns-evaluation",
  "red-suns-specialized",
  "red-suns-psychological",
  "red-suns-score-guide",
  "red-suns-classification",
  "red-suns-annex-a",
  "red-suns-annex-b",
  "red-suns-annex-c",
  "red-suns-annex-d",
];

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export default async function ClassifiedDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = getDocument(slug);
  if (!raw) {
    return (
      <div className="p-8 text-center opacity-50">
        DOCUMENTO NÃO ENCONTRADO
      </div>
    );
  }

  const mdxSource = await serialize(raw.mdx);
  const doc: ArchiveDocument = { ...raw, mdxSource };

  let augmentedDoc: ArchiveDocument & {
    batchItems?: Array<{
      slug: string;
      role?: string;
      note?: string;
      doc?: ArchiveDocument;
    }>;
  } = doc;

  if (doc.frontmatter.type === "batch") {
    const items = getBatchItems(doc.frontmatter);
    const sources = await Promise.all(
      items.map(async (it) => {
        if (!it.doc) return null;
        return { slug: it.slug, source: await serialize(it.doc.mdx) };
      }),
    );
    const sourceMap = Object.fromEntries(
      sources.filter(Boolean).map((s) => [s!.slug, s!.source]),
    );
    const batchItems = items.map((it) => ({
      ...it,
      doc:
        it.doc && sourceMap[it.slug]
          ? { ...it.doc, mdxSource: sourceMap[it.slug] }
          : it.doc,
    }));
    augmentedDoc = { ...doc, batchItems };
  }

  const idx = ALL_SLUGS.indexOf(slug);
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
      <div className="flex items-center justify-between mb-4 border dark:border-[#eaeaea] border-[#252525] rounded-xs p-4">
        <Link
          href="/government/classified"
          className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
        >
          ← VOLTAR
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-muted-foreground">
            DOCUMENTO {idx + 1} DE {ALL_SLUGS.length}
          </span>

          <div className="flex gap-2">
            {idx > 0 ? (
              <Link
                href={`/government/classified/${ALL_SLUGS[idx - 1]}`}
                className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
              >
                ← ANTERIOR
              </Link>
            ) : (
              <span className="rounded-xs border dark:border-[#eaeaea]/30 border-[#252525]/30 bg-transparent px-3 py-1.5 text-xs font-mono text-muted-foreground opacity-30 cursor-not-allowed">
                ← ANTERIOR
              </span>
            )}
            {idx < ALL_SLUGS.length - 1 ? (
              <Link
                href={`/government/classified/${ALL_SLUGS[idx + 1]}`}
                className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
              >
                PRÓXIMO →
              </Link>
            ) : (
              <span className="rounded-xs border dark:border-[#eaeaea]/30 border-[#252525]/30 bg-transparent px-3 py-1.5 text-xs font-mono text-muted-foreground opacity-30 cursor-not-allowed">
                PRÓXIMO →
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden px-6 max-w-3xl mx-auto no-overlay">
        <Template doc={augmentedDoc as ArchiveDocument} />
      </div>
    </div>
  );
}
