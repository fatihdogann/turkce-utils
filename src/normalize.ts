/**
 * Normalise Turkish text for storage and comparison.
 *
 * Applies NFC, replaces typographic punctuation (smart quotes, en/em dashes,
 * ellipsis, non-breaking spaces) with plain ASCII equivalents and collapses
 * repeated whitespace.
 */

export interface NormalizeTrOptions {
  /** Collapse runs of whitespace and trim the result. Defaults to `true`. */
  collapseWhitespace?: boolean;
}

const REPLACEMENTS: ReadonlyArray<readonly [RegExp, string]> = [
  [/[\u2018\u2019\u201A\u201B\u2032]/g, "'"],
  [/[\u201C\u201D\u201E\u201F\u2033]/g, '"'],
  [/[\u2013\u2014\u2015]/g, "-"],
  [/\u2026/g, "..."],
  [/\u00A0|\u2007|\u202F/g, " "],
  [/\u200B|\u200C|\u200D|\uFEFF/g, ""],
];

/** Return a normalised copy of `input`. */
export function normalizeTr(input: string, options: NormalizeTrOptions = {}): string {
  let out = input.normalize("NFC");
  for (const [pattern, replacement] of REPLACEMENTS) {
    out = out.replace(pattern, replacement);
  }
  if (options.collapseWhitespace ?? true) {
    out = out.replace(/\s+/g, " ").trim();
  }
  return out;
}
