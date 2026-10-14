import { test } from "node:test";
import assert from "node:assert/strict";
import { compareTr, sortTr } from "../src/sort.ts";

test("orders words by the Turkish alphabet", () => {
  assert.deepEqual(
    sortTr(["zeytin", "armut", "üzüm", "çilek", "ıspanak", "incir"]),
    ["armut", "çilek", "ıspanak", "incir", "üzüm", "zeytin"],
  );
});

test("does not mutate the input array", () => {
  const input = ["ü", "a"];
  sortTr(input);
  assert.deepEqual(input, ["ü", "a"]);
});

test("compareTr is a valid comparator", () => {
  assert.ok(compareTr("a", "b") < 0);
  assert.equal(compareTr("a", "a"), 0);
});
