"use client";

import type { IndividualLayoutProps } from "@/types/character-data";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { TrialProfileId } from "../../documents/templates/trial/trial-profile-id";
import { TrialSchoolFinalEvaluation } from "../../documents/templates/trial/trial-school-final-evaluation";
import { TrialPermitCard } from "../../documents/templates/trial/trial-permit-card";

export const DianaWatsonLayout = ({
  documentId,
  profileId,
  schoolFinalEvaluation,
  permissions,
}: IndividualLayoutProps) => {
  if (documentId === "profile" && profileId) {
    const doc = { frontmatter: profileId, mdx: "" } as unknown as ArchiveDocument;
    return <TrialProfileId doc={doc} />;
  }

  if (documentId === "school-final-evaluation" && schoolFinalEvaluation) {
    const doc = { frontmatter: schoolFinalEvaluation, mdx: "" } as unknown as ArchiveDocument;
    return <TrialSchoolFinalEvaluation doc={doc} />;
  }

  if (documentId === "permit-card" && permissions) {
    const doc = { frontmatter: permissions, mdx: "" } as unknown as ArchiveDocument;
    return <TrialPermitCard doc={doc} />;
  }

  return <div>Diana Watson Layout</div>;
};
