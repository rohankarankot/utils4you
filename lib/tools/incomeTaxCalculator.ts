export type AgeGroup = "below60" | "60to79" | "above80";
export type FinancialYear = "2024-25" | "2025-26";

interface TaxResult {
    taxableIncome: number;
    taxBeforeCess: number;
    cess: number;
    rebate87A: number;
    totalTax: number;
    slabs: { label: string; tax: number; rate: string }[];
}

export function calculateNewRegimeTax(
    grossIncome: number,
    fy: FinancialYear = "2024-25"
): TaxResult {
    const standardDeduction = 75000;
    const taxableIncome = Math.max(0, grossIncome - standardDeduction);

    let tax = 0;
    const slabs: { label: string; tax: number; rate: string }[] = [];

    if (fy === "2024-25") {
        // FY 2024-25 New Regime Slabs
        const limits = [300000, 700000, 1000000, 1200000, 1500000];
        const rates = [0, 0.05, 0.1, 0.15, 0.2, 0.3];

        let remaining = taxableIncome;
        for (let i = 0; i < limits.length; i++) {
            const prevLimit = i === 0 ? 0 : limits[i - 1];
            const slabSize = limits[i] - prevLimit;
            const inSlab = Math.min(Math.max(0, remaining), slabSize);
            const slabTax = inSlab * rates[i];
            tax += slabTax;
            remaining -= inSlab;
            if (rates[i] > 0 || inSlab > 0) {
                slabs.push({ label: `${prevLimit / 100000}-${limits[i] / 100000}L`, tax: slabTax, rate: `${rates[i] * 100}%` });
            }
        }
        if (remaining > 0) {
            const slabTax = remaining * 0.3;
            tax += slabTax;
            slabs.push({ label: ">15L", tax: slabTax, rate: "30%" });
        }

        // Rebate 87A: Income up to 7L (after SD) is zero tax
        let rebate87A = 0;
        if (taxableIncome <= 700000) {
            rebate87A = tax;
        }

        const taxAfterRebate = Math.max(0, tax - rebate87A);
        const cess = taxAfterRebate * 0.04;

        return {
            taxableIncome,
            taxBeforeCess: tax,
            cess,
            rebate87A,
            totalTax: Math.round(taxAfterRebate + cess),
            slabs,
        };
    } else {
        // FY 2025-26 New Regime Slabs (Budget 2025)
        // 0-4L: 0%, 4-8L: 5%, 8-12L: 10%, 12-16L: 15%, 16-20L: 20%, 20-24L: 25%, >24L: 30%
        const limits = [400000, 800000, 1200000, 1600000, 2000000, 2400000];
        const rates = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3];

        let remaining = taxableIncome;
        for (let i = 0; i < limits.length; i++) {
            const prevLimit = i === 0 ? 0 : limits[i - 1];
            const slabSize = limits[i] - prevLimit;
            const inSlab = Math.min(Math.max(0, remaining), slabSize);
            const slabTax = inSlab * rates[i];
            tax += slabTax;
            remaining -= inSlab;
            if (rates[i] > 0 || inSlab > 0) {
                slabs.push({ label: `${prevLimit / 100000}-${limits[i] / 100000}L`, tax: slabTax, rate: `${rates[i] * 100}%` });
            }
        }
        if (remaining > 0) {
            const slabTax = remaining * 0.3;
            tax += slabTax;
            slabs.push({ label: ">24L", tax: slabTax, rate: "30%" });
        }

        // Rebate 87A: Income up to 12L (after SD) is zero tax
        let rebate87A = 0;
        if (taxableIncome <= 1200000) {
            rebate87A = tax;
        }

        const taxAfterRebate = Math.max(0, tax - rebate87A);
        const cess = taxAfterRebate * 0.04;

        return {
            taxableIncome,
            taxBeforeCess: tax,
            cess,
            rebate87A,
            totalTax: Math.round(taxAfterRebate + cess),
            slabs,
        };
    }
}

export function calculateOldRegimeTax(
    grossIncome: number,
    deductions: number,
    ageGroup: AgeGroup = "below60"
): TaxResult {
    const standardDeduction = 50000;
    const taxableIncome = Math.max(0, grossIncome - standardDeduction - deductions);

    let tax = 0;
    const slabs: { label: string; tax: number; rate: string }[] = [];

    // Exemption limit depends on age
    let exemptionLimit = 250000;
    if (ageGroup === "60to79") exemptionLimit = 300000;
    if (ageGroup === "above80") exemptionLimit = 500000;

    // Slabs: 0-Exemption(0%), Exemption-5L(5%), 5L-10L(20%), >10L(30%)
    if (taxableIncome > exemptionLimit) {
        // 5% slab (up to 5L)
        const slab5Limit = 500000;
        const inSlab5 = Math.min(Math.max(0, taxableIncome - exemptionLimit), slab5Limit - exemptionLimit);
        const tax5 = inSlab5 * 0.05;
        tax += tax5;
        if (inSlab5 > 0) slabs.push({ label: `${exemptionLimit / 100000}-5L`, tax: tax5, rate: "5%" });

        // 20% slab (5L to 10L)
        if (taxableIncome > 500000) {
            const inSlab20 = Math.min(Math.max(0, taxableIncome - 500000), 500000);
            const tax20 = inSlab20 * 0.2;
            tax += tax20;
            if (inSlab20 > 0) slabs.push({ label: "5-10L", tax: tax20, rate: "20%" });
        }

        // 30% slab (>10L)
        if (taxableIncome > 1000000) {
            const inSlab30 = taxableIncome - 1000000;
            const tax30 = inSlab30 * 0.3;
            tax += tax30;
            if (inSlab30 > 0) slabs.push({ label: ">10L", tax: tax30, rate: "30%" });
        }
    }

    // Rebate 87A: Income up to 5L is zero tax
    let rebate87A = 0;
    if (taxableIncome <= 500000) {
        rebate87A = Math.min(tax, 12500);
    }

    const taxAfterRebate = Math.max(0, tax - rebate87A);
    const cess = taxAfterRebate * 0.04;

    return {
        taxableIncome,
        taxBeforeCess: tax,
        cess,
        rebate87A,
        totalTax: Math.round(taxAfterRebate + cess),
        slabs,
    };
}
