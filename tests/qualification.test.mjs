import assert from 'node:assert/strict';
import test from 'node:test';
import {
  validateInquiry,
  qualifyInquiry,
  requiredInquiryFields,
} from '../lib/qualification.ts';

const valid = {
  name: 'Test Founder',
  email: 'FOUNDER@example.com',
  company: 'Example team',
  website: 'example.com',
  role: 'Founder',
  authority: 'decision_maker',
  goal: 'ecosystem',
  need: 'We want the right Korean communities to understand our ecosystem before our next campaign.',
  timing: 'within_30_days',
  capacity: 'raised_2m_12m',
  funding: '1m_5m',
  revenue: 'pre_revenue',
  budget: 'available',
};

test('normalizes a valid inquiry and routes a ready team to booking', () => {
  const { data, errors } = validateInquiry(valid);
  assert.deepEqual(errors, {});
  assert.equal(data.email, 'founder@example.com');
  assert.equal(data.website, 'https://example.com/');
  assert.equal(qualifyInquiry(data).status, 'calendar_ready');
});
test('an evaluation lead with realistic budget pending approval can book', () => {
  const data = {
    ...valid,
    authority: 'evaluation_lead',
    budget: 'approval_needed',
    timing: 'within_90_days',
  };
  assert.equal(qualifyInquiry(data).status, 'calendar_ready');
});
test('legacy funding and revenue do not replace a current capacity answer', () => {
  for (const funding of ['none', 'private', '20m_plus']) {
    assert.equal(
      qualifyInquiry({ ...valid, capacity: '', funding, revenue: '20m_plus' })
        .status,
      'eligibility_unconfirmed',
    );
  }
});
test('either recent funding threshold or revenue sufficient for the engagement can qualify', () => {
  for (const capacity of [
    'raised_2m_12m',
    'raised_5m_24m',
    'revenue_supported',
  ]) {
    const answers = { ...valid, capacity, funding: 'none', revenue: '' };
    assert.deepEqual(validateInquiry(answers).errors, {});
    assert.equal(qualifyInquiry(answers).status, 'calendar_ready');
    assert.equal(
      qualifyInquiry({ ...answers, budget: 'approval_needed' }).status,
      'calendar_ready',
    );
    for (const overrides of [
      { budget: 'planning' },
      { budget: 'below_range' },
      { budget: 'not_yet' },
    ]) {
      assert.equal(
        qualifyInquiry({ ...answers, ...overrides }).status,
        'not_eligible',
      );
    }
  }
});
test('private capacity is unconfirmed; insufficient capacity is not eligible', () => {
  for (const capacity of ['not_yet', 'private']) {
    assert.deepEqual(validateInquiry({ ...valid, capacity }).errors, {});
    assert.deepEqual(qualifyInquiry({ ...valid, capacity }).reasons, [
      capacity === 'private' ? 'capacity_unconfirmed' : 'business_capacity',
    ]);
    assert.equal(
      qualifyInquiry({ ...valid, capacity }).status,
      capacity === 'private' ? 'eligibility_unconfirmed' : 'not_eligible',
    );
  }
  for (const capacity of ['', 'invented']) {
    assert.ok(validateInquiry({ ...valid, capacity }).errors.capacity);
    assert.equal(
      qualifyInquiry({ ...valid, capacity }).status,
      'eligibility_unconfirmed',
    );
  }
});
test('evaluating Korea is a valid need', () => {
  assert.equal(
    qualifyInquiry({ ...valid, goal: 'evaluate' }).status,
    'calendar_ready',
  );
});
test('budget gates booking, but optional role and timing do not', () => {
  for (const budget of ['planning', 'below_range', 'not_yet'])
    assert.equal(qualifyInquiry({ ...valid, budget }).status, 'not_eligible');
  for (const authority of ['researcher', 'external_adviser'])
    assert.equal(
      qualifyInquiry({ ...valid, authority }).status,
      'calendar_ready',
    );
  for (const timing of ['within_6_months', 'exploring'])
    assert.equal(qualifyInquiry({ ...valid, timing }).status, 'calendar_ready');
});
test('rejects missing data, unknown enum choices, invalid email and dangerous URLs', () => {
  assert.deepEqual(
    Object.keys(validateInquiry({}).errors).sort(),
    [...requiredInquiryFields].sort(),
  );
  assert.ok(
    validateInquiry({ ...valid, budget: 'pretend_ready' }).errors.budget,
  );
  assert.ok(validateInquiry({ ...valid, email: 'not-email' }).errors.email);
  for (const website of [
    'javascript:alert(1)',
    'file:///etc/passwd',
    'https://name:password@example.com',
    'localhost',
  ]) {
    assert.ok(validateInquiry({ ...valid, website }).errors.website);
  }
});

test('six answers suffice; historical context is not invented or required', () => {
  assert.equal(requiredInquiryFields.length, 6);
  const minimal = Object.fromEntries(
    requiredInquiryFields.map((key) => [key, valid[key]]),
  );
  const { data, errors } = validateInquiry(minimal);
  assert.deepEqual(errors, {});
  assert.equal(qualifyInquiry(data).status, 'calendar_ready');
  for (const key of [
    'company',
    'role',
    'funding',
    'revenue',
    'authority',
    'timing',
    'need',
  ])
    assert.equal(data[key], '');
  assert.equal(data.goal, valid.goal);
  for (const key of requiredInquiryFields) {
    assert.ok(validateInquiry({ ...minimal, [key]: '' }).errors[key], key);
  }
  assert.ok(
    validateInquiry({ ...minimal, funding: 'invented' }).errors.funding,
  );
});

test('extra context is optional, including for an unlisted goal', () => {
  assert.deepEqual(validateInquiry({ ...valid, need: '' }).errors, {});
  assert.deepEqual(
    validateInquiry({ ...valid, goal: 'other', need: '  ' }).errors,
    {},
  );
  assert.deepEqual(
    validateInquiry({ ...valid, goal: 'other', need: 'Find partners' }).errors,
    {},
  );
});
test('legacy written goals require real text, not an arbitrary essay length', () => {
  for (const goal of ['', 'written']) {
    assert.ok(
      validateInquiry({ ...valid, goal, need: '  ' }).errors[
        goal ? 'need' : 'goal'
      ],
    );
    assert.deepEqual(
      validateInquiry({ ...valid, goal, need: 'Find partners' }).errors,
      {},
    );
    assert.deepEqual(
      validateInquiry({ ...valid, goal, need: 'x'.repeat(1500) }).errors,
      {},
    );
    assert.ok(
      validateInquiry({ ...valid, goal, need: 'x'.repeat(1501) }).errors.need,
    );
  }
  assert.ok(validateInquiry({ ...valid, goal: 'invented' }).errors.goal);
});
test('rejects overlong answers and handles non-string inputs', () => {
  assert.ok(validateInquiry({ ...valid, name: 'x'.repeat(121) }).errors.name);
  assert.ok(validateInquiry({ ...valid, need: 'x'.repeat(1501) }).errors.need);
  assert.ok(
    validateInquiry({ ...valid, authority: 'invented' }).errors.authority,
  );
  assert.ok(validateInquiry({ ...valid, capacity: {} }).errors.capacity);
  assert.ok(validateInquiry(null).errors.name);
});
