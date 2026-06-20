"use client";

import type { IndividualLayoutProps } from "@/types/character-data";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { SchoolFinalEvaluationDoc } from "../../documents/templates/school-final-evaluation";
import { TrialProfileId } from "../../documents/templates/trial/trial-profile-id";
import { PermitCard } from "../../documents/templates/permit-card";

export const UltimateLayout = ({
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
    return <SchoolFinalEvaluationDoc individual={schoolFinalEvaluation} />;
  }

  if (documentId === "permit-card" && permissions) {
    return <PermitCard individual={permissions} />;
  }

  return <div>Ultimate Layout</div>;
};
