#!/usr/bin/env node
/**
 * Builds dashboard/glp1-board.html from live conditioning data.
 *
 *   node scripts/sync-glp1-board.mjs feed.json
 *   cat feed.json | node scripts/sync-glp1-board.mjs
 *   node scripts/sync-glp1-board.mjs --sample     # restore the sample cohort
 *
 * Input is the JSON array returned by:
 *   select * from public.glp1_board_feed order by client_id, taken_on;
 *
 * The script does two things to the HTML:
 *   1. Injects scripts/triage.mjs between the TRIAGE-ENGINE markers, so the
 *      board and this pipeline can never drift from the protocol.
 *   2. Replaces the COHORT-DATA block with the real cohort and a sync stamp.
 *
 * No credentials live here. The scheduled session reads the view through the
 * Supabase connector and pipes the rows in, so patient data never passes
 * through a stored secret or a third-party host.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { injectEngine } from "./inject-engine.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HTML = join(ROOT, "dashboard", "glp1-board.html");
const ENGINE = join(ROOT, "scripts", "triage.mjs");

const num = v => (v === null || v === undefined || v === "" ? null : Number(v));
const bool = v => (v === null || v === undefined ? null : Boolean(v));

/** Group feed rows into the board's patient shape. */
export function buildCohort(rows) {
  const byClient = new Map();
  for (const r of rows) {
    if (!byClient.has(r.client_id)) byClient.set(r.client_id, []);
    byClient.get(r.client_id).push(r);
  }

  const patients = [];
  const warnings = [];

  for (const [clientId, all] of byClient) {
    all.sort((a, b) => String(a.taken_on).localeCompare(String(b.taken_on)));
    const head = all[all.length - 1];
    const baseRow = all.find(r => r.is_baseline);
    const checkRows = all.filter(r => !r.is_baseline);

    if (!checkRows.length) { warnings.push(`${head.patient_code}: baseline only, no assessments yet — skipped.`); continue; }
    if (!baseRow) warnings.push(`${head.patient_code}: no baseline row — trend criteria will not be evaluated.`);
    if (!head.therapy_start) warnings.push(`${head.patient_code}: no therapy start date — weeks on therapy and the rapid-loss rule are unavailable.`);
    if (checkRows.some(r => r.grip_kg == null)) warnings.push(`${head.patient_code}: one or more assessments missing grip strength — flagged incomplete on the board.`);

    const almiRow = [...all].reverse().find(r => r.almi != null);

    patients.push({
      id: head.patient_code,
      sex: head.sex === "F" || head.sex === "M" ? head.sex : (String(head.sex||"").toLowerCase().startsWith("f") ? "F" : "M"),
      age: num(head.age),
      heightM: num(head.height_m),
      tier: head.risk_tier || "standard",
      agent: head.agent || "unspecified",
      agentClass: head.agent_class || "mono",
      startDate: head.therapy_start,
      knownLowBMD: false,
      concurrentInsulinOrSU: false,
      almi: almiRow ? num(almiRow.almi) : null,
      baseline: baseRow ? {
        gripKg: num(baseRow.grip_kg),
        sitToStandSec: num(baseRow.sit_to_stand_sec),
        gaitSpeedMs: num(baseRow.gait_speed_ms),
        weightKg: num(baseRow.weight_kg),
        canRiseWithoutArms: bool(baseRow.can_rise_without_arms),
      } : {},
      checkins: checkRows.map(r => ({
        date: r.taken_on,
        phase: num(r.phase) ?? 0,
        gripKg: num(r.grip_kg),
        sitToStandSec: num(r.sit_to_stand_sec),
        gaitSpeedMs: num(r.gait_speed_ms),
        weightKg: num(r.weight_kg),
        proteinGPerKg: num(r.protein_g_per_kg),
        adherencePct: num(r.adherence_pct),
        falls: num(r.falls),
        giLimiting: r.gi_limiting == null ? null : Boolean(r.gi_limiting),
        canRiseWithoutArms: bool(r.can_rise_without_arms),
        notes: r.notes || "",
      })),
    });
  }
  return { cohort: { patients }, warnings };
}

function injectCohort(html, cohort, syncedAt) {
  const re = /(\/\* COHORT-DATA:START[^\n]*\*\/\n)[\s\S]*?(\/\* COHORT-DATA:END \*\/)/;
  if (!re.test(html)) throw new Error("COHORT-DATA markers not found in the dashboard HTML.");
  const body = cohort
    ? `let DATA=${JSON.stringify(cohort)};\nconst SYNCED_AT=${JSON.stringify(syncedAt)};`
    : `let DATA=JSON.parse(JSON.stringify(SAMPLE));\nconst SYNCED_AT=null;`;
  return html.replace(re, (_, a, b) => `${a}${body}\n${b}`);
}

function main() {
  const args = process.argv.slice(2);
  const sample = args.includes("--sample");
  let html = readFileSync(HTML, "utf8");
  html = injectEngine(html);

  if (sample) {
    writeFileSync(HTML, injectCohort(html, null, null));
    console.log("Restored sample cohort. Triage engine re-injected from scripts/triage.mjs.");
    return;
  }

  const file = args.find(a => !a.startsWith("--"));
  const raw = file ? readFileSync(file, "utf8") : readFileSync(0, "utf8");
  let rows;
  try { rows = JSON.parse(raw); } catch { throw new Error("Input is not valid JSON. Expected the array returned by glp1_board_feed."); }
  if (!Array.isArray(rows)) throw new Error("Expected a JSON array of glp1_board_feed rows.");
  if (!rows.length) {
    console.log("Feed returned 0 rows — leaving the board on its current cohort. Nothing published.");
    process.exit(2);
  }

  const { cohort, warnings } = buildCohort(rows);
  if (!cohort.patients.length) {
    console.log("No patients had any assessment beyond baseline. Nothing published.");
    process.exit(2);
  }

  writeFileSync(HTML, injectCohort(html, cohort, new Date().toISOString()));

  const totals = cohort.patients.length;
  const assessments = cohort.patients.reduce((n, p) => n + p.checkins.length, 0);
  console.log(`Synced ${totals} patients, ${assessments} assessments.`);
  if (warnings.length) {
    console.log("\nData quality:");
    for (const w of warnings) console.log(`  - ${w}`);
  }
  console.log("\nNext: republish dashboard/glp1-board.html to the board artifact URL.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try { main(); } catch (e) { console.error(`sync failed: ${e.message}`); process.exit(1); }
}
