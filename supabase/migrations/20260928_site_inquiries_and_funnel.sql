-- Applied to project cjvhpxetudsvnzfkvrgw on 2026-09-28 (migration: site_inquiries_and_funnel).
-- Ported from the Cloudflare D1 schema in the developer handoff (drizzle/0000-0003).
-- RLS enabled with no anon/authenticated policies: only the service role
-- (used server-side by the Next.js API routes) can read or write.

create table if not exists public.site_inquiries (
  id text primary key,
  submitted_at text not null,
  inquiry_intent text,
  name text not null,
  email text not null,
  company text not null,
  website text not null,
  role text not null,
  decision_role text not null,
  korea_goal text not null,
  why_now text not null,
  start_timing text not null,
  total_funding_usd text not null,
  annual_revenue_usd text not null,
  business_capacity text,
  monthly_budget_readiness text not null,
  qualification_status text not null,
  review_reasons text not null
);
create index if not exists site_inquiries_email_submitted_idx
  on public.site_inquiries (email, submitted_at);
comment on table public.site_inquiries is
  'holohive.io qualification-form submissions. Written by /api/inquiries via service role. No CRM alert is wired; a human must review. Contains PII — never expose to anon.';

create table if not exists public.site_funnel_counts (
  day text not null,
  intent text not null,
  event text not null,
  count integer not null default 0,
  primary key (day, intent, event)
);
comment on table public.site_funnel_counts is
  'holohive.io daily aggregate funnel counts (no visitor IDs). Written by /api/funnel via site_funnel_count(). Rows older than 90 days are pruned on write.';

alter table public.site_inquiries enable row level security;
alter table public.site_funnel_counts enable row level security;

-- Atomic increment + prune, callable only by the service role.
create or replace function public.site_funnel_count(p_day text, p_intent text, p_event text)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.site_funnel_counts
    where day < to_char(current_date - 89, 'YYYY-MM-DD');
  insert into public.site_funnel_counts (day, intent, event, count)
    values (p_day, p_intent, p_event, 1)
    on conflict (day, intent, event)
    do update set count = least(public.site_funnel_counts.count + 1, 100000);
$$;
revoke execute on function public.site_funnel_count(text, text, text) from public, anon, authenticated;
