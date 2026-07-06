import type { LumenDate, Era } from "./calendar";

/**
 * The canonical "current date" in the Lumen universe.
 * Used as default reference for age calculations and document dating.
 */
export const CURRENT_DATE: LumenDate = {
  dayOfYear: 11,
  year: 1245,
  era: "N.E.C." as Era,
  hemisphere: "S",
};
