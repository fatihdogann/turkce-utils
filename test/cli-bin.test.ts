import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../src/cli.ts", import.meta.url));

function run(target: string): string {
  return execFileSync(process.execPath, [target, "slug", "Çılgın Şöför"], {
    encoding: "utf8",
  }).trim();
}

test("runs when the entry point is the file itself", () => {
  assert.equal(run(cli), "cilgin-sofor");
});

test("runs when the entry point is a symlink (npm links the bin this way)", () => {
  const dir = mkdtempSync(join(tmpdir(), "turkce-bin-"));
  const link = join(dir, "turkce");
  symlinkSync(cli, link);
  assert.equal(run(link), "cilgin-sofor");
});

test("reads its input from stdin when no argument is given", () => {
  const out = execFileSync(process.execPath, [cli, "upper"], {
    input: "istanbul\n",
    encoding: "utf8",
  }).trim();
  assert.equal(out, "İSTANBUL");
});
