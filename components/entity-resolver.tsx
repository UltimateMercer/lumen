"use client";

import { useState, useEffect, type ComponentType } from "react";
import type { EntityLayoutProps } from "@/types/character-data";
import type { Entity } from "@/utils/government-data";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { getDocument, getBatchItems } from "@/lib/archive/registry";
import { TEMPLATES } from "@/components/documents/index";
import { getSerializedMdx, getSerializedBatch } from "@/lib/mdx-cache";

interface EntityResolverProps {
  entity: Entity;
  documentId: string;
}

type AugmentedDoc = ArchiveDocument & {
  batchItems?: Array<{
    slug: string;
    role?: string;
    note?: string;
    doc?: ArchiveDocument;
  }>;
};

function AsyncTemplateRenderer({
  mdxDoc,
  Template,
}: {
  mdxDoc: ArchiveDocument;
  Template: ComponentType<{ doc: ArchiveDocument }>;
}) {
  const [doc, setDoc] = useState<AugmentedDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = mdxDoc.frontmatter.slug || "unknown";

    if (mdxDoc.frontmatter.type === "batch") {
      const batchItems = getBatchItems(mdxDoc.frontmatter);
      const items = batchItems
        .filter((it): it is typeof it & { doc: ArchiveDocument } => !!it.doc)
        .map((it) => ({ slug: it.slug, mdx: it.doc.mdx }));

      getSerializedBatch(slug, mdxDoc.mdx, items).then((data) => {
        if (data) {
          const hydratedItems = batchItems.map((it) => {
            if (!it.doc) return it;
            const itemSource = data.itemSources[it.slug];
            return {
              ...it,
              doc: itemSource
                ? { ...it.doc, mdxSource: itemSource }
                : it.doc,
            };
          });
          setDoc({
            ...mdxDoc,
            mdxSource: data.mdxSource,
            batchItems: hydratedItems,
          } as AugmentedDoc);
        } else {
          setDoc(mdxDoc);
        }
        setLoading(false);
      });
    } else {
      getSerializedMdx(slug, mdxDoc.mdx).then((mdxSource) => {
        if (mdxSource) setDoc({ ...mdxDoc, mdxSource });
        else setDoc(mdxDoc);
        setLoading(false);
      });
    }
  }, [mdxDoc]);

  if (loading) {
    return (
      <div className="p-8 text-center opacity-50 animate-pulse">
        CARREGANDO DOCUMENTO...
      </div>
    );
  }

  return <Template doc={doc!} />;
}

export const EntityResolver = ({
  entity,
  documentId,
}: EntityResolverProps) => {
  const currentDoc = entity.documents.find((d) => d.id === documentId);
  if (!currentDoc?.mdxSlug) return null;

  const mdxDoc = getDocument(currentDoc.mdxSlug);
  if (!mdxDoc) return null;

  // Caminho A: entidade tem layoutComponent (indivíduos, poderes, etc.)
  if (entity.layoutComponent) {
    const LayoutComponent = entity.layoutComponent;
    const data: EntityLayoutProps = {
      documentId,
      frontmatter: mdxDoc.frontmatter,
    };
    return <LayoutComponent {...data} />;
  }

  // Caminho B: fallback genérico via TEMPLATES (classified, missions, incidents, etc.)
  const Template = TEMPLATES[mdxDoc.frontmatter.type];
  if (!Template) return null;

  // Se já tem mdxSource, renderiza direto (archive route)
  if (mdxDoc.mdxSource) {
    return <Template doc={mdxDoc} />;
  }

  // Serializa async via API route
  return <AsyncTemplateRenderer mdxDoc={mdxDoc} Template={Template} />;
};
