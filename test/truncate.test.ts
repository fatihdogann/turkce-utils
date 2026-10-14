import { test } from "node:test";
import assert from "node:assert/strict";
import { truncateTr } from "../src/truncate.ts";

test("returns short text unchanged", () => {
  assert.equal(truncateTr("merhaba", 20), "merhaba");
});

test("cuts on the last word boundary", () => {
  assert.equal(truncateTr("kahve falı bakıyoruz", 12), "kahve falı…");
});

test("honours a custom ellipsis", () => {
  assert.equal(truncateTr("abcdef", 4, "..."), "a...");
});

test("never exceeds maxLength", () => {
  const out = truncateTr("uzun bir cümle burada", 8);
  assert.ok(out.length <= 8);
});
