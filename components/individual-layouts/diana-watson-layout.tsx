"use client";

import type { Individual } from "@/utils/government-data";
import { SchoolFinalEvaluationDoc } from "./documents/school-final-evaluation-doc";
import { ultimateSchoolFinalEvaluationData } from "@/data/school-final-evaluations/ultimate";
import { ProfileId } from "./documents/profile-id";
import { ultimateProfileId } from "@/data/profile-id/ultimate";
import { dianaWatsonProfileId } from "@/data/profile-id/diana-watson";
import { dianaWatsonSchoolFinalEvaluationData } from "@/data/school-final-evaluations/diana-watson";
import { PermitCard } from "./documents/permit-card";
import { dianaWatsonPermissions } from "@/data/permissions/diana-watson";

interface LayoutProps {
  individual: Individual;
  documentId: string;
}

export const DianaWatsonLayout = ({ individual, documentId }: LayoutProps) => {
  if (documentId === "profile") {
    return <ProfileId individual={dianaWatsonProfileId} />;
  }

  if (documentId === "school-final-evaluation") {
    return (
      <SchoolFinalEvaluationDoc
        individual={dianaWatsonSchoolFinalEvaluationData}
      />
    );
  }

  if (documentId === "permit-card") {
    return <PermitCard individual={dianaWatsonPermissions} />;
  }

  return <div>Diana Watson Layout</div>;
};
