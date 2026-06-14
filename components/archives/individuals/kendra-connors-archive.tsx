"use client";

import type { Individual } from "@/utils/government-data";
import { SchoolFinalEvaluationDoc } from "../../documents/templates/school-final-evaluation";
import { ProfileId } from "../../documents/templates/profile-id";

import { PermitCard } from "../../documents/templates/permit-card";
import { kendraConnorsProfileId } from "@/data/profile-id/kendra-connors";
import { kendraConnorsSchoolFinalEvaluationData } from "@/data/school-final-evaluations/kendra-connors";

interface LayoutProps {
  individual: Individual;
  documentId: string;
}

export const KendraConnorsLayout = ({
  individual,
  documentId,
}: LayoutProps) => {
  if (documentId === "profile") {
    return <ProfileId individual={kendraConnorsProfileId} />;
  }

  if (documentId === "school-final-evaluation") {
    return (
      <SchoolFinalEvaluationDoc
        individual={kendraConnorsSchoolFinalEvaluationData}
      />
    );
  }

  // if (documentId === "permit-card") {
  //   return <PermitCard individual={dianaWatsonPermissions} />;
  // }

  return <div>Kendra Connors Layout</div>;
};
