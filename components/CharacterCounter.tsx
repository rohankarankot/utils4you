"use client";

import React, { useState, useMemo } from "react";
import {
  charCount,
  charCountNoSpaces,
  utf8ByteLength,
} from "../lib/tools/wordCounter";
import Button from "./Button";
import Card from "./Card";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);

  const stats = useMemo(
    () => ({
      chars: charCount(text),
      charsNoSpaces: charCountNoSpaces(text),
      bytes: utf8ByteLength(text),
    }),
    [text]
  );

  function handleCopy() {
    navigator.clipboard.writeText(text);
  }
  function handleClear() {
    setText("");
  }
  function handleDownload() {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <label htmlFor="char-text" className="font-medium">
          Enter text
        </label>
        <textarea
          id="char-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full border rounded-md p-3 bg-[var(--surface)]"
          aria-describedby="char-stats"
        />

        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={excludeSpaces}
              onChange={() => setExcludeSpaces(!excludeSpaces)}
            />{" "}
            Exclude spaces
          </label>
          <div className="ml-auto flex gap-2">
            <Button onClick={handleCopy} variant="ghost">
              Copy
            </Button>
            <Button onClick={handleDownload} variant="ghost">
              Download
            </Button>
            <Button onClick={handleClear} variant="ghost">
              Clear
            </Button>
          </div>
        </div>

        <div id="char-stats" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
            <div className="text-xs text-[var(--muted)]">Characters</div>
            <div className="font-medium">
              {excludeSpaces ? stats.charsNoSpaces : stats.chars}
            </div>
          </div>
          <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
            <div className="text-xs text-[var(--muted)]">Bytes (UTF-8)</div>
            <div className="font-medium">{stats.bytes}</div>
          </div>
          <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
            <div className="text-xs text-[var(--muted)]">With spaces</div>
            <div className="font-medium">{stats.chars}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
