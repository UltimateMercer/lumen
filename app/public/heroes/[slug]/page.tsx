import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { getAllDocuments, getDocument } from "@/lib/archive/registry";
import { canViewDocument } from "@/lib/archive/visibility";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { PermitCardPublicView } from "@/components/documents/templates/permit-card-public-view";

export function generateStaticParams() {
  return getAllDocuments()
    .filter((d) => d.frontmatter.type === "permit-card")
    .filter((d) => canViewDocument(d.frontmatter, { accessLevel: "public" }))
    .map((d) => ({ slug: d.frontmatter.slug }));
}

export default async function HeroPublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = getDocument(slug);
  if (!raw || raw.frontmatter.type !== "permit-card") notFound();

  const mdxSource = await serialize(raw.mdx);
  const doc: ArchiveDocument = { ...raw, mdxSource };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <PermitCardPublicView doc={doc} />
    </div>
  );
}
