"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FolderOpen, Folder, ChevronDown } from "lucide-react";

interface SidebarDocument {
  id: string;
  name: string;
  mdxSlug?: string;
}

interface SidebarGroup {
  groupId: string;
  groupName: string;
  documents: SidebarDocument[];
}

interface SidebarSectionMeta {
  label: string;
  className?: string;
}

interface SidebarSection {
  id: string;
  name: string;
  meta?: SidebarSectionMeta;
  documents: SidebarDocument[];
  groups?: SidebarGroup[];
}

interface ArchiveSidebarProps {
  label: string;
  sections: SidebarSection[];
  currentSlug?: string;
  backHref?: string;
  backLabel?: string;
  basePath: string;
}

function initialExpanded(slug: string | undefined, sections: SidebarSection[]) {
  if (!slug) return { section: null, group: null };
  for (const sec of sections) {
    for (const doc of sec.documents) {
      if (doc.mdxSlug === slug) return { section: sec.id, group: null };
    }
    for (const grp of sec.groups ?? []) {
      for (const doc of grp.documents) {
        if (doc.mdxSlug === slug) return { section: sec.id, group: grp.groupId };
      }
    }
  }
  return { section: null, group: null };
}

export function ArchiveSidebar({
  label,
  sections,
  currentSlug,
  backHref,
  backLabel,
  basePath,
}: ArchiveSidebarProps) {
  const { section: initSection, group: initGroup } = initialExpanded(currentSlug, sections);
  const [expandedSection, setExpandedSection] = useState<string | null>(initSection);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(initGroup);

  useEffect(() => {
    const { section, group } = initialExpanded(currentSlug, sections);
    setExpandedSection(section);
    setExpandedGroup(group);
  }, [currentSlug, sections]);

  const toggleSection = (id: string) => {
    if (expandedSection === id) {
      setExpandedSection(null);
      setExpandedGroup(null);
    } else {
      setExpandedSection(id);
      setExpandedGroup(null);
    }
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroup((prev) => (prev === groupId ? null : groupId));
  };

  return (
    <div className="space-y-1">
      <div className="text-xs font-bold text-muted-foreground mb-2 px-2">
        {label}
      </div>

      {backHref && (
        <Link
          href={backHref}
          className="block mb-2 px-2 text-[10px] font-mono text-muted-foreground hover:underline"
        >
          {backLabel ?? "← VOLTAR"}
        </Link>
      )}

      {sections.map((sec) => {
        const isSectionExpanded = expandedSection === sec.id;
        return (
          <div key={sec.id}>
            <button
              onClick={() => toggleSection(sec.id)}
              className="w-full text-left px-2 py-2 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="truncate uppercase font-bold">{sec.name}</span>
                {isSectionExpanded
                  ? <FolderOpen className="w-4 h-4 shrink-0" />
                  : <Folder className="w-4 h-4 shrink-0" />
                }
              </div>
              {sec.meta && (
                <div className={`text-[10px] mt-0.5 ${sec.meta.className ?? "text-muted-foreground"}`}>
                  {sec.meta.label}
                </div>
              )}
            </button>

            {isSectionExpanded && (
              <div className="ml-4 space-y-1 mt-1">
                {sec.documents.map((doc) => {
                  const isActive = !!doc.mdxSlug && doc.mdxSlug === currentSlug;
                  return doc.mdxSlug ? (
                    <Link
                      key={doc.id}
                      href={`${basePath}/${doc.mdxSlug}`}
                      className={`w-full text-left px-2 py-1.5 text-xs font-mono border transition-colors flex items-center gap-2 uppercase ${
                        isActive
                          ? "border-foreground bg-foreground/10 text-foreground"
                          : "border-foreground bg-background hover:bg-muted text-foreground"
                      }`}
                    >
                      → {doc.name}
                    </Link>
                  ) : (
                    <div
                      key={doc.id}
                      className="w-full text-left px-2 py-1.5 text-xs font-mono border border-foreground/30 bg-background text-foreground opacity-40 cursor-default flex items-center gap-2 uppercase"
                    >
                      → {doc.name}
                    </div>
                  );
                })}

                {sec.groups?.map((grp) => {
                  const isGroupExpanded = expandedGroup === grp.groupId;
                  return (
                    <div key={grp.groupId} className="ml-2">
                      <button
                        onClick={() => toggleGroup(grp.groupId)}
                        className="w-full text-left px-2 py-1.5 text-[10px] font-mono border border-foreground/60 bg-background hover:bg-muted transition-colors flex items-center justify-between uppercase tracking-wider text-muted-foreground"
                      >
                        <span>{grp.groupName}</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            isGroupExpanded ? "rotate-0" : "-rotate-90"
                          }`}
                        />
                      </button>

                      {isGroupExpanded && (
                        <div className="ml-2 space-y-1 mt-1">
                          {grp.documents.map((doc) => {
                            const isActive = !!doc.mdxSlug && doc.mdxSlug === currentSlug;
                            return doc.mdxSlug ? (
                              <Link
                                key={doc.id}
                                href={`${basePath}/${doc.mdxSlug}`}
                                className={`w-full text-left px-2 py-1.5 text-xs font-mono border transition-colors flex items-center gap-2 uppercase ${
                                  isActive
                                    ? "border-foreground bg-foreground/10 text-foreground"
                                    : "border-foreground bg-background hover:bg-muted text-foreground"
                                }`}
                              >
                                → {doc.name}
                              </Link>
                            ) : (
                              <div
                                key={doc.id}
                                className="w-full text-left px-2 py-1.5 text-xs font-mono border border-foreground/30 bg-background text-foreground opacity-40 cursor-default flex items-center gap-2 uppercase"
                              >
                                → {doc.name}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
