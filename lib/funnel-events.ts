export const funnelEvents = [
  'page_view',
  'form_open',
  'project_completed',
  'calendar_offered',
  'booking_reported',
  'calendar_external',
] as const;
export type FunnelEvent = (typeof funnelEvents)[number];
export type FunnelIntent = 'site' | 'scan' | 'conversation';

export function validFunnelEvent(
  value: unknown,
): value is { event: FunnelEvent; intent: FunnelIntent } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const data = value as Record<string, unknown>;
  if (
    Object.keys(data).length !== 2 ||
    !funnelEvents.includes(data.event as FunnelEvent)
  )
    return false;
  return data.event === 'page_view'
    ? data.intent === 'site'
    : ['scan', 'conversation'].includes(data.intent as string);
}
