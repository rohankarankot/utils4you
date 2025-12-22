export function wordCount(text: string) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function charCount(text: string) {
  return text.length;
}

export function sentenceCount(text: string) {
  if (!text) return 0;
  // naive sentence split on .!? with handling for multiple punctuation
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return sentences.length;
}

export function paragraphCount(text: string) {
  if (!text) return 0;
  const paras = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paras.length || 1;
}

export function removeExtraSpaces(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

export type SlugOptions = {
  lower?: boolean;
  removeAccents?: boolean;
  maxLength?: number;
};

export function slugify(
  text: string,
  options: SlugOptions = { lower: true, removeAccents: true, maxLength: 200 }
) {
  const { lower = true, removeAccents = true, maxLength = 200 } = options;
  if (!text) return "";
  let t = text.trim();
  if (removeAccents) {
    // Normalize and remove combining diacritics
    t = t.normalize("NFKD").replace(/\p{Diacritic}/gu, "");
  }
  // Replace non-alphanumeric characters with hyphens
  t = t.replace(/[^\p{L}\p{N}]+/gu, "-");
  // Collapse multiple hyphens
  t = t.replace(/-+/g, "-");
  // Trim leading/trailing hyphens
  t = t.replace(/^-|-$/g, "");
  if (lower) t = t.toLowerCase();
  if (maxLength && t.length > maxLength)
    t = t.slice(0, maxLength).replace(/-$/, "");
  return t;
}

export function caseConvert(
  text: string,
  mode: "upper" | "lower" | "title" | "sentence"
) {
  if (mode === "upper") return text.toUpperCase();
  if (mode === "lower") return text.toLowerCase();
  if (mode === "title")
    return text.replace(
      /\w\S*/g,
      (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()
    );
  if (mode === "sentence")
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  return text;
}

export function uniqueWords(text: string) {
  const words = text.toLowerCase().match(/\b[\w']+\b/g) || [];
  const map = new Map<string, number>();
  for (const w of words) {
    map.set(w, (map.get(w) || 0) + 1);
  }
  return map;
}

export function topWords(text: string, n = 10) {
  const map = uniqueWords(text);
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

export function averageWordLength(text: string) {
  const words = text.match(/\b[\w']+\b/g) || [];
  if (words.length === 0) return 0;
  const total = words.reduce((s, w) => s + w.length, 0);
  return Number((total / words.length).toFixed(2));
}

export function readingTime(text: string, wpm = 200) {
  const words = wordCount(text);
  const minutes = words / wpm;
  return Number(minutes.toFixed(2));
}
export function charCountNoSpaces(text: string) {
  return (text || "").replace(/\s+/g, "").length;
}

export function utf8ByteLength(text: string) {
  // UTF-8 bytes length
  return new TextEncoder().encode(text || "").length;
}
