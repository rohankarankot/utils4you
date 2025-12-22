"use client";

import React from "react";
import { cn } from "../lib/utils";

const base =
  "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
const VARIANT_CLASSES: Record<string, string> = {
  default: "bg-primary-500 text-white hover:bg-primary-600",
  ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800",
};
const SIZE_CLASSES: Record<string, string> = {
  sm: "h-8 px-3 text-sm",
  default: "h-10 px-4",
  lg: "h-12 px-6",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: "default" | "ghost";
  size?: "sm" | "default" | "lg";
};

export default function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    base,
    VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.default,
    SIZE_CLASSES[size] ?? SIZE_CLASSES.default,
    className
  );
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
