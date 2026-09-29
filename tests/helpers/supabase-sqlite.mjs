// In-memory stand-in for the server-side Supabase client used by the API
// routes. Backs the subset of supabase-js the routes call (from/select/eq/gt/
// maybeSingle/upsert and rpc) with real SQL in node:sqlite, so tests exercise
// actual query semantics without a network or real prospect records.
import { DatabaseSync } from 'node:sqlite';

export const SITE_SCHEMA = `
CREATE TABLE site_inquiries (
  id TEXT PRIMARY KEY NOT NULL,
  submitted_at TEXT NOT NULL,
  inquiry_intent TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  website TEXT NOT NULL,
  role TEXT NOT NULL,
  decision_role TEXT NOT NULL,
  korea_goal TEXT NOT NULL,
  why_now TEXT NOT NULL,
  start_timing TEXT NOT NULL,
  total_funding_usd TEXT NOT NULL,
  annual_revenue_usd TEXT NOT NULL,
  business_capacity TEXT,
  monthly_budget_readiness TEXT NOT NULL,
  qualification_status TEXT NOT NULL,
  review_reasons TEXT NOT NULL
);
CREATE INDEX site_inquiries_email_submitted_idx ON site_inquiries (email, submitted_at);
CREATE TABLE site_funnel_counts (
  day TEXT NOT NULL,
  intent TEXT NOT NULL,
  event TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, intent, event)
);`;

export function openSiteDatabase(t) {
  const db = new DatabaseSync(':memory:');
  db.exec(SITE_SCHEMA);
  if (t) t.after(() => db.close());
  return db;
}

export function supabaseOverSqlite(db) {
  function from(table) {
    const q = { cols: '*', filters: [], count: null, head: false };
    const run = () => {
      const where = q.filters.length
        ? ' WHERE ' + q.filters.map(([c, op]) => `${c} ${op} ?`).join(' AND ')
        : '';
      const args = q.filters.map(([, , v]) => v);
      if (q.op === 'upsert') {
        const keys = Object.keys(q.row);
        const verb = q.opts?.ignoreDuplicates ? 'INSERT OR IGNORE' : 'INSERT OR REPLACE';
        db.prepare(
          `${verb} INTO ${table} (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`,
        ).run(...keys.map((k) => q.row[k] ?? null));
        return { data: null, error: null };
      }
      if (q.head && q.count) {
        const { c } = db.prepare(`SELECT count(*) AS c FROM ${table}${where}`).get(...args);
        return { data: null, count: c, error: null };
      }
      const rows = db.prepare(`SELECT ${q.cols} FROM ${table}${where}`).all(...args);
      if (q.single) {
        if (rows.length > 1)
          return { data: null, error: { code: 'PGRST116', message: 'multiple rows' } };
        return { data: rows[0] ?? null, error: null };
      }
      return { data: rows, error: null, count: q.count ? rows.length : null };
    };
    const b = {
      select(cols = '*', opts = {}) {
        q.op = 'select';
        q.cols = cols;
        q.count = opts.count ?? null;
        q.head = !!opts.head;
        return b;
      },
      eq(c, v) {
        q.filters.push([c, '=', v]);
        return b;
      },
      gt(c, v) {
        q.filters.push([c, '>', v]);
        return b;
      },
      maybeSingle() {
        q.single = true;
        return b;
      },
      upsert(row, opts = {}) {
        q.op = 'upsert';
        q.row = row;
        q.opts = opts;
        return b;
      },
      then(resolve, reject) {
        return Promise.resolve().then(run).then(resolve, reject);
      },
    };
    return b;
  }
  async function rpc(name, args) {
    if (name !== 'site_funnel_count')
      return { data: null, error: { message: `unknown function ${name}` } };
    const cutoff = new Date(Date.now() - 89 * 86400000).toISOString().slice(0, 10);
    db.prepare('DELETE FROM site_funnel_counts WHERE day < ?').run(cutoff);
    db.prepare(
      `INSERT INTO site_funnel_counts (day, intent, event, count) VALUES (?, ?, ?, 1)
       ON CONFLICT(day, intent, event) DO UPDATE SET count = min(site_funnel_counts.count + 1, 100000)`,
    ).run(args.p_day, args.p_intent, args.p_event);
    return { data: null, error: null };
  }
  return { from, rpc };
}
