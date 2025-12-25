"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import React, { useState, useRef, useImperativeHandle } from "react";
import Button from "./Button";
import { formatCurrency } from "../lib/utils";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface Breakdown {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
}

const EMIChart = React.forwardRef(function EMIChart(
  {
    breakdown,
    fullWidth = false,
    schedule = [],
    principalColor = "#4f46e5",
    interestColor = "#ef4444",
  }: {
    breakdown: Breakdown;
    fullWidth?: boolean;
    schedule?: Array<any>;
    principalColor?: string;
    interestColor?: string;
  },
  ref: any
) {
  const principal = breakdown.principal;
  const interest = breakdown.totalInterest;
  const total = breakdown.totalPayment;

  const [layout, setLayout] = useState<"stack" | "side">("stack");
  const pieRef = useRef<any>(null);
  const barRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    exportPNG: async () => await exportCombinedPNG(),
  }));

  async function loadImage(src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async function exportCombinedPNG() {
    try {
      const pieImg = pieRef.current?.toBase64Image?.() || null;
      const barImg = barRef.current?.toBase64Image?.() || null;

      if (!pieImg && !barImg) return;

      if (layout === "stack") {
        const width = 1000;
        const pieH = 320;
        const barH = 240;
        const height = pieH + barH + 40;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle =
          getComputedStyle(document.documentElement).getPropertyValue("--bg") ||
          "#fff";
        ctx.fillRect(0, 0, width, height);

        if (pieImg) {
          const img = await loadImage(pieImg);
          const sx = Math.round((width - 320) / 2);
          ctx.drawImage(img, sx, 10, 320, pieH);
        }

        if (barImg) {
          const img2 = await loadImage(barImg);
          ctx.drawImage(img2, 40, 20 + pieH, width - 80, barH);
        }

        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "emi-breakdown.png";
          a.click();
          URL.revokeObjectURL(url);
        });
      } else {
        // side-by-side
        const width = 1000;
        const height = 420;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle =
          getComputedStyle(document.documentElement).getPropertyValue("--bg") ||
          "#fff";
        ctx.fillRect(0, 0, width, height);

        if (pieImg) {
          const img = await loadImage(pieImg);
          ctx.drawImage(img, 40, 40, 360, 360);
        }

        if (barImg) {
          const img2 = await loadImage(barImg);
          ctx.drawImage(img2, 420, 40, 540, 340);
        }

        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "emi-breakdown.png";
          a.click();
          URL.revokeObjectURL(url);
        });
      }
    } catch (err) {
      console.error("Export failed", err);
    }
  }

  function downloadCSV() {
    if (!schedule || schedule.length === 0) return;
    const rows = [
      ["Month", "Payment", "Principal", "Interest", "Balance"],
      ...schedule.map((s: any) => [
        s.month,
        s.payment,
        s.principalComponent,
        s.interestComponent,
        s.balance,
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emi-schedule.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const pieData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [principal, interest],
        backgroundColor: [principalColor, interestColor],
        hoverBackgroundColor: [principalColor, interestColor],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [principal, interest],
        backgroundColor: [principalColor, interestColor],
        borderRadius: 6,
      },
    ],
  };

  const interestPct = total > 0 ? ((interest / total) * 100).toFixed(1) : "0.0";
  const principalPct =
    total > 0 ? ((principal / total) * 100).toFixed(1) : "0.0";

  // fullWidth layout with controls
  if (fullWidth) {
    return (
      <div className="mt-4">
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="text-sm text-[var(--muted)]">View</div>
              <div className="inline-flex rounded-md bg-transparent p-1 border border-[var(--surface-border)]">
                <button
                  className={`px-3 py-1 rounded text-xs sm:text-sm transition-colors ${layout === "stack" ? "bg-primary-500 text-white font-medium shadow-sm" : "bg-transparent text-[var(--muted)] hover:text-[var(--text)]"}`}
                  onClick={() => setLayout("stack")}
                >
                  Stacked
                </button>
                <button
                  className={`px-3 py-1 rounded text-xs sm:text-sm transition-colors ${layout === "side" ? "bg-primary-500 text-white font-medium shadow-sm" : "bg-transparent text-[var(--muted)] hover:text-[var(--text)]"}`}
                  onClick={() => setLayout("side")}
                >
                  Side-by-side
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <Button onClick={() => exportCombinedPNG()} variant="ghost" className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4">
                Export PNG
              </Button>
              <Button onClick={() => downloadCSV()} variant="ghost" className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4">
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        {layout === "stack" ? (
          <div className="p-3 rounded-md bg-[var(--bg)] shadow-sm">
            <h5 className="sr-only">Principal vs Interest</h5>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div style={{ width: 320 }} aria-hidden>
                <Pie ref={pieRef} data={pieData} />
              </div>

              <div className="flex-1">
                <ul className="text-sm space-y-3">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-sm"
                        style={{ background: principalColor }}
                      />
                      <span className="text-[var(--muted)]">Principal</span>
                    </div>
                    <div className="font-medium">
                      ₹ {formatCurrency(principal)}
                    </div>
                  </li>

                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-sm"
                        style={{ background: interestColor }}
                      />
                      <span className="text-[var(--muted)]">Interest</span>
                    </div>
                    <div className="font-medium">
                      ₹ {formatCurrency(interest)}
                    </div>
                  </li>

                  <li className="pt-2 text-sm text-[var(--muted)]">
                    <strong>{interestPct}%</strong> of total payment is interest
                    · <strong>{principalPct}%</strong> principal
                  </li>

                  <li className="pt-3 text-xs text-[var(--muted)]">
                    Total payment: <strong>₹ {formatCurrency(total)}</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4" style={{ height: 240 }}>
              <Bar
                ref={barRef}
                data={barData}
                options={{
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) =>
                          `₹ ${formatCurrency(Number(context.raw))}`,
                      },
                    },
                  },
                  scales: { y: { ticks: { callback: (v) => `₹ ${v}` } } },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-md bg-[var(--bg)] shadow-sm">
              <div style={{ height: 360 }}>
                <Pie ref={pieRef} data={pieData} />
              </div>
            </div>

            <div className="p-3 rounded-md bg-[var(--bg)] shadow-sm">
              <div style={{ height: 360 }}>
                <Bar
                  ref={barRef}
                  data={barData}
                  options={{
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (context) =>
                            `₹ ${formatCurrency(Number(context.raw))}`,
                        },
                      },
                    },
                    scales: { y: { ticks: { callback: (v) => `₹ ${v}` } } },
                    maintainAspectRatio: false,
                  }}
                />
              </div>

              <div className="mt-2 text-xs text-[var(--muted)]">
                Total payment: <strong>₹ {formatCurrency(total)}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-3 rounded-md bg-[var(--bg)] shadow-sm">
        <h5 className="text-sm font-medium mb-2">Principal vs Interest</h5>
        <div className="flex items-center gap-4">
          <div style={{ width: 160 }} aria-hidden>
            <Pie ref={pieRef} data={pieData} />
          </div>

          <div className="flex-1">
            <ul className="text-sm space-y-2">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{ background: principalColor }}
                  />
                  <span className="text-[var(--muted)]">Principal</span>
                </div>
                <div className="font-medium">
                  ₹ {formatCurrency(principal)}
                </div>
              </li>

              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{ background: interestColor }}
                  />
                  <span className="text-[var(--muted)]">Interest</span>
                </div>
                <div className="font-medium">₹ {formatCurrency(interest)}</div>
              </li>

              <li className="pt-2 text-xs text-[var(--muted)]">
                <strong>{interestPct}%</strong> of total payment is interest ·{" "}
                <strong>{principalPct}%</strong> principal
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-md bg-[var(--bg)] shadow-sm">
        <h5 className="text-sm font-medium mb-2">Amount Breakdown</h5>
        <div style={{ height: 160 }}>
          <Bar
            ref={barRef}
            data={barData}
            options={{
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `₹ ${formatCurrency(Number(context.raw))}`,
                  },
                },
              },
              scales: { y: { ticks: { callback: (v) => `₹ ${v}` } } },
              maintainAspectRatio: false,
            }}
          />
        </div>

        <div className="mt-2 text-xs text-[var(--muted)]">
          Total payment: <strong>₹ {formatCurrency(total)}</strong>
        </div>
      </div>
    </div>
  );
});

export default EMIChart;
