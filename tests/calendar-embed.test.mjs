import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  calendarEmbedOptions,
  calendarMessageType,
} from '../lib/calendar-embed.ts';

test('advanced embed receives saved identity and attribution separately from the URL', () => {
  const options = calendarEmbedOptions(
    'https://calendly.com/example/demo?name=Test+Founder&email=test%40example.com&utm_source=holohive&utm_medium=qualified_inquiry&utm_campaign=scan&utm_content=synthetic-id',
  );
  assert.equal(options.url, 'https://calendly.com/example/demo');
  assert.deepEqual(options.prefill, {
    name: 'Test Founder',
    email: 'test@example.com',
  });
  assert.deepEqual(options.utm, {
    utmSource: 'holohive',
    utmMedium: 'qualified_inquiry',
    utmCampaign: 'scan',
    utmContent: 'synthetic-id',
  });
});

test('embed rejects other hosts, credentials and non-HTTPS providers', () => {
  for (const url of [
    'https://example.com/demo',
    'https://calendly.com.evil.test/demo',
    'http://calendly.com/demo',
    'https://user:password@calendly.com/demo',
  ]) {
    assert.throws(() => calendarEmbedOptions(url));
  }
});

test('only known events from the active Calendly frame count as ready or booked', () => {
  const frame = {};
  const message = {
    origin: 'https://calendly.com',
    source: frame,
    data: { event: 'calendly.event_scheduled' },
  };
  assert.equal(calendarMessageType(message, frame), 'scheduled');
  for (const event of [
    'calendly.profile_page_viewed',
    'calendly.event_type_viewed',
    'calendly.date_and_time_selected',
  ]) {
    assert.equal(
      calendarMessageType({ ...message, data: { event } }, frame),
      'ready',
    );
  }
  for (const overrides of [
    { origin: 'https://example.com' },
    { origin: 'https://calendly.com.evil.test' },
    { source: {} },
    { source: null },
    { data: null },
    { data: 'calendly.event_scheduled' },
    { data: { event: 'calendly.page_height' } },
    { data: { event: 'calendly.unknown' } },
  ])
    assert.equal(
      calendarMessageType({ ...message, ...overrides }, frame),
      null,
    );
  assert.equal(calendarMessageType(message, null), null);
});

test('booking is immediately rendered only for a qualified saved result', () => {
  const dialog = readFileSync(
    new URL('../components/qualification-dialog.tsx', import.meta.url),
    'utf8',
  );
  const embed = readFileSync(
    new URL('../components/calendar-booking.tsx', import.meta.url),
    'utf8',
  );
  assert.match(
    dialog,
    /const calendarOpen =\s*outcome\?\.status === 'calendar_ready' && !!outcome\.calendarUrl/,
  );
  assert.match(
    dialog,
    /calendarOpen &&\s*!bookingDismissed &&\s*outcome\.status === 'calendar_ready' &&\s*outcome\.calendarUrl && \(\s*<CalendarBooking/,
  );
  assert.doesNotMatch(
    dialog,
    /setCalendarOpen|qualificationSteps|setStep\('booking'\)|Choose a time<|<iframe/,
  );
  assert.match(embed, /calendly\.initInlineWidget/);
  assert.match(embed, /frame\.title = title/);
  assert.match(embed, /observer\.disconnect\(\)/);
  assert.match(embed, /element\.replaceChildren\(\)/);
  assert.ok(
    dialog.indexOf('hh-inquiry-consent') < dialog.indexOf('type="submit"'),
  );
});
