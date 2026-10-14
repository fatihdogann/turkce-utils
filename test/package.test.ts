import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { type: string; license: string; name: string };

test("package.json describes an ESM library", () => {
  assert.equal(pkg.name, "turkce-utils");
  assert.equal(pkg.type, "module");
  assert.equal(pkg.license, "MIT");
});
