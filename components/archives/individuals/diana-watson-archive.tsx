"use client";

import type { IndividualLayoutProps } from "@/types/character-data";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { ProfileId } from "../../documents/templates/profile-id";
import { SchoolFinalEvaluationDoc } from "../../documents/templates/school-final-evaluation";
import { PermitCard } from "../../documents/templates/permit-card";

export const DianaWatsonLayout = ({
  documentId,
  profileId,
  schoolFinalEvaluation,
  permissions,
}: IndividualLayoutProps) => {
  if (documentId === "profile" && profileId) {
    const doc = { frontmatter: profileId, mdx: "" } as unknown as ArchiveDocument;
    return <ProfileId doc={doc} />;
  }

  if (documentId === "school-final-evaluation" && schoolFinalEvaluation) {
    const doc = { frontmatter: schoolFinalEvaluation, mdx: "" } as unknown as ArchiveDocument;
    return <SchoolFinalEvaluationDoc doc={doc} />;
  }

  if (documentId === "permit-card" && permissions) {
    const doc = { frontmatter: permissions, mdx: "" } as unknown as ArchiveDocument;
    return <PermitCard doc={doc} />;
  }

  return <div>Diana Watson Layout</div>;
};
