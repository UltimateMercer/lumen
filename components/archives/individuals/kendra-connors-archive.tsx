"use client";

import type { EntityLayoutProps } from "@/types/character-data";
import type { ArchiveDocument } from "@/lib/archive/documents";
import type {
  ProfileIdData,
  SchoolFinalEvaluationData,
} from "@/types/character-data";
import { ProfileId } from "../../documents/templates/profile-id";
import { SchoolFinalEvaluationDoc } from "../../documents/templates/school-final-evaluation";

export const KendraConnorsLayout = ({
  documentId,
  frontmatter,
}: EntityLayoutProps) => {
  if (documentId === "profile") {
    const doc = { frontmatter: frontmatter as unknown as ProfileIdData, mdx: "" } as unknown as ArchiveDocument;
    return <ProfileId doc={doc} />;
  }

  if (documentId === "school-final-evaluation") {
    const doc = { frontmatter: frontmatter as unknown as SchoolFinalEvaluationData, mdx: "" } as unknown as ArchiveDocument;
    return <SchoolFinalEvaluationDoc doc={doc} />;
  }

  return <div>Kendra Connors Layout</div>;
};
