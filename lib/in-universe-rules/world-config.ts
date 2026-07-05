import type { LumenDate, Era } from "./calendar";

/**
 * The canonical "current date" in the Lumen universe.
 * Used as default reference for age calculations and document dating.
 */
export const CURRENT_DATE: LumenDate = {
  dayOfYear: 1,
  year: 1228,
  era: "N.E.C." as Era,
  hemisphere: "S",
};
