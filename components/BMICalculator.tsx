"use client";

import React, { useState } from "react";
import { calculateBMI } from "../lib/tools/bmiCalculator";
import Button from "./Button";
import Card from "./Card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BMICalculator() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [bmi, setBmi] = useState<number | null>(null);

  function handleCalculate() {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
      setBmi(calculateBMI(w, h));
    }
  }

  function getCategory(value: number) {
    if (value < 18.5) return { label: "Underweight", color: "bg-blue-500", textColor: "text-blue-500", index: 0 };
    if (value < 25) return { label: "Healthy Weight", color: "bg-green-500", textColor: "text-green-500", index: 1 };
    if (value < 30) return { label: "Overweight", color: "bg-yellow-500", textColor: "text-yellow-500", index: 2 };
    return { label: "Obese", color: "bg-red-500", textColor: "text-red-500", index: 3 };
  }

  const chartData = {
    labels: ["Underweight", "Healthy", "Overweight", "Obese"],
    datasets: [
      {
        label: "BMI Range",
        data: [18.5, 6.5, 5, 10], // Simplified visualized widths
        backgroundColor: [
          "#3b82f6", // blue-500
          "#22c55e", // green-500
          "#eab308", // yellow-500
          "#ef4444", // red-500
        ],
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false, stacked: true },
      y: { display: false, stacked: true },
    },
  };

  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border rounded-md p-3 bg-[var(--surface)]"
              placeholder="e.g. 30"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Gender</label>
            <div className="flex gap-2">
              <button
                onClick={() => setGender("male")}
                className={cn(
                  "flex-1 py-3 px-4 rounded-md border transition-all",
                  gender === "male"
                    ? "bg-primary-500 text-white border-primary-500"
                    : "bg-[var(--surface)] border-slate-200 dark:border-slate-800"
                )}
              >
                Male
              </button>
              <button
                onClick={() => setGender("female")}
                className={cn(
                  "flex-1 py-3 px-4 rounded-md border transition-all",
                  gender === "female"
                    ? "bg-primary-500 text-white border-primary-500"
                    : "bg-[var(--surface)] border-slate-200 dark:border-slate-800"
                )}
              >
                Female
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border rounded-md p-3 bg-[var(--surface)]"
              placeholder="70"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border rounded-md p-3 bg-[var(--surface)]"
              placeholder="175"
            />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full sm:w-auto self-start">
          Calculate BMI
        </Button>

        {bmi !== null && (
          <div className="mt-4 flex flex-col gap-6 p-6 bg-[var(--bg)] rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-center">
              <div className="text-sm text-[var(--muted)] mb-1">Your BMI is</div>
              <div className="text-5xl font-bold mb-2">{bmi}</div>
              <div className={cn("text-xl font-semibold", getCategory(bmi).textColor)}>
                {getCategory(bmi).label}
              </div>
            </div>

            {/* Visual Scale */}
            <div className="relative pt-6">
              <div className="h-4 w-full flex rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="h-full bg-blue-500" style={{ width: "18.5%" }} />
                <div className="h-full bg-green-500" style={{ width: "25%" }} />
                <div className="h-full bg-yellow-500" style={{ width: "15%" }} />
                <div className="h-full bg-red-500" style={{ width: "41.5%" }} />
              </div>
              <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1 px-1">
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40+</span>
              </div>
              {/* Pointer */}
              <div 
                className="absolute top-4 transition-all duration-500 flex flex-col items-center"
                style={{ left: `${Math.min(Math.max((bmi / 40) * 100, 2), 98)}%` }}
              >
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-primary-500 mb-1" />
                <div className="text-[10px] font-bold text-primary-500">YOU</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {chartData.labels.map((label, i) => {
                const isCurrent = getCategory(bmi).index === i;
                return (
                  <div key={label} className={cn(
                    "p-2 rounded-lg text-center text-xs border transition-all",
                    isCurrent 
                      ? "bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 font-bold" 
                      : "bg-transparent border-transparent opacity-60"
                  )}>
                    <div className={cn("w-2 h-2 rounded-full mx-auto mb-1", 
                      i === 0 ? "bg-blue-500" : i === 1 ? "bg-green-500" : i === 2 ? "bg-yellow-500" : "bg-red-500"
                    )} />
                    {label}
                  </div>
                );
              })}
            </div>
            
            <div className="text-xs text-[var(--muted)] border-t pt-4">
              <p>Interpretation for a {age ? `${age} year old` : "person's"} {gender}:</p>
              <p className="mt-1">BMI is a standard measurement, but results for {gender}s can vary slightly in body composition. Consult a professional for a detailed health assessment.</p>
            </div>
          </div>
        )}

        <div className="text-sm text-[var(--muted)]">
          <p><strong>Note:</strong> BMI is a general screening tool and does not account for muscle mass, bone density, or overall body composition.</p>
        </div>
      </div>
    </Card>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
