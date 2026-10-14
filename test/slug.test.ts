import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify } from "../src/slug.ts";

test("transliterates Turkish letters", () => {
  assert.equal(slugify("Çılgın Şöför İĞÜ"), "cilgin-sofor-igu");
});

test("drops punctuation and collapses separators", () => {
  assert.equal(slugify("Merhaba,   Dünya! (2026)"), "merhaba-dunya-2026");
});

test("respects custom separator and casing", () => {
  assert.equal(slugify("Türkçe Metin", { separator: "_", lowercase: false }), "Turkce_Metin");
});

test("truncates on a word boundary", () => {
  assert.equal(slugify("kahve falı bakıyoruz", { maxLength: 10 }), "kahve");
});

test("rejects an empty separator", () => {
  assert.throws(() => slugify("a b", { separator: "" }), RangeError);
});
