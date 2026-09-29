// Local-only integration check. Never sends synthetic inquiries to the deployed site.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';

const origin = 'http://localhost:3000';
const endpoint = `${origin}/api/inquiries`;
const email = `qualification-check-${randomUUID()}@example.com`;
const answers = {
  name: 'Local QA',
  email,
  company: 'HH_LOCAL_QUALIFICATION_QA',
  website: 'https://example.com',
  role: 'Founder',
  authority: 'decision_maker',
  goal: 'ecosystem',
  need: 'A local test of a team preparing its Korea ecosystem campaign.',
  timing: 'within_30_days',
  capacity: 'revenue_supported',
  funding: '1m_5m',
  revenue: 'pre_revenue',
  budget: 'available',
};
const post = (body, extraHeaders = {}) =>
  fetch(endpoint, {
    method: 'POST',
    headers: {
      Origin: origin,
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  });
const id = randomUUID();
assert.equal(
  (await post({ id, answers }, { Origin: 'https://example.com' })).status,
  403,
);
assert.equal((await post({ id, answers: {} })).status, 400);
assert.equal((await post({ id, answers, intent: 'invalid' })).status, 400);
assert.equal((await post({ id, answers, companyFax: 'spam' })).status, 400);
assert.equal(
  (await post({ id, answers, padding: 'x'.repeat(17000) })).status,
  400,
);
const ready = await post({ id, answers, intent: 'scan' });
assert.equal(ready.status, 200, await ready.clone().text());
const first = await ready.json();
assert.equal(first.status, 'calendar_ready');
assert.equal(first.intent, 'scan');
assert.equal(
  new URL(first.calendarUrl).searchParams.get('utm_campaign'),
  'scan',
);
assert.equal(new URL(first.calendarUrl).origin, 'https://calendly.com');
assert.equal(new URL(first.calendarUrl).searchParams.get('email'), email);
assert.deepEqual(await (await post({ id, answers })).json(), first);
assert.equal(
  (await post({ id, answers: { ...answers, email: 'different@example.com' } }))
    .status,
  409,
);
const review = await post({
  id: randomUUID(),
  answers: { ...answers, budget: 'planning' },
});
assert.equal(review.status, 200);
const second = await review.json();
assert.equal(second.status, 'not_eligible');
assert.equal(second.intent, 'conversation');
assert.equal(second.calendarUrl, undefined);
const conversation = await post({
  id: randomUUID(),
  answers,
  intent: 'conversation',
});
assert.equal(conversation.status, 200);
const third = await conversation.json();
assert.equal(third.intent, 'conversation');
assert.equal(
  new URL(third.calendarUrl).searchParams.get('utm_campaign'),
  'conversation',
);
assert.equal((await post({ id: randomUUID(), answers })).status, 429);
const get = await fetch(endpoint);
assert.equal(get.status, 405);
console.log(
  'Local API checks passed: validation, origin, size limit, save, retry, review routing, rate limit and no public listing.',
);
