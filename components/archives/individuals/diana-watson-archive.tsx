"use client";

import type { IndividualLayoutProps } from "@/types/character-data";
import { SchoolFinalEvaluationDoc } from "../../documents/templates/school-final-evaluation";
import { ProfileId } from "../../documents/templates/profile-id";
import { PermitCard } from "../../documents/templates/permit-card";

export const DianaWatsonLayout = ({
  documentId,
  profileId,
  schoolFinalEvaluation,
  permissions,
}: IndividualLayoutProps) => {
  if (documentId === "profile" && profileId) {
    return <ProfileId individual={profileId} />;
  }

  if (documentId === "school-final-evaluation" && schoolFinalEvaluation) {
    return <SchoolFinalEvaluationDoc individual={schoolFinalEvaluation} />;
  }

  if (documentId === "permit-card" && permissions) {
    return <PermitCard individual={permissions} />;
  }

  return <div>Diana Watson Layout</div>;
};
