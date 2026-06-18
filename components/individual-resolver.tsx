"use client";

import type { IndividualLayoutProps } from "@/types/character-data";
import type { Individual } from "@/utils/government-data";
import { individuals } from "@/data/individuals";
import { ultimateProfileId } from "@/data/profile-id/ultimate";
import { dianaWatsonProfileId } from "@/data/profile-id/diana-watson";
import { kendraConnorsProfileId } from "@/data/profile-id/kendra-connors";
import { ultimatePermissions } from "@/data/permissions/ultimate";
import { dianaWatsonPermissions } from "@/data/permissions/diana-watson";
import { ultimateSchoolFinalEvaluationData } from "@/data/school-final-evaluations/ultimate";
import { dianaWatsonSchoolFinalEvaluationData } from "@/data/school-final-evaluations/diana-watson";
import { kendraConnorsSchoolFinalEvaluationData } from "@/data/school-final-evaluations/kendra-connors";
import { kiraSchoolFinalEvaluationData } from "@/data/school-final-evaluations/kira";

interface IndividualResolverProps {
  slug: string;
  documentId: string;
}

type DataMap = Record<
  string,
  Omit<IndividualLayoutProps, "documentId">
>;

const DATA_MAP: DataMap = {
  "diana-watson": {
    profileId: dianaWatsonProfileId,
    schoolFinalEvaluation: dianaWatsonSchoolFinalEvaluationData,
    permissions: dianaWatsonPermissions,
  },
  ultimate: {
    profileId: ultimateProfileId,
    schoolFinalEvaluation: ultimateSchoolFinalEvaluationData,
    permissions: ultimatePermissions,
  },
  "kendra-connors": {
    profileId: kendraConnorsProfileId,
    schoolFinalEvaluation: kendraConnorsSchoolFinalEvaluationData,
  },
  kira: {
    schoolFinalEvaluation: kiraSchoolFinalEvaluationData,
  },
};

export const IndividualResolver = ({
  slug,
  documentId,
}: IndividualResolverProps) => {
  const individual: Individual | undefined = individuals.find(
    (p) => p.slug === slug,
  );
  if (!individual || !individual.layoutComponent) return null;

  const LayoutComponent = individual.layoutComponent;
  const data = DATA_MAP[slug];

  if (!data) return null;

  return <LayoutComponent {...data} documentId={documentId} />;
};
