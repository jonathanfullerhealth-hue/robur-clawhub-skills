// Test suite for the canonical triage engine (protocol §7).
//
// Run: node --test scripts/
//
// Every RED and YELLOW rule in section 7 has a test that fires it, a test at
// its boundary, and — where the rule depends on a measure that can be absent —
// a test that a missing measure is reported as incomplete rather than passed
// as negative. Triage is a clinical escalation aid: silence and "no" must not
// be the same output.

import { test } from "node:test";
import assert from "node:assert/strict";
import { triage, latest } from "./triage.mjs";

// A patient with unremarkable everything. Override one field per test so each
// assertion is attributable to a single rule.
const patient = (over = {}) => ({
  id: "T-01", sex: "M", startDate: "2026-01-05", almi: 8.0,
  baseline: { gripKg: 40, sitToStandSec: 10, gaitSpeedMs: 1.2, weightKg: 100, canRiseWithoutArms: true },
  checkins: [],
  ...over,
});

const checkin = (over = {}) => ({
  date: "2026-03-02", phase: 3, gripKg: 40, sitToStandSec: 10, gaitSpeedMs: 1.2,
  weightKg: 97, proteinGPerKg: 1.4, adherencePct: 90, falls: 0, giLimiting: false,
  canRiseWithoutArms: true, notes: "",
  ...over,
});

// One check-in eight weeks after a prior one, so the weekly-loss rule has a
// denominator and `onTx` is past the initial-weeks exemption.
const withPrior = (over = {}, priorOver = {}) =>
  patient({ checkins: [checkin({ date: "2026-01-05", weightKg: 100, ...priorOver }), checkin(over)] });

const reds = t => t.red.map(r => r[0]);
const yels = t => t.yel.map(r => r[0]);
const fires = (t, re) => reds(t).concat(yels(t)).some(s => re.test(s));

// ---------------------------------------------------------------- green ----

test("an unremarkable check-in is green with no flags", () => {
  const t = latest(withPrior());
  assert.equal(t.status, "good");
  assert.deepEqual(t.red, []);
  assert.deepEqual(t.yel, []);
  assert.deepEqual(t.inc, []);
});

// ------------------------------------------------------------------ red ----

test("RED: grip decline greater than 10% from baseline", () => {
  const t = latest(withPrior({ gripKg: 35.5 })); // -11.25%
  assert.equal(t.status, "crit");
  assert.ok(fires(t, /Grip strength decline >10%/));
});

test("RED: new inability to rise from a chair without arms", () => {
  const t = latest(withPrior({ canRiseWithoutArms: false }));
  assert.ok(fires(t, /New inability to rise/));
});

test("RED: 5x sit-to-stand crosses 15 s having been below", () => {
  const t = latest(withPrior({ sitToStandSec: 16.2 }));
  assert.ok(fires(t, /sit-to-stand crossed 15/));
});

test("RED: gait speed at or below 0.8 m/s", () => {
  const t = latest(withPrior({ gaitSpeedMs: 0.8 }));
  assert.ok(fires(t, /Gait speed at or below/));
});

test("RED: protein below 0.8 g/kg for two consecutive check-ins", () => {
  const p = patient({ checkins: [
    checkin({ date: "2026-01-05", proteinGPerKg: 0.7 }),
    checkin({ date: "2026-02-02", proteinGPerKg: 0.6 }),
  ]});
  assert.ok(fires(latest(p), /Protein below 0.8 g\/kg for 2/));
});

test("protein below 0.8 g/kg once is not yet a RED", () => {
  const t = latest(withPrior({ proteinGPerKg: 0.7 }));
  assert.ok(!reds(t).some(s => /Protein below 0.8/.test(s)));
});

test("RED: sustained loss above 1% body weight per week beyond the initial weeks", () => {
  const t = latest(withPrior({ date: "2026-03-02", weightKg: 91 })); // ~1.1%/wk over 8 wks
  assert.ok(fires(t, /above 1% body weight/));
});

test("rapid loss inside the first four weeks of therapy is not a RED", () => {
  const p = patient({ startDate: "2026-01-05", checkins: [
    checkin({ date: "2026-01-05", weightKg: 100 }),
    checkin({ date: "2026-01-26", weightKg: 96 }),
  ]});
  assert.ok(!reds(latest(p)).some(s => /body weight/.test(s)));
});

test("RED: training adherence below 60%", () => {
  const t = latest(withPrior({ adherencePct: 55 }));
  assert.ok(fires(t, /adherence below 60%/));
});

test("RED: any fall", () => {
  const t = latest(withPrior({ falls: 1 }));
  assert.equal(t.status, "crit");
  assert.ok(fires(t, /fall/));
});

// --------------------------------------------------------------- yellow ----

test("YELLOW: grip decline between 5 and 10%", () => {
  const t = latest(withPrior({ gripKg: 37 })); // -7.5%
  assert.equal(t.status, "warn");
  assert.ok(fires(t, /Grip strength decline 5–10%/));
});

test("YELLOW: protein between 0.8 and 1.2 g/kg", () => {
  const t = latest(withPrior({ proteinGPerKg: 1.0 }));
  assert.equal(t.status, "warn");
});

test("YELLOW: adherence between 60 and 79%", () => {
  const t = latest(withPrior({ adherencePct: 70 }));
  assert.equal(t.status, "warn");
});

test("YELLOW: GI symptoms limiting intake or training", () => {
  const t = latest(withPrior({ giLimiting: true }));
  assert.equal(t.status, "warn");
});

// ------------------------------------------------------------ boundaries ----

test("grip decline of exactly 10% is YELLOW, not RED", () => {
  const t = latest(withPrior({ gripKg: 36 }));
  assert.equal(t.status, "warn");
});

test("adherence of exactly 80% is green; exactly 60% is yellow", () => {
  assert.equal(latest(withPrior({ adherencePct: 80 })).status, "good");
  assert.equal(latest(withPrior({ adherencePct: 60 })).status, "warn");
});

test("protein of exactly 1.2 g/kg meets target", () => {
  assert.equal(latest(withPrior({ proteinGPerKg: 1.2 })).status, "good");
});

test("sit-to-stand of exactly 15 s has not crossed the cut-point", () => {
  const t = latest(withPrior({ sitToStandSec: 15 }));
  assert.ok(!reds(t).some(s => /crossed 15/.test(s)));
});

// ------------------------------------------------- missing-data handling ----

test("missing grip is reported incomplete", () => {
  const t = latest(withPrior({ gripKg: null }));
  assert.equal(t.inc.length, 1);
});

test("an incomplete assessment is never reported as green", () => {
  const t = latest(withPrior({ gripKg: null }));
  assert.notEqual(t.status, "good");
});

test("an unrecorded fall count is incomplete, not zero falls", () => {
  const t = latest(withPrior({ falls: null }));
  assert.notEqual(t.status, "good");
  assert.ok(t.inc.length > 0, "a check-in that never asked about falls must not read as clean");
});

test("an unrecorded GI symptom flag is incomplete, not absence of symptoms", () => {
  const t = latest(withPrior({ giLimiting: null }));
  assert.ok(t.inc.length > 0);
});

test("unrecorded adherence is incomplete, not compliance", () => {
  const t = latest(withPrior({ adherencePct: null }));
  assert.ok(t.inc.length > 0);
});

test("unrecorded protein is incomplete, and does not silently reset the low-protein streak", () => {
  const p = patient({ checkins: [
    checkin({ date: "2026-01-05", proteinGPerKg: 0.6 }),
    checkin({ date: "2026-02-02", proteinGPerKg: 0.6 }),
    checkin({ date: "2026-03-02", proteinGPerKg: null }),
  ]});
  const t = latest(p);
  assert.ok(t.inc.length > 0, "two prior sub-0.8 readings then a blank must not read as resolved");
});

test("an unparseable date does not silently disable the time-gated rules", () => {
  const p = patient({ startDate: "not-a-date", checkins: [
    checkin({ date: "2026-01-05", weightKg: 100 }),
    checkin({ date: "2026-03-02", weightKg: 91 }),
  ]});
  const t = latest(p);
  assert.ok(t.inc.length > 0 || reds(t).some(s => /body weight/.test(s)),
    "weeks-on-therapy could not be computed; the rule must not just vanish");
});

// --------------------------------------------- already-impaired patients ----

test("a patient already above the sit-to-stand cut-point at baseline is not green", () => {
  const p = patient({
    baseline: { gripKg: 40, sitToStandSec: 18, gaitSpeedMs: 1.2, weightKg: 100, canRiseWithoutArms: true },
    checkins: [checkin({ date: "2026-01-05", sitToStandSec: 18 }), checkin({ sitToStandSec: 19.5 })],
  });
  const t = latest(p);
  assert.notEqual(t.status, "good",
    "a sit-to-stand of 19.5 s meets the EWGSOP2 low-strength criterion at every visit");
});

test("a patient who could not rise without arms at baseline and still cannot is not green", () => {
  const p = patient({
    baseline: { gripKg: 40, sitToStandSec: 10, gaitSpeedMs: 1.2, weightKg: 100, canRiseWithoutArms: false },
    checkins: [checkin({ date: "2026-01-05", canRiseWithoutArms: false }), checkin({ canRiseWithoutArms: false })],
  });
  assert.notEqual(latest(p).status, "good");
});

test("grip below the EWGSOP2 absolute cut-point is not green even if stable", () => {
  const p = patient({
    baseline: { gripKg: 25, sitToStandSec: 10, gaitSpeedMs: 1.2, weightKg: 100, canRiseWithoutArms: true },
    checkins: [checkin({ date: "2026-01-05", gripKg: 25 }), checkin({ gripKg: 25 })],
  });
  const t = latest(p);
  assert.equal(t.ew.strength, true);
  assert.notEqual(t.status, "good", "25 kg is below the 27 kg male cut-point at every visit");
});

// ------------------------------------------------------ numerical safety ----

test("check-ins a few days apart do not amplify weight noise into a RED", () => {
  const p = patient({ checkins: [
    checkin({ date: "2026-03-01", weightKg: 90.0 }),
    checkin({ date: "2026-03-03", weightKg: 89.6 }), // 0.44% over two days
  ]});
  assert.ok(!reds(latest(p)).some(s => /body weight/.test(s)),
    "0.4 kg across two days is measurement noise, not 1.5%/week of loss");
});

test("a zero baseline grip does not produce a division artefact", () => {
  const p = patient({
    baseline: { gripKg: 0, sitToStandSec: 10, gaitSpeedMs: 1.2, weightKg: 100, canRiseWithoutArms: true },
    checkins: [checkin({ date: "2026-01-05" }), checkin()],
  });
  const t = latest(p);
  assert.ok(t.gripPct === null || Number.isFinite(t.gripPct));
  assert.ok(t.inc.length > 0, "a baseline grip of zero is a bad reading, not a real one");
});

test("the sex-specific EWGSOP2 cut-points are applied", () => {
  assert.equal(triage(patient({ sex: "M", checkins: [checkin()] }), 0).ew.cut, 27);
  assert.equal(triage(patient({ sex: "F", checkins: [checkin()] }), 0).ew.cut, 16);
});

test("multiple simultaneous triggers are all reported, not just the first", () => {
  const t = latest(withPrior({ gripKg: 30, falls: 2, adherencePct: 40 }));
  assert.ok(t.red.length >= 3);
});
