// Only trust known messages from the specific embedded Calendly window.
// Do not inspect, store or log the provider's personal booking payload.
export function calendarMessageType(
  message: { origin: string; source: unknown; data: unknown },
  frameWindow: unknown,
) {
  if (
    !frameWindow ||
    message.origin !== 'https://calendly.com' ||
    message.source !== frameWindow ||
    !message.data ||
    typeof message.data !== 'object'
  )
    return null;
  const event = (message.data as { event?: unknown }).event;
  if (event === 'calendly.event_scheduled') return 'scheduled';
  if (
    event === 'calendly.profile_page_viewed' ||
    event === 'calendly.event_type_viewed' ||
    event === 'calendly.date_and_time_selected'
  )
    return 'ready';
  return null;
}

// The event URL is returned only after a qualified inquiry has been saved.
export function calendarEmbedOptions(calendarUrl: string) {
  const url = new URL(calendarUrl);
  if (url.origin !== 'https://calendly.com' || url.username || url.password) {
    throw new Error('Unsupported booking provider.');
  }
  const prefill = {
    name: url.searchParams.get('name') ?? '',
    email: url.searchParams.get('email') ?? '',
  };
  url.searchParams.delete('name');
  url.searchParams.delete('email');
  const utm = {
    utmSource: url.searchParams.get('utm_source') ?? '',
    utmMedium: url.searchParams.get('utm_medium') ?? '',
    utmCampaign: url.searchParams.get('utm_campaign') ?? '',
    utmContent: url.searchParams.get('utm_content') ?? '',
  };
  for (const key of [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
  ]) {
    url.searchParams.delete(key);
  }
  return { url: url.toString(), prefill, utm };
}
