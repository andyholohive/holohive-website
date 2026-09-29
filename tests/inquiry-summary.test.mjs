import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

test('private inquiry summary reports eligibility, not bookings, without personal fields', () => {
  const db = new DatabaseSync(':memory:');
  try {
    db.exec(`CREATE TABLE site_inquiries (submitted_at TEXT, inquiry_intent TEXT, qualification_status TEXT);
      INSERT INTO site_inquiries VALUES
        ('2026-09-11T12:00:00Z', 'scan', 'calendar_ready'),
        ('2026-09-11T13:00:00Z', 'scan', 'review_needed'),
        ('2026-09-11T13:10:00Z', 'scan', 'not_eligible'),
        ('2026-09-11T13:20:00Z', 'scan', 'eligibility_unconfirmed'),
        ('2026-09-11T14:00:00Z', 'conversation', 'calendar_ready'),
        ('2026-09-10T15:00:00Z', NULL, 'review_needed');`);
    const query = readFileSync(
      new URL('../scripts/inquiry-quality-summary.sql', import.meta.url),
      'utf8',
    );
    const rows = db
      .prepare(query)
      .all()
      .map((row) => ({ ...row }));
    const scan = rows.find((row) => row.inquiry_intent === 'scan');
    assert.equal(scan.submitted_inquiries, 4);
    assert.equal(scan.calendar_eligible_inquiries, 1);
    assert.equal(scan.review_needed_inquiries, 1);
    assert.equal(scan.not_eligible_inquiries, 1);
    assert.equal(scan.eligibility_unconfirmed_inquiries, 1);
    assert.equal(scan.calendar_eligible_percent, 25);
    assert.equal(
      rows.find((row) => row.inquiry_intent === 'conversation')
        .calendar_eligible_percent,
      100,
    );
    assert.equal(
      rows.find((row) => row.inquiry_intent === 'unspecified')
        .calendar_eligible_percent,
      0,
    );
    for (const row of rows) {
      assert.deepEqual(Object.keys(row), [
        'submitted_day_utc',
        'inquiry_intent',
        'submitted_inquiries',
        'calendar_eligible_inquiries',
        'review_needed_inquiries',
        'not_eligible_inquiries',
        'eligibility_unconfirmed_inquiries',
        'calendar_eligible_percent',
      ]);
    }
    assert.equal(
      db.prepare('SELECT count(*) AS count FROM site_inquiries').get().count,
      6,
    );
  } finally {
    db.close();
  }
});
