# Lead-Capture Spec — catching the "calculated but didn't book" prospect
**Goal:** when someone completes the ROI Snapshot but doesn't book, still get their name + email +
their numbers into your inbox / a Google Sheet, so you can follow up.

## Why the Artifact version can't do this itself
The published Snapshot runs in Claude's artifact sandbox, whose CSP **blocks all outbound network
calls** (fetch/XHR/WebSocket) — only allow-listed scripts and Google Fonts load. So the artifact page
**cannot POST a lead anywhere.** It's perfect as a demo/preview; the capturing version must be **hosted
outside the artifact** (your own domain or a free static host). Same HTML, one added form POST.

## Recommended architecture (Google-native, free)
```
Hosted Snapshot page  ──POST──▶  Google Apps Script Web App  ──▶  Google Sheet (row per lead)
 (Cloudflare Pages /                                          └──▶  Email to you (jonathan.fullerhealth@gmail.com)
  Netlify / your site)
```
All Google, no monthly cost, you own the data.

### Steps
1. **Host the page.** Put `roi-snapshot.html` (with the added email field + POST below) on a free
   static host — Cloudflare Pages or Netlify — at e.g. `snapshot.yourdomain.com`. (This becomes your
   real `[SNAPSHOT_LINK]` for outbound.)
2. **Create the sink.** New Google Sheet → Extensions → Apps Script → paste the script below →
   Deploy → *Web app* → Execute as **Me**, Access **Anyone** → copy the `/exec` URL.
3. **Wire the page** to that URL (the `CAPTURE_URL` constant below).
4. **Add a consent line** under the email field: *"We'll email your snapshot and occasional tips. No
   spam, unsubscribe anytime."* (capturing email needs disclosed purpose + opt-out).

### Apps Script (the sink)
```javascript
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.appendRow([new Date(), d.name||"", d.email||"", d.type||"", d.clients||"",
                   d.hoursYr||"", d.dollarsYr||"", d.pain||""]);
  MailApp.sendEmail("jonathan.fullerhealth@gmail.com",
    "New RYT Snapshot lead: " + (d.name||"(no name)"),
    `Email: ${d.email}\nSegment: ${d.type}\nClients: ${d.clients}\n` +
    `Hours/yr: ${d.hoursYr}\n$/yr: ${d.dollarsYr}\nWants automated: ${d.pain}`);
  return ContentService.createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Page change (only works on the HOSTED copy, not the artifact)
Add a name + email field, then on submit:
```javascript
const CAPTURE_URL = "https://script.google.com/macros/s/XXXX/exec"; // your /exec URL
function captureLead(){
  const payload = { name:$("name").value, email:$("email").value,
    type:$("type").value, clients:$("clients").value,
    hoursYr:$("hrs").textContent, dollarsYr:$("dollars").textContent, pain:$("pain").value };
  fetch(CAPTURE_URL, {method:"POST", body:JSON.stringify(payload)}); // fire-and-forget
}
// call captureLead() when they submit email OR click the booking CTA
```

## Simpler alternative (no code)
Use a form service — **Formspree** or **Basin** (free tiers): point the form `action` at their
endpoint; leads land in your inbox + their dashboard. Less control, zero setup. Same "must be hosted
outside the artifact" rule applies.

## Cloudflare option (I can build this for you)
This session has Cloudflare tools. If you connect a Cloudflare account, I can deploy the hosted
Snapshot on **Cloudflare Pages** and stand up a **Worker + KV/D1** sink — so capture, storage, and
your public `[SNAPSHOT_LINK]` are all live without Google Apps Script. Say the word.

## Privacy / compliance
- Disclose why you collect the email; provide unsubscribe; don't sell the data.
- US: CAN-SPAM (identity + address + opt-out on the follow-up emails).
- If you email Canadian prospects too: CASL needs consent — the form submit is your consent record.
