import { describe, it, expect } from "vitest";
import {
  calculateEMI,
  calculateEMIBreakdown,
  generateAmortizationSchedule,
} from "../lib/tools/emiCalculator";

describe("EMI Calculator - loan type presets", () => {
  it("car loan example", () => {
    const p = 500000,
      r = 9.5,
      n = 60; // 5 years
    const emi = calculateEMI(p, r, n);
    const breakdown = calculateEMIBreakdown(p, r, n);
    expect(emi).toBeGreaterThan(900);
    expect(breakdown.totalPayment).toBeCloseTo(Number((emi * n).toFixed(2)), 2);
  });

  it("personal loan example", () => {
    const p = 200000,
      r = 13,
      n = 36;
    const { emi, totalPayment } = calculateEMIBreakdown(p, r, n);
    expect(emi).toBeGreaterThan(6000);
    expect(totalPayment).toBeGreaterThan(p);
  });

  it("amortization schedule balances down to zero", () => {
    const p = 100000,
      r = 10,
      n = 12;
    const schedule = generateAmortizationSchedule(p, r, n);
    expect(schedule[schedule.length - 1].balance).toBe(0);
  });
});
