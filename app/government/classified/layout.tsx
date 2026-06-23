"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AuthGuard } from "@/components/auth-guard";
import { FolderOpen, Folder, ChevronDown } from "lucide-react";
import { classified } from "@/data/classified";
import type { Entity } from "@/utils/government-data";

const statusColors: Record<string, string> = {
  ATIVO: "text-green-600 dark:text-green-400",
  INATIVO: "text-gray-500 dark:text-gray-400",
  DESCLASSIFICADO: "text-blue-600 dark:text-blue-400",
};

export default function ClassifiedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const currentSlug = params.slug as string | undefined;

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemName: string) => {
    const next = new Set(expandedItems);
    if (next.has(itemName)) next.delete(itemName);
    else next.add(itemName);
    setExpandedItems(next);
  };

  const toggleGroup = (entitySlug: string, groupId: string) => {
    const key = `${entitySlug}-${groupId}`;
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // lookup map: doc.id → mdxSlug
  const slugMap = new Map<string, string>();
  for (const e of classified) {
    for (const d of e.documents) {
      if ("mdxSlug" in d && d.mdxSlug) slugMap.set(d.id, d.mdxSlug);
    }
    for (const g of e.documentGroups ?? []) {
      for (const d of g.documents) {
        if ("mdxSlug" in d && d.mdxSlug) slugMap.set(d.id, d.mdxSlug);
      }
    }
  }

  const handleDocClick = (entity: Entity, docId: string) => {
    const mdxSlug = slugMap.get(docId);
    if (mdxSlug) {
      router.push(`/government/classified/${mdxSlug}`);
    }
  };

  const sidebar = (
    <div className="space-y-1">
      <div className="text-xs font-bold text-muted-foreground mb-2 px-2">
        ARQUIVOS:
      </div>
      {classified.map((entity) => (
        <div key={entity.name}>
          <button
            onClick={() => toggleExpanded(entity.name)}
            className="w-full text-left px-2 py-2 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="truncate uppercase font-bold">
                {entity.name}
              </span>
              {expandedItems.has(entity.name) ? (
                <FolderOpen className="w-4 h-4 shrink-0" />
              ) : (
                <Folder className="w-4 h-4 shrink-0" />
              )}
            </div>
            <div
              className={`text-[10px] mt-0.5 ${statusColors[entity.status] || ""}`}
            >
              {entity.status}
            </div>
          </button>
          {expandedItems.has(entity.name) && (
            <div className="ml-4 space-y-1 mt-1">
              {entity.documents.map((doc) => {
                const mdxSlug = slugMap.get(doc.id);
                const isActive = !!mdxSlug && currentSlug === mdxSlug;
                return (
                  <button
                    key={doc.id}
                    onClick={() => handleDocClick(entity, doc.id)}
                    className={`w-full text-left px-2 py-1.5 text-xs font-mono border transition-colors flex items-center gap-2 uppercase ${
                      isActive
                        ? "border-foreground bg-foreground/10 text-foreground"
                        : "border-foreground bg-background hover:bg-muted text-foreground"
                    } ${!mdxSlug ? "opacity-40 cursor-default" : ""}`}
                  >
                    → {doc.name}
                  </button>
                );
              })}
              {entity.documentGroups?.map((group) => (
                <div key={group.groupId} className="ml-2">
                  <button
                    onClick={() => toggleGroup(entity.slug, group.groupId)}
                    className="w-full text-left px-2 py-1.5 text-[10px] font-mono border border-foreground/60 bg-background hover:bg-muted transition-colors flex items-center justify-between uppercase tracking-wider text-muted-foreground"
                  >
                    <span>{group.groupName}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        expandedGroups.has(
                          `${entity.slug}-${group.groupId}`,
                        )
                          ? "rotate-0"
                          : "-rotate-90"
                      }`}
                    />
                  </button>
                  {expandedGroups.has(`${entity.slug}-${group.groupId}`) && (
                    <div className="ml-2 space-y-1 mt-1">
                      {group.documents.map((doc) => {
                        const mdxSlug = slugMap.get(doc.id);
                        const isActive =
                          !!mdxSlug && currentSlug === mdxSlug;
                        return (
                          <button
                            key={doc.id}
                            onClick={() => handleDocClick(entity, doc.id)}
                            className={`w-full text-left px-2 py-1.5 text-xs font-mono border transition-colors flex items-center gap-2 uppercase ${
                              isActive
                                ? "border-foreground bg-foreground/10 text-foreground"
                                : "border-foreground bg-background hover:bg-muted text-foreground"
                            } ${!mdxSlug ? "opacity-40 cursor-default" : ""}`}
                          >
                            → {doc.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <AuthGuard requireGovernment>
      <div className="grid md:grid-cols-[250px_1fr] gap-px h-full">
        <div className="hidden md:block sticky lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] lg:top-[57px] top-12 p-2 bg-[#eaeaea] dark:bg-[#252525] overflow-y-auto rounded-xs">
          {sidebar}
        </div>
        <main className="bg-[#eaeaea] dark:bg-[#252525] p-4 lg:min-h-[calc(100vh-65px)] min-h-[calc(100vh-56px)] rounded-xs">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
