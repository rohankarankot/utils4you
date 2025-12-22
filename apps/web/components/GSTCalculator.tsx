"use client";

import React, { useMemo, useState } from "react";
import Card from "./Card";
import Button from "./Button";
import { calculateGST } from "../lib/tools/gstCalculator";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Info } from "lucide-react";
import { splitTax } from "../lib/tools/gstCalculator";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function GSTCalculator() {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(18);
  const [isCustomRate, setIsCustomRate] = useState<boolean>(false);
  const [type, setType] = useState<"exclusive" | "inclusive">("exclusive");

  const isValid = amount >= 0 && rate >= 0;

  const breakdown = useMemo(() => {
    if (!isValid) return { base: 0, tax: 0, total: 0 };
    try {
      return calculateGST(amount, rate, type);
    } catch (e) {
      return { base: 0, tax: 0, total: 0 };
    }
  }, [amount, rate, type, isValid]);

  function downloadCSV() {
    const rows = [
      "Type,Amount,Rate,Base,Tax,Total",
      `${type},${amount},${rate},${breakdown.base},${breakdown.tax},${breakdown.total}`,
    ];
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gst-breakdown.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const [splitEnabled, setSplitEnabled] = useState<boolean>(false);
  const [cgstPercent, setCgstPercent] = useState<number>(50);

  const split = splitEnabled ? splitTax(breakdown.tax, cgstPercent) : null;

  const pieData = splitEnabled
    ? {
        labels: ["Base", "CGST", "SGST"],
        datasets: [
          {
            data: [breakdown.base, split?.cgst ?? 0, split?.sgst ?? 0],
            backgroundColor: ["#4f46e5", "#10b981", "#06b6d4"],
            hoverBackgroundColor: ["#6366f1", "#34d399", "#38bdf8"],
            borderWidth: 0,
          },
        ],
      }
    : {
        labels: ["Base", "Tax"],
        datasets: [
          {
            data: [breakdown.base, breakdown.tax],
            backgroundColor: ["#4f46e5", "#10b981"],
            hoverBackgroundColor: ["#6366f1", "#34d399"],
            borderWidth: 0,
          },
        ],
      };

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium">Amount (₹)</label>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-full border p-2 rounded-md bg-[var(--surface)]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">GST Rate (%)</label>
            <div className="flex flex-col sm:flex-row gap-2 mt-1 items-start sm:items-center">
              <select
                value={isCustomRate ? "custom" : String(rate)}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "custom") {
                    setIsCustomRate(true);
                  } else {
                    setIsCustomRate(false);
                    setRate(Number(val));
                  }
                }}
                className="border p-2 rounded-md bg-[var(--surface)] w-full sm:w-36"
              >
                <option value="0">0%</option>
                <option value="0.5">0.5%</option>
                <option value="3">3%</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
                <option value="custom">Custom</option>
              </select>

              <input
                type="number"
                step="0.01"
                min={0}
                value={rate}
                disabled={!isCustomRate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                className="w-full sm:flex-1 border p-2 rounded-md bg-[var(--surface)]"
                aria-disabled={!isCustomRate}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Type</label>
            <div className="flex gap-2 mt-1">
              <button
                className={`px-3 py-1 rounded ${type === "exclusive" ? "bg-primary-500 text-white" : "bg-transparent"}`}
                onClick={() => setType("exclusive")}
              >
                Exclusive
              </button>
              <button
                className={`px-3 py-1 rounded ${type === "inclusive" ? "bg-primary-500 text-white" : "bg-transparent"}`}
                onClick={() => setType("inclusive")}
              >
                Inclusive
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
                <div className="text-xs text-[var(--muted)]">Base Amount</div>
                <div className="font-medium">
                  ₹ {breakdown.base.toLocaleString()}
                </div>
              </div>

              <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
                <div className="text-xs text-[var(--muted)]">Tax Amount</div>
                <div className="font-medium">
                  ₹ {breakdown.tax.toLocaleString()}
                </div>
              </div>

              <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
                <div className="text-xs text-[var(--muted)]">Total</div>
                <div className="font-medium">
                  ₹ {breakdown.total.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-0 p-3 rounded-md bg-[var(--bg)] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-sm font-medium">Breakdown</h5>
            <div className="flex items-center gap-2">
              <label className="text-xs text-[var(--muted)]">Split tax</label>
              <input
                type="checkbox"
                checked={splitEnabled}
                onChange={(e) => setSplitEnabled(e.target.checked)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6 flex-col sm:flex-row">
            <div className="w-36 h-36 sm:w-40 sm:h-40" aria-hidden>
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>

            <div className="text-sm w-full">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ background: "#4f46e5" }}
                />
                <div className="text-[var(--muted)]">Base</div>
                <div className="ml-auto font-medium">
                  ₹ {breakdown.base.toLocaleString()}
                </div>
              </div>

              {splitEnabled ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{ background: "#10b981" }}
                    />
                    <div className="text-[var(--muted)]">
                      CGST ({cgstPercent}%)
                    </div>
                    <div className="ml-auto font-medium">
                      ₹ {split?.cgst.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{ background: "#06b6d4" }}
                    />
                    <div className="text-[var(--muted)]">
                      SGST ({100 - cgstPercent}%)
                    </div>
                    <div className="ml-auto font-medium">
                      ₹ {split?.sgst.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2">
                    <label className="text-xs text-[var(--muted)]">
                      CGST %
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={cgstPercent}
                      onChange={(e) =>
                        setCgstPercent(Number(e.target.value) || 0)
                      }
                      className="border p-1 rounded-md w-20"
                    />
                    <div className="text-xs text-[var(--muted)] ml-0 sm:ml-2">
                      (remaining goes to SGST)
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{ background: "#10b981" }}
                  />
                  <div className="text-[var(--muted)]">Tax</div>
                  <div className="ml-auto font-medium">
                    ₹ {breakdown.tax.toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 text-xs text-[var(--muted)] flex items-center gap-2">
            <Info size={14} />
            <div>
              <strong>Note:</strong> Inclusive price includes GST. Exclusive
              price is base + GST. Toggle split to view CGST/SGST.
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() =>
              navigator.clipboard.writeText(
                `Base: ${breakdown.base}, Tax: ${breakdown.tax}, Total: ${breakdown.total}`
              )
            }
            className="w-full sm:w-auto"
          >
            Copy Summary
          </Button>

          <Button
            onClick={downloadCSV}
            variant="ghost"
            className="w-full sm:w-auto"
          >
            Download CSV
          </Button>
        </div>
      </div>
    </Card>
  );
}
