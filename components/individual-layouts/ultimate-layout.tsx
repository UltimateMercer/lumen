"use client";

import type { Individual } from "@/utils/government-data";
import { RedactedText } from "../redacted-text";
import { WarningIcon } from "@phosphor-icons/react";
import { SchoolFinalEvaluationDoc } from "./ultimate/school-final-evaluation-doc";
import { ultimateSchoolFinalEvaluationData } from "@/data/school-final-evaluations/ultimate";
import { ProfileId } from "./documents/profile-id";
import { ultimateProfileId } from "@/data/profile-id/ultimate";

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
  return <div>Ultimate Layout</div>;
};
