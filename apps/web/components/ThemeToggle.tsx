"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";

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
      className="btn btn-ghost w-10 h-10 p-0 rounded-full border border-[var(--surface-border)] hover:border-[var(--primary)]"
      aria-pressed={theme === "dark"}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
