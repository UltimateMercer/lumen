import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { getDocument } from "@/lib/archive/registry";
import { TEMPLATES } from "@/components/documents/index";
import { ALL_PROFILE_SLUGS, findSiblingSlugs, getClassificationForSlug } from "@/data/individuals";
import { DocumentNavigator } from "@/components/government/document-navigator";
import { ClassifiedDocumentClient } from "@/components/government/classified-document-client";
import type { ArchiveDocument, DocumentType } from "@/lib/archive/documents";

export function generateStaticParams() {
  return ALL_PROFILE_SLUGS.map((slug) => ({ slug }));
}

export default async function ProfileDocPage({
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

  const type = doc.frontmatter.type as DocumentType;
  const Template = TEMPLATES[type];

  if (!Template) {
    return (
      <div className="p-8 text-center opacity-50">
        TEMPLATE NÃO ENCONTRADO
      </div>
    );
  }

  const siblingSlugs = findSiblingSlugs(slug);
  const classification = getClassificationForSlug(slug);

  return (
    <ClassifiedDocumentClient fileName={slug} classification={classification}>
      <div>
        <div className="flex items-center justify-between mb-4 border dark:border-[#eaeaea] border-[#252525] rounded-xs p-4">
          <Link
            href="/government/profiles"
            className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
          >
            ← VOLTAR
          </Link>
          <div className="flex items-center gap-4">
            <DocumentNavigator
              slugs={siblingSlugs}
              currentSlug={slug}
              basePath="/government/profiles"
            />
          </div>
        </div>
        <div className="overflow-hidden px-6 max-w-3xl mx-auto no-overlay">
          <Template doc={doc as ArchiveDocument} />
        </div>
      </div>
    </ClassifiedDocumentClient>
  );
}
