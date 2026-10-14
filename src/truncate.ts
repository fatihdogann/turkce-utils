/**
 * Truncate Turkish text on a word boundary.
 */

/** Shorten `text` to at most `maxLength` characters, appending an ellipsis. */
export function truncateTr(text: string, maxLength: number, ellipsis = "…"): string {
  if (maxLength <= 0) return "";
  if (text.length <= maxLength) return text;

  const budget = maxLength - ellipsis.length;
  if (budget <= 0) return ellipsis.slice(0, maxLength);

  const slice = text.slice(0, budget + 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > 0 ? slice.slice(0, lastSpace) : text.slice(0, budget);
  return cut.replace(/\s+$/, "") + ellipsis;
}
