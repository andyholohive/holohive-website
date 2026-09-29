-- Read-only, private report over inquiries already intentionally submitted.
-- Calendar-ready is eligibility, not a booked or attended call.
-- Contains no contact details, identifiers, answers, URLs or free text.
SELECT
  substr(submitted_at, 1, 10) AS submitted_day_utc,
  CASE
    WHEN inquiry_intent IN ('scan', 'conversation') THEN inquiry_intent
    ELSE 'unspecified'
  END AS inquiry_intent,
  count(*) AS submitted_inquiries,
  sum(CASE WHEN qualification_status = 'calendar_ready' THEN 1 ELSE 0 END)
    AS calendar_eligible_inquiries,
  sum(CASE WHEN qualification_status = 'review_needed' THEN 1 ELSE 0 END)
    AS review_needed_inquiries,
  sum(CASE WHEN qualification_status = 'not_eligible' THEN 1 ELSE 0 END)
    AS not_eligible_inquiries,
  sum(CASE WHEN qualification_status = 'eligibility_unconfirmed' THEN 1 ELSE 0 END)
    AS eligibility_unconfirmed_inquiries,
  round(
    100.0 * sum(CASE WHEN qualification_status = 'calendar_ready' THEN 1 ELSE 0 END)
      / count(*),
    1
  ) AS calendar_eligible_percent
FROM site_inquiries
GROUP BY 1, 2
ORDER BY 1 DESC, 2;
