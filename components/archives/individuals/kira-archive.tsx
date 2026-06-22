"use client";

import type { EntityLayoutProps } from "@/types/character-data";
import type { ArchiveDocument } from "@/lib/archive/documents";
import type { SchoolFinalEvaluationData } from "@/types/character-data";
import { SchoolFinalEvaluationDoc } from "../../documents/templates/school-final-evaluation";

export const KiraLayout = ({
  documentId,
  frontmatter,
}: EntityLayoutProps) => {
  if (documentId === "school-final-evaluation") {
    const doc = { frontmatter: frontmatter as unknown as SchoolFinalEvaluationData, mdx: "" } as unknown as ArchiveDocument;
    return <SchoolFinalEvaluationDoc doc={doc} />;
  }

  return <div>Kira Layout</div>;
};
