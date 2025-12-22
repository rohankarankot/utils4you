"use client";

import React, { useState, useMemo } from "react";
import {
  wordCount,
  charCount,
  sentenceCount,
  paragraphCount,
  readingTime,
  removeExtraSpaces,
  caseConvert,
  topWords,
  averageWordLength,
  slugify,
} from "../lib/tools/wordCounter";
import Button from "./Button";
import Card from "./Card";
import { cn } from "../lib/utils";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState(200);

  const stats = useMemo(
    () => ({
      words: wordCount(text),
      chars: charCount(text),
      sentences: sentenceCount(text),
      paragraphs: paragraphCount(text),
      readingMinutes: readingTime(text, wpm),
      topWords: topWords(text, 5),
      avgWordLen: averageWordLength(text),
    }),
    [text, wpm]
  );

  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    // allow pasted text — nothing special
  }

  function handleRemoveSpaces() {
    setText(removeExtraSpaces(text));
  }
  function handleUpper() {
    setText(caseConvert(text, "upper"));
  }
  function handleLower() {
    setText(caseConvert(text, "lower"));
  }
  function handleTitle() {
    setText(caseConvert(text, "title"));
  }
  function handleSentence() {
    setText(caseConvert(text, "sentence"));
  }
  function handleClear() {
    setText("");
  }
  function handleCopy() {
    navigator.clipboard.writeText(text);
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
        <label htmlFor="text-input" className="font-medium">
          Enter text
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPaste={handlePaste}
          rows={10}
          className="w-full border rounded-md p-3 bg-[var(--surface)]"
          aria-describedby="stats"
        />

        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleRemoveSpaces}>Remove Extra Spaces</Button>
          <Button onClick={handleUpper} variant="ghost">
            UPPER
          </Button>
          <Button onClick={handleLower} variant="ghost">
            lower
          </Button>
          <Button onClick={handleTitle} variant="ghost">
            Title Case
          </Button>
          <Button onClick={handleSentence} variant="ghost">
            Sentence case
          </Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
          <Button onClick={handleCopy} variant="ghost">
            Copy
          </Button>
          <Button onClick={handleDownload} variant="ghost">
            Download
          </Button>
        </div>

        <div id="stats" className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
            <div className="text-xs text-[var(--muted)]">Words</div>
            <div className="font-medium">{stats.words}</div>
          </div>
          <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
            <div className="text-xs text-[var(--muted)]">Characters</div>
            <div className="font-medium">{stats.chars}</div>
          </div>
          <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
            <div className="text-xs text-[var(--muted)]">Sentences</div>
            <div className="font-medium">{stats.sentences}</div>
          </div>
          <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
            <div className="text-xs text-[var(--muted)]">Paragraphs</div>
            <div className="font-medium">{stats.paragraphs}</div>
          </div>
          <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
            <div className="text-xs text-[var(--muted)]">Reading (mins)</div>
            <div className="font-medium">{stats.readingMinutes}</div>
          </div>
          <div className="p-3 rounded-md bg-[var(--bg)] text-sm">
            <div className="text-xs text-[var(--muted)]">Avg word length</div>
            <div className="font-medium">{stats.avgWordLen}</div>
          </div>
        </div>

        <div>
          <h4 className="font-medium">Top words</h4>
          <ul className="list-disc pl-5 mt-2 text-sm">
            {stats.topWords.length === 0 ? (
              <li className="text-[var(--muted)]">No words</li>
            ) : (
              stats.topWords.map(([w, c]: any) => (
                <li key={w}>
                  {w} — {c}
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="mt-4 border-t pt-4">
          <label className="font-medium">Slug</label>
          <div className="mt-2 flex gap-2">
            <input
              className="flex-1 border rounded-md p-2 bg-[var(--surface)]"
              value={slugify(text.slice(0, 100))}
              readOnly
              aria-readonly
            />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(slugify(text.slice(0, 100)));
              }}
            >
              Copy Slug
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
