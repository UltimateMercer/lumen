"use client";

import { useParams } from "next/navigation";
import { ArchiveSidebar } from "@/components/government/archive-sidebar";
import { classified } from "@/data/classified";
import type { Document } from "@/utils/government-data";

const STATUS_CLASS: Record<string, string> = {
  ATIVO: "text-[var(--c-public)]",
  SUSPENSO: "text-[var(--c-confidential)]",
  ENCERRADO: "text-muted-foreground",
  COMPROMETIDO: "text-[var(--c-ultra)]",
};

const sections = classified.map((entity) => ({
  id: entity.slug,
  name: entity.name,
  meta: {
    label: entity.status,
    className: STATUS_CLASS[entity.status] ?? "text-muted-foreground",
  },
  documents: entity.documents.map((doc) => ({
    id: doc.id,
    name: doc.name,
    mdxSlug: (doc as Document).mdxSlug,
  })),
  groups: entity.documentGroups?.map((grp) => ({
    groupId: grp.groupId,
    groupName: grp.groupName,
    documents: grp.documents.map((doc) => ({
      id: doc.id,
      name: doc.name,
      mdxSlug: (doc as Document).mdxSlug,
    })),
  })),
}));

function findBackHref(slug: string) {
  for (const entity of classified) {
    const inDocs = entity.documents.some(
      (d) => (d as Document).mdxSlug === slug,
    );
    const inGroups = entity.documentGroups?.some((g) =>
      g.documents.some((d) => (d as Document).mdxSlug === slug),
    );
    if (inDocs || inGroups) {
      return `/government/classified?project=${entity.slug}`;
    }
  }
  return "/government/classified";
}

export default function ClassifiedSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentSlug = params.slug as string | undefined;
  const backHref = currentSlug
    ? findBackHref(currentSlug)
    : "/government/classified";

  return (
    <div className="grid md:grid-cols-[250px_1fr] gap-px h-full dark:bg-[#eaeaea] bg-[#252525] rounded-xs">
      <div className="hidden md:block sticky lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] lg:top-[57px] top-12 p-2 bg-[#eaeaea] dark:bg-[#252525] overflow-y-auto rounded-xs">
        <ArchiveSidebar
          label="ARQUIVOS"
          sections={sections}
          currentSlug={currentSlug}
          basePath="/government/classified"
          backHref={backHref}
          backLabel="← VOLTAR AOS ARQUIVOS"
        />
      </div>
      <main className="bg-[#eaeaea] dark:bg-[#252525] min-h-full rounded-xs p-4">
        {children}
      </main>
    </div>
  );
}
