"use client";

import type { IndividualLayoutProps } from "@/types/character-data";
import type {
  ProfileIdData,
  SchoolFinalEvaluationData,
  PermissionsData,
} from "@/types/character-data";
import type { Individual } from "@/utils/government-data";
import { individuals } from "@/data/individuals";
import { getDocument } from "@/lib/archive/registry";
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
  // TODO: migrar para MDX
  "diana-watson": {
    profileId: dianaWatsonProfileId,
    schoolFinalEvaluation: dianaWatsonSchoolFinalEvaluationData,
    permissions: dianaWatsonPermissions,
  },
  // TODO: migrar para MDX
  ultimate: {
    profileId: ultimateProfileId,
    schoolFinalEvaluation: ultimateSchoolFinalEvaluationData,
    permissions: ultimatePermissions,
  },
  // TODO: migrar para MDX
  "kendra-connors": {
    profileId: kendraConnorsProfileId,
    schoolFinalEvaluation: kendraConnorsSchoolFinalEvaluationData,
  },
  // TODO: migrar para MDX
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

  // Try MDX first: if current document has mdxSlug, load from registry
  const currentDoc = individual.documents.find((d) => d.id === documentId);
  if (currentDoc?.mdxSlug) {
    const mdxDoc = getDocument(currentDoc.mdxSlug);
    if (mdxDoc) {
      const fm = mdxDoc.frontmatter;
      const data: IndividualLayoutProps = {
        documentId,
        profileId:
          documentId === "profile"
            ? (fm as unknown as ProfileIdData)
            : undefined,
        schoolFinalEvaluation:
          documentId === "school-final-evaluation"
            ? (fm as unknown as SchoolFinalEvaluationData)
            : undefined,
        permissions:
          documentId === "permit-card"
            ? (fm as unknown as PermissionsData)
            : undefined,
      };
      return <LayoutComponent {...data} documentId={documentId} />;
    }
  }

  // Fallback to DATA_MAP (JSON data)
  const data = DATA_MAP[slug];

  if (!data) return null;

  return <LayoutComponent {...data} documentId={documentId} />;
};
