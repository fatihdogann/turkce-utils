import { test } from "node:test";
import assert from "node:assert/strict";
import { atestmanGrade, atestmanScore } from "../src/readability.ts";

test("easy text scores higher than hard text", () => {
  const easy = atestmanScore("Bu bir test. Çok kolay bir metin.");
  const hard = atestmanScore(
    "Karmaşıklaştırılamayanlardanmışçasına değerlendirilebilirlik katsayılarının hesaplanması gerekmektedir.",
  );
  assert.ok(easy.score > hard.score);
});

test("reports counts and a grade", () => {
  const result = atestmanScore("Merhaba dünya. Nasılsın?");
  assert.equal(result.words, 3);
  assert.equal(result.sentences, 2);
  assert.ok(result.grade.length > 0);
});

test("clamps the score into 0–100", () => {
  const result = atestmanScore("a");
  assert.ok(result.score >= 0 && result.score <= 100);
});

test("empty text scores zero", () => {
  assert.equal(atestmanScore("").score, 0);
});

test("grades follow the Ateşman bands", () => {
  assert.equal(atestmanGrade(95), "çok kolay");
  assert.equal(atestmanGrade(75), "kolay");
  assert.equal(atestmanGrade(60), "orta");
  assert.equal(atestmanGrade(40), "zor");
  assert.equal(atestmanGrade(10), "çok zor");
});
