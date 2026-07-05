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
