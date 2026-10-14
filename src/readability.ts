/**
 * Ateşman readability score for Turkish text (Ateşman, 1997).
 *
 * ```text
 * score = 198.43 − 40.175 × (syllables / words) − 2.610 × (words / sentences)
 * ```
 *
 * Higher scores mean easier text. The score is clamped to the 0–100 range.
 */

import { syllablesTr } from "./syllables.ts";

const WORD = /[\p{L}\p{N}]+/gu;

export interface ReadabilityResult {
  /** Ateşman score, clamped to 0–100. */
  score: number;
  /** Qualitative band for the score. */
  grade: AtestmanGrade;
  syllables: number;
  words: number;
  sentences: number;
}

export type AtestmanGrade = "çok kolay" | "kolay" | "orta" | "zor" | "çok zor";

function tokenize(text: string): { words: string[]; sentences: number } {
  const words = text.match(WORD) ?? [];
  const trimmed = text.trim();
  if (trimmed === "") return { words, sentences: 1 };
  const ends = trimmed.match(/[.!?…]+/g)?.length ?? 0;
  const trailing = /[.!?…]$/.test(trimmed) ? 0 : 1;
  return { words, sentences: Math.max(1, ends + trailing) };
}

/** Map an Ateşman score to its qualitative band. */
export function atestmanGrade(score: number): AtestmanGrade {
  if (score >= 90) return "çok kolay";
  if (score >= 70) return "kolay";
  if (score >= 50) return "orta";
  if (score >= 30) return "zor";
  return "çok zor";
}

/** Compute the Ateşman readability score for Turkish text. */
export function atestmanScore(text: string): ReadabilityResult {
  const { words, sentences } = tokenize(text);
  const wordCount = words.length;
  const syllableCount = words.reduce((total, word) => total + syllablesTr(word), 0);

  const score =
    wordCount === 0
      ? 0
      : 198.43 - 40.175 * (syllableCount / wordCount) - 2.61 * (wordCount / sentences);
  const clamped = Math.max(0, Math.min(100, Math.round(score * 100) / 100));

  return {
    score: clamped,
    grade: atestmanGrade(clamped),
    syllables: syllableCount,
    words: wordCount,
    sentences,
  };
}
