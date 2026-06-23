import { serialize } from "next-mdx-remote/serialize";
import { getDocument } from "@/lib/archive/registry";
import { CODEX_CATEGORIES } from "@/data/codex";
import { CodexDocViewer } from "@/components/government/codex-doc-viewer";

const ALL_SLUGS = CODEX_CATEGORIES.flatMap((cat) =>
  cat.items.flatMap((item) => item.documents.map((doc) => doc.mdxSlug)),
);

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export default async function CodexDocPage({
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
  const doc = { ...raw, mdxSource };

  return <CodexDocViewer doc={doc} />;
}
