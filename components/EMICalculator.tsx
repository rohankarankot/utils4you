"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  calculateEMIBreakdown,
  generateAmortizationSchedule,
} from "../lib/tools/emiCalculator";
import Button from "./Button";
import Card from "./Card";
import EMIChart from "./EMIChart";

const presets = {
  car: { label: "Car Loan", rate: 9.5, tenureYears: 5 },
  personal: { label: "Personal Loan", rate: 13.0, tenureYears: 3 },

  education: { label: "Education Loan", rate: 10.0, tenureYears: 5 },
  home: { label: "Home Loan", rate: 8.5, tenureYears: 20 },
};

import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrency } from "../lib/utils";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(presets.car.rate);
  const [tenureYears, setTenureYears] = useState(presets.car.tenureYears);
  const [currentYear, setCurrentYear] = useState(1);
  const [preset, setPreset] = useState<keyof typeof presets>(
    "car" as keyof typeof presets
  );

  const tenureMonths = Math.round(tenureYears * 12);

  const isValid = principal > 0 && rate >= 0 && tenureMonths > 0;

  const breakdown = useMemo(() => {
    if (!isValid) {
      return {
        emi: 0,
        totalPayment: 0,
        totalInterest: 0,
        principal,
        annualRatePercent: rate,
        tenureMonths: Math.max(0, tenureMonths),
      };
    }
    try {
      return calculateEMIBreakdown(principal, rate, tenureMonths);
    } catch (e) {
      return {
        emi: 0,
        totalPayment: 0,
        totalInterest: 0,
        principal,
        annualRatePercent: rate,
        tenureMonths,
      };
    }
  }, [principal, rate, tenureMonths, isValid]);

  const schedule = useMemo(() => {
    if (!isValid) return [];
    try {
      return generateAmortizationSchedule(principal, rate, tenureMonths);
    } catch (e) {
      return [];
    }
  }, [principal, rate, tenureMonths, isValid]);
  const chartRef = useRef<any>(null);

  function applyPreset(key: keyof typeof presets) {
    setPreset(key);
    setRate(presets[key].rate);
    setTenureYears(presets[key].tenureYears);
  }

  function downloadSchedule() {
    const csv = [
      "Month,Payment,Principal,Interest,Balance",
      ...schedule.map(
        (s) =>
          `${s.month},${s.payment},${s.principalComponent},${s.interestComponent},${s.balance}`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emi-schedule.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(presets) as Array<keyof typeof presets>).map((k) => (
            <Button
              key={k}
              variant={preset === k ? "default" : "ghost"}
              onClick={() => applyPreset(k)}
            >
              {presets[k].label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {principal <= 0 && (
            <p className="text-xs text-red-500 col-span-full">
              Enter a principal amount greater than 0
            </p>
          )}
          {rate < 0 && (
            <p className="text-xs text-red-500 col-span-full">
              Rate must be 0 or higher
            </p>
          )}
          {tenureMonths <= 0 && (
            <p className="text-xs text-red-500 col-span-full">
              Tenure must be greater than 0
            </p>
          )}
          <div>
            <label className="text-sm font-medium">Principal (₹)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
              className="w-full border p-2 rounded-md bg-[var(--surface)]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Annual Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
              className="w-full border p-2 rounded-md bg-[var(--surface)]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tenure (years)</label>
            <input
              type="number"
              step="0.5"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value) || 0)}
              className="w-full border p-2 rounded-md bg-[var(--surface)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mt-4">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
                <div className="text-xs text-[var(--muted)]">Monthly EMI</div>
                <div className="font-semibold text-lg">
                  {isValid ? `₹ ${formatCurrency(breakdown.emi)}` : "—"}
                </div>
              </div>
              <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
                <div className="text-xs text-[var(--muted)]">Total Payment</div>
                <div className="font-semibold text-lg">
                  {isValid
                    ? `₹ ${formatCurrency(breakdown.totalPayment)}`
                    : "—"}
                </div>
              </div>
              <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
                <div className="text-xs text-[var(--muted)]">
                  Total Interest
                </div>
                <div className="font-semibold text-lg">
                  {isValid
                    ? `₹ ${formatCurrency(breakdown.totalInterest)}`
                    : "—"}
                </div>
              </div>
            </div>
          </div>{" "}
        </div>

        <div className="mt-6">
          {isValid ? (
            <div className="p-3 rounded-md bg-[var(--bg)] shadow-sm">
              <h4 className="font-medium mb-3">Payment Breakdown</h4>
              <EMIChart
                breakdown={breakdown}
                fullWidth
                schedule={schedule}
                ref={chartRef}
              />
            </div>
          ) : (
            <div className="text-sm text-[var(--muted)]">
              Enter valid inputs to view charts and breakdown.
            </div>
          )}
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Amortization Schedule</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[var(--muted)]">Year {currentYear}</span>
              <div className="flex items-center rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] p-1">
                <button
                  onClick={() => setCurrentYear(p => Math.max(1, p - 1))}
                  disabled={currentYear === 1}
                  className="p-1 rounded hover:bg-[var(--bg)] disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                  aria-label="Previous Year"
                >
                  <ChevronLeft size={16} className="text-[var(--muted)]" />
                </button>
                <button
                  onClick={() => setCurrentYear(p => Math.min(Math.ceil(schedule.length / 12), p + 1))}
                  disabled={currentYear >= Math.ceil(schedule.length / 12)}
                  className="p-1 rounded hover:bg-[var(--bg)] disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                  aria-label="Next Year"
                >
                  <ChevronRight size={16} className="text-[var(--muted)]" />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-xs sm:text-sm min-w-[500px]">
              <thead className="text-left text-[var(--muted)] border-b dark:border-slate-800">
                <tr>
                  <th className="pb-2 font-medium">Month</th>
                  <th className="pb-2 font-medium">Payment</th>
                  <th className="pb-2 font-medium">Principal</th>
                  <th className="pb-2 font-medium">Interest</th>
                  <th className="pb-2 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule
                  .slice((currentYear - 1) * 12, currentYear * 12)
                  .map((s) => (
                    <tr key={s.month} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="py-2.5 font-medium text-[var(--muted)]">{s.month}</td>
                      <td className="py-2.5">₹ {formatCurrency(s.payment)}</td>
                      <td className="py-2.5 text-emerald-600 dark:text-emerald-400">₹ {formatCurrency(s.principalComponent)}</td>
                      <td className="py-2.5 text-rose-600 dark:text-rose-400">₹ {formatCurrency(s.interestComponent)}</td>
                      <td className="py-2.5 text-[var(--muted)]">₹ {formatCurrency(s.balance)}</td>
                    </tr>
                  ))}
                {schedule.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[var(--muted)]">
                      Enter valid loan details to view the schedule.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            onClick={() =>
              isValid &&
              navigator.clipboard.writeText(
                `EMI: ${breakdown.emi}, Total: ${breakdown.totalPayment}, Interest: ${breakdown.totalInterest}`
              )
            }
            disabled={!isValid}
          >
            Copy Summary
          </Button>
          <Button
            onClick={downloadSchedule}
            variant="ghost"
            disabled={!isValid}
          >
            Download Schedule
          </Button>
        </div>
      </div>
    </Card>
  );
}
