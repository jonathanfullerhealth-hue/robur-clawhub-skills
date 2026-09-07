// Injects scripts/triage.mjs into dashboard/glp1-board.html between the
// TRIAGE-ENGINE markers, so the module and the single-file artifact can never
// drift apart. Imported by sync-glp1-board.mjs; also runnable on its own —
//
//   node scripts/inject-engine.mjs
//
// — to refresh the baked copy after an engine change, without touching the
// database or the cohort currently on the board.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ENGINE = join(ROOT, "scripts", "triage.mjs");
const BOARD = join(ROOT, "dashboard", "glp1-board.html");

export function injectEngine(html) {
  const src = readFileSync(ENGINE, "utf8")
    .replace(/^export /gm, "")
    .replace(/^\/\/.*$/gm, "")     // strip the module-only header comments
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const re = /(\/\* TRIAGE-ENGINE:START[^\n]*\*\/\n)[\s\S]*?(\/\* TRIAGE-ENGINE:END \*\/)/;
  if (!re.test(html)) throw new Error("TRIAGE-ENGINE markers not found in the dashboard HTML.");
  return html.replace(re, (_, a, b) => `${a}${src}\n${b}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const before = readFileSync(BOARD, "utf8");
  const after = injectEngine(before);
  if (after === before) console.log("Engine already current in dashboard/glp1-board.html.");
  else { writeFileSync(BOARD, after); console.log("Injected scripts/triage.mjs into dashboard/glp1-board.html."); }
}
