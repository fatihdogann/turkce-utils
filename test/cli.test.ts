import { test } from "node:test";
import assert from "node:assert/strict";
import { runCommand } from "../src/cli.ts";

test("dispatches text commands", () => {
  assert.equal(runCommand("slug", "Çılgın Şöför"), "cilgin-sofor");
  assert.equal(runCommand("upper", "istanbul"), "İSTANBUL");
  assert.equal(runCommand("initials", "Mehmet Fatih Doğan"), "MFD");
});

test("spells out numbers and ordinals", () => {
  assert.equal(runCommand("words", "1234"), "bin iki yüz otuz dört");
  assert.equal(runCommand("ordinal", "4"), "dördüncü");
});

test("sorts lines by the Turkish alphabet", () => {
  assert.equal(runCommand("sort", "üzüm\narmut\nçilek"), "armut\nçilek\nüzüm");
});

test("reports readability with counts", () => {
  const out = runCommand("readability", "Merhaba dünya. Nasılsın?");
  assert.match(out, /\(.*\)/);
  assert.match(out, /3 kelime, 2 cümle/);
});

test("rejects unknown commands", () => {
  assert.throws(() => runCommand("nope", "x"), /unknown command/);
});
