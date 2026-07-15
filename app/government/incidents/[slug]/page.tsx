import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDocument } from "@/lib/archive/registry";
import { IncidentTemplate } from "@/components/documents/templates/incident-template";
import { IncidentsDocumentClient } from "@/components/government/incidents-document-client";
import { INCIDENTS } from "@/data/incidents";

export function generateStaticParams() {
  return INCIDENTS.map((i) => ({ slug: i.mdxSlug }));
}

export default async function IncidentDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = getDocument(slug);
  if (!raw) notFound();

  const mdxSource = await serialize(raw.mdx, {
    mdxOptions: { development: false },
  });
  const doc = { ...raw, mdxSource };

  const idx = INCIDENTS.findIndex((i) => i.mdxSlug === slug);
  const inc = INCIDENTS[idx];

  return (
    <IncidentsDocumentClient
      fileName={slug}
      classification={inc?.classification ?? "ULTRA-SECRETO"}
    >
      <div>
        <div className="flex items-center justify-between mb-4 border dark:border-[#eaeaea] border-[#252525] rounded-xs p-4">
          <Link
            href="/government/incidents"
            className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
          >
            ← VOLTAR
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-muted-foreground">
              REGISTRO {idx + 1} DE {INCIDENTS.length}
            </span>

            <div className="flex gap-2">
              {idx > 0 ? (
                <Link
                  href={`/government/incidents/${INCIDENTS[idx - 1].mdxSlug}`}
                  className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
                >
                  ← ANTERIOR
                </Link>
              ) : (
                <span className="rounded-xs border dark:border-[#eaeaea]/30 border-[#252525]/30 bg-transparent px-3 py-1.5 text-xs font-mono text-muted-foreground opacity-30 cursor-not-allowed">
                  ← ANTERIOR
                </span>
              )}
              {idx < INCIDENTS.length - 1 ? (
                <Link
                  href={`/government/incidents/${INCIDENTS[idx + 1].mdxSlug}`}
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
          <IncidentTemplate doc={doc} />
        </div>
      </div>
    </IncidentsDocumentClient>
  );
}
