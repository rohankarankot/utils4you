export function calculateSIP(
  monthlyInvestment: number,
  annualReturnPercent: number,
  tenureYears: number
) {
  if (monthlyInvestment <= 0 || annualReturnPercent < 0 || tenureYears <= 0)
    throw new Error("Invalid inputs");
  const r = annualReturnPercent / 100 / 12;
  const n = tenureYears * 12;
  const fv = ((monthlyInvestment * (Math.pow(1 + r, n) - 1)) / r) * (1 + r);
  return Number(fv.toFixed(2));
}

export function calculateSIPBreakdown(
  monthlyInvestment: number,
  annualReturnPercent: number,
  tenureYears: number
) {
  const fv = calculateSIP(monthlyInvestment, annualReturnPercent, tenureYears);
  const months = Math.round(tenureYears * 12);
  const totalInvested = Number((monthlyInvestment * months).toFixed(2));
  const totalReturns = Number((fv - totalInvested).toFixed(2));
  return {
    monthlyInvestment,
    annualReturnPercent,
    tenureYears,
    months,
    futureValue: fv,
    totalInvested,
    totalReturns,
  };
}

export function generateSIPSchedule(
  monthlyInvestment: number,
  annualReturnPercent: number,
  tenureYears: number
) {
  if (monthlyInvestment <= 0 || annualReturnPercent < 0 || tenureYears <= 0)
    return [];
  const r = annualReturnPercent / 100 / 12;
  const months = Math.round(tenureYears * 12);
  const schedule: Array<{
    month: number;
    contribution: number;
    returns: number;
    balance: number;
  }> = [];
  let balance = 0;
  for (let m = 1; m <= months; m++) {
    // For SIP (annuity due), contribution is assumed at start of period
    balance = Number((balance + monthlyInvestment).toFixed(2));
    const returns = Number((balance * r).toFixed(2));
    balance = Number((balance + returns).toFixed(2));
    schedule.push({
      month: m,
      contribution: monthlyInvestment,
      returns,
      balance: Math.max(0, balance),
    });
  }
  return schedule;
}
