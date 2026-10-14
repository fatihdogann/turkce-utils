import { test } from "node:test";
import assert from "node:assert/strict";
import { syllablesTr } from "../src/syllables.ts";

test("counts vowel groups", () => {
  assert.equal(syllablesTr("Türkçe"), 2);
  assert.equal(syllablesTr("kahve"), 2);
  assert.equal(syllablesTr("yapıyoruz"), 4);
});

test("counts syllables across a sentence", () => {
  assert.equal(syllablesTr("merhaba dünya"), 5);
});

test("returns zero when there are no vowels", () => {
  assert.equal(syllablesTr("..."), 0);
});
