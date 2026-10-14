/**
 * Spell out numbers in Turkish.
 *
 * Supports integers up to the trillions, negatives and simple decimals
 * (separated with the Turkish decimal comma word, `virgül`).
 */

const UNITS = [
  "sıfır", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz",
] as const;

const TENS = [
  "", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan",
] as const;

const SCALES = ["", "bin", "milyon", "milyar", "trilyon"] as const;

function belowThousand(value: number): string[] {
  const words: string[] = [];
  const hundreds = Math.floor(value / 100);
  const tens = Math.floor((value % 100) / 10);
  const units = value % 10;

  if (hundreds > 0) {
    if (hundreds > 1) words.push(UNITS[hundreds]!);
    words.push("yüz");
  }
  if (tens > 0) words.push(TENS[tens]!);
  if (units > 0) words.push(UNITS[units]!);
  return words;
}

/** Spell out an integer in Turkish. */
export function integerToWordsTr(value: number): string {
  if (!Number.isFinite(value) || !Number.isInteger(value)) {
    throw new RangeError("integerToWordsTr: expected a finite integer");
  }
  if (value === 0) return "sıfır";

  const negative = value < 0;
  let remaining = Math.abs(value);

  const groups: number[] = [];
  while (remaining > 0) {
    groups.push(remaining % 1000);
    remaining = Math.floor(remaining / 1000);
  }

  const words: string[] = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    const group = groups[i]!;
    if (group === 0) continue;
    // "1000" is spoken as "bin", never "bir bin".
    if (i === 1 && group === 1) {
      words.push("bin");
      continue;
    }
    words.push(...belowThousand(group));
    if (i > 0) words.push(SCALES[i]!);
  }

  return (negative ? "eksi " : "") + words.join(" ");
}

/** Spell out a number in Turkish, including negatives and decimals. */
export function numberToWordsTr(value: number): string {
  const sign = value < 0 ? "eksi " : "";
  const absolute = Math.abs(value);
  const integerPart = Math.trunc(absolute);
  const fraction = absolute - integerPart;
  if (fraction === 0) return integerToWordsTr(value);

  const fractionDigits = fraction.toFixed(10).slice(2).replace(/0+$/, "");
  const head = integerPart === 0 ? "sıfır" : integerToWordsTr(integerPart);
  const tail = fractionDigits
    .split("")
    .map((digit) => UNITS[Number(digit)]!)
    .join(" ");
  return `${sign}${head} virgül ${tail}`;
}
