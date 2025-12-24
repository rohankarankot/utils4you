/**
 * Simple HTML Minifier utility
 * Removes comments, collapses whitespace, and trims tags.
 */
export function minifyHTML(html: string): string {
  if (!html) return "";

  return html
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, "")
    // Collapse multiple whitespaces/newlines into a single space
    .replace(/\s+/g, " ")
    // Remove spaces between tags
    .replace(/>\s+</g, "><")
    // Trim leading/trailing spaces
    .trim();
}

export function getByteSize(str: string): number {
  return new TextEncoder().encode(str).length;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
