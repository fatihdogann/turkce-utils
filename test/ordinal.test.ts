import { test } from "node:test";
import assert from "node:assert/strict";
import { ordinalTr, ordinalWordTr } from "../src/ordinal.ts";

test("numeric ordinal takes a trailing dot", () => {
  assert.equal(ordinalTr(3), "3.");
});

test("spells out irregular ordinals", () => {
  assert.equal(ordinalWordTr(1), "birinci");
  assert.equal(ordinalWordTr(4), "dördüncü");
});

test("follows Turkish vowel harmony", () => {
  assert.equal(ordinalWordTr(3), "üçüncü");
  assert.equal(ordinalWordTr(6), "altıncı");
  assert.equal(ordinalWordTr(9), "dokuzuncu");
  assert.equal(ordinalWordTr(100), "yüzüncü");
  assert.equal(ordinalWordTr(1000), "bininci");
});

test("only the last word is ordinalised", () => {
  assert.equal(ordinalWordTr(121), "yüz yirmi birinci");
});
