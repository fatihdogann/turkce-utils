/**
 * Turkish-aware letter casing.
 *
 * JavaScript's `toLowerCase`/`toUpperCase` follow the Unicode default, which
 * maps `I` to `i` and `i` to `I`. Turkish is different: the dotless `ı` pairs
 * with `I`, and the dotted `i` pairs with `İ`.
 */

const LOWER: Readonly<Record<string, string>> = { I: "ı", İ: "i" };
const UPPER: Readonly<Record<string, string>> = { i: "İ", ı: "I" };

/** Lowercase a string using Turkish rules (`I` → `ı`, `İ` → `i`). */
export function lowerTr(input: string): string {
  return input.replace(/[Iİ]/g, (char) => LOWER[char] ?? char).toLowerCase();
}

/** Uppercase a string using Turkish rules (`i` → `İ`, `ı` → `I`). */
export function upperTr(input: string): string {
  return input.replace(/[iı]/g, (char) => UPPER[char] ?? char).toUpperCase();
}
