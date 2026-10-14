/**
 * Turkish-aware collation.
 *
 * Sorts using the Turkish alphabet, where ç follows c, ğ follows g, ı comes
 * before i, ö follows o, ş follows s and ü follows u. Backed by `Intl.Collator`
 * so no lookup tables are needed.
 */

const collator = new Intl.Collator("tr", { sensitivity: "variant", numeric: false });

/** Compare two strings by the Turkish alphabet. Returns a negative, zero or positive number. */
export function compareTr(a: string, b: string): number {
  return collator.compare(a, b);
}

/** Return a new array sorted by the Turkish alphabet. */
export function sortTr<T extends string>(items: readonly T[]): T[] {
  return [...items].sort(compareTr);
}
