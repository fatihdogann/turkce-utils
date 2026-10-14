import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeTr } from "../src/normalize.ts";

test("replaces smart quotes, dashes and ellipsis", () => {
  assert.equal(normalizeTr("\u201cMerhaba\u201d \u2014d\u00fcnya\u2026"), '"Merhaba" -dünya...');
});

test("collapses whitespace and trims", () => {
  assert.equal(normalizeTr("  bir   iki\u00A0\u00A0üç  "), "bir iki üç");
});

test("removes zero-width characters", () => {
  assert.equal(normalizeTr("a\u200Bb"), "ab");
});

test("can keep original whitespace", () => {
  assert.equal(normalizeTr(" a ", { collapseWhitespace: false }), " a ");
});
