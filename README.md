# turkce-utils

[![CI](https://github.com/fatihdogann/turkce-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/fatihdogann/turkce-utils/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Runtime dependencies: 0](https://img.shields.io/badge/runtime_dependencies-0-brightgreen.svg)](#development)

Zero-dependency TypeScript helpers for Turkish text — and a `turkce` CLI.

Turkish is not English with a few accents: `I` lowercases to `ı`, `i`
uppercases to `İ`, the alphabet puts `ç`, `ğ`, `ı`, `ö`, `ş`, `ü` in their own
places, and reading difficulty needs its own formula. `turkce-utils` packages
those rules into small, tested, dependency-free functions.

## Install

`turkce-utils` is **not published to npm yet**. Install it straight from this
repository:

```bash
npm install github:fatihdogann/turkce-utils
```

Or clone it and build locally:

```bash
git clone https://github.com/fatihdogann/turkce-utils.git
cd turkce-utils
npm install
npm run build
```

Node.js 22.18+ can also run the TypeScript sources directly — for example
`node src/cli.ts slug "Çılgın Şöför"` — with no build step.

## Modules

| Module | What it does |
| --- | --- |
| `slug` | Turkish-aware slug generation |
| `case` | Turkish letter casing (i/İ, ı/I) |
| `sort` | Turkish alphabet collation |
| `title` | Turkish title casing |
| `normalize` | Normalise typographic punctuation and whitespace |
| `numbers` | Spell out numbers in Turkish |
| `ordinal` | Turkish ordinal numbers |
| `syllables` | Count syllables |
| `readability` | Ateşman readability score |
| `truncate` | Truncate on a word boundary |
| `initials` | Initials from a full name |
| `cli` | `turkce` command line interface |

## API

### `slugify(input, options?)`

Turkish-aware slug: `ç → c`, `ğ → g`, `ı → i`, `İ → i`, `ö → o`, `ş → s`, `ü → u`.
Remaining diacritics are folded, punctuation is dropped.

```ts
import { slugify } from "turkce-utils";

slugify("Çılgın Şöför İĞÜ");                    // "cilgin-sofor-igu"
slugify("Türkçe Metin", { separator: "_" });    // "turkce_metin"
slugify("kahve falı bakıyoruz", { maxLength: 10 }); // "kahve"
```

Options: `separator` (default `"-"`), `lowercase` (default `true`), `maxLength`.

### `lowerTr(input)` / `upperTr(input)`

Turkish letter casing. JavaScript maps `I → i` and `i → I`; Turkish pairs the
dotless `ı` with `I` and the dotted `i` with `İ`.

```ts
import { lowerTr, upperTr } from "turkce-utils";

lowerTr("İSTANBUL"); // "istanbul"
lowerTr("IŞIK");     // "ışık"
upperTr("istanbul ışık"); // "İSTANBUL IŞIK"
```

### `sortTr(items)` / `compareTr(a, b)`

Sort by the Turkish alphabet — `ç` after `c`, `ğ` after `g`, `ı` before `i`,
`ö`, `ş`, `ü` in place — backed by `Intl.Collator("tr")`.

```ts
import { sortTr } from "turkce-utils";

sortTr(["zeytin", "armut", "üzüm", "çilek", "ıspanak", "incir"]);
// ["armut", "çilek", "ıspanak", "incir", "üzüm", "zeytin"]
```

### `titleCaseTr(input)`

Title-case with Turkish rules; the suffix after an apostrophe stays lowercase.

```ts
import { titleCaseTr } from "turkce-utils";

titleCaseTr("çılgın şöför istanbul'da"); // "Çılgın Şöför İstanbul'da"
titleCaseTr("TÜRKÇE METİN IŞIK");        // "Türkçe Metin Işık"
```

### `normalizeTr(input, options?)`

NFC normalisation plus typographic fixes: smart quotes → `"`/`'`, en/em dashes →
`-`, `…` → `...`, non-breaking and zero-width spaces handled, whitespace collapsed.

```ts
import { normalizeTr } from "turkce-utils";

normalizeTr("“Merhaba” —dünya…"); // '"Merhaba" -dünya...'
normalizeTr("  bir   iki  ");      // "bir iki"
```

### `numberToWordsTr(value)` / `integerToWordsTr(value)`

Spell out numbers in Turkish, including negatives and decimals.

```ts
import { numberToWordsTr } from "turkce-utils";

numberToWordsTr(1234);     // "bin iki yüz otuz dört"
numberToWordsTr(1000000);  // "bir milyon"
numberToWordsTr(-5);       // "eksi beş"
numberToWordsTr(3.5);      // "üç virgül beş"
```

`1000` is spoken as `bin`, never `bir bin`.

### `ordinalTr(value)` / `ordinalWordTr(value)`

```ts
import { ordinalTr, ordinalWordTr } from "turkce-utils";

ordinalTr(3);       // "3."
ordinalWordTr(3);   // "üçüncü"
ordinalWordTr(4);   // "dördüncü"
ordinalWordTr(121); // "yüz yirmi birinci"
```

Suffixes follow Turkish vowel harmony.

### `syllablesTr(input)`

Turkish is one vowel per syllable, so the count is the number of vowel groups.

```ts
import { syllablesTr } from "turkce-utils";

syllablesTr("Türkçe");   // 2
syllablesTr("yapıyoruz"); // 4
```

### `atestmanScore(text)` / `atestmanGrade(score)`

Ateşman readability score for Turkish (Ateşman, 1997):

```text
score = 198.43 − 40.175 × (syllables / words) − 2.610 × (words / sentences)
```

```ts
import { atestmanScore } from "turkce-utils";

atestmanScore("Merhaba dünya. Nasılsın?");
// { score: 87.38, grade: "kolay", syllables: 8, words: 3, sentences: 2 }
```

Grades: `çok kolay` (90+), `kolay` (70+), `orta` (50+), `zor` (30+), `çok zor`.

### `truncateTr(text, maxLength, ellipsis?)`

Shorten text on the last word boundary, never exceeding `maxLength`.

```ts
import { truncateTr } from "turkce-utils";

truncateTr("kahve falı bakıyoruz", 12); // "kahve falı…"
truncateTr("abcdef", 4, "...");         // "a..."
```

### `initialsTr(input, options?)`

Initials from a full name, uppercased with Turkish rules.

```ts
import { initialsTr } from "turkce-utils";

initialsTr("Mehmet Fatih Doğan");               // "MFD"
initialsTr("ışık inci");                        // "Iİ"
initialsTr("Mehmet Fatih Doğan", { separator: "." }); // "M.F.D"
```

### CLI

The package ships a `turkce` command covering every helper:

```console
$ turkce slug "Çılgın Şöför"
cilgin-sofor

$ turkce words 1234
bin iki yüz otuz dört

$ printf 'üzüm\narmut\nçilek\n' | turkce sort
armut
çilek
üzüm
```

Run `turkce --help` for the full command list.

## Development

Node.js 22.18+ runs the TypeScript sources directly (native type stripping),
so no build step is needed for tests:

```bash
npm test          # node --test
npm run typecheck # tsc --noEmit
npm run build     # tsc -> dist/
```

Every module has a matching test in `test/`. The library has **zero runtime
dependencies**.

## Developer

**Mehmet Fatih Doğan** — Software Developer.

- 🌐 Portfolio & Contact: [mehmetfatihdogan.com.tr](https://mehmetfatihdogan.com.tr)
- 💻 GitHub: [@fatihdogann](https://github.com/fatihdogann)

For questions, bug reports, or feedback about this project, feel free to contact me through [my website](https://mehmetfatihdogan.com.tr).
