import { describe, it, expect } from "vitest";
import {
  charCount,
  charCountNoSpaces,
  utf8ByteLength,
} from "../lib/tools/wordCounter";

describe("Character Counter utilities", () => {
  const sample = "Hello world";

  it("counts characters including spaces", () => {
    expect(charCount(sample)).toBe(11);
  });

  it("counts characters excluding spaces", () => {
    expect(charCountNoSpaces(sample)).toBe(10);
  });

  it("calculates utf8 byte length", () => {
    expect(utf8ByteLength("✓")).toBe(3); // check mark is 3 bytes in UTF-8
  });
});
