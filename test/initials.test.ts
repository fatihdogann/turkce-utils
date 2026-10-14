import { test } from "node:test";
import assert from "node:assert/strict";
import { initialsTr } from "../src/initials.ts";

test("takes the first letter of each word", () => {
  assert.equal(initialsTr("Mehmet Fatih Doğan"), "MFD");
});

test("uppercases with Turkish rules", () => {
  assert.equal(initialsTr("ışık inci"), "Iİ");
});

test("supports a limit and a separator", () => {
  assert.equal(initialsTr("Mehmet Fatih Doğan", { limit: 2 }), "MF");
  assert.equal(initialsTr("Mehmet Fatih Doğan", { separator: "." }), "M.F.D");
});
