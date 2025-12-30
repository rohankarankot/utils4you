"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored) {
      document.documentElement.classList.toggle("dark", stored === "dark");
      setTheme(stored === "dark" ? "dark" : "light");
    } else {
      // follow system
      const prefers =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefers);
      setTheme(prefers ? "dark" : "light");
    }
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--surface-border)] hover:border-[var(--primary)] hover:bg-[var(--surface-border)] transition-all"
      aria-pressed={theme === "dark"}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} className="text-slate-700" />
      )}
    </button>
  );
}
