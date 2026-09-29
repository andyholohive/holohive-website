// Component behavior with a synthetic provider. No browser, network or booking.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as calendar from '../lib/calendar-embed.ts';

const compiled = ts.transpileModule(
  readFileSync(
    new URL('../components/calendar-booking.tsx', import.meta.url),
    'utf8',
  ),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  },
).outputText;

function harness() {
  const hooks = [],
    timers = new Map(),
    listeners = new Map();
  let cursor = 0,
    pending = [],
    tree,
    frame,
    observer,
    scheduled = 0,
    nextTimer = 0;
  let cleared = false,
    disconnected = false;
  const element = {
    querySelector: () => frame,
    replaceChildren: () => {
      cleared = true;
      frame = undefined;
    },
  };
  const jsx = (type, props) => ({ type, props });
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    window: {
      Calendly: {
        initInlineWidget() {
          frame = { contentWindow: {} };
          observer();
        },
      },
      addEventListener: (type, fn) => listeners.set(type, fn),
      removeEventListener: (type) => listeners.delete(type),
    },
    MutationObserver: class {
      constructor(fn) {
        observer = fn;
      }
      observe() {}
      disconnect() {
        disconnected = true;
      }
    },
    setTimeout: (fn) => {
      const id = ++nextTimer;
      timers.set(id, fn);
      return id;
    },
    clearTimeout: (id) => timers.delete(id),
    require(name) {
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
      if (name === '@/lib/calendar-embed') return calendar;
      if (name === 'next/script')
        return { __esModule: true, default: 'Script' };
      if (name === 'react')
        return {
          useRef(value) {
            const i = cursor++;
            return (hooks[i] ??= { current: value });
          },
          useState(value) {
            const i = cursor++;
            hooks[i] ??= { value };
            return [
              hooks[i].value,
              (next) => {
                hooks[i].value =
                  typeof next === 'function' ? next(hooks[i].value) : next;
              },
            ];
          },
          useEffect(fn, deps) {
            const i = cursor++;
            if (!hooks[i] || deps.some((d, j) => d !== hooks[i].deps[j])) {
              const cleanup = hooks[i]?.cleanup;
              hooks[i] = { deps };
              pending.push(() => {
                cleanup?.();
                hooks[i].cleanup = fn();
              });
            }
          },
        };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  function nodes(node = tree) {
    if (!node || typeof node !== 'object') return [];
    return [
      node,
      ...[node.props?.children]
        .flat(Infinity)
        .filter((child) => child && typeof child === 'object')
        .flatMap((child) => nodes(child)),
    ];
  }
  const props = {
    calendarUrl: 'https://calendly.com/example/demo',
    title: 'Book a test call',
    onScheduled: () => {
      scheduled++;
    },
  };
  function render() {
    cursor = 0;
    pending = [];
    tree = exports.CalendarBooking(props);
    for (const node of nodes())
      if (node.props?.ref) node.props.ref.current = element;
    pending.forEach((fn) => fn());
  }
  render();
  render();
  return {
    get status() {
      return nodes().find((n) => n.type === 'p')?.props.children;
    },
    get scheduled() {
      return scheduled;
    },
    get frame() {
      return frame;
    },
    get cleaned() {
      return cleared && disconnected && !listeners.size && !timers.size;
    },
    readyScript() {
      nodes()
        .find((n) => n.type === 'Script')
        .props.onReady();
      render();
      render();
    },
    failScript() {
      nodes()
        .find((n) => n.type === 'Script')
        .props.onError();
      render();
    },
    timeout() {
      for (const fn of timers.values()) fn();
      timers.clear();
      render();
    },
    message(event, overrides = {}) {
      listeners.get('message')?.({
        origin: 'https://calendly.com',
        source: frame?.contentWindow,
        data: { event },
        ...overrides,
      });
      render();
    },
    unmount() {
      hooks.forEach((h) => h?.cleanup?.());
    },
  };
}

test('an inserted but blank iframe remains loading, times out, and can recover', () => {
  const h = harness();
  h.readyScript();
  assert.equal(h.frame.title, 'Book a test call');
  assert.match(h.status, /Loading calendar/);
  h.timeout();
  assert.match(h.status, /Calendar not appearing/);
  h.message('calendly.event_type_viewed');
  assert.equal(h.status, undefined);
  assert.equal(h.scheduled, 0);
  h.unmount();
});

test('script failure exposes the fallback rather than claiming readiness', () => {
  const h = harness();
  h.failScript();
  assert.match(h.status, /Calendar not appearing/);
  assert.equal(h.scheduled, 0);
  h.unmount();
});

test('booking is reported once and only by the embedded provider', () => {
  const h = harness();
  h.readyScript();
  h.message('calendly.event_scheduled', { origin: 'https://example.com' });
  h.message('calendly.event_scheduled', { source: {} });
  h.message('calendly.page_height');
  assert.match(h.status, /Loading calendar/);
  assert.equal(h.scheduled, 0);
  h.message('calendly.date_and_time_selected');
  assert.equal(h.status, undefined);
  assert.equal(h.scheduled, 0);
  h.timeout();
  assert.equal(h.status, undefined);
  h.message('calendly.event_scheduled');
  h.message('calendly.event_scheduled');
  assert.equal(h.scheduled, 1);
  h.unmount();
  assert.ok(h.cleaned);
});

test('unmount removes provider messages, observation, iframe and timeout', () => {
  const h = harness();
  h.readyScript();
  h.unmount();
  assert.ok(h.cleaned);
  h.message('calendly.event_scheduled');
  assert.equal(h.scheduled, 0);
});
