# Holo Hive — developer handoff

Prepared September 26, 2026. Source matches published version 45, commit
`2c5a9a690b985d9b656c622a6141b3b5d72dfcee`.

Current preview: https://holo-hive-website-preview.yanopwl.chatgpt.site/

## What is included

Complete tracked application source, public assets, package lockfile, database
schema and migrations, tests, reporting queries, and reference documentation.
No credentials, customer records, installed dependencies or generated build
output are included. This archive does not include existing production data.

## Stack and local setup

React 19, Vinext, Vite, Cloudflare Workers, Cloudflare D1 and Drizzle.
Use Node 24 (package minimum is 22.13) and the supplied package-lock.json.

```sh
npm ci
npm run dev
```

Run checks with Node 24:

```sh
node --test tests/*.test.mjs
npm run build
```

Do not deploy this as static HTML: qualification and measurement require
the server routes and a D1 database.

## Independent deployment: configuration work required

This checkout currently targets OpenAI Sites hosting. It is not yet configured
for a separate Cloudflare account or another host.

1. Review `vite.config.ts`, including `@openai/sites-vite-plugin` and the
   placeholder D1 database ID. Adapt the Sites-specific integration for your
   deployment workflow; do not deploy the placeholder configuration unchanged.
2. Provision a Cloudflare D1 database and bind it to the Worker as `DB`.
   Apply every SQL migration in `drizzle/` in order, using migration tracking.
3. Preserve the Cloudflare-compatible server build, static asset bindings,
   and `nodejs_compat` configuration. Configure domain and TLS in your account.
4. Build and deploy using the adapted configuration. Test database persistence
   and both qualification paths in staging before switching the domain.
5. If deploying somewhere other than Cloudflare Workers, port
   `lib/inquiry-db.ts` and the database integration explicitly; a normal
   static upload or unmodified Next.js deployment is not equivalent.

`.openai/hosting.json` identifies the existing Site and logical binding. It is
not a credential and does not grant access to its hosting account or database.
Hosting, DNS and calendar access must be shared separately through account
invitations, not by putting credentials in this archive.

## Preserve the booking behavior

- Two intents: direct conversation and free Korea scan walkthrough.
- Both must pass server-side qualification before receiving the calendar.
- The direct-call route promises a free first conversation, not a prepared scan.
- The scan route promises a scan prepared before the first call and a live
  walkthrough. Ensure calendar lead time allows that preparation.
- Nonqualifying visitors receive the field guide, not a calendar or free scan.
- Current form: website, goal, name, email; capacity and budget on the next
  step. Additional context is optional. Source and tests are authoritative:
  some older documents describe superseded form versions.
- Preserve retry/idempotency, validation, error handling and answer preservation.

Both routes use `https://calendly.com/yanolima/connect`. Verify the event's
availability, timezone, duration, preparation lead time and duplicate questions
in the Calendly account. No real test booking was submitted during this handoff.

## Measurement and operations

`/api/inquiries` stores inquiries. Automated CRM/email alerts are not configured;
assign someone to review records or implement an explicitly approved integration.

`/api/funnel` stores daily aggregate counts, not visitor IDs or form answers.
See `docs/conversion-measurement.md` and `scripts/funnel-summary.sql`.
Counts are not unique visitors or a joined conversion cohort. Embedded booking
events are browser-reported, not server-verified; external-calendar bookings,
attendance, cancellations and sales require separate reconciliation.

## Pre-launch checklist

- Check home, case study, guide, and scan example routes and all assets.
- Test both intents: eligible, ineligible, validation error, retry, and Back.
- Confirm only eligible saved requests receive calendar access.
- Verify mobile scrolling, enlarged text, keyboard focus and dialog dismissal.
- Verify Calendly loads, prefills details and handles failure clearly.
- Use synthetic staging data; do not submit tests to production.
- Verify current privacy disclosures and legal requirements for the final host.
- Do not carry the old holohive.io 90-day results guarantee into this site.

The archive does not modify or migrate the separate existing holohive.io site.
