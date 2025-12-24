export function calculateBMI(weightKg: number, heightCm: number) {
  if (weightKg <= 0 || heightCm <= 0) throw new Error('Invalid inputs');
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return Number(bmi.toFixed(2));
}
