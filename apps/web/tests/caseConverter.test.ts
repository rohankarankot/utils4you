import { describe, it, expect } from "vitest";
import { caseConvert } from "../lib/tools/wordCounter";

describe("Case Converter", () => {
  it("converts to upper", () => {
    expect(caseConvert("hello World", "upper")).toBe("HELLO WORLD");
  });
  it("converts to lower", () => {
    expect(caseConvert("Hello WORLD", "lower")).toBe("hello world");
  });
  it("converts to title", () => {
    expect(caseConvert("this is a test", "title")).toBe("This Is A Test");
  });
  it("converts to sentence", () => {
    expect(caseConvert("this is A Test", "sentence")).toBe("This is a test");
  });
});
