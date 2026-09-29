-- Private counts, NOT unique people or joined cohorts. Compare with inquiry-quality-summary.sql.
-- Run in the Supabase SQL editor (Postgres).
SELECT day AS day_utc, intent,
  sum(CASE WHEN event = 'page_view' THEN count ELSE 0 END) AS homepage_views,
  sum(CASE WHEN event = 'form_open' THEN count ELSE 0 END) AS form_open,
  sum(CASE WHEN event = 'project_completed' THEN count ELSE 0 END) AS project_completed,
  sum(CASE WHEN event = 'calendar_offered' THEN count ELSE 0 END) AS calendar_offered,
  sum(CASE WHEN event = 'booking_reported' THEN count ELSE 0 END) AS embedded_booking_reported,
  sum(CASE WHEN event = 'calendar_external' THEN count ELSE 0 END) AS external_calendar_opened
FROM site_funnel_counts
WHERE day >= to_char(current_date - 89, 'YYYY-MM-DD')
GROUP BY day, intent
ORDER BY day DESC, intent;
