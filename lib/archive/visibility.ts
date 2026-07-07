export interface Viewer {
  accessLevel: "public" | "government";
}

export function canViewDocument(
  fm: { visibility?: "public" | "classified" | "both" },
  user: Viewer | null,
): boolean {
  const visibility = fm.visibility ?? "both";
  if (visibility === "public") return true;
  if (visibility === "classified") return user?.accessLevel === "government";
  return true;
}

export function filterVisibleDocuments<T extends { frontmatter: { visibility?: "public" | "classified" | "both" } }>(
  docs: T[],
  user: Viewer | null,
): T[] {
  return docs.filter((d) => canViewDocument(d.frontmatter, user));
}

export function getDocumentsBySection<T extends { frontmatter: { section?: string; visibility?: "public" | "classified" | "both"; date: string } }>(
  docs: T[],
  section: string,
  user: Viewer | null,
): T[] {
  return docs
    .filter((d) => d.frontmatter.section === section)
    .filter((d) => canViewDocument(d.frontmatter, user))
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}
