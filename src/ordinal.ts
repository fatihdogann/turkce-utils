/**
 * Turkish ordinal numbers.
 *
 * `ordinalTr` returns the numeric form with a trailing dot ("3."), while
 * `ordinalWordTr` spells the ordinal out ("üçüncü") using Turkish vowel harmony.
 */

import { integerToWordsTr } from "./numbers.ts";

const HARMONY: Readonly<Record<string, string>> = {
  a: "ı", ı: "ı",
  e: "i", i: "i",
  o: "u", u: "u",
  ö: "ü", ü: "ü",
};

const VOWELS = "aeıioöuüâîû";
const IRREGULAR: Readonly<Record<string, string>> = { dört: "dörd" };

function lastVowel(word: string): string {
  for (let i = word.length - 1; i >= 0; i--) {
    const char = word[i]!;
    if (VOWELS.includes(char)) return HARMONY[char] ?? "i";
  }
  return "i";
}

function ordinaliseWord(word: string): string {
  const base = IRREGULAR[word] ?? word;
  const vowel = lastVowel(word);
  const endsWithVowel = VOWELS.includes(word[word.length - 1]!);
  return endsWithVowel ? `${base}nc${vowel}` : `${base}${vowel}nc${vowel}`;
}

/** Numeric ordinal: 3 → "3.". */
export function ordinalTr(value: number): string {
  if (!Number.isInteger(value)) throw new RangeError("ordinalTr: expected an integer");
  return `${value}.`;
}

/** Spelled-out ordinal: 3 → "üçüncü", 21 → "yirmi birinci". */
export function ordinalWordTr(value: number): string {
  const words = integerToWordsTr(value).split(" ");
  const last = words.pop()!;
  words.push(ordinaliseWord(last));
  return words.join(" ");
}
