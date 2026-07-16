import { describe, it, expect } from "vitest";
import {
  isValidLumenInstant,
  isValidLumenDate,
  getSeason,
  getDayInSeason,
  formatDate,
  formatInstant,
  parseLumenDate,
  compareInstants,
  sortInstants,
  diffDays,
  addDays,
  getAge,
  toTimelineValue,
  attachHemisphere,
  DAYS_PER_YEAR,
  DAYS_PER_SEASON,
  type LumenInstant,
  type LumenDate,
} from "./calendar";

const nec = "N.E.C." as const;
const aec = "A.E.C." as const;

const validInstants: LumenInstant[] = [
  { dayOfYear: 1, year: 1, era: nec },
  { dayOfYear: 1, year: 1228, era: nec },
  { dayOfYear: 360, year: 1228, era: nec },
  { dayOfYear: 1, year: 1, era: aec },
  { dayOfYear: 360, year: 100, era: aec },
];

const validDates: LumenDate[] = [
  { dayOfYear: 1, year: 1, era: nec, hemisphere: "N" },
  { dayOfYear: 1, year: 1228, era: nec, hemisphere: "S" },
  { dayOfYear: 360, year: 1228, era: nec, hemisphere: "S" },
  { dayOfYear: 180, year: 5, era: aec, hemisphere: "N" },
];

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
describe("isValidLumenInstant", () => {
  it("accepts valid instants", () => {
    for (const inst of validInstants) {
      expect(isValidLumenInstant(inst)).toBe(true);
    }
  });

  it("rejects dayOfYear < 1", () => {
    expect(isValidLumenInstant({ dayOfYear: 0, year: 1, era: nec })).toBe(false);
  });

  it("rejects dayOfYear > 360", () => {
    expect(isValidLumenInstant({ dayOfYear: 361, year: 1, era: nec })).toBe(false);
  });

  it("rejects non-integer dayOfYear", () => {
    expect(isValidLumenInstant({ dayOfYear: 1.5, year: 1, era: nec })).toBe(false);
  });

  it("rejects year < 1", () => {
    expect(isValidLumenInstant({ dayOfYear: 1, year: 0, era: nec })).toBe(false);
  });

  it("rejects non-integer year", () => {
    expect(isValidLumenInstant({ dayOfYear: 1, year: 2024.5, era: nec })).toBe(false);
  });

  it("rejects invalid era", () => {
    expect(isValidLumenInstant({ dayOfYear: 1, year: 1, era: "B.C." as any })).toBe(false);
  });
});

describe("isValidLumenDate", () => {
  it("accepts valid dates", () => {
    for (const d of validDates) {
      expect(isValidLumenDate(d)).toBe(true);
    }
  });

  it("rejects invalid hemisphere", () => {
    expect(
      isValidLumenDate({ dayOfYear: 1, year: 1, era: nec, hemisphere: "X" as any }),
    ).toBe(false);
  });

  it("rejects invalid instant in date", () => {
    expect(
      isValidLumenDate({ dayOfYear: 500, year: 1, era: nec, hemisphere: "N" }),
    ).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Season derivation
// ---------------------------------------------------------------------------
describe("getSeason", () => {
  it("returns Umbrae for day 1-90 in N hemisphere", () => {
    expect(getSeason({ dayOfYear: 1, year: 1228, era: nec, hemisphere: "N" })).toBe("Umbrae");
    expect(getSeason({ dayOfYear: 45, year: 1228, era: nec, hemisphere: "N" })).toBe("Umbrae");
    expect(getSeason({ dayOfYear: 90, year: 1228, era: nec, hemisphere: "N" })).toBe("Umbrae");
  });

  it("returns Solaris for day 1-90 in S hemisphere", () => {
    expect(getSeason({ dayOfYear: 1, year: 1228, era: nec, hemisphere: "S" })).toBe("Solaris");
    expect(getSeason({ dayOfYear: 90, year: 1228, era: nec, hemisphere: "S" })).toBe("Solaris");
  });

  it("returns Vernis for day 91-180 in N hemisphere", () => {
    expect(getSeason({ dayOfYear: 91, year: 1228, era: nec, hemisphere: "N" })).toBe("Vernis");
    expect(getSeason({ dayOfYear: 180, year: 1228, era: nec, hemisphere: "N" })).toBe("Vernis");
  });

  it("returns Auren for day 91-180 in S hemisphere", () => {
    expect(getSeason({ dayOfYear: 91, year: 1228, era: nec, hemisphere: "S" })).toBe("Auren");
    expect(getSeason({ dayOfYear: 180, year: 1228, era: nec, hemisphere: "S" })).toBe("Auren");
  });

  it("returns Solaris for day 181-270 in N", () => {
    expect(getSeason({ dayOfYear: 181, year: 1228, era: nec, hemisphere: "N" })).toBe("Solaris");
    expect(getSeason({ dayOfYear: 270, year: 1228, era: nec, hemisphere: "N" })).toBe("Solaris");
  });

  it("returns Auren for day 271-360 in N", () => {
    expect(getSeason({ dayOfYear: 271, year: 1228, era: nec, hemisphere: "N" })).toBe("Auren");
    expect(getSeason({ dayOfYear: 360, year: 1228, era: nec, hemisphere: "N" })).toBe("Auren");
  });

  it("throws on invalid instant", () => {
    expect(() =>
      getSeason({ dayOfYear: 400, year: 1, era: nec, hemisphere: "N" }),
    ).toThrow(RangeError);
  });
});

describe("getDayInSeason", () => {
  it("returns 1 for first day of season", () => {
    expect(getDayInSeason({ dayOfYear: 1, year: 1228, era: nec, hemisphere: "N" })).toBe(1);
    expect(getDayInSeason({ dayOfYear: 91, year: 1228, era: nec, hemisphere: "N" })).toBe(1);
    expect(getDayInSeason({ dayOfYear: 181, year: 1228, era: nec, hemisphere: "N" })).toBe(1);
    expect(getDayInSeason({ dayOfYear: 271, year: 1228, era: nec, hemisphere: "N" })).toBe(1);
  });

  it("returns 90 for last day of season", () => {
    expect(getDayInSeason({ dayOfYear: 90, year: 1228, era: nec, hemisphere: "N" })).toBe(90);
    expect(getDayInSeason({ dayOfYear: 180, year: 1228, era: nec, hemisphere: "N" })).toBe(90);
    expect(getDayInSeason({ dayOfYear: 270, year: 1228, era: nec, hemisphere: "N" })).toBe(90);
    expect(getDayInSeason({ dayOfYear: 360, year: 1228, era: nec, hemisphere: "N" })).toBe(90);
  });

  it("returns 45 for mid-season day", () => {
    expect(getDayInSeason({ dayOfYear: 45, year: 1228, era: nec, hemisphere: "N" })).toBe(45);
    expect(getDayInSeason({ dayOfYear: 135, year: 1228, era: nec, hemisphere: "N" })).toBe(45);
  });
});

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------
describe("formatDate", () => {
  it("official-abbr: N hemisphere omits hemisphere", () => {
    const date: LumenDate = { dayOfYear: 1, year: 1228, era: nec, hemisphere: "N" };
    expect(formatDate(date)).toBe("01·Umbrae·1228·N.E.C.");
  });

  it("official-abbr: S hemisphere adds (S)", () => {
    const date: LumenDate = { dayOfYear: 1, year: 1228, era: nec, hemisphere: "S" };
    expect(formatDate(date)).toBe("01·Solaris·1228·N.E.C. (S)");
  });

  it("official-abbr: A.E.C. era", () => {
    const date: LumenDate = { dayOfYear: 285, year: 500, era: aec, hemisphere: "N" };
    expect(formatDate(date)).toBe("15·Auren·500·A.E.C.");
  });

  it("casual: omits era", () => {
    const date: LumenDate = { dayOfYear: 1, year: 1228, era: nec, hemisphere: "N" };
    expect(formatDate(date, "casual")).toBe("1° Umbrae 1228");
  });

  it("casual: S adds (S)", () => {
    const date: LumenDate = { dayOfYear: 1, year: 1228, era: nec, hemisphere: "S" };
    expect(formatDate(date, "casual")).toBe("1° Solaris 1228 (S)");
  });

  it("official-full: N hemisphere", () => {
    const date: LumenDate = { dayOfYear: 1, year: 1228, era: nec, hemisphere: "N" };
    expect(formatDate(date, "official-full")).toBe(
      "01° Umbrae de 1228 Nova Era Comum",
    );
  });

  it("official-full: S hemisphere", () => {
    const date: LumenDate = { dayOfYear: 1, year: 1228, era: nec, hemisphere: "S" };
    expect(formatDate(date, "official-full")).toBe(
      "01° Solaris de 1228 Nova Era Comum (Hemisfério Sul)",
    );
  });

  it("appends time suffix in official-abbr", () => {
    const date: LumenDate = {
      dayOfYear: 1, year: 1228, era: nec, hemisphere: "S", time: "10:12:54",
    };
    expect(formatDate(date)).toBe("01·Solaris·1228·N.E.C. (S) - 10:12:54");
  });

  it("appends time suffix in casual", () => {
    const date: LumenDate = {
      dayOfYear: 1, year: 1228, era: nec, hemisphere: "N", time: "10:12:54",
    };
    expect(formatDate(date, "casual")).toBe("1° Umbrae 1228 - 10:12:54");
  });

  it("appends time suffix in official-full", () => {
    const date: LumenDate = {
      dayOfYear: 1, year: 1228, era: nec, hemisphere: "N", time: "10:12:54",
    };
    expect(formatDate(date, "official-full")).toBe(
      "01° Umbrae de 1228 Nova Era Comum - 10:12:54",
    );
  });

  it("no time — no suffix", () => {
    const date: LumenDate = { dayOfYear: 1, year: 1228, era: nec, hemisphere: "N" };
    expect(formatDate(date)).toBe("01·Umbrae·1228·N.E.C.");
  });
});

describe("formatInstant", () => {
  it("official-abbr: N.E.C.", () => {
    const inst: LumenInstant = { dayOfYear: 1, year: 1228, era: nec };
    expect(formatInstant(inst)).toBe("01·1228·N.E.C.");
  });

  it("casual: includes ordinal mark", () => {
    const inst: LumenInstant = { dayOfYear: 1, year: 1228, era: nec };
    expect(formatInstant(inst, "casual")).toBe("1° 1228 N.E.C.");
  });

  it("official-full: A.E.C.", () => {
    const inst: LumenInstant = { dayOfYear: 360, year: 1, era: aec };
    expect(formatInstant(inst, "official-full")).toBe(
      "360° dia de 1 Antes da Era Comum",
    );
  });
});

// ---------------------------------------------------------------------------
// Parser
// ---------------------------------------------------------------------------
describe("parseLumenDate", () => {
  const optsNecN = { fallbackEra: nec, fallbackHemisphere: "N" as const };
  const optsNecS = { fallbackEra: nec, fallbackHemisphere: "S" as const };

  describe("canonical format (interpunct)", () => {
    it("parses N.E.C. N hemisphere", () => {
      const result = parseLumenDate("01·Solaris·1228·N.E.C.", optsNecN);
      expect(result).toEqual({ dayOfYear: 1, year: 1228, era: nec, hemisphere: "N" });
    });

    it("parses A.E.C. S hemisphere", () => {
      const result = parseLumenDate("15·Vernis·500·A.E.C. (S)", optsNecN);
      expect(result).toEqual({ dayOfYear: 285, year: 500, era: aec, hemisphere: "S" });
    });

    it("parses S hemisphere with (S)", () => {
      const result = parseLumenDate("01·Solaris·1228·N.E.C. (S)", optsNecN);
      expect(result).toEqual({ dayOfYear: 1, year: 1228, era: nec, hemisphere: "S" });
    });

    it("uses fallback hemisphere if absent", () => {
      const result = parseLumenDate("01·Solaris·1228·N.E.C.", optsNecS);
      expect(result.hemisphere).toBe("S");
    });
  });

  describe("legacy format (hyphen)", () => {
    it("parses DD-Season-YYYY-H", () => {
      const result = parseLumenDate("65-Vernis-1243-S", optsNecN);
      expect(result).toEqual({ dayOfYear: 335, year: 1243, era: nec, hemisphere: "S" });
    });

    it("parses DD-Season-YYYY without hemisphere", () => {
      const result = parseLumenDate("01-Solaris-1228", optsNecN);
      expect(result).toEqual({ dayOfYear: 1, year: 1228, era: nec, hemisphere: "N" });
    });

    it("uses fallback era (always N.E.C.)", () => {
      const result = parseLumenDate("01-Solaris-1228", optsNecN);
      expect(result.era).toBe(nec);
    });
  });

  it("throws on unmatched string", () => {
    expect(() => parseLumenDate("lorem ipsum", optsNecN)).toThrow("Unable to parse");
  });

  describe("time suffix", () => {
    it("canonical format with HH:MM:SS time suffix", () => {
      const result = parseLumenDate("01·Solaris·1228·N.E.C. (S) - 10:12:54", optsNecN);
      expect(result).toEqual({
        dayOfYear: 1, year: 1228, era: nec, hemisphere: "S", time: "10:12:54",
      });
    });

    it("legacy format with HH:MM:SS time suffix", () => {
      const result = parseLumenDate("89-Vernis-1244-S - 16:48:11", optsNecN);
      expect(result).toEqual({
        dayOfYear: 359, year: 1244, era: nec, hemisphere: "S", time: "16:48:11",
      });
    });

    it("legacy format with HH:MM only", () => {
      const result = parseLumenDate("89-Vernis-1244-S - 16:48", optsNecN);
      expect(result).toEqual({
        dayOfYear: 359, year: 1244, era: nec, hemisphere: "S", time: "16:48",
      });
    });

    it("legacy format with time and no hemisphere", () => {
      const result = parseLumenDate("89-Vernis-1244 - 16:48:11", optsNecN);
      expect(result).toEqual({
        dayOfYear: 359, year: 1244, era: nec, hemisphere: "N", time: "16:48:11",
      });
    });

    it("no time suffix — time is undefined", () => {
      const result = parseLumenDate("01·Solaris·1228·N.E.C.", optsNecS);
      expect(result.time).toBeUndefined();
    });
  });
});

// ---------------------------------------------------------------------------
// Chronology — timeline value
// ---------------------------------------------------------------------------
describe("toTimelineValue", () => {
  it("day 1 year 1 N.E.C. → 1", () => {
    expect(toTimelineValue({ dayOfYear: 1, year: 1, era: nec })).toBe(1);
  });

  it("day 360 year 1 N.E.C. → 360", () => {
    expect(toTimelineValue({ dayOfYear: 360, year: 1, era: nec })).toBe(360);
  });

  it("day 1 year 1 A.E.C. → -359", () => {
    expect(toTimelineValue({ dayOfYear: 1, year: 1, era: aec })).toBe(-359);
  });

  it("day 360 year 1 A.E.C. → 0", () => {
    expect(toTimelineValue({ dayOfYear: 360, year: 1, era: aec })).toBe(0);
  });

  it("day 1 year 1228 N.E.C. → 1 + (1228-1)*360", () => {
    expect(toTimelineValue({ dayOfYear: 1, year: 1228, era: nec })).toBe(1 + 1227 * DAYS_PER_YEAR);
  });
});

describe("compareInstants", () => {
  it("negative if a precedes b", () => {
    const a: LumenInstant = { dayOfYear: 1, year: 1, era: aec };
    const b: LumenInstant = { dayOfYear: 1, year: 1, era: nec };
    expect(compareInstants(a, b)).toBeLessThan(0);
  });

  it("positive if a follows b", () => {
    const a: LumenInstant = { dayOfYear: 1, year: 1228, era: nec };
    const b: LumenInstant = { dayOfYear: 1, year: 100, era: nec };
    expect(compareInstants(a, b)).toBeGreaterThan(0);
  });

  it("zero for equal instants", () => {
    const a: LumenInstant = { dayOfYear: 1, year: 100, era: nec };
    const b: LumenInstant = { dayOfYear: 1, year: 100, era: nec };
    expect(compareInstants(a, b)).toBe(0);
  });
});

describe("sortInstants", () => {
  it("sorts chronologically", () => {
    const instants: LumenInstant[] = [
      { dayOfYear: 1, year: 1228, era: nec },
      { dayOfYear: 1, year: 100, era: aec },
      { dayOfYear: 1, year: 100, era: nec },
    ];
    const sorted = sortInstants(instants);
    expect(sorted[0].year).toBe(100);
    expect(sorted[0].era).toBe(aec);
    expect(sorted[1].year).toBe(100);
    expect(sorted[1].era).toBe(nec);
    expect(sorted[2].year).toBe(1228);
  });

  it("does not mutate original", () => {
    const instants: LumenInstant[] = [
      { dayOfYear: 1, year: 2, era: nec },
      { dayOfYear: 1, year: 1, era: nec },
    ];
    const sorted = sortInstants(instants);
    expect(sorted[0].year).toBe(1);
    expect(instants[0].year).toBe(2);
  });
});

describe("diffDays", () => {
  it("computes difference across eras", () => {
    const a: LumenInstant = { dayOfYear: 1, year: 1, era: aec };
    const b: LumenInstant = { dayOfYear: 1, year: 1, era: nec };
    expect(diffDays(a, b)).toBe(360);
  });

  it("same instant → 0", () => {
    const a: LumenInstant = { dayOfYear: 100, year: 500, era: nec };
    expect(diffDays(a, a)).toBe(0);
  });

  it("within same year", () => {
    const a: LumenInstant = { dayOfYear: 100, year: 500, era: nec };
    const b: LumenInstant = { dayOfYear: 150, year: 500, era: nec };
    expect(diffDays(a, b)).toBe(50);
  });
});

describe("addDays", () => {
  it("adds within same year", () => {
    const inst: LumenInstant = { dayOfYear: 1, year: 1228, era: nec };
    expect(addDays(inst, 359)).toEqual({ dayOfYear: 360, year: 1228, era: nec });
  });

  it("crosses year boundary forward", () => {
    const inst: LumenInstant = { dayOfYear: 360, year: 1, era: nec };
    expect(addDays(inst, 1)).toEqual({ dayOfYear: 1, year: 2, era: nec });
  });

  it("crosses year boundary backward", () => {
    const inst: LumenInstant = { dayOfYear: 1, year: 2, era: nec };
    expect(addDays(inst, -1)).toEqual({ dayOfYear: 360, year: 1, era: nec });
  });

  it("crosses era transition: 360/1/AEC → 1/1/NEC", () => {
    const inst: LumenInstant = { dayOfYear: 360, year: 1, era: aec };
    expect(addDays(inst, 1)).toEqual({ dayOfYear: 1, year: 1, era: nec });
  });

  it("crosses era transition backward: 1/1/NEC → 360/1/AEC", () => {
    const inst: LumenInstant = { dayOfYear: 1, year: 1, era: nec };
    expect(addDays(inst, -1)).toEqual({ dayOfYear: 360, year: 1, era: aec });
  });

  it("multiple years forward", () => {
    const inst: LumenInstant = { dayOfYear: 1, year: 1, era: nec };
    expect(addDays(inst, DAYS_PER_YEAR * 3 + 5)).toEqual({
      dayOfYear: 6,
      year: 4,
      era: nec,
    });
  });

  it("zero days = identity", () => {
    const inst: LumenInstant = { dayOfYear: 180, year: 500, era: aec };
    expect(addDays(inst, 0)).toEqual(inst);
  });
});

describe("getAge", () => {
  it("returns full years elapsed", () => {
    const birth: LumenInstant = { dayOfYear: 1, year: 1200, era: nec };
    const at: LumenInstant = { dayOfYear: 1, year: 1228, era: nec };
    expect(getAge(birth, at)).toBe(28);
  });

  it("returns 0 for same year", () => {
    const birth: LumenInstant = { dayOfYear: 1, year: 1228, era: nec };
    const at: LumenInstant = { dayOfYear: 1, year: 1228, era: nec };
    expect(getAge(birth, at)).toBe(0);
  });

  it("does not count partial year", () => {
    const birth: LumenInstant = { dayOfYear: 300, year: 1200, era: nec };
    const at: LumenInstant = { dayOfYear: 200, year: 1228, era: nec };
    expect(getAge(birth, at)).toBe(27);
  });

  it("counts full year if dayOfYear >= birth dayOfYear", () => {
    const birth: LumenInstant = { dayOfYear: 100, year: 1200, era: nec };
    const at: LumenInstant = { dayOfYear: 100, year: 1228, era: nec };
    expect(getAge(birth, at)).toBe(28);
  });

  it("throws if reference < birth", () => {
    const birth: LumenInstant = { dayOfYear: 1, year: 1228, era: nec };
    const at: LumenInstant = { dayOfYear: 1, year: 1200, era: nec };
    expect(() => getAge(birth, at)).toThrow(RangeError);
  });
});

describe("attachHemisphere", () => {
  it("adds hemisphere to instant", () => {
    const inst: LumenInstant = { dayOfYear: 100, year: 1228, era: nec };
    const date = attachHemisphere(inst, "S");
    expect(date).toEqual({ dayOfYear: 100, year: 1228, era: nec, hemisphere: "S" });
  });

  it("does not mutate original", () => {
    const inst: LumenInstant = { dayOfYear: 100, year: 1228, era: nec };
    const date = attachHemisphere(inst, "S");
    expect("hemisphere" in inst).toBe(false);
    expect(date.hemisphere).toBe("S");
  });
});
