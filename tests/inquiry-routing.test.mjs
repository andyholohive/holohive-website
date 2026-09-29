// Isolated API checks with real SQL against the site schema. No network or
// real prospect records are used, and the database is destroyed after each test.
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import vm from 'node:vm';
import ts from 'typescript';
import * as qualification from '../lib/qualification.ts';
import { openSiteDatabase, supabaseOverSqlite } from './helpers/supabase-sqlite.mjs';

const compiled = ts.transpileModule(
  readFileSync(
    new URL('../app/api/inquiries/route.ts', import.meta.url),
    'utf8',
  ),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
const origin = 'https://example.test';
const answers = {
  name: 'Synthetic Founder',
  email: 'synthetic@example.com',
  website: 'example.com',
  goal: 'adoption',
  authority: 'decision_maker',
  timing: 'within_30_days',
  capacity: 'revenue_supported',
  budget: 'available',
};

function harness(t) {
  const db = openSiteDatabase(t);
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    Response,
    URL,
    TextDecoder,
    require(name) {
      if (name === '@/lib/qualification') return qualification;
      if (name === '@/lib/inquiry-db')
        return { inquiryDatabase: () => supabaseOverSqlite(db) };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return {
    db,
    async post(data = answers, id = randomUUID(), intent = 'scan') {
      const response = await exports.POST(
        new Request(`${origin}/api/inquiries`, {
          method: 'POST',
          headers: { Origin: origin, 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, intent, answers: data }),
        }),
      );
      return { code: response.status, body: await response.json(), id };
    },
  };
}

test('each permitted financial path is saved before a calendar is returned', async (t) => {
  const h = harness(t);
  for (const capacity of [
    'raised_2m_12m',
    'raised_5m_24m',
    'revenue_supported',
  ]) {
    const saved = await h.post({ ...answers, capacity });
    assert.equal(saved.code, 200);
    assert.equal(saved.body.status, 'calendar_ready');
    const row = h.db
      .prepare(
        'SELECT business_capacity, total_funding_usd, annual_revenue_usd FROM site_inquiries WHERE id = ?',
      )
      .get(saved.id);
    assert.equal(row.business_capacity, capacity);
    assert.equal(row.total_funding_usd, '');
    assert.equal(row.annual_revenue_usd, '');
    const url = new URL(saved.body.calendarUrl);
    assert.equal(url.origin, 'https://calendly.com');
    assert.equal(url.searchParams.get('email'), answers.email);
    assert.ok(!saved.body.calendarUrl.includes(capacity));
  }
});

test('written goal is validated and saved without an invented legacy category', async (t) => {
  const h = harness(t);
  const need = 'Decide whether Korea is our next market';
  const saved = await h.post({ ...answers, goal: undefined, need });
  assert.equal(saved.code, 200);
  assert.equal(saved.body.status, 'calendar_ready');
  const row = h.db
    .prepare('SELECT why_now, korea_goal FROM site_inquiries WHERE id = ?')
    .get(saved.id);
  assert.equal(row.why_now, need);
  assert.equal(row.korea_goal, 'Written Korea goal');
  for (const invalidNeed of ['   ', 'x'.repeat(1501)]) {
    const invalid = await h.post({
      ...answers,
      goal: 'written',
      need: invalidNeed,
    });
    assert.equal(invalid.code, 400);
    assert.ok(invalid.body.errors.need);
    assert.equal(invalid.body.calendarUrl, undefined);
  }
  assert.equal(h.db.prepare('SELECT count(*) AS n FROM site_inquiries').get().n, 1);
});

test('insufficient, private and missing capacity never expose booking', async (t) => {
  const h = harness(t);
  for (const capacity of ['not_yet', 'private']) {
    const saved = await h.post({ ...answers, capacity });
    assert.equal(saved.code, 200);
    assert.equal(
      saved.body.status,
      capacity === 'private' ? 'eligibility_unconfirmed' : 'not_eligible',
    );
    assert.equal(saved.body.calendarUrl, undefined);
  }
  for (const capacity of ['', 'invented']) {
    const invalid = await h.post({ ...answers, capacity });
    assert.equal(invalid.code, 400);
    assert.ok(invalid.body.errors.capacity);
    assert.equal(invalid.body.calendarUrl, undefined);
  }
});

test('retries use the saved financial basis, not revised body answers', async (t) => {
  const h = harness(t);
  const first = await h.post();
  assert.deepEqual(
    (await h.post(answers, first.id, 'conversation')).body,
    first.body,
  );
  const review = await h.post({ ...answers, capacity: 'not_yet' });
  const changed = await h.post(answers, review.id);
  assert.equal(changed.body.status, 'not_eligible');
  assert.equal(changed.body.calendarUrl, undefined);
  assert.equal(h.db.prepare('SELECT count(*) AS n FROM site_inquiries').get().n, 2);
});

test('an older approval without the new basis is not silently grandfathered', async (t) => {
  const h = harness(t);
  const old = await h.post();
  h.db
    .prepare('UPDATE site_inquiries SET business_capacity = NULL WHERE id = ?')
    .run(old.id);
  const replay = await h.post(answers, old.id);
  assert.equal(replay.code, 200);
  assert.equal(replay.body.status, 'eligibility_unconfirmed');
  assert.equal(replay.body.calendarUrl, undefined);
  const row = h.db
    .prepare(
      'SELECT qualification_status, business_capacity FROM site_inquiries WHERE id = ?',
    )
    .get(old.id);
  assert.equal(row.qualification_status, 'calendar_ready');
  assert.equal(row.business_capacity, null);
});

test('all fifteen displayed fit combinations route consistently without role or timing gates', async (t) => {
  const h = harness(t);
  let sequence = 0;
  for (const capacity of [
    'raised_2m_12m',
    'raised_5m_24m',
    'revenue_supported',
    'not_yet',
    'private',
  ]) {
    for (const budget of ['available', 'approval_needed', 'not_yet']) {
      const minimal = {
        ...answers,
        email: `test-${++sequence}@example.com`,
        capacity,
        budget,
        authority: undefined,
        timing: undefined,
      };
      const saved = await h.post(minimal);
      assert.equal(saved.code, 200);
      const qualified =
        capacity !== 'not_yet' &&
        capacity !== 'private' &&
        budget !== 'not_yet';
      assert.equal(
        saved.body.status,
        qualified
          ? 'calendar_ready'
          : capacity === 'private'
            ? 'eligibility_unconfirmed'
            : 'not_eligible',
      );
      assert.equal(!!saved.body.calendarUrl, qualified);
      assert.deepEqual(saved.body.reasons, [
        ...(capacity === 'private'
          ? ['capacity_unconfirmed']
          : capacity === 'not_yet'
            ? ['business_capacity']
            : []),
        ...(budget === 'not_yet' ? ['budget'] : []),
      ]);
      const stored = h.db
        .prepare(
          'SELECT qualification_status, review_reasons, decision_role, start_timing FROM site_inquiries WHERE id = ?',
        )
        .get(saved.id);
      assert.equal(stored.qualification_status, saved.body.status);
      assert.equal(stored.review_reasons, saved.body.reasons.join(', '));
      assert.equal(stored.decision_role, '');
      assert.equal(stored.start_timing, '');
    }
  }
});

test('replaying a stored approval still requires its stored budget readiness', async (t) => {
  const h = harness(t);
  const saved = await h.post();
  h.db
    .prepare('UPDATE site_inquiries SET monthly_budget_readiness = ? WHERE id = ?')
    .run('Not yet', saved.id);
  const replay = await h.post(answers, saved.id);
  assert.equal(replay.body.status, 'not_eligible');
  assert.deepEqual(replay.body.reasons, ['budget']);
  assert.equal(replay.body.calendarUrl, undefined);
});

test('legacy manual-review records are never upgraded by replaying favorable answers', async (t) => {
  const h = harness(t);
  const saved = await h.post();
  h.db
    .prepare('UPDATE site_inquiries SET qualification_status = ? WHERE id = ?')
    .run('review_needed', saved.id);
  const replay = await h.post(answers, saved.id);
  assert.equal(replay.body.status, 'eligibility_unconfirmed');
  assert.deepEqual(replay.body.reasons, ['qualification_unconfirmed']);
  assert.equal(replay.body.calendarUrl, undefined);
});
