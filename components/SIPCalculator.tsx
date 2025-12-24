"use client";

import React, { useState, useMemo } from "react";
import {
  calculateSIPBreakdown,
  generateSIPSchedule,
} from "../lib/tools/sipCalculator";
import Button from "./Button";
import Card from "./Card";
import EMIChart from "./EMIChart"; // reuse chart for invested vs returns

const presets = {
  retirement: {
    label: "Retirement SIP",
    rate: 12.0,
    tenureYears: 30,
    monthly: 10000,
  },
  child: {
    label: "Child Education",
    rate: 11.0,
    tenureYears: 15,
    monthly: 5000,
  },
  wealth: {
    label: "Wealth Creation",
    rate: 13.0,
    tenureYears: 10,
    monthly: 5000,
  },
};

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(presets.retirement.rate);
  const [tenureYears, setTenureYears] = useState(10);
  const [preset, setPreset] = useState<keyof typeof presets>("retirement");

  const months = Math.max(0, Math.round(tenureYears * 12));
  const isValid = monthly > 0 && rate >= 0 && months > 0;

  const breakdown = useMemo(() => {
    if (!isValid)
      return {
        futureValue: 0,
        totalInvested: 0,
        totalReturns: 0,
        monthlyInvestment: monthly,
        annualReturnPercent: rate,
        months,
      };
    try {
      return calculateSIPBreakdown(monthly, rate, tenureYears);
    } catch (e) {
      return {
        futureValue: 0,
        totalInvested: 0,
        totalReturns: 0,
        monthlyInvestment: monthly,
        annualReturnPercent: rate,
        months,
      };
    }
  }, [monthly, rate, tenureYears, isValid]);

  const schedule = useMemo(() => {
    if (!isValid) return [];
    try {
      return generateSIPSchedule(monthly, rate, tenureYears);
    } catch (e) {
      return [];
    }
  }, [monthly, rate, tenureYears, isValid]);

  function applyPreset(key: keyof typeof presets) {
    setPreset(key);
    setRate(presets[key].rate);
    setTenureYears(presets[key].tenureYears);
    setMonthly(presets[key].monthly);
  }

  function downloadSchedule() {
    if (!schedule || schedule.length === 0) return;
    const csv = [
      "Month,Contribution,Returns,Balance",
      ...schedule.map(
        (s) => `${s.month},${s.contribution},${s.returns},${s.balance}`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sip-schedule.csv";
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
          {monthly <= 0 && (
            <p className="text-xs text-red-500 col-span-full">
              Enter monthly investment greater than 0
            </p>
          )}
          <div>
            <label className="text-sm font-medium">
              Monthly Investment (₹)
            </label>
            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value) || 0)}
              className="w-full border p-2 rounded-md bg-[var(--surface)]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Expected Annual Return (%)
            </label>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
                <div className="text-xs text-[var(--muted)]">Future Value</div>
                <div className="font-medium">
                  {isValid
                    ? `₹ ${breakdown.futureValue.toLocaleString()}`
                    : "—"}
                </div>
              </div>

              <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
                <div className="text-xs text-[var(--muted)]">
                  Total Invested
                </div>
                <div className="font-medium">
                  {isValid
                    ? `₹ ${breakdown.totalInvested.toLocaleString()}`
                    : "—"}
                </div>
              </div>

              <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
                <div className="text-xs text-[var(--muted)]">Total Returns</div>
                <div className="font-medium">
                  {isValid
                    ? `₹ ${breakdown.totalReturns.toLocaleString()}`
                    : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {isValid ? (
            <div className="p-3 rounded-md bg-[var(--bg)] shadow-sm">
              <h4 className="font-medium mb-3">Investment Breakdown</h4>
              <EMIChart
                breakdown={{
                  emi: breakdown.monthlyInvestment,
                  principal: breakdown.totalInvested,
                  totalInterest: breakdown.totalReturns,
                  totalPayment: breakdown.futureValue,
                }}
                fullWidth
                schedule={schedule}
                interestColor="#10b981"
              />
            </div>
          ) : (
            <div className="text-sm text-[var(--muted)]">
              Enter valid inputs to view charts and breakdown.
            </div>
          )}
        </div>
        <div>
          <h4 className="font-medium">Growth (first 12 months)</h4>
          <div className="overflow-auto mt-2">
            <table className="w-full text-sm">
              <thead className="text-left text-[var(--muted)]">
                <tr>
                  <th>Month</th>
                  <th>Contribution</th>
                  <th>Returns</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.slice(0, 12).map((s) => (
                  <tr key={s.month} className="border-t">
                    <td className="py-2">{s.month}</td>
                    <td>₹ {s.contribution.toLocaleString()}</td>
                    <td>₹ {s.returns.toLocaleString()}</td>
                    <td>₹ {s.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            onClick={() =>
              isValid &&
              navigator.clipboard.writeText(
                `Monthly: ${breakdown.monthlyInvestment}, Future: ${breakdown.futureValue}, Returns: ${breakdown.totalReturns}`
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
