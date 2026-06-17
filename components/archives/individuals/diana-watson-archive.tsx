"use client";

import type { Individual } from "@/utils/government-data";
import { SchoolFinalEvaluationDoc } from "../../documents/templates/school-final-evaluation";
import { ProfileId } from "../../documents/templates/profile-id";
import { dianaWatsonProfileId } from "@/data/profile-id/diana-watson";
import { dianaWatsonSchoolFinalEvaluationData } from "@/data/school-final-evaluations/diana-watson";
import { PermitCard } from "../../documents/templates/permit-card";
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
