"use client";

import type { EntityLayoutProps } from "@/types/character-data";
import type { Entity } from "@/utils/government-data";
import { getDocument } from "@/lib/archive/registry";

interface EntityResolverProps {
  entity: Entity;
  documentId: string;
}

export const EntityResolver = ({
  entity,
  documentId,
}: EntityResolverProps) => {
  if (!entity.layoutComponent) return null;

  const LayoutComponent = entity.layoutComponent;

  const currentDoc = entity.documents.find((d) => d.id === documentId);
  if (currentDoc?.mdxSlug) {
    const mdxDoc = getDocument(currentDoc.mdxSlug);
    if (mdxDoc) {
      const data: EntityLayoutProps = {
        documentId,
        frontmatter: mdxDoc.frontmatter,
      };
      return <LayoutComponent {...data} />;
    }
  }

  return null;
};
