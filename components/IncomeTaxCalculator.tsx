"use client";

import React, { useState, useEffect } from "react";
import { Info, IndianRupee, TrendingDown, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { calculateOldRegimeTax, calculateNewRegimeTax, AgeGroup, FinancialYear } from "../lib/tools/incomeTaxCalculator";

const IncomeTaxCalculator: React.FC = () => {
    const [income, setIncome] = useState<number>(1000000);
    const [fy, setFy] = useState<FinancialYear>("2024-25");
    const [ageGroup, setAgeGroup] = useState<AgeGroup>("below60");

    // Deductions for Old Regime
    const [deduction80C, setDeduction80C] = useState<number>(150000);
    const [deduction80D, setDeduction80D] = useState<number>(25000);
    const [hra, setHra] = useState<number>(0);
    const [otherDeductions, setOtherDeductions] = useState<number>(0);

    const [showDetailedDeductions, setShowDetailedDeductions] = useState(false);

    const totalDeductions = deduction80C + deduction80D + hra + otherDeductions;

    const oldResult = calculateOldRegimeTax(income, totalDeductions, ageGroup);
    const newResult = calculateNewRegimeTax(income, fy);

    const betterRegime = oldResult.totalTax < newResult.totalTax ? "Old Regime" : "New Regime";
    const savings = Math.abs(oldResult.totalTax - newResult.totalTax);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(val);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Input Section */}
            <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-3xl shadow-xl border border-[var(--surface-border)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[var(--muted)] flex items-center gap-2">
                            Annual Gross Salary
                            <Info size={14} className="text-blue-500" />
                        </label>
                        <div className="relative">
                            <IndianRupee size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                            <input
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(Number(e.target.value))}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[var(--bg)] border border-[var(--surface-border)] font-bold text-xl focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
                                placeholder="e.g. 1000000"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[var(--muted)]">Financial Year</label>
                        <select
                            value={fy}
                            onChange={(e) => setFy(e.target.value as FinancialYear)}
                            className="w-full px-4 py-4 rounded-2xl bg-[var(--bg)] border border-[var(--surface-border)] font-semibold text-lg focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all appearance-none"
                        >
                            <option value="2024-25">FY 2024-25 (A.Y. 2025-26)</option>
                            <option value="2025-26">FY 2025-26 (A.Y. 2026-27)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[var(--muted)]">Age Group (For Old Regime)</label>
                        <select
                            value={ageGroup}
                            onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                            className="w-full px-4 py-4 rounded-2xl bg-[var(--bg)] border border-[var(--surface-border)] font-semibold text-lg focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all appearance-none"
                        >
                            <option value="below60">Below 60 Years</option>
                            <option value="60to79">60 - 79 Years (Senior Citizen)</option>
                            <option value="above80">80+ Years (Super Senior)</option>
                        </select>
                    </div>
                </div>

                {/* Deductions Section */}
                <div className="mt-8 pt-8 border-t border-[var(--surface-border)]">
                    <button
                        onClick={() => setShowDetailedDeductions(!showDetailedDeductions)}
                        className="flex items-center gap-2 text-[var(--primary)] font-bold mb-4 hover:underline"
                    >
                        {showDetailedDeductions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        {showDetailedDeductions ? "Hide Deductions (Old Regime only)" : "Add Deductions & Exemptions (Old Regime)"}
                    </button>

                    {showDetailedDeductions && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                            <DeductionInput label="80C (LIC, PPF, etc)" val={deduction80C} setVal={setDeduction80C} max={150000} />
                            <DeductionInput label="80D (Health Insurance)" val={deduction80D} setVal={setDeduction80D} />
                            <DeductionInput label="HRA / Rent Exemption" val={hra} setVal={setHra} />
                            <DeductionInput label="Other Deductions" val={otherDeductions} setVal={setOtherDeductions} />
                        </div>
                    )}
                </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RegimeCard
                    title="New Tax Regime"
                    result={newResult}
                    isBetter={betterRegime === "New Regime"}
                    standardDeduction={75000}
                    fy={fy}
                />
                <RegimeCard
                    title="Old Tax Regime"
                    result={oldResult}
                    isBetter={betterRegime === "Old Regime"}
                    standardDeduction={50000}
                    deductions={totalDeductions}
                />
            </div>

            {/* Conclusion Banner */}
            <div className={`p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 border-2 ${savings === 0 ? "bg-slate-50 border-slate-200" : "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-900/30"
                }`}>
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${savings === 0 ? "bg-slate-200 text-slate-600" : "bg-emerald-200 text-emerald-700"
                        }`}>
                        <TrendingDown size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">
                            {savings === 0 ? "Both regimes result in the same tax." : `Switch to ${betterRegime} to save ${formatCurrency(savings)}`}
                        </h3>
                        <p className="text-sm text-[var(--muted)]">Calculated based on your inputs and latest tax slabs.</p>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <p className="text-center text-xs text-[var(--muted)] px-4">
                Disclaimer: This calculator is for illustrative purposes only. Actual tax liability may vary based on specific circumstances and official IT department assessments. Please consult a professional tax advisor.
            </p>
        </div>
    );
};

const DeductionInput = ({ label, val, setVal, max }: { label: string, val: number, setVal: any, max?: number }) => (
    <div className="space-y-1">
        <label className="text-xs font-semibold text-[var(--muted)]">{label}</label>
        <div className="relative">
            <input
                type="number"
                value={val}
                onChange={(e) => setVal(max ? Math.min(Number(e.target.value), max) : Number(e.target.value))}
                className="w-full pl-3 pr-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--surface-border)] font-medium focus:ring-1 focus:ring-[var(--primary)] outline-none"
            />
            {max && val >= max && <span className="absolute -bottom-4 left-0 text-[10px] text-orange-500">Max limit reached</span>}
        </div>
    </div>
);

const RegimeCard = ({ title, result, isBetter, standardDeduction, deductions = 0, fy }: any) => {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(val);
    };

    return (
        <div className={`relative p-8 rounded-3xl border-2 transition-all ${isBetter
                ? "bg-[var(--surface)] border-[var(--primary)] shadow-xl ring-4 ring-blue-500/5 scale-[1.02]"
                : "bg-[var(--surface)] border-[var(--surface-border)] opacity-80"
            }`}>
            {isBetter && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Recommended
                </span>
            )}

            <h3 className="text-2xl font-bold mb-6 text-center">{title}</h3>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted)]">Taxable Income</span>
                    <span className="font-semibold">{formatCurrency(result.taxableIncome)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted)]">Standard Deduction</span>
                    <span className="text-emerald-600">-{formatCurrency(standardDeduction)}</span>
                </div>
                {deductions > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-[var(--muted)]">Other Deductions</span>
                        <span className="text-emerald-600">-{formatCurrency(deductions)}</span>
                    </div>
                )}
                <div className="pt-4 border-t border-dashed border-[var(--surface-border)] flex justify-between font-bold text-xl">
                    <span>Net Tax</span>
                    <span className={isBetter ? "text-[var(--primary)]" : ""}>{formatCurrency(result.totalTax)}</span>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">Slab Breakdown</h4>
                {result.slabs.map((slab: any, i: number) => (
                    <div key={i} className="flex justify-between text-xs p-2 rounded-lg bg-[var(--bg)]">
                        <span className="text-[var(--muted)]">{slab.label} @ {slab.rate}</span>
                        <span className="font-mono">{formatCurrency(slab.tax)}</span>
                    </div>
                ))}
                {result.rebate87A > 0 && (
                    <div className="flex justify-between text-xs p-2 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                        <span>Rebate Sec 87A</span>
                        <span>-{formatCurrency(result.rebate87A)}</span>
                    </div>
                )}
                <div className="flex justify-between text-xs p-2">
                    <span className="text-[var(--muted)]">Cess (4%)</span>
                    <span className="font-mono">{formatCurrency(result.cess)}</span>
                </div>
            </div>
        </div>
    );
};

export default IncomeTaxCalculator;
