# turkce-utils

Zero-dependency TypeScript helpers for Turkish text — and a `turkce` CLI.

Turkish is not English with a few accents: `I` lowercases to `ı`, `i`
uppercases to `İ`, the alphabet puts `ç`, `ğ`, `ı`, `ö`, `ş`, `ü` in their own
places, and reading difficulty needs its own formula. `turkce-utils` packages
those rules into small, tested, dependency-free functions.

## Install

```bash
npm install turkce-utils
```

## Modules

| Module | What it does |
| --- | --- |

## API

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

## License

MIT © Mehmet Fatih Doğan
