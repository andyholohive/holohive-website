import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as events from '../lib/funnel-events.ts';
import { openSiteDatabase, supabaseOverSqlite } from './helpers/supabase-sqlite.mjs';
const read = (path) =>
  readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const compile = (path) =>
  ts.transpileModule(read(path), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
test('aggregate endpoint validates payloads and expires old counts without event records', async (t) => {
  const db = openSiteDatabase(t);
  db.exec(
    "INSERT INTO site_funnel_counts VALUES ('2000-01-01', 'site', 'page_view', 5)",
  );
  const exports = {};
  vm.runInNewContext(compile('app/api/funnel/route.ts'), {
    exports,
    Response,
    URL,
    TextDecoder,
    require(name) {
      if (name === '@/lib/funnel-events') return events;
      if (name === '@/lib/inquiry-db')
        return { inquiryDatabase: () => supabaseOverSqlite(db) };
      throw Error(name);
    },
  });
  const send = (body, headers = {}) =>
    exports.POST(
      new Request('https://example.test/api/funnel', {
        method: 'POST',
        headers: {
          origin: 'https://example.test',
          'content-type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
      }),
    );
  const payload = { event: 'form_open', intent: 'scan' };
  assert.equal((await send(payload)).status, 204);
  assert.equal((await send(payload)).status, 204);
  const rows = db.prepare('SELECT * FROM site_funnel_counts').all();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].count, 2);
  assert.deepEqual(Object.keys(rows[0]).sort(), [
    'count',
    'day',
    'event',
    'intent',
  ]);
  for (const bad of [
    { ...payload, email: 'private@example.com' },
    { event: 'page_view', intent: 'scan' },
    { event: 'booking_confirmed', intent: 'scan' },
    [],
    null,
  ])
    assert.equal((await send(bad)).status, 400);
  assert.equal(
    (await send(payload, { origin: 'https://elsewhere.test' })).status,
    403,
  );
  assert.equal(
    (await send(payload, { 'content-type': 'text/plain' })).status,
    415,
  );
  assert.equal(
    (await send({ ...payload, extra: 'x'.repeat(300) })).status,
    413,
  );
  assert.equal((await send(payload, { 'sec-gpc': '1' })).status, 204);
  assert.equal((await send(payload, { dnt: '1' })).status, 204);
  assert.equal(db.prepare('SELECT count FROM site_funnel_counts').get().count, 2);
});
test('client counts once per page and intent and respects privacy signals', () => {
  const calls = [];
  const exports = {};
  const navigator = { doNotTrack: '0', globalPrivacyControl: false };
  const window = { location: { hostname: 'example.test' } };
  vm.runInNewContext(compile('lib/funnel-client.ts'), {
    exports,
    navigator,
    window,
    fetch: async (...args) => calls.push(args),
    require: () => events,
  });
  const count = exports.countFunnelEvent;
  count('form_open', 'scan');
  count('form_open', 'scan');
  count('form_open', 'conversation');
  assert.equal(calls.length, 2);
  assert.deepEqual(JSON.parse(calls[0][1].body), {
    event: 'form_open',
    intent: 'scan',
  });
  assert.equal(calls[0][1].credentials, 'omit');
  assert.equal(calls[0][1].referrerPolicy, 'no-referrer');
  navigator.globalPrivacyControl = true;
  count('project_completed', 'scan');
  assert.equal(calls.length, 2);
  navigator.globalPrivacyControl = false;
  navigator.doNotTrack = '1';
  count('project_completed', 'scan');
  assert.equal(calls.length, 2);
  navigator.doNotTrack = '0';
  window.location.hostname = 'localhost';
  count('project_completed', 'scan');
  assert.equal(calls.length, 2);
});
test('measurement failure does not throw into booking UI', () => {
  const exports = {};
  vm.runInNewContext(compile('lib/funnel-client.ts'), {
    exports,
    navigator: {},
    window: { location: { hostname: 'example.test' } },
    fetch() {
      throw Error('offline');
    },
    require: () => events,
  });
  assert.doesNotThrow(() => exports.countFunnelEvent('form_open', 'scan'));
});
