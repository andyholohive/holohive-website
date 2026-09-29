# Funnel measurement — current implementation

First-party aggregate counting is now implemented. The earlier planning notes below describe the prior state, not the current deployment.

## Current counters

`funnel_counts` stores only UTC day, allowed event name, route intent and a count. It stores no visitor IDs, form answers, email, project website, IP, user agent, referrer or Calendly payload. No analytics cookies or browser storage are used. Hosting providers may separately process network metadata; this is not a claim about infrastructure logs. Existing inquiry records are unchanged.

| Event | Meaning |
| --- | --- |
| page_view / site | Homepage hydrated, not a unique visitor |
| form_open / scan or conversation | Qualification dialog opened |
| project_completed | Validated first step reached fit questions; no answers sent to analytics |
| calendar_offered | Saved qualified result displayed calendar container; not proof it loaded |
| booking_reported | Origin- and iframe-source-checked Calendly completion signal; not webhook-verified or cancellation-adjusted |
| calendar_external | Separate calendar link clicked; not a booking |

Each event/intent is counted once per page load, with in-memory deduplication. Refreshes can count again. DNT, GPC and localhost are excluded. Analytics failures do not block booking and are not retried. The endpoint rejects unknown fields and invalid enum combinations, checks origin and bounds payloads to 256 bytes. Daily buckets are capped at 100,000. It is not bot-proof: forged same-origin requests can inflate counts.

`scripts/funnel-summary.sql` is a private rolling 90-day report. Older aggregate rows are deleted on the next accepted measurement, not on a scheduled timer. If traffic stops, physical cleanup waits. No inquiry records are affected. There is no public report endpoint.

## How to use it

Compare full-week stage totals for scan vs conversation alongside `scripts/inquiry-quality-summary.sql` for saved submissions and qualification decisions. These are unjoined counts, not cohorts or unique people. A person can use both routes; steps may fall on different UTC dates; non-home pages can open forms too. Homepage views therefore are not an exact denominator for all inquiries. Do not claim an exact conversion rate or causal A/B-test lift from these counters.

The inline scan website field is not tracked on focus or typing. Form measurement begins when the qualification dialog opens. No unfinished answers are sent by analytics.

Reconcile actual bookings in Calendly, including external bookings, cancellations and reschedules. Booking URLs already carry inquiry reference and intent as provider attribution parameters. Keep that reconciliation private; do not send booking payloads into the aggregate endpoint. Track attended, qualified opportunity, won/lost and signed value in the existing private sales record. The website cannot establish those outcomes.

A verified provider webhook or authorized reconciliation is still required for reliable booking totals. Attendance and sales outcomes need calendar/CRM or manual input. No vendor, CRM integration, public dashboard, webhook or automated follow-up was added. No production prospect records were read for this implementation.

## Archived planning notes (before aggregate measurement)

The existing inquiry system recorded submissions, scan/conversation intent and qualification outcome. It did not record impressions, CTA position, abandoned forms or completed bookings.

The embedded calendar now listens for a source- and origin-checked `calendly.event_scheduled` message to show a booked heading and optional guide link. This is ephemeral UI state only: it does not persist a booking, send analytics, verify attendance or confirm bookings made through the external fallback. A provider webhook or authorized reconciliation is still needed for durable booking measurement.

## Available now

`scripts/inquiry-quality-summary.sql` is a read-only, private aggregate over existing submissions. It returns daily submission counts, calendar-eligible counts and the eligible share by intent. It does not return contact details or answers, create a public endpoint, change the database or introduce tracking. It has been checked with synthetic records only; no production inquiry records were read.

An authorized operator can run this query with the project's existing private database tooling. Do not publish small-cohort data externally. Calendar eligibility is not a booked or attended call, and eligible share is not visitor-to-lead conversion.

## Next measurement decision

Before calling the new scan heading an A/B test, choose a first-party analytics setup, retention policy and appropriate privacy disclosure. A real experiment needs eligible-inquiry outcomes and exposure denominators, not just CTA clicks. Traffic mix and sample size also matter; this redesign is currently an unmeasured design hypothesis.

If submission attribution is added, store only a validated entry-point enum (`header`, `hero`, `results`, `scan`, `closing`, `footer`, `off_home`) with the final inquiry. Preserve original attribution on retries and use a nullable migration for older records. Do not send raw URLs, referrers, contact details, answers, IDs or validation messages to analytics.

Do not change the form's promise that answers are sent only when the form is finished. Pre-submission events must never carry answers. A calendar handoff needs its own event; a confirmed booking needs a real booking-provider confirmation. Neither may be inferred from `calendar_ready`.

No analytics vendor, visitor tracking, schema migration or remote query is enabled by this design pass.
