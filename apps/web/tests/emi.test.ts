import { describe, it, expect } from "vitest";
import { calculateEMI } from "../lib/tools/emiCalculator";

describe("EMI Calculator", () => {
  it("calculates correct EMI for known values", () => {
    const emi = calculateEMI(100000, 8.5, 60); // 100k, 8.5% p.a. 60 months
    // Expected EMI rounded based on formula
    expect(Math.round(emi)).toBe(2052);
    expect(Number.isFinite(emi)).toBe(true);
  });
});
