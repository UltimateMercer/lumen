import { filterVisibleDocuments, type Viewer } from "./visibility";

export interface PopularityEntry {
  slug: string;
  votes: number;
}

const TIER_ORDER: Record<string, number> = {
  S: 0, A: 1, B: 2, C: 3, D: 4, E: 5, F: 6,
};

export function getSortedHeroes<
  T extends { frontmatter: { visibility?: "public" | "classified" | "both"; tier?: string; slug: string; type?: string } },
>(
  docs: T[],
  user: Viewer | null,
  sortBy: "tier" | "popularity",
  popularityOrder?: PopularityEntry[],
): T[] {
  const visible = filterVisibleDocuments(
    docs.filter((d) => d.frontmatter.type === "permit-card"),
    user,
  );

  if (sortBy === "tier") {
    return [...visible].sort(
      (a, b) =>
        (TIER_ORDER[a.frontmatter.tier ?? "F"] ?? 6) -
        (TIER_ORDER[b.frontmatter.tier ?? "F"] ?? 6),
    );
  }

  const orderMap = new Map(popularityOrder?.map((entry, i) => [entry.slug, i]) ?? []);
  return [...visible].sort((a, b) => {
    const ai = orderMap.get(a.frontmatter.slug);
    const bi = orderMap.get(b.frontmatter.slug);
    if (ai !== undefined && bi !== undefined) return ai - bi;
    if (ai !== undefined) return -1;
    if (bi !== undefined) return 1;
    return (
      (TIER_ORDER[a.frontmatter.tier ?? "F"] ?? 6) -
      (TIER_ORDER[b.frontmatter.tier ?? "F"] ?? 6)
    );
  });
}
