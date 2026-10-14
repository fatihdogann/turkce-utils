import { test } from "node:test";
import assert from "node:assert/strict";
import { lowerTr, upperTr } from "../src/case.ts";

test("lowercases the dotted I to a dotted i", () => {
  assert.equal(lowerTr("İSTANBUL"), "istanbul");
});

test("lowercases the dotless I to a dotless ı", () => {
  assert.equal(lowerTr("IŞIK"), "ışık");
});

test("uppercases i and ı correctly", () => {
  assert.equal(upperTr("istanbul ışık"), "İSTANBUL IŞIK");
});

test("leaves the rest of the alphabet alone", () => {
  assert.equal(upperTr("çğöşü"), "ÇĞÖŞÜ");
});
