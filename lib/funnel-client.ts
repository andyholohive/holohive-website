import {
  validFunnelEvent,
  type FunnelEvent,
  type FunnelIntent,
} from './funnel-events';

// Deduplicate only within this page load. No visitor ID or browser storage.
const sent = new Set<string>();
export function countFunnelEvent(event: FunnelEvent, intent: FunnelIntent) {
  if (typeof window === 'undefined' || !validFunnelEvent({ event, intent }))
    return;
  if (['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname))
    return;
  if (
    navigator.doNotTrack === '1' ||
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl
  )
    return;
  const key = `${event}:${intent}`;
  if (sent.has(key)) return;
  sent.add(key);
  // Never let measurement block a form, retry a submission or carry its answers.
  try {
    void fetch('/api/funnel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, intent }),
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* Measurement is best-effort and never blocks the visitor. */
  }
}
