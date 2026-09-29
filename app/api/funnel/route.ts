import { inquiryDatabase } from '@/lib/inquiry-db';
import { validFunnelEvent } from '@/lib/funnel-events';

const reply = (status: number) =>
  new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return reply(403);
  if (
    request.headers.get('dnt') === '1' ||
    request.headers.get('sec-gpc') === '1'
  )
    return reply(204);
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return reply(415);
  if (Number(request.headers.get('content-length')) > 256) return reply(413);
  let data: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400);
    let body = '',
      bytes = 0;
    const decoder = new TextDecoder();
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 256) {
        await reader.cancel();
        return reply(413);
      }
      body += decoder.decode(chunk.value, { stream: true });
    }
    data = JSON.parse(body + decoder.decode());
  } catch {
    return reply(400);
  }
  if (!validFunnelEvent(data)) return reply(400);
  try {
    const db = inquiryDatabase();
    // site_funnel_count() increments atomically and prunes rows older than 90 days.
    const { error } = await db.rpc('site_funnel_count', {
      p_day: new Date().toISOString().slice(0, 10),
      p_intent: data.intent,
      p_event: data.event,
    });
    if (error) throw error;
    return reply(204);
  } catch {
    return reply(503);
  }
}
