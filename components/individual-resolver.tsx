"use client";

import type { EntityLayoutProps } from "@/types/character-data";
import type { Individual } from "@/utils/government-data";
import { individuals } from "@/data/individuals";
import { getDocument } from "@/lib/archive/registry";

interface IndividualResolverProps {
  slug: string;
  documentId: string;
}

export const IndividualResolver = ({
  slug,
  documentId,
}: IndividualResolverProps) => {
  const individual: Individual | undefined = individuals.find(
    (p) => p.slug === slug,
  );
  if (!individual || !individual.layoutComponent) return null;

  const LayoutComponent = individual.layoutComponent;

  const currentDoc = individual.documents.find((d) => d.id === documentId);
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
