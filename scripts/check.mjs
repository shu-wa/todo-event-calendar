import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
let jsonFiles = 0;
let actions = 0;
let sqlFiles = 0;
const screens = [];
function verify(value) {
  if (Array.isArray(value)) return value.forEach(verify);
  if (value && typeof value === "object") {
    if ("executionEnv" in value) assert.equal(value.executionEnv, "");
    for (const [key, child] of Object.entries(value)) {
      if ((key === "content" || key === "dialogProps") && typeof child === "string" && /^[\[{]/.test(child.trim())) verify(JSON.parse(child));
      else verify(child);
    }
  }
}
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "scripts") continue;
    assert(!entry.isSymbolicLink(), "No symlinks in the publication");
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { assert.notEqual(entry.name, "builtInUis"); await visit(file); continue; }
    const text = await readFile(file, "utf8");
    for (const pattern of [/(?:AKIA|ASIA)[A-Z0-9]{16}/, /gh[pousr]_[A-Za-z0-9_]{20,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/, /[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\/App\//i]) assert(!pattern.test(text), `Sensitive pattern in ${path.relative(root, file)}`);
    if (entry.name.endsWith(".json")) {
      const value = JSON.parse(text);
      verify(value);
      if (entry.name === "uiDef.json") screens.push(value.code);
      jsonFiles++;
    } else if (entry.name.endsWith(".js")) {
      assert(text.includes("export default async function run()"));
      new vm.Script(text.replace("export default ", ""), { filename: file });
      actions++;
    } else if (entry.name.endsWith(".sql")) {
      assert(text.trim().length > 0);
      sqlFiles++;
    }
  }
}
await visit(root);
assert.equal(screens.length, 7);
assert.equal(screens.filter((code) => code === "TODO").length, 2);
console.log(JSON.stringify({ jsonFiles, actions, sqlFiles, screens: screens.length, check: "static-only" }, null, 2));
