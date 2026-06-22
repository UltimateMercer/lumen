"use client";

import type { EntityLayoutProps } from "@/types/character-data";
import type { ArchiveDocument } from "@/lib/archive/documents";
import type {
  ProfileIdData,
  SchoolFinalEvaluationData,
  PermissionsData,
} from "@/types/character-data";
import { ProfileId } from "../../documents/templates/profile-id";
import { SchoolFinalEvaluationDoc } from "../../documents/templates/school-final-evaluation";
import { PermitCard } from "../../documents/templates/permit-card";

export const UltimateLayout = ({
  documentId,
  frontmatter,
}: EntityLayoutProps) => {
  if (documentId === "profile") {
    const doc = { frontmatter: frontmatter as unknown as ProfileIdData, mdx: "" } as unknown as ArchiveDocument;
    return <ProfileId doc={doc} />;
  }

  if (documentId === "school-final-evaluation") {
    const doc = { frontmatter: frontmatter as unknown as SchoolFinalEvaluationData, mdx: "" } as unknown as ArchiveDocument;
    return <SchoolFinalEvaluationDoc doc={doc} />;
  }

  if (documentId === "permit-card") {
    const doc = { frontmatter: frontmatter as unknown as PermissionsData, mdx: "" } as unknown as ArchiveDocument;
    return <PermitCard doc={doc} />;
  }

  return <div>Ultimate Layout</div>;
};
