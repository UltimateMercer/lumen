"use client";

import { useParams } from "next/navigation";
import { ArchiveSidebar } from "@/components/government/archive-sidebar";
import { getProfileSections } from "@/data/individuals";

export default function ProfileSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const currentSlug = params.slug as string | undefined;
  const sections = getProfileSections();

  return (
    <div className="grid md:grid-cols-[250px_1fr] gap-px h-full dark:bg-[#eaeaea] bg-[#252525] rounded-xs">
      <div className="hidden md:block sticky lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] lg:top-14.25 top-12 p-2 bg-[#eaeaea] dark:bg-[#252525] overflow-y-auto rounded-xs">
        <ArchiveSidebar
          label="PERFIS"
          sections={sections}
          currentSlug={currentSlug}
          basePath="/government/profiles"
          backHref="/government/profiles"
          backLabel="← VOLTAR AOS PERFIS"
        />
      </div>
      <main className="bg-[#eaeaea] dark:bg-[#252525] min-h-full rounded-xs p-4">
        {children}
      </main>
    </div>
  );
}
