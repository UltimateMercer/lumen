"use client";

import type { IndividualLayoutProps } from "@/types/character-data";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { SchoolFinalEvaluationDoc } from "../../documents/templates/school-final-evaluation";

export const KiraLayout = ({
  documentId,
  schoolFinalEvaluation,
}: IndividualLayoutProps) => {
  if (documentId === "school-final-evaluation" && schoolFinalEvaluation) {
    const doc = { frontmatter: schoolFinalEvaluation, mdx: "" } as unknown as ArchiveDocument;
    return <SchoolFinalEvaluationDoc doc={doc} />;
  }

  return <div>Kira Layout</div>;
};
