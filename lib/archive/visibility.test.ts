import { describe, it, expect } from "vitest";
import { canViewDocument, filterVisibleDocuments, getDocumentsBySection } from "./visibility";

function fm(visibility?: "public" | "classified" | "both") {
  return { visibility };
}

const govUser = { accessLevel: "government" as const };
const pubUser = { accessLevel: "public" as const };

describe("canViewDocument", () => {
  it("'public' + user null → true", () => {
    expect(canViewDocument(fm("public"), null)).toBe(true);
  });

  it("'public' + user gov → true", () => {
    expect(canViewDocument(fm("public"), govUser)).toBe(true);
  });

  it("'public' + user public → true", () => {
    expect(canViewDocument(fm("public"), pubUser)).toBe(true);
  });

  it("'classified' + user null → false", () => {
    expect(canViewDocument(fm("classified"), null)).toBe(false);
  });

  it("'classified' + user gov → true", () => {
    expect(canViewDocument(fm("classified"), govUser)).toBe(true);
  });

  it("'classified' + user public → false", () => {
    expect(canViewDocument(fm("classified"), pubUser)).toBe(false);
  });

  it("'both' + user null → true", () => {
    expect(canViewDocument(fm("both"), null)).toBe(true);
  });

  it("'both' + user gov → true", () => {
    expect(canViewDocument(fm("both"), govUser)).toBe(true);
  });

  it("'both' + user public → true", () => {
    expect(canViewDocument(fm("both"), pubUser)).toBe(true);
  });

  it("undefined (fallback) + user null → true", () => {
    expect(canViewDocument(fm(undefined), null)).toBe(true);
  });

  it("undefined (fallback) + user gov → true", () => {
    expect(canViewDocument(fm(undefined), govUser)).toBe(true);
  });
});

describe("filterVisibleDocuments", () => {
  const docs = [
    { frontmatter: fm("public") },
    { frontmatter: fm("classified") },
    { frontmatter: fm("both") },
  ];

  it("returns all for gov user", () => {
    const result = filterVisibleDocuments(docs, govUser);
    expect(result).toHaveLength(3);
  });

  it("excludes classified for null user", () => {
    const result = filterVisibleDocuments(docs, null);
    expect(result).toHaveLength(2);
    expect(result[0].frontmatter.visibility).toBe("public");
    expect(result[1].frontmatter.visibility).toBe("both");
  });

  it("excludes classified for public user", () => {
    const result = filterVisibleDocuments(docs, pubUser);
    expect(result).toHaveLength(2);
  });

  it("returns empty array when given empty array", () => {
    expect(filterVisibleDocuments([], govUser)).toEqual([]);
  });
});

describe("getDocumentsBySection", () => {
  function doc(
    section: string | undefined,
    visibility: "public" | "classified" | "both" | undefined,
    date: string,
  ) {
    return { frontmatter: { section, visibility, date } };
  }

  it("returns docs matching the given section", () => {
    const docs = [
      doc("library", "public", "1245-01-01"),
      doc("history", "public", "1244-01-01"),
    ];
    const result = getDocumentsBySection(docs, "library", null);
    expect(result).toHaveLength(1);
    expect(result[0].frontmatter.section).toBe("library");
  });

  it("excludes classified docs for null user", () => {
    const docs = [
      doc("library", "classified", "1245-01-01"),
      doc("library", "public", "1244-01-01"),
    ];
    const result = getDocumentsBySection(docs, "library", null);
    expect(result).toHaveLength(1);
    expect(result[0].frontmatter.visibility).toBe("public");
  });

  it("includes classified docs for gov user", () => {
    const docs = [
      doc("library", "classified", "1245-01-01"),
    ];
    const result = getDocumentsBySection(docs, "library", govUser);
    expect(result).toHaveLength(1);
  });

  it("section mismatch returns empty", () => {
    const docs = [doc("library", "public", "1245-01-01")];
    expect(getDocumentsBySection(docs, "history", null)).toEqual([]);
  });

  it("returns empty array when given empty array", () => {
    expect(getDocumentsBySection([], "library", null)).toEqual([]);
  });

  it("sorts by date descending (newest first)", () => {
    const docs = [
      doc("library", "public", "1243-01-01"),
      doc("library", "public", "1245-01-01"),
      doc("library", "public", "1244-01-01"),
    ];
    const result = getDocumentsBySection(docs, "library", null);
    expect(result.map((d) => d.frontmatter.date)).toEqual([
      "1245-01-01",
      "1244-01-01",
      "1243-01-01",
    ]);
  });
});
