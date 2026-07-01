"use client";

import { useParams } from "next/navigation";
import { AuthGuard } from "@/components/auth-guard";
import { ArchiveSidebar } from "@/components/government/archive-sidebar";
import { CODEX_CATEGORIES } from "@/data/codex";

function findBreadcrumb(slug: string) {
  for (const cat of CODEX_CATEGORIES) {
    for (const item of cat.items) {
      if (item.documents.some((d) => d.mdxSlug === slug)) {
        return `?category=${cat.id}&item=${item.id}`;
      }
    }
  }
  return null;
}

const sections = CODEX_CATEGORIES.map((cat) => ({
  id: cat.id,
  name: cat.name,
  documents: [],
  groups: cat.items.map((item) => ({
    groupId: item.id,
    groupName: item.name,
    documents: item.documents,
  })),
}));

export default function CodexDocLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentSlug = params.slug as string | undefined;
  const breadcrumbParams = currentSlug ? findBreadcrumb(currentSlug) : null;

  return (
    <AuthGuard requireGovernment>
      <div className="grid md:grid-cols-[250px_1fr] gap-px h-full">
        <div className="hidden md:block sticky lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] lg:top-[57px] top-12 p-2 bg-[#eaeaea] dark:bg-[#252525] overflow-y-auto rounded-xs">
          <ArchiveSidebar
            label="CODEX"
            sections={sections}
            currentSlug={currentSlug}
            basePath="/government/codex"
            backHref={breadcrumbParams ? `/government/codex${breadcrumbParams}` : undefined}
            backLabel="← VOLTAR AO CODEX"
          />
        </div>
        <main className="bg-[#eaeaea] dark:bg-[#252525] p-4 lg:min-h-[calc(100vh-65px)] min-h-[calc(100vh-56px)] rounded-xs">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
