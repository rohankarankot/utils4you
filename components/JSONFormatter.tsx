"use client";

import React, { useState, useMemo } from "react";
import Button from "./Button";
import Card from "./Card";

interface JSONNodeProps {
  data: any;
  label?: string;
  isLast?: boolean;
  depth?: number;
}

const JSONNode: React.FC<JSONNodeProps> = ({ data, label, isLast = true, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(depth < 2); // Open by default for top levels

  const isObject = typeof data === "object" && data !== null;
  const isArray = Array.isArray(data);
  const type = isArray ? "array" : typeof data;

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (isObject) {
    const keys = Object.keys(data);
    const isEmpty = keys.length === 0;
    const bracketOpen = isArray ? "[" : "{";
    const bracketClose = isArray ? "]" : "}";

    return (
      <div className="font-mono text-sm pl-4">
        <div
          className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
          onClick={toggle}
        >
          <span className={`transition-transform duration-200 text-[10px] ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
            ▶
          </span>
          {label && <span className="text-purple-600 dark:text-purple-400">&quot;{label}&quot;: </span>}
          <span className="text-[var(--muted)]">{bracketOpen}</span>
          {!isOpen && <span className="text-xs italic bg-slate-100 dark:bg-slate-800 px-1 rounded mx-1"> {keys.length} items </span>}
          {!isOpen && <span className="text-[var(--muted)]">{bracketClose}{!isLast ? "," : ""}</span>}
        </div>

        {isOpen && (
          <div className="border-l border-slate-200 dark:border-slate-800 ml-1">
            {keys.map((key, index) => (
              <JSONNode
                key={key}
                data={data[key]}
                label={isArray ? undefined : key}
                isLast={index === keys.length - 1}
                depth={depth + 1}
              />
            ))}
          </div>
        )}

        {isOpen && (
          <div className="text-[var(--muted)]">
            {bracketClose}{!isLast ? "," : ""}
          </div>
        )}
      </div>
    );
  }

  // Primitive values
  let valDisplay: React.ReactNode;
  if (type === "string") valDisplay = <span className="text-green-600 dark:text-green-400">&quot;{data}&quot;</span>;
  else if (type === "number") valDisplay = <span className="text-blue-600 dark:text-blue-400">{data}</span>;
  else if (type === "boolean") valDisplay = <span className="text-orange-600 dark:text-orange-400">{String(data)}</span>;
  else if (data === null) valDisplay = <span className="text-slate-400 font-bold">null</span>;
  else valDisplay = <span>{String(data)}</span>;

  return (
    <div className="font-mono text-sm pl-6 py-0.5">
      {label && <span className="text-purple-600 dark:text-purple-400">&quot;{label}&quot;: </span>}
      {valDisplay}
      {!isLast && <span className="text-[var(--muted)]">,</span>}
    </div>
  );
};

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setParsedData(null);
        setError(null);
        return;
      }
      const parsed = JSON.parse(input);
      setParsedData(parsed);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setParsedData(null);
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setParsedData(parsed);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-medium">JSON Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className={`w-full border rounded-md p-4 bg-[var(--surface)] font-mono text-sm ${error ? 'border-red-500' : ''}`}
            placeholder='{ "key": "value" }'
          />
          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleFormat}>Format & Validate</Button>
          <Button onClick={handleMinify} variant="ghost" className="border">Minify</Button>
          <Button onClick={() => { setInput(""); setParsedData(null); setError(null); }} variant="ghost">Clear</Button>
        </div>

        {parsedData !== null && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-500 mt-4 border-t pt-6">
            <h3 className="text-lg font-bold">Interactive Explorer</h3>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-800">
              <JSONNode data={parsedData} />
            </div>

            <div className="flex gap-2 mt-2">
              <Button onClick={() => navigator.clipboard.writeText(JSON.stringify(parsedData, null, 2))} className="flex-1">
                Copy Formatted
              </Button>
              <Button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(parsedData, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "data.json";
                  a.click();
                }}
                variant="ghost"
                className="flex-1 border"
              >
                Download JSON
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
