// Canonical triage engine — post-GLP-1 conditioning protocol, section 7.
//
// SINGLE SOURCE OF TRUTH. This file is injected verbatim into
// dashboard/glp1-board.html between the TRIAGE-ENGINE markers by
// scripts/sync-glp1-board.mjs (with `export ` stripped). Never edit the copy
// inside the HTML — it is generated.
//
// Must stay dependency-free so it runs both as an ES module and as inline
// browser script. Covered by scripts/triage.test.mjs — run `node --test
// scripts/triage.test.mjs` after any change.
//
// Design rule: an absent measure is not a negative finding. Every rule whose
// input can be missing must say so rather than return "no". A patient nobody
// asked about falls is not a patient who did not fall.

export const wks=(a,b)=>(new Date(b)-new Date(a))/6048e5;
export const f1=n=>n==null?"—":n.toFixed(1);

// A weekly rate cannot be estimated from less than a week of elapsed time.
export const MIN_RATE_DAYS=7;

export function triage(p,i){
  const c=p.checkins[i], prior=i>0?p.checkins[i-1]:null, b=p.baseline||{};
  const red=[],yel=[],inc=[];

  if(c.gripKg==null) inc.push("Grip strength missing — assessment incomplete. Grip is the primary measure and is not substitutable.");
  if(c.falls==null) inc.push("Falls not recorded. Any fall is an escalation trigger, so a blank cannot be read as none.");
  if(c.proteinGPerKg==null) inc.push("Protein intake not recorded — the consecutive-low-intake rule cannot be evaluated.");
  if(c.adherencePct==null) inc.push("Training adherence not recorded.");
  if(c.giLimiting==null) inc.push("GI symptom status not recorded.");
  if(c.canRiseWithoutArms==null) inc.push("Chair-rise-without-arms not recorded.");
  if(b.gripKg===0) inc.push("Baseline grip strength recorded as zero — a bad reading, not a real one. Change-from-baseline criteria are unavailable until it is corrected.");

  const gripPct=(b.gripKg&&c.gripKg!=null)?((c.gripKg-b.gripKg)/b.gripKg*100):null;
  const stsD=(c.sitToStandSec!=null&&b.sitToStandSec!=null)?c.sitToStandSec-b.sitToStandSec:null;

  const onTx=wks(p.startDate,c.date);
  const onTxKnown=Number.isFinite(onTx);
  if(!onTxKnown) inc.push("Weeks on therapy could not be computed from the recorded dates — the rapid-loss rule is not being evaluated.");

  let loss=null;
  if(prior&&prior.weightKg&&c.weightKg!=null){
    const w=wks(prior.date,c.date);
    if(Number.isFinite(w)&&w*7>=MIN_RATE_DAYS) loss=((prior.weightKg-c.weightKg)/prior.weightKg)/w*100;
    else if(Number.isFinite(w)&&w>0) inc.push(`Only ${Math.round(w*7)} days since the previous check-in — too short to estimate a weekly rate of weight loss, so that criterion is not being evaluated.`);
  }

  let pStreak=0;
  for(let k=i;k>=0;k--){if(p.checkins[k].proteinGPerKg!=null&&p.checkins[k].proteinGPerKg<0.8)pStreak++;else break;}

  const cut=p.sex==="M"?27:16;
  const ew={strength:(c.gripKg!=null&&c.gripKg<cut)||(c.sitToStandSec!=null&&c.sitToStandSec>15),cut,
            mass:p.almi!=null?(p.almi<(p.sex==="M"?7.0:5.5)):null,massCut:p.sex==="M"?7.0:5.5};

  // RED — escalate to prescriber within one week
  if(gripPct!=null&&gripPct<-10) red.push(["Grip strength decline >10% from baseline",`${f1(c.gripKg)} kg against a baseline of ${f1(b.gripKg)} kg — a ${f1(Math.abs(gripPct))}% fall.`]);
  if(b.canRiseWithoutArms===true&&c.canRiseWithoutArms===false) red.push(["New inability to rise from chair without arms","Could rise unaided at baseline; cannot at this assessment."]);
  if(c.sitToStandSec!=null&&c.sitToStandSec>15&&b.sitToStandSec!=null&&b.sitToStandSec<=15) red.push(["5× sit-to-stand crossed 15 s",`${f1(c.sitToStandSec)} s, from ${f1(b.sitToStandSec)} s at baseline.`]);
  if(c.gaitSpeedMs!=null&&c.gaitSpeedMs<=0.8) red.push(["Gait speed at or below 0.8 m/s",`${c.gaitSpeedMs.toFixed(2)} m/s — meets the EWGSOP2 low physical performance criterion.`]);
  if(pStreak>=2) red.push([`Protein below 0.8 g/kg for ${pStreak} consecutive check-ins`,`Currently ${f1(c.proteinGPerKg)} g/kg against a 1.2–1.6 target. This is a referral, not a coaching problem.`]);
  if(loss!=null&&loss>1&&onTxKnown&&onTx>4) red.push(["Sustained loss above 1% body weight per week",`${f1(loss)}%/week since the previous check-in, at week ${Math.round(onTx)} of therapy.`]);
  if(c.adherencePct!=null&&c.adherencePct<60) red.push(["Training adherence below 60%",`${c.adherencePct}% of prescribed sessions. Program disengagement — treat as a clinical event.`]);
  if(c.falls!=null&&c.falls>0) red.push([`${c.falls} fall${c.falls>1?"s":""} since last check-in`,"Any fall is an escalation trigger regardless of injury."]);

  // YELLOW — hold load, address the driver, reassess in 2 weeks
  if(gripPct!=null&&gripPct<=-5&&gripPct>=-10) yel.push(["Grip strength decline 5–10% from baseline",`${f1(c.gripKg)} kg, down ${f1(Math.abs(gripPct))}% from ${f1(b.gripKg)} kg.`]);
  if(c.proteinGPerKg!=null&&c.proteinGPerKg>=0.8&&c.proteinGPerKg<1.2) yel.push(["Protein below target",`${f1(c.proteinGPerKg)} g/kg against 1.2–1.6. Usually a distribution problem — five feedings of 25 g rather than three of 40 g.`]);
  if(c.adherencePct!=null&&c.adherencePct>=60&&c.adherencePct<80) yel.push(["Training adherence 60–79%",`${c.adherencePct}% of prescribed sessions completed.`]);
  if(c.giLimiting===true) yel.push(["GI symptoms limiting intake or training","Reported at this check-in. Common in the 5–10 days after a dose escalation."]);
  if(stsD!=null&&stsD>2&&c.sitToStandSec<=15) yel.push(["5× sit-to-stand slowed >2 s from baseline",`${f1(c.sitToStandSec)} s, from ${f1(b.sitToStandSec)} s — still under the 15 s cut-point.`]);

  // Standing findings — absolute impairment that the change-from-baseline rules
  // above cannot see, because a patient impaired at baseline never crosses a
  // threshold. These carry no de-load instruction: continue progressing load
  // unless a RED or another YELLOW says otherwise.
  const newInability=b.canRiseWithoutArms===true&&c.canRiseWithoutArms===false;
  const stsAlreadyOver=c.sitToStandSec!=null&&c.sitToStandSec>15&&!(b.sitToStandSec!=null&&b.sitToStandSec<=15);
  if(ew.strength&&!stsAlreadyOver&&c.gripKg!=null&&c.gripKg<cut) yel.push(["Meets EWGSOP2 low-strength criterion",`Grip ${f1(c.gripKg)} kg is below the ${cut} kg cut-point for this patient. A standing finding, not a new decline — keep progressing load unless another flag says otherwise.`]);
  if(stsAlreadyOver) yel.push(["Sit-to-stand above 15 s and was at baseline",`${f1(c.sitToStandSec)} s. Already above the cut-point at intake, so the crossing rule cannot fire. Impairment is present and standing.`]);
  if(c.canRiseWithoutArms===false&&!newInability) yel.push(["Cannot rise from chair without arms","Standing functional deficit, present at baseline. Not a new decline, but not a normal finding either."]);

  const status=red.length?"crit":yel.length?"warn":inc.length?"inc":"good";
  return{status,red,yel,inc,
         gripPct,stsD,loss,onTx:onTxKnown?onTx:null,pStreak,ew,c,prior,first:i===0};
}

export const latest=p=>triage(p,p.checkins.length-1);
