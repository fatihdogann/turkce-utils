# Changelog

All notable changes to this project are documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-10-14

### Fixed

- `bin` no longer carries a `./` prefix. npm 11 rejects the prefixed form and
  strips it while packaging, which prints `bin[turkce] script name dist/cli.js
  was invalid and removed` on every publish. The published 0.1.0 manifest was
  normalised anyway, so the `turkce` command installed and worked — the warning
  was the visible symptom, not a broken package.

## [0.1.0] - 2026-10-14

First public release.

### Added

- Twelve modules: `slugify`, `lowerTr`/`upperTr`, `sortTr`/`compareTr`,
  `titleCaseTr`, `normalizeTr`, `numberToWordsTr`/`integerToWordsTr`,
  `ordinalTr`/`ordinalWordTr`, `syllablesTr`, `atestmanScore`/`atestmanGrade`,
  `truncateTr`, `initialsTr`.
- `turkce` command line interface covering every helper.
- 52 tests, TypeScript declarations, MIT licence, GitHub Actions CI.