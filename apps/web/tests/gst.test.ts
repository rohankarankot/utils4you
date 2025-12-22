import { describe, it, expect } from "vitest";
import { calculateGST, splitTax } from "../lib/tools/gstCalculator";

describe("GST Calculator", () => {
  it("calculates exclusive GST", () => {
    const res = calculateGST(1000, 18, "exclusive");
    expect(res.tax).toBeCloseTo(180, 1);
    expect(res.total).toBeCloseTo(1180, 1);
  });
  it("calculates inclusive GST", () => {
    const res = calculateGST(1180, 18, "inclusive");
    expect(res.base + res.tax).toBeCloseTo(1180, 1);
  });
  it("splits tax correctly with 50/50", () => {
    const s = splitTax(180, 50);
    expect(s.cgst).toBeCloseTo(90, 2);
    expect(s.sgst).toBeCloseTo(90, 2);
  });

  it("splits tax with custom percent", () => {
    const s = splitTax(100, 30);
    expect(s.cgst).toBeCloseTo(30, 2);
    expect(s.sgst).toBeCloseTo(70, 2);
  });
});
