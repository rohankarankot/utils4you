export function calculateEMI(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number
) {
  if (principal <= 0 || annualRatePercent < 0 || tenureMonths <= 0)
    throw new Error("Invalid inputs");
  const monthlyRate = annualRatePercent / 100 / 12;
  const r = monthlyRate;
  const n = tenureMonths;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Number(emi.toFixed(2));
}

export function calculateEMIBreakdown(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number
) {
  const emi = calculateEMI(principal, annualRatePercent, tenureMonths);
  const totalPayment = Number((emi * tenureMonths).toFixed(2));
  const totalInterest = Number((totalPayment - principal).toFixed(2));
  return {
    emi,
    totalPayment,
    totalInterest,
    principal,
    annualRatePercent,
    tenureMonths,
  };
}

export function generateAmortizationSchedule(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number
) {
  const monthlyRate = annualRatePercent / 100 / 12;
  let balance = principal;
  const emi = calculateEMI(principal, annualRatePercent, tenureMonths);
  const schedule: Array<{
    month: number;
    payment: number;
    principalComponent: number;
    interestComponent: number;
    balance: number;
  }> = [];
  for (let m = 1; m <= tenureMonths; m++) {
    const interestComponent = Number((balance * monthlyRate).toFixed(2));
    let principalComponent = Number((emi - interestComponent).toFixed(2));
    // last payment adjust to zero out rounding
    if (m === tenureMonths) {
      principalComponent = Number(balance.toFixed(2));
    }
    balance = Number((balance - principalComponent).toFixed(2));
    schedule.push({
      month: m,
      payment: Number(emi.toFixed(2)),
      principalComponent,
      interestComponent,
      balance: Math.max(0, balance),
    });
  }
  return schedule;
}
