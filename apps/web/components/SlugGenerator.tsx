"use client";

import React, { useState } from "react";
import { slugify } from "../lib/tools/wordCounter";
import Button from "./Button";
import Card from "./Card";

export default function SlugGenerator() {
  const [text, setText] = useState("");
  const [lower, setLower] = useState(true);
  const [removeAccents, setRemoveAccents] = useState(true);
  const [maxLength, setMaxLength] = useState(100);

  const result = slugify(text, { lower, removeAccents, maxLength });

  function handleCopy() {
    navigator.clipboard.writeText(result);
  }
  function handleClear() {
    setText("");
  }

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <label htmlFor="slug-input" className="font-medium">
          Source text
        </label>
        <textarea
          id="slug-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full border rounded-md p-3 bg-[var(--surface)]"
        />

        <div className="flex gap-3 items-center">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={lower}
              onChange={() => setLower(!lower)}
            />{" "}
            Lowercase
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={removeAccents}
              onChange={() => setRemoveAccents(!removeAccents)}
            />{" "}
            Remove accents
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            Max length{" "}
            <input
              type="number"
              value={maxLength}
              onChange={(e) => setMaxLength(Number(e.target.value) || 0)}
              className="w-20 ml-2 border rounded p-1"
            />
          </label>
          <div className="ml-auto flex gap-2">
            <Button onClick={handleCopy} variant="ghost">
              Copy
            </Button>
            <Button onClick={handleClear} variant="ghost">
              Clear
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-medium">Slug</h4>
          <div className="mt-2 p-3 bg-[var(--bg)] rounded-md min-h-[40px] font-mono">
            {result || (
              <span className="text-[var(--muted)]">
                Your slug will appear here
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
