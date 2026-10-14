/**
 * Turkish-aware title casing.
 */

import { lowerTr, upperTr } from "./case.ts";

// Word separators: whitespace and opening punctuation, but never an apostrophe
// (so "istanbul'da" keeps its lowercase suffix).
const WORD_START = /(^|[\s([{"«»""\-–—/|]+)(\p{L})/gu;

/** Title-case a string, capitalising the first letter of each word with Turkish rules. */
export function titleCaseTr(input: string): string {
  return lowerTr(input).replace(WORD_START, (_match, separator: string, letter: string) => {
    return separator + upperTr(letter);
  });
}
