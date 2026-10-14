import { test } from "node:test";
import assert from "node:assert/strict";
import { titleCaseTr } from "../src/title.ts";

test("capitalises each word with Turkish rules", () => {
  assert.equal(titleCaseTr("çılgın şöför istanbul'da"), "Çılgın Şöför İstanbul'da");
});

test("fixes ALL-CAPS input", () => {
  assert.equal(titleCaseTr("TÜRKÇE METİN IŞIK"), "Türkçe Metin Işık");
});

test("capitalises after opening punctuation", () => {
  assert.equal(titleCaseTr('"merhaba dünya" dedi'), '"Merhaba Dünya" Dedi');
});
