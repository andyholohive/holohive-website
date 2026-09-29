# holohive.io

Marketing site for Holo Hive: homepage, client case studies (`/work/[slug]`),
the Korea field guide (`/korea-guide`), a scan example, and a server-qualified
inquiry flow that books qualified teams straight into Calendly.

Ported in September 2026 from the OpenAI Sites / Cloudflare Workers handoff
(see `START-HERE.md`) to the stack below so it deploys on the existing Vercel +
Supabase account. The previous single-page site is preserved on the
`legacy-site` branch and tag `v1-original-site`.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS 4 + shadcn (Base UI) components
- Supabase Postgres for inquiries and funnel counts (service role, server-only)
- Vercel hosting; `main` auto-deploys to https://www.holohive.io

## Local setup

Node 22.13+ (24 recommended).

```sh
npm install
cp .env.example .env.local   # then fill in the keys
npm run dev
```

Environment variables (`.env.local` locally, Vercel project settings in prod):

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | Not used by the site routes today; kept for parity |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Required by `/api/inquiries` and `/api/funnel`. Without it both return 503 and the form shows its retry message. |

## Database

Two tables in the shared Holo Hive Supabase project, both RLS-enabled with no
anon policies (only the service role can read/write):

- `site_inquiries` — qualification-form submissions (contains PII)
- `site_funnel_counts` — daily aggregate counts, no visitor IDs
- `site_funnel_count()` — atomic increment + 90-day prune, service-role only

Schema: `supabase/migrations/20260928_site_inquiries_and_funnel.sql`.
Reporting queries for the Supabase SQL editor: `scripts/*.sql`.

No CRM/email alert is wired. Someone must review `site_inquiries` in the
Supabase dashboard, or an approved integration must be added.

## Checks

```sh
npm test        # node --test; API routes run against an in-memory sqlite stand-in
npm run build
npm run lint
```

`tests/inquiry-api.local.mjs` is a manual integration check against a running
local dev server only — never point it at production.

## Product behaviour to preserve

Booking intents, qualification rules, retry/idempotency and Calendly handling
are specified in `START-HERE.md` and `docs/`. Source and tests are
authoritative where older docs disagree. Both routes use
`https://calendly.com/yanolima/connect`.
