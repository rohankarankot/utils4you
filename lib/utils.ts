import clsx from "clsx";

export function cn(...inputs: any[]) {
  return clsx(...inputs);
}

export function formatCurrency(amount: number) {
  return amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}
