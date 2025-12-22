"use client";

import React, { useState, useMemo } from "react";
import { calculateAge } from "../lib/tools/ageCalculator";
import Button from "./Button";
import Card from "./Card";

function nextBirthdayDate(birthDate: Date) {
  const now = new Date();
  const y = now.getFullYear();
  const nb = new Date(y, birthDate.getMonth(), birthDate.getDate());
  if (nb < now) nb.setFullYear(y + 1);
  return nb;
}

export default function AgeCalculator() {
  const [birth, setBirth] = useState("1990-01-01");

  const parsed = useMemo(() => {
    try {
      const b = new Date(birth);
      if (isNaN(b.getTime())) return null;
      return b;
    } catch (e) {
      return null;
    }
  }, [birth]);

  const age = useMemo(() => (parsed ? calculateAge(parsed) : null), [parsed]);
  const nextB = useMemo(
    () => (parsed ? nextBirthdayDate(parsed) : null),
    [parsed]
  );
  const daysUntilNext = useMemo(() => {
    if (!nextB) return null;
    const diff = Math.ceil(
      (nextB.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  }, [nextB]);

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <label htmlFor="birthdate" className="font-medium">
          Birth date
        </label>
        <input
          id="birthdate"
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          className="w-full border rounded-md p-2 bg-[var(--surface)]"
          aria-describedby="age-stats"
        />

        <div id="age-stats" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
            <div className="text-xs text-[var(--muted)]">Years</div>
            <div className="font-medium">{age ? age.years : "—"}</div>
          </div>
          <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
            <div className="text-xs text-[var(--muted)]">Months</div>
            <div className="font-medium">{age ? age.months : "—"}</div>
          </div>
          <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
            <div className="text-xs text-[var(--muted)]">Days</div>
            <div className="font-medium">{age ? age.days : "—"}</div>
          </div>
        </div>

        <div className="mt-2">
          <h4 className="font-medium">Next birthday</h4>
          <div className="mt-1 text-sm text-[var(--muted)]">
            {nextB ? `${nextB.toDateString()} (${daysUntilNext} days)` : "—"}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => {
              if (parsed)
                navigator.clipboard.writeText(
                  `${age?.years} years, ${age?.months} months, ${age?.days} days`
                );
            }}
            variant="ghost"
          >
            Copy age
          </Button>
          <Button onClick={() => setBirth("1990-01-01")} variant="ghost">
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}
