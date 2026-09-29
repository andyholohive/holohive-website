'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import {
  calendarEmbedOptions,
  calendarMessageType,
} from '@/lib/calendar-embed';

type CalendlyApi = {
  initInlineWidget: (
    options: ReturnType<typeof calendarEmbedOptions> & {
      parentElement: HTMLElement;
    },
  ) => void;
};

export function CalendarBooking({
  calendarUrl,
  title,
  onScheduled,
}: {
  calendarUrl: string;
  title: string;
  onScheduled?: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const scheduledCallback = useRef(onScheduled);

  useEffect(() => {
    scheduledCallback.current = onScheduled;
  }, [onScheduled]);

  useEffect(() => {
    if (!scriptReady || !container.current) return;
    const element = container.current;
    const calendly = (window as Window & { Calendly?: CalendlyApi }).Calendly;
    if (!calendly) {
      setState('error');
      return;
    }
    // Use the official advanced embed so invitees do not retype their details.
    // Plain iframe embeds do not support this prefill contract.
    const titleFrame = () => {
      const frame = element.querySelector('iframe');
      if (frame) {
        frame.title = title;
        frame.referrerPolicy = 'no-referrer';
      }
    };
    const observer = new MutationObserver(titleFrame);
    observer.observe(element, { childList: true, subtree: true });
    let scheduled = false;
    const receiveMessage = (message: MessageEvent) => {
      const event = calendarMessageType(
        message,
        element.querySelector('iframe')?.contentWindow,
      );
      if (!event) return;
      setState('ready');
      if (event === 'scheduled' && !scheduled) {
        scheduled = true;
        scheduledCallback.current?.();
      }
    };
    window.addEventListener('message', receiveMessage);
    try {
      calendly.initInlineWidget({
        ...calendarEmbedOptions(calendarUrl),
        parentElement: element,
      });
      titleFrame();
    } catch {
      setState('error');
    }
    return () => {
      observer.disconnect();
      window.removeEventListener('message', receiveMessage);
      element.replaceChildren();
    };
  }, [scriptReady, calendarUrl, title]);

  useEffect(() => {
    setState('loading');
    const timeout = setTimeout(
      () =>
        setState((previous) => (previous === 'loading' ? 'error' : previous)),
      12000,
    );
    return () => clearTimeout(timeout);
  }, [calendarUrl]);

  return (
    <div className="hh-booking-embed">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => setState('error')}
      />
      {state !== 'ready' && (
        <p className="hh-booking-status" aria-live="polite">
          {state === 'error'
            ? 'Calendar not appearing? Use the link above to finish booking.'
            : 'Loading calendar…'}
        </p>
      )}
      <div ref={container} className="hh-booking-frame" />
    </div>
  );
}
