"use client";

import React, { useState, useMemo } from "react";
import { minifyHTML, getByteSize, formatBytes } from "../lib/tools/htmlMinifier";
import Button from "./Button";
import Card from "./Card";

export default function HTMLMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const stats = useMemo(() => {
    const originalSize = getByteSize(input);
    const minifiedSize = getByteSize(output);
    const saved = originalSize - minifiedSize;
    const ratio = originalSize > 0 ? ((saved / originalSize) * 100).toFixed(1) : "0";

    return {
      originalSize: formatBytes(originalSize),
      minifiedSize: formatBytes(minifiedSize),
      saved: formatBytes(saved > 0 ? saved : 0),
      ratio,
    };
  }, [input, output]);

  function handleMinify() {
    setOutput(minifyHTML(input));
  }

  function handleClear() {
    setInput("");
    setOutput("");
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.html";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="html-input" className="font-medium">
            Paste your HTML here
          </label>
          <textarea
            id="html-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="w-full border rounded-md p-4 bg-[var(--surface)] font-mono text-sm"
            placeholder="<!DOCTYPE html><html>..."
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleMinify}>Minify HTML</Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>

        {output && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-[var(--bg)] border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-[var(--muted)] uppercase font-bold">Original Size</div>
                <div className="text-lg font-bold">{stats.originalSize}</div>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg)] border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-[var(--muted)] uppercase font-bold">Minified Size</div>
                <div className="text-lg font-bold text-green-500">{stats.minifiedSize}</div>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg)] border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-[var(--muted)] uppercase font-bold">Saved</div>
                <div className="text-lg font-bold">{stats.saved}</div>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg)] border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-[var(--muted)] uppercase font-bold">Reduction</div>
                <div className="text-lg font-bold text-primary-500">{stats.ratio}%</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Minified Output</label>
              <textarea
                value={output}
                readOnly
                rows={8}
                className="w-full border rounded-md p-4 bg-slate-50 dark:bg-slate-900 font-mono text-sm text-[var(--foreground)]"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCopy} className="flex-1">
                Copy to Clipboard
              </Button>
              <Button onClick={handleDownload} variant="ghost" className="flex-1 border">
                Download .html
              </Button>
            </div>
          </div>
        )}

        <div className="text-sm text-[var(--muted)] bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p><strong>Pro Tip:</strong> Minifying HTML reduces page load times by decreasing the amount of data transferred from the server to the browser.</p>
        </div>
      </div>
    </Card>
  );
}
