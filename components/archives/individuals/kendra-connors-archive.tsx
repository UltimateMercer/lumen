"use client";

import type { IndividualLayoutProps } from "@/types/character-data";
import { SchoolFinalEvaluationDoc } from "../../documents/templates/school-final-evaluation";
import { ProfileId } from "../../documents/templates/profile-id";

export const KendraConnorsLayout = ({
  documentId,
  profileId,
  schoolFinalEvaluation,
}: IndividualLayoutProps) => {
  if (documentId === "profile" && profileId) {
    return <ProfileId individual={profileId} />;
  }

  if (documentId === "school-final-evaluation" && schoolFinalEvaluation) {
    return <SchoolFinalEvaluationDoc individual={schoolFinalEvaluation} />;
  }

  return <div>Kendra Connors Layout</div>;
};
