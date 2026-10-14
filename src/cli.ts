#!/usr/bin/env node
/**
 * `turkce` — a small CLI over the turkce-utils helpers.
 *
 * Usage: `turkce <command> [text...]`, or pipe text on stdin.
 */

import { slugify } from "./slug.ts";
import { lowerTr, upperTr } from "./case.ts";
import { sortTr } from "./sort.ts";
import { titleCaseTr } from "./title.ts";
import { normalizeTr } from "./normalize.ts";
import { numberToWordsTr } from "./numbers.ts";
import { ordinalWordTr } from "./ordinal.ts";
import { syllablesTr } from "./syllables.ts";
import { atestmanScore } from "./readability.ts";
import { truncateTr } from "./truncate.ts";
import { initialsTr } from "./initials.ts";
import { pathToFileURL } from "node:url";

export const HELP = `turkce — Turkish text helpers

Usage:
  turkce <command> [text...]      text can also be piped on stdin

Commands:
  slug         URL-safe slug (ç -> c, ğ -> g, ...)
  upper        Turkish uppercase (i -> İ, ı -> I)
  lower        Turkish lowercase (I -> ı, İ -> i)
  title        Turkish title case
  normalize    normalise quotes, dashes, whitespace
  words        spell out a number (1234 -> "bin iki yüz otuz dört")
  ordinal      spill out an ordinal (3 -> "üçüncü")
  syllables    count syllables
  readability  Ateşman readability score
  initials     initials from a full name
  truncate     shorten text (max 80 chars)
  sort         sort lines by the Turkish alphabet

Options:
  -h, --help   show this help
`;

/** Run a command against `input` and return the text to print. */
export function runCommand(command: string, input: string): string {
  switch (command) {
    case "slug":
      return slugify(input);
    case "upper":
      return upperTr(input);
    case "lower":
      return lowerTr(input);
    case "title":
      return titleCaseTr(input);
    case "normalize":
      return normalizeTr(input);
    case "words":
      return numberToWordsTr(Number(input.trim()));
    case "ordinal":
      return ordinalWordTr(Number(input.trim()));
    case "syllables":
      return String(syllablesTr(input));
    case "initials":
      return initialsTr(input);
    case "truncate":
      return truncateTr(input, 80);
    case "sort":
      return sortTr(input.split("\n").filter((line) => line.length > 0)).join("\n");
    case "readability": {
      const result = atestmanScore(input);
      return `${result.score} (${result.grade}) — ${result.words} kelime, ${result.sentences} cümle`;
    }
    default:
      throw new Error(`unknown command: ${command}`);
  }
}

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks).toString("utf8");
}

async function main(argv: string[]): Promise<number> {
  const [command, ...rest] = argv;
  if (!command || command === "-h" || command === "--help" || command === "help") {
    process.stdout.write(HELP);
    return command ? 0 : 1;
  }

  const input = rest.length > 0 ? rest.join(" ") : (await readStdin()).replace(/\n$/, "");
  try {
    process.stdout.write(runCommand(command, input) + "\n");
    return 0;
  } catch (error) {
    process.stderr.write(`turkce: ${(error as Error).message}\n`);
    return 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2)).then((code) => {
    process.exitCode = code;
  });
}
