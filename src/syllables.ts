/**
 * Count syllables in Turkish words.
 *
 * Turkish is written as one vowel per syllable, so the syllable count is the
 * number of vowel groups.
 */

const VOWEL_GROUP = /[aeıioöuüâîû]+/g;

/** Count the syllables in a word or sentence. */
export function syllablesTr(input: string): number {
  return input.toLowerCase().match(VOWEL_GROUP)?.length ?? 0;
}
