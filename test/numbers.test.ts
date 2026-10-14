import { test } from "node:test";
import assert from "node:assert/strict";
import { integerToWordsTr, numberToWordsTr } from "../src/numbers.ts";

test("spells out small integers", () => {
  assert.equal(integerToWordsTr(42), "kırk iki");
  assert.equal(integerToWordsTr(100), "yüz");
  assert.equal(integerToWordsTr(999), "dokuz yüz doksan dokuz");
});

test("uses 'bin' without a leading 'bir'", () => {
  assert.equal(integerToWordsTr(1000), "bin");
  assert.equal(integerToWordsTr(1234), "bin iki yüz otuz dört");
});

test("handles large numbers and negatives", () => {
  assert.equal(integerToWordsTr(1_000_000), "bir milyon");
  assert.equal(integerToWordsTr(-5), "eksi beş");
  assert.equal(integerToWordsTr(0), "sıfır");
});

test("spells out decimals", () => {
  assert.equal(numberToWordsTr(3.5), "üç virgül beş");
  assert.equal(numberToWordsTr(10.25), "on virgül iki beş");
});

test("rejects non-integers", () => {
  assert.throws(() => integerToWordsTr(1.5), RangeError);
});
