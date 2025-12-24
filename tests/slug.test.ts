import { describe, it, expect } from "vitest";
import { slugify } from "../lib/tools/wordCounter";

describe("slugify", () => {
  it("generates simple slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes punctuation and trims", () => {
    expect(slugify("  This, right?  ")).toBe("this-right");
  });

  it("removes accents when enabled", () => {
    expect(slugify("Café crème")).toBe("cafe-creme");
  });

  it("respects max length and no trailing hyphen", () => {
    const s = slugify("a ".repeat(60).trim(), { maxLength: 20 });
    expect(s.length).toBeLessThanOrEqual(20);
    expect(s.endsWith("-")).toBe(false);
  });

  it("keeps unicode letters when removing accents disabled", () => {
    expect(slugify("東京タワー", { removeAccents: false })).toBe("東京タワー");
  });
});
