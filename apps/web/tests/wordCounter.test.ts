import { describe, it, expect } from "vitest";
import {
  wordCount,
  charCount,
  sentenceCount,
  paragraphCount,
  readingTime,
  uniqueWords,
  topWords,
  averageWordLength,
  removeExtraSpaces,
} from "../lib/tools/wordCounter";

describe("Word Counter utilities", () => {
  const sample = "Hello world! This is a test.\n\nNew paragraph here.";

  it("counts words and characters", () => {
    // Sample has 9 words: Hello world! This is a test. New paragraph here.
    expect(wordCount(sample)).toBe(9);
    expect(charCount(sample)).toBe(sample.length);
  });

  it("counts sentences and paragraphs", () => {
    // Three sentences (Hello world!, This is a test., New paragraph here.)
    expect(sentenceCount(sample)).toBe(3);
    expect(paragraphCount(sample)).toBe(2);
  });

  it("reads reading time in minutes", () => {
    const rt = readingTime("word ".repeat(400), 200);
    expect(rt).toBe(2);
  });

  it("finds top words and average length", () => {
    const top = topWords("a a b c c c", 2);
    expect(top[0][0]).toBe("c");
    expect(averageWordLength("hello world")).toBe(5);
  });

  it("removes extra spaces", () => {
    expect(removeExtraSpaces("  a   b   ")).toBe("a b");
  });
});
