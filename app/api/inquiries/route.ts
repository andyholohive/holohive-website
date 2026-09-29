import { inquiryDatabase } from '@/lib/inquiry-db';
import {
  choiceLabel,
  qualificationOptions,
  qualifyInquiry,
  validateInquiry,
  type InquiryIntent,
} from '@/lib/qualification';

const TABLE = 'site_inquiries';
const RESULT_COLUMNS =
  'qualification_status, name, email, inquiry_intent, business_capacity, monthly_budget_readiness';

type StoredInquiry = {
  qualification_status: string;
  name: string;
  email: string;
  inquiry_intent: string | null;
  business_capacity: string | null;
  monthly_budget_readiness: string;
};

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });

function result(row: StoredInquiry, id: string) {
  const intent: InquiryIntent =
    row.inquiry_intent === 'scan' ? 'scan' : 'conversation';
  // Historical BANT-only approvals do not establish the new company-fit rule.
  // Never use edited request answers to upgrade an already-saved inquiry.
  const readiness =
    qualificationOptions.budget.find(
      ([value, label]) =>
        row.monthly_budget_readiness === value ||
        row.monthly_budget_readiness === label,
    )?.[0] ?? '';
  const qualification = qualifyInquiry({
    capacity: row.business_capacity ?? '',
    budget: readiness,
  });
  if (
    row.qualification_status !== 'calendar_ready' ||
    qualification.status !== 'calendar_ready'
  ) {
    if (qualification.status === 'calendar_ready')
      return {
        status: 'eligibility_unconfirmed',
        reasons: ['qualification_unconfirmed'],
        reference: id,
        intent,
      };
    return { ...qualification, reference: id, intent };
  }
  const calendar = new URL('https://calendly.com/yanolima/connect');
  calendar.searchParams.set('name', row.name);
  calendar.searchParams.set('email', row.email);
  calendar.searchParams.set('utm_source', 'holohive');
  calendar.searchParams.set('utm_medium', 'qualified_inquiry');
  calendar.searchParams.set('utm_content', id);
  calendar.searchParams.set('utm_campaign', intent);
  return {
    status: 'calendar_ready',
    reasons: [],
    reference: id,
    intent,
    calendarUrl: calendar.toString(),
  };
}

async function readBody(request: Request) {
  if (Number(request.headers.get('content-length')) > 16000)
    throw new Error('too_large');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('invalid');
  let length = 0;
  const decoder = new TextDecoder();
  let body = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 16000) {
      await reader.cancel();
      throw new Error('too_large');
    }
    body += decoder.decode(value, { stream: true });
  }
  return JSON.parse(body + decoder.decode());
}

export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) {
    return json(
      { error: 'Please submit this form from the Holo Hive website.' },
      403,
    );
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return json({ error: 'Invalid request format.' }, 415);
  }
  let body;
  try {
    body = await readBody(request);
  } catch {
    return json({ error: 'Please check your answers and try again.' }, 400);
  }
  if (
    !body ||
    typeof body !== 'object' ||
    !/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i.test(body.id ?? '') ||
    body.companyFax
  ) {
    return json({ error: 'Please reopen the form and try again.' }, 400);
  }
  const { data, errors } = validateInquiry(body.answers);
  const intent = body.intent ?? 'conversation';
  if (intent !== 'scan' && intent !== 'conversation')
    return json({ error: 'Please reopen the form and try again.' }, 400);
  if (Object.keys(errors).length)
    return json(
      { errors, error: 'Please check the highlighted answers.' },
      400,
    );
  const qualification = qualifyInquiry(data);
  try {
    const db = inquiryDatabase();
    // Retries keep the same ID. No submission data is returned by this endpoint.
    const existingQuery = await db
      .from(TABLE)
      .select(RESULT_COLUMNS)
      .eq('id', body.id)
      .maybeSingle<StoredInquiry>();
    if (existingQuery.error) throw existingQuery.error;
    const existing = existingQuery.data;
    if (existing) {
      if (existing.email !== data.email)
        return json(
          {
            error:
              'An earlier inquiry used this form. Reload the page to start a new inquiry.',
          },
          409,
        );
      return json(result(existing, body.id));
    }
    const countQuery = await db
      .from(TABLE)
      .select('id', { count: 'exact', head: true })
      .eq('email', data.email)
      .gt('submitted_at', new Date(Date.now() - 86400000).toISOString());
    if (countQuery.error) throw countQuery.error;
    if ((countQuery.count ?? 0) >= 3)
      return json(
        {
          error:
            'You have already sent several inquiries today. Please try again tomorrow.',
        },
        429,
      );
    const insert = await db.from(TABLE).upsert(
      {
        id: body.id,
        submitted_at: new Date().toISOString(),
        name: data.name,
        email: data.email,
        company: data.company,
        website: data.website,
        role: data.role,
        decision_role: choiceLabel('authority', data.authority),
        korea_goal: choiceLabel('goal', data.goal),
        why_now: data.need,
        start_timing: choiceLabel('timing', data.timing),
        total_funding_usd: choiceLabel('funding', data.funding),
        annual_revenue_usd: choiceLabel('revenue', data.revenue),
        monthly_budget_readiness: choiceLabel('budget', data.budget),
        qualification_status: qualification.status,
        review_reasons: qualification.reasons.join(', '),
        inquiry_intent: intent,
        business_capacity: data.capacity,
      },
      { onConflict: 'id', ignoreDuplicates: true },
    );
    if (insert.error) throw insert.error;
    // Read the stored result so concurrent retries cannot return a different route.
    const savedQuery = await db
      .from(TABLE)
      .select(RESULT_COLUMNS)
      .eq('id', body.id)
      .maybeSingle<StoredInquiry>();
    if (savedQuery.error) throw savedQuery.error;
    const saved = savedQuery.data;
    if (!saved || saved.email !== data.email)
      throw new Error('Inquiry save failed');
    return json(result(saved, body.id));
  } catch {
    // Do not log personal or financial information, and never open booking on failure.
    return json(
      {
        error:
          'We could not save your inquiry. Your answers are still here. Please try again.',
      },
      503,
    );
  }
}
