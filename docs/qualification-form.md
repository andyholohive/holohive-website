# Scan and consultation qualification

Both inquiry routes use one qualification form followed directly by an embedded calendar for eligible teams, in the same dialog. There is no separate saved-result confirmation click or required page change. Get your Korea scan opens the scan request; Talk to us opens the engagement conversation. Initial and result copy follow that intent. Changing routes preserves draft answers but clears the previous outcome and starts a new request ID.

The form has eight required answers in three readable groups: website and a short written Korea goal; financial capacity, budget, decision involvement and intended start; then name and email. The written question replaces the goal dropdown, not adds to it: “What would make Korea a worthwhile investment for your team?” A nonblank answer up to 1,500 characters is required, with no arbitrary minimum word count or automatic judgment of answer quality. The project website replaces a separate company-name field. No job title, exact revenue, funding documents or phone number is requested.

Funding capacity and budget are adjacent beneath clear ongoing-engagement pricing (US$15K–$25K/month, depending on scope, usually starting with 90 days). The free scan and call are explicitly separate from paid work, with no commitment to an engagement. “Check fit & see times” describes the actual next action, rather than guaranteeing every applicant a calendar.

New written answers use the existing `why_now` column and a `Written Korea goal` marker in `korea_goal`; no new migration is necessary. Missing goal categories normalize to `written`, which requires the text answer. Legacy enumerated goal submissions remain supported without silently rewriting past records. Legacy funding/revenue API fields remain accepted and bounded; omitted values are stored as empty strings, not fabricated financial disclosures.

Off-home scan CTAs link to `/#request-scan`; conversation links use `/#contact`. Both open qualification. The informational `#scan` section and Back to the scan link remain normal navigation.

There is no email-draft launcher, mailto link, direct calendar shortcut or email fallback in either inquiry path, including footers, case pages and error states. Work email is still collected as contact information. The form submits directly to the website's inquiry endpoint.

## Qualification

Immediate booking requires a complete valid form plus all four:

- One company-capacity basis: completed funding of at least US$2M in the rolling past 12 months, OR at least US$5M in the rolling past 24 months, OR revenue sufficient to support the engagement. Either funding threshold is enough; the periods are not added together. Valuation and planned funding do not count. These alternatives follow the user's September 11 clarification, including revenue-funded teams like ORE. No arbitrary annual revenue or profit floor is invented.
- Budget available, or realistic at $15K-$25K/month subject to approval.
- Final/shared decision-maker or the lead evaluating and recommending a partner.
- Intended start within 90 days.

The selected goal and capacity are self-reported, not verified finances. Evaluating Korea is a legitimate goal. Revenue alone is insufficient: the prospect must say it can support the engagement and separately acknowledge investment readiness. “Neither applies yet” and “Prefer to discuss privately” go to review, not automatic booking; no scan or call is promised. Historic lifetime funding/revenue ranges cannot replace the new capacity answer. All other valid inquiries are saved as `review_needed` without a calendar URL.

## Records and privacy

The `inquiry_intent` column records `scan` or `conversation`; historical rows remain null. Migration `0001_inquiry_intent.sql` adds the nullable column without changing old records. Retry responses use the saved intent, not a changed request body. Calendly receives the request type as `utm_campaign`, alongside the existing opaque reference.

Migration `0002_business_capacity.sql` adds a dedicated nullable `business_capacity` column; existing records remain unchanged. New choices are stored as stable values (`raised_2m_12m`, `raised_5m_24m`, `revenue_supported`, `not_yet`, `private`), not as invented funding/revenue amounts. Current submissions require this answer. Existing saved approvals without an eligible stored basis return review rather than silently bypassing the new rule. Their historical database status is not rewritten; historical eligibility counts are not a current requalification report.

Unchanged retries keep the same request ID and use the saved result. Editing answers creates a new ID so a previously uncertain save cannot silently override changed answers. A changed body cannot upgrade a saved review record under its old ID.

Both the review result and the calendar offer include “Edit answers.” This restores the existing form, removes the calendar and focuses the form title. Opening edit without changing anything preserves idempotency; changing a value creates a new inquiry and is still subject to the three-per-email daily limit. Editing does not alter historical saved records or cancel a booking. The edit action disappears after an embedded booking is confirmed.

Answers are saved in the Site's private D1 `DB` binding, `inquiries` table. The Sites Settings database viewer and the owner's Sites database tools can read them. No public read endpoint or browser storage holds inquiry records. A saved eligible result is required before the calendar is mounted or its URL is offered. Disclosure appears before “Check fit & see times”: eligible submissions load Calendly immediately and share name/email for prefill plus an opaque inquiry ID and request intent for attribution. Financial answers and the written goal are not shared with Calendly.

The official advanced JavaScript embed receives saved name/email through `prefill`, not through an unsupported basic iframe assumption. The third-party script mounts only after qualification. A clearly labeled external calendar fallback appears only in that eligible result, for loading failures or user preference; it is not a mandatory extra step. Provider-controlled time selection, contact confirmation, timezone and booking confirmation remain necessary. The site's saved result is not proof that a meeting was booked. No provider account settings were changed or live meeting created.

Calendar readiness now requires a documented Calendly message, not merely the insertion of an iframe. Messages must originate at `https://calendly.com` and come from the current embedded frame window. Known viewing/selection messages remove the loading state; only `calendly.event_scheduled` updates the heading to booked and reveals optional pre-call reading. The provider confirmation remains visible. No payload is logged or persisted. Script failure or 12 seconds without a ready signal shows loading-failure guidance; a later valid message can recover. Listeners, observation and the embed are cleaned up on unmount. An external fallback booking cannot be confirmed by this component.

Implementation reference: [Calendly advanced embed](https://calendly.com/help/advanced-calendly-embed-for-developers). This is local UI feedback, not server-verified CRM attribution, attendance tracking or a webhook integration.

Closing after a confirmed embedded booking preserves a compact completion state for that request. Reopening does not mount a fresh scheduler below a booked heading. This state is intentionally not persisted across full page reloads.

Email/CRM notifications are not configured. Staff must review the stored inquiries; this release does not promise that an email alert was delivered. A future email/CRM integration must use a user-approved destination and server-held credentials. No prospect is asked to send a separate email.

### Operational setup still required

- Name the person responsible for review and approve the actual alert destination. Until integrated, the owner can inspect the private `inquiries` table through Sites Settings; do not describe saving as notifying someone.
- Review private-capacity, later-timing and approval-related cases on their merits. A review result is not a rejection or a financial verification.
- Both intents currently use the existing `/yanolima/connect` event. The account owner must verify the event name/agenda, timezone, available duration and enough scheduling lead time to prepare a scan, and remove questions already answered on the site. No new event URL or preparation promise has been invented.
- Keep SMS optional if reminders are enabled in Calendly. Its native opt-in is separate from any required custom phone question. No phone collection or reminder workflow has been enabled here.
- Set a response-time expectation only once staffing supports it. No automatic review timeline is promised by the public form.

## Validation

- Server-side and client-side validation with bounded text and allowed choices.
- Same-origin POST only; no GET listing.
- Request-body limit, honeypot, per-email daily limit.
- UUID idempotency prevents ordinary duplicate retry inserts.
- Database failures keep the prospect on the form; no success or booking fallback.
- No inquiry content logged by application code.

Tests: `node --experimental-strip-types --test tests/qualification.test.mjs tests/qualification-dialog.test.mjs tests/inquiry-routing.test.mjs tests/calendar-embed.test.mjs tests/calendar-booking.test.mjs tests/inquiry-entry-points.test.mjs`. The routing tests execute all shipped migrations and actual prepared SQL against an isolated in-memory SQLite database, not real prospect records. Calendar behavior tests simulate the provider; they do not create meetings or verify live account settings.
After applying the generated migration locally, `node tests/inquiry-api.local.mjs` exercises local-only saving and routing. Synthetic records use the exact company `HH_LOCAL_QUALIFICATION_QA`; remove only those local records after tests. Never run the integration test against a deployed site.

The component tests mock submission and do not write records. If manually testing the eight-field UI, record exact synthetic inquiry IDs for cleanup: company is now blank, so never delete records using a blank-company filter.

## Boundary

This is business qualification, not an identity, bank-balance or authority verification system. A person with Yano's existing public Calendly URL can still visit it directly outside this website. Inside the website, both inquiry paths require a successfully saved, qualified result before booking. Review-needed inquiries never receive a calendar URL. The free scan is clearly distinguished from the ongoing $15K-$25K/month engagement during budget qualification.
