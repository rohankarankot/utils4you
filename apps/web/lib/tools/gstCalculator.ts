export function calculateGST(
  amount: number,
  gstPercent: number,
  type: "inclusive" | "exclusive" = "exclusive"
) {
  if (amount < 0 || gstPercent < 0) throw new Error("Invalid inputs");
  const gstRate = gstPercent / 100;
  if (type === "exclusive") {
    const tax = Number((amount * gstRate).toFixed(2));
    return { base: amount, tax, total: Number((amount + tax).toFixed(2)) };
  } else {
    const base = Number((amount / (1 + gstRate)).toFixed(2));
    const tax = Number((amount - base).toFixed(2));
    return { base, tax, total: amount };
  }
}

export function splitTax(tax: number, cgstPercent = 50) {
  if (typeof tax !== "number" || typeof cgstPercent !== "number")
    throw new Error("Invalid inputs");
  if (tax < 0 || cgstPercent < 0 || cgstPercent > 100)
    throw new Error("Invalid inputs");
  const cgst = Number((tax * (cgstPercent / 100)).toFixed(2));
  const sgst = Number((tax - cgst).toFixed(2));
  return { cgst, sgst, cgstPercent };
}
