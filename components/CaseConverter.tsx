"use client";

import React, { useState } from "react";
import { caseConvert } from "../lib/tools/wordCounter";
import Button from "./Button";
import Card from "./Card";

export default function CaseConverter() {
  const [text, setText] = useState("");

  function apply(mode: "upper" | "lower" | "title" | "sentence") {
    setText(caseConvert(text, mode));
  }

  function handleCopy() {
    navigator.clipboard.writeText(text);
  }
  function handleClear() {
    setText("");
  }

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <label htmlFor="case-text" className="font-medium">
          Enter text
        </label>
        <textarea
          id="case-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full border rounded-md p-3 bg-[var(--surface)]"
          aria-label="Text to convert"
        />

        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => apply("upper")}>UPPERCASE</Button>
          <Button onClick={() => apply("lower")} variant="ghost">
            lowercase
          </Button>
          <Button onClick={() => apply("title")} variant="ghost">
            Title Case
          </Button>
          <Button onClick={() => apply("sentence")} variant="ghost">
            Sentence case
          </Button>
          <Button onClick={handleCopy} variant="ghost">
            Copy
          </Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>

        <div>
          <h4 className="font-medium">Preview</h4>
          <div className="mt-2 p-3 bg-[var(--bg)] rounded-md min-h-[56px] whitespace-pre-wrap">
            {text || (
              <span className="text-[var(--muted)]">Nothing to preview</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
