"use client";

import type { Individual } from "@/utils/government-data";
import { SchoolFinalEvaluationDoc } from "../../documents/templates/school-final-evaluation";
import { ultimateSchoolFinalEvaluationData } from "@/data/school-final-evaluations/ultimate";
import { ProfileId } from "../../documents/templates/profile-id";
import { ultimateProfileId } from "@/data/profile-id/ultimate";
import { PermitCard } from "../../documents/templates/permit-card";
import { ultimatePermissions } from "@/data/permissions/ultimate";

interface UltimateLayoutProps {
  individual: Individual;
  documentId: string;
}

export const UltimateLayout = ({
  individual,
  documentId,
}: UltimateLayoutProps) => {
  if (documentId === "profile") {
    return <ProfileId individual={ultimateProfileId} />;
  }

  if (documentId === "school-final-evaluation") {
    return (
      <SchoolFinalEvaluationDoc
        individual={ultimateSchoolFinalEvaluationData}
      />
    );
  }

  if (documentId === "permit-card") {
    return <PermitCard individual={ultimatePermissions} />;
  }

  return <div>Ultimate Layout</div>;
};
