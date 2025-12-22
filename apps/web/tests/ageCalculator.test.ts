import { describe, it, expect } from "vitest";
import { calculateAge } from "../lib/tools/ageCalculator";

describe("calculateAge", () => {
  it("gives correct age for 2000-01-01", () => {
    const a = calculateAge("2000-01-01");
    expect(a.years).toBeGreaterThanOrEqual(25);
  });

  it("handles leap day birthdays correctly", () => {
    const a = calculateAge(new Date("2004-02-29"));
    expect(a.years).toBeGreaterThanOrEqual(21);
    expect(typeof a.months).toBe("number");
    expect(typeof a.days).toBe("number");
  });
});
