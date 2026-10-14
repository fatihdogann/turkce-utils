/**
 * Initials from Turkish names.
 */

import { upperTr } from "./case.ts";

export interface InitialsTrOptions {
  /** Keep only the first N initials. */
  limit?: number;
  /** String placed between initials. Defaults to `""`. */
  separator?: string;
}

/** Build uppercase initials from a full name: "Mehmet Fatih Doğan" → "MFD". */
export function initialsTr(input: string, options: InitialsTrOptions = {}): string {
  const separator = options.separator ?? "";
  const initials = input
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) => upperTr(word[0] ?? ""));

  const limited =
    options.limit !== undefined && options.limit >= 0 ? initials.slice(0, options.limit) : initials;
  return limited.join(separator);
}
