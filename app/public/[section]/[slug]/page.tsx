import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { getAllDocuments, getDocument } from "@/lib/archive/registry";
import { canViewDocument } from "@/lib/archive/visibility";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { PublicDocViewer } from "@/components/public/public-doc-viewer";

export function generateStaticParams() {
  const allDocs = getAllDocuments();

  const visibleBySection = allDocs.filter(
    (d) =>
      d.frontmatter.section &&
      canViewDocument(d.frontmatter, { accessLevel: "public" }),
  );

  return visibleBySection.map((d) => ({
    section: d.frontmatter.section as string,
    slug: d.frontmatter.slug,
  }));
}

export default async function PublicSectionDocPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;

  const raw = getDocument(slug);
  if (!raw || raw.frontmatter.section !== section) notFound();

  const mdxSource = await serialize(raw.mdx);
  const doc: ArchiveDocument = { ...raw, mdxSource };

  return <PublicDocViewer doc={doc} section={section} />;
}
