-- Optional Telegram handle on website inquiries, mirrored to the portal.
alter table public.site_inquiries add column if not exists telegram text;

create or replace function public.mirror_site_inquiry_to_contact_submissions()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  status_label text := case new.qualification_status
    when 'calendar_ready' then '✅ Qualified · shown Calendly, booking not confirmed'
    when 'not_eligible' then '❌ Not qualified'
    else '⚠️ Fit unconfirmed'
  end;
  capacity_label text := case new.business_capacity
    when 'raised_2m_12m' then 'Raised US$2M+ in the past 12 months'
    when 'raised_5m_24m' then 'Raised US$5M+ in the past 24 months'
    when 'revenue_supported' then 'Revenue can support this investment'
    when 'not_yet' then 'None of these applies yet'
    when 'private' then 'Prefers not to share'
    else nullif(new.business_capacity, '')
  end;
begin
  insert into contact_submissions
    (name, project_name, email, role, telegram, funding, timeline, goals, created_at)
  values (
    new.name,
    coalesce(nullif(new.company, ''), new.website),
    new.email,
    nullif(concat_ws(' · ', nullif(new.role, ''), nullif(new.decision_role, '')), ''),
    nullif(new.telegram, ''),
    concat_ws(' · ', status_label, capacity_label,
      'Budget: ' || nullif(new.monthly_budget_readiness, '')),
    nullif(new.start_timing, ''),
    concat_ws(E'\n',
      case new.inquiry_intent when 'scan' then '[Korea scan request]' else '[Call request]' end,
      nullif(new.korea_goal, ''),
      nullif(new.why_now, ''),
      'Website: ' || nullif(new.website, '')),
    now()
  );
  return new;
end;
$$;
