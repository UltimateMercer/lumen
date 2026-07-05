export type Era = "A.E.C." | "N.E.C.";
export type Hemisphere = "N" | "S";
export type Season = "Solaris" | "Auren" | "Umbrae" | "Vernis";
export type FormatStyle = "casual" | "official-abbr" | "official-full";

export interface LumenInstant {
  dayOfYear: number;
  year: number;
  era: Era;
}

export interface LumenDate extends LumenInstant {
  hemisphere: Hemisphere;
}

export const DAYS_PER_YEAR = 360;
export const DAYS_PER_SEASON = 90;

export const SEASON_MAP: Record<Hemisphere, Record<1 | 2 | 3 | 4, Season>> = {
  N: { 1: "Solaris", 2: "Auren", 3: "Umbrae", 4: "Vernis" },
  S: { 1: "Umbrae", 2: "Vernis", 3: "Solaris", 4: "Auren" },
};

export const HEMISPHERE_FULL: Record<Hemisphere, string> = {
  N: "Hemisfério Norte",
  S: "Hemisfério Sul",
};

export const SEASONS_ORDER: Season[] = ["Solaris", "Auren", "Umbrae", "Vernis"];

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function assertValid(instant: LumenInstant): void {
  if (!Number.isInteger(instant.dayOfYear) || instant.dayOfYear < 1 || instant.dayOfYear > DAYS_PER_YEAR) {
    throw new RangeError(
      `dayOfYear must be 1-${DAYS_PER_YEAR}, got ${instant.dayOfYear}`,
    );
  }
  if (!Number.isInteger(instant.year) || instant.year < 1) {
    throw new RangeError(`year must be >= 1, got ${instant.year}`);
  }
  if (instant.era !== "A.E.C." && instant.era !== "N.E.C.") {
    throw new RangeError(`era must be "A.E.C." or "N.E.C.", got "${instant.era}"`);
  }
}

export function isValidLumenInstant(instant: LumenInstant): boolean {
  try {
    assertValid(instant);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Derivation
// ---------------------------------------------------------------------------

export function getSeason(date: LumenDate): Season {
  assertValid(date);
  if (date.hemisphere !== "N" && date.hemisphere !== "S") {
    throw new RangeError(`hemisphere must be "N" or "S", got "${date.hemisphere}"`);
  }
  const block = Math.ceil(date.dayOfYear / DAYS_PER_SEASON) as 1 | 2 | 3 | 4;
  return SEASON_MAP[date.hemisphere][block];
}

export function getDayInSeason(date: LumenDate): number {
  assertValid(date);
  return ((date.dayOfYear - 1) % DAYS_PER_SEASON) + 1;
}

export function isValidLumenDate(date: LumenDate): boolean {
  try {
    assertValid(date);
    if (date.hemisphere !== "N" && date.hemisphere !== "S") {
      throw new RangeError(`hemisphere must be "N" or "S", got "${date.hemisphere}"`);
    }
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

const ERA_LABEL: Record<Era, { abbr: string; full: string }> = {
  "A.E.C.": { abbr: "A.E.C.", full: "Antes da Era Comum" },
  "N.E.C.": { abbr: "N.E.C.", full: "Nova Era Comum" },
};

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function formatDate(date: LumenDate, style: FormatStyle = "official-abbr"): string {
  assertValid(date);
  if (date.hemisphere !== "N" && date.hemisphere !== "S") {
    throw new RangeError(`hemisphere must be "N" or "S", got "${date.hemisphere}"`);
  }
  const season = getSeason(date);
  const day = getDayInSeason(date);
  const eraInfo = ERA_LABEL[date.era];

  switch (style) {
    case "casual":
      return `${day}° ${season} ${date.year}${date.hemisphere === "S" ? " (S)" : ""}`;
    case "official-abbr":
      return `${pad2(day)}·${season}·${date.year}·${eraInfo.abbr}${date.hemisphere === "S" ? " (S)" : ""}`;
    case "official-full":
      return `${pad2(day)}° ${season} de ${date.year} ${eraInfo.full}${date.hemisphere === "S" ? " (Hemisfério Sul)" : ""}`;
  }
}

export function formatInstant(instant: LumenInstant, style: FormatStyle = "official-abbr"): string {
  assertValid(instant);
  const eraInfo = ERA_LABEL[instant.era];

  switch (style) {
    case "casual":
      return `${instant.dayOfYear}° ${instant.year} ${eraInfo.abbr}`;
    case "official-abbr":
      return `${pad2(instant.dayOfYear)}·${instant.year}·${eraInfo.abbr}`;
    case "official-full":
      return `${instant.dayOfYear}° dia de ${instant.year} ${eraInfo.full}`;
  }
}

// ---------------------------------------------------------------------------
// Parser
// ---------------------------------------------------------------------------

const SEASON_INDEX: Record<Season, number> = {
  Solaris: 0,
  Auren: 1,
  Umbrae: 2,
  Vernis: 3,
};

const CANONICAL_RE =
  /^(\d{1,2})·(Solaris|Auren|Umbrae|Vernis)·(\d+)·((?:N|A)\.E\.C\.)\s*(?:\(([NS])\))?$/;
const LEGACY_RE =
  /^(\d{1,2})-(Solaris|Auren|Umbrae|Vernis)-(\d+)-?([NS])?$/;

export interface ParseOptions {
  /** Era to use when the input string has no explicit era. */
  fallbackEra: Era;
  /** Hemisphere to use when the input string has no hemisphere marker. */
  fallbackHemisphere: Hemisphere;
}

export function parseLumenDate(input: string, options: ParseOptions): LumenDate {
  let match = input.match(CANONICAL_RE);
  if (match) {
    const [, dayStr, season, yearStr, era, hemi] = match;
    const day = Number(dayStr);
    const year = Number(yearStr);
    const hemisphere = (hemi ?? options.fallbackHemisphere) as Hemisphere;
    const dayOfYear = (SEASON_INDEX[season as Season]) * DAYS_PER_SEASON + day;
    return { dayOfYear, year, era: era as Era, hemisphere };
  }

  match = input.match(LEGACY_RE);
  if (match) {
    const [, dayStr, season, yearStr, hemi] = match;
    const day = Number(dayStr);
    const year = Number(yearStr);
    const hemisphere = (hemi ?? options.fallbackHemisphere) as Hemisphere;
    const dayOfYear = (SEASON_INDEX[season as Season]) * DAYS_PER_SEASON + day;
    return { dayOfYear, year, era: options.fallbackEra, hemisphere };
  }

  throw new Error(
    `Unable to parse date string: "${input}". Expected format: "DD·Season·YYYY·Era (H)" or "DD-Season-YYYY-H"`,
  );
}

// ---------------------------------------------------------------------------
// Chronology — internal timeline value
// ---------------------------------------------------------------------------

/**
 * Convert a LumenInstant to a contiguous integer timeline value.
 * A.E.C. values are ≤ 0, N.E.C. values are ≥ 1.
 * There is no year 0: year 1 A.E.C. → -359…0, year 1 N.E.C. → 1…360.
 */
export function toTimelineValue(instant: LumenInstant): number {
  assertValid(instant);
  if (instant.era === "A.E.C.") {
    return -(instant.year * DAYS_PER_YEAR) + instant.dayOfYear;
  }
  return (instant.year - 1) * DAYS_PER_YEAR + instant.dayOfYear;
}

function tvToInstant(tv: number): { dayOfYear: number; year: number; era: Era } {
  if (tv >= 1) {
    const year = Math.floor((tv - 1) / DAYS_PER_YEAR) + 1;
    const dayOfYear = ((tv - 1) % DAYS_PER_YEAR) + 1;
    return { dayOfYear, year, era: "N.E.C." };
  }
  const year = Math.ceil((1 - tv) / DAYS_PER_YEAR);
  const dayOfYear = tv + year * DAYS_PER_YEAR;
  return { dayOfYear, year: year, era: "A.E.C." };
}

// ---------------------------------------------------------------------------
// Chronology — compare / sort
// ---------------------------------------------------------------------------

export function compareInstants(a: LumenInstant, b: LumenInstant): number {
  return toTimelineValue(a) - toTimelineValue(b);
}

export function sortInstants<T extends LumenInstant>(instants: T[]): T[] {
  return [...instants].sort((a, b) => compareInstants(a, b));
}

// ---------------------------------------------------------------------------
// Chronology — diff / addDays / getAge
// ---------------------------------------------------------------------------

export function diffDays(a: LumenInstant, b: LumenInstant): number {
  return Math.abs(toTimelineValue(a) - toTimelineValue(b));
}

export function addDays(instant: LumenInstant, days: number): LumenInstant {
  assertValid(instant);
  const tv = toTimelineValue(instant) + days;
  return tvToInstant(tv);
}

export function getAge(birth: LumenInstant, at: LumenInstant): number {
  assertValid(birth);
  assertValid(at);
  const birthTv = toTimelineValue(birth);
  const atTv = toTimelineValue(at);
  if (atTv < birthTv) {
    throw new RangeError("Reference date must be >= birth date");
  }
  const diff = atTv - birthTv;
  return Math.floor(diff / DAYS_PER_YEAR);
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

export function attachHemisphere(
  instant: LumenInstant,
  hemisphere: Hemisphere,
): LumenDate {
  assertValid(instant);
  return { ...instant, hemisphere };
}
