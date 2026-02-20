"use client";

import React, { useState, useMemo, useEffect } from "react";
import { calculateAge } from "../lib/tools/ageCalculator";
import Button from "./Button";
import Card from "./Card";

function nextBirthdayDate(birthDate: Date) {
  const now = new Date();
  const y = now.getFullYear();
  const nb = new Date(y, birthDate.getMonth(), birthDate.getDate());
  if (nb < now) nb.setFullYear(y + 1);
  return nb;
}

export default function AgeCalculator() {
  const [birth, setBirth] = useState("1990-01-01");
  const [now, setNow] = useState(new Date());

  // Lifestyle states
  const [gender, setGender] = useState<"male" | "female">("male");
  const [smoking, setSmoking] = useState<"yes" | "no">("no");
  const [exercise, setExercise] = useState<"never" | "occasionally" | "regularly">("occasionally");
  const [diet, setDiet] = useState<"poor" | "average" | "healthy">("average");
  const [stress, setStress] = useState<"low" | "moderate" | "high">("moderate");
  const [showPrediction, setShowPrediction] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const parsed = useMemo(() => {
    try {
      const b = new Date(birth);
      if (isNaN(b.getTime())) return null;
      return b;
    } catch (e) {
      return null;
    }
  }, [birth]);

  const ageData = useMemo(() => (parsed ? calculateAge(parsed) : null), [parsed]);

  const ageInSeconds = useMemo(() => {
    if (!parsed) return null;
    return Math.floor((now.getTime() - parsed.getTime()) / 1000);
  }, [parsed, now]);

  const nextB = useMemo(() => (parsed ? nextBirthdayDate(parsed) : null), [parsed]);
  const daysUntilNext = useMemo(() => {
    if (!nextB) return null;
    return Math.ceil((nextB.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }, [nextB, now]);

  const predictedLifeSpan = useMemo(() => {
    let base = gender === "male" ? 76 : 81;
    if (smoking === "yes") base -= 10;

    if (exercise === "regularly") base += 5;
    else if (exercise === "occasionally") base += 2;

    if (diet === "healthy") base += 4;
    else if (diet === "average") base += 2;

    if (stress === "low") base += 2;
    else if (stress === "high") base -= 3;

    return base;
  }, [gender, smoking, exercise, diet, stress]);

  const timeLeft = useMemo(() => {
    if (!ageData) return null;
    return Math.max(0, predictedLifeSpan - ageData.years);
  }, [ageData, predictedLifeSpan]);

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="birthdate" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              When were you born?
            </label>
            <input
              id="birthdate"
              type="date"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-xl p-3 bg-white dark:bg-slate-900 focus:border-blue-500 transition-all outline-none text-lg"
            />
          </div>

          {/* Real-time Age in Seconds Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/30">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">Age in Real-time</div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white truncate">
              {ageInSeconds?.toLocaleString() || "—"} <span className="text-lg font-normal text-slate-400 dark:text-slate-500">seconds</span>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-2 italic">Life is moving fast. Every second counts!</div>
          </div>

          <div id="age-stats" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
              <div className="text-xs font-semibold text-slate-500 uppercase">Years</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{ageData ? ageData.years : "—"}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
              <div className="text-xs font-semibold text-slate-500 uppercase">Months</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{ageData ? ageData.months : "—"}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
              <div className="text-xs font-semibold text-slate-500 uppercase">Days</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{ageData ? ageData.days : "—"}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
            <div>
              <div className="text-xs font-bold text-emerald-600 uppercase">Next Birthday</div>
              <div className="font-medium text-slate-700 dark:text-slate-200">
                {nextB ? nextB.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-sm self-start sm:self-center">
              {daysUntilNext} days to go
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => {
                if (parsed)
                  navigator.clipboard.writeText(
                    `${ageData?.years} years, ${ageData?.months} months, ${ageData?.days} days`
                  );
              }}
              variant="outline"
              className="flex-1"
            >
              Copy Age
            </Button>
            <Button onClick={() => setBirth("1990-01-01")} variant="ghost">
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Life Expectancy Predictor */}
      <Card>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Life Span Predictor</h3>
            <p className="text-sm text-slate-500">Based on your lifestyle, how many more years do you have?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold">Gender</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setGender("male")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${gender === "male" ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${gender === "female" ? "bg-pink-600 text-white shadow-md shadow-pink-200 dark:shadow-none" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold">Do you smoke?</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSmoking("yes")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${smoking === "yes" ? "bg-slate-800 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setSmoking("no")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${smoking === "no" ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold">Exercise Frequency</label>
              <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value as any)}
                className="w-full border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2 bg-white dark:bg-slate-900 outline-none text-sm"
              >
                <option value="never">Never</option>
                <option value="occasionally">Occasionally</option>
                <option value="regularly">Regularly</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold">Diet Quality</label>
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value as any)}
                className="w-full border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2 bg-white dark:bg-slate-900 outline-none text-sm"
              >
                <option value="poor">Poor (Fast food often)</option>
                <option value="average">Average (Mixed habits)</option>
                <option value="healthy">Healthy (Whole foods)</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 md:col-span-2">
              <label className="text-sm font-semibold">Stress Level</label>
              <select
                value={stress}
                onChange={(e) => setStress(e.target.value as any)}
                className="w-full border-2 border-slate-200 dark:border-slate-800 rounded-xl p-2 bg-white dark:bg-slate-900 outline-none text-sm"
              >
                <option value="low">Low (Relaxed lifestyle)</option>
                <option value="moderate">Moderate (Standard life)</option>
                <option value="high">High (Constant pressure)</option>
              </select>
            </div>
          </div>

          <Button
            onClick={() => setShowPrediction(true)}
            className="w-full py-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-transform active:scale-95"
          >
            Predict My Life Span
          </Button>

          {showPrediction && (
            <div className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="text-sm font-bold uppercase tracking-widest text-slate-400">Predicted Life Span</div>
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  {predictedLifeSpan} <span className="text-2xl text-slate-500 font-normal">years</span>
                </div>
                <div className="h-px w-full bg-slate-700 my-2" />
                <div className="text-slate-300">
                  Based on your current age of <span className="font-bold text-white">{ageData?.years}</span>, you have approximately
                  <div className="text-3xl font-bold text-emerald-400 my-2">{timeLeft} years</div>
                  remaining to live your best life!
                </div>
                <p className="text-[10px] text-slate-500 mt-2 max-w-xs">
                  *Disclaimer: This is a statistical estimation for entertainment purposes only and not medical advice.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
