import { describe, it, expect } from "vitest";
import {
  calculateSIPBreakdown,
  generateSIPSchedule,
} from "../lib/tools/sipCalculator";

describe("SIP Calculator - breakdown & schedule", () => {
  it("breakdown returns expected fields and sums", () => {
    const res = calculateSIPBreakdown(5000, 12, 10);
    expect(res.futureValue).toBeGreaterThan(res.totalInvested);
    expect(res.totalReturns).toBeCloseTo(
      res.futureValue - res.totalInvested,
      2
    );
  });

  it("schedule grows and last balance equals future value approx", () => {
    const monthly = 5000,
      rate = 12,
      years = 10;
    const schedule = generateSIPSchedule(monthly, rate, years);
    expect(schedule.length).toBe(120);
    expect(schedule[0].balance).toBeGreaterThanOrEqual(monthly);
    const last = schedule[schedule.length - 1];
    const breakdown = calculateSIPBreakdown(monthly, rate, years);
    // allow small rounding differences
    expect(Math.abs(last.balance - breakdown.futureValue)).toBeLessThan(1);
  });
});
