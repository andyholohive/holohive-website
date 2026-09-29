import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as qualification from '../lib/qualification.ts';

const source = readFileSync(
  new URL('../components/qualification-dialog.tsx', import.meta.url),
  'utf8',
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
  },
}).outputText;
const answers = {
  name: 'Test Founder',
  email: 'test@example.com',
  website: 'example.com',
  need: 'Grow product adoption',
  goal: 'adoption',
  capacity: 'revenue_supported',
  budget: 'available',
};

function harness(response, websiteEntry = null) {
  const hooks = [];
  let cursor = 0,
    effects = [],
    tree,
    submitted;
  let open = true;
  const focused = [];
  const jsx = (type, props) => ({ type, props });
  const exports = {};
  let nextId = 0;
  vm.runInNewContext(compiled, {
    exports,
    crypto: { randomUUID: () => `synthetic-id-${++nextId}` },
    AbortController,
    setTimeout,
    clearTimeout,
    requestAnimationFrame: (fn) => fn(),
    document: { getElementById: (id) => ({ focus: () => focused.push(id) }) },
    fetch: async (_url, request) => {
      submitted = JSON.parse(request.body);
      return { ok: !response.error, json: async () => response };
    },
    require(name) {
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
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
            if (!hooks[i] || deps.some((v, j) => v !== hooks[i].deps[j]))
              effects.push(fn);
            hooks[i] = { deps };
          },
        };
      if (name === '@/lib/qualification') return qualification;
      if (name === '@/lib/funnel-client') return { countFunnelEvent() {} };
      if (name === 'next/link') return { __esModule: true, default: 'a' };
      return new Proxy({}, { get: (_target, key) => key });
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
  function render() {
    cursor = 0;
    effects = [];
    tree = exports.QualificationDialog({
      open,
      onOpenChange() {},
      intent: 'scan',
      websiteEntry,
    });
    for (const node of nodes())
      if (node.props?.ref)
        node.props.ref.current = {
          focus() {},
          value: '',
          closest: () => ({ scrollTo() {} }),
        };
    effects.forEach((fn) => fn());
  }
  const find = (type) => nodes().find((n) => n.type === type);
  function fill(values = answers) {
    for (const [name, value] of Object.entries(values)) {
      // Move through the real first-screen handler before filling fit answers.
      if (
        ['capacity', 'budget'].includes(name) &&
        !nodes().some((n) => n.props?.name === name)
      ) {
        find('form').props.onSubmit({ preventDefault() {} });
        render();
      }
      const field = nodes().find((n) => n.props?.name === name);
      assert.ok(field, name);
      if (field.props.onValueChange) field.props.onValueChange(value);
      else field.props.onChange({ target: { value } });
      render();
    }
  }
  render();
  if (websiteEntry) render();
  return {
    nodes,
    find,
    fill,
    render,
    enterWebsite(website) {
      websiteEntry = { website };
      render();
      render();
    },
    setOpen(value) {
      open = value;
      render();
      render();
    },
    focused,
    back() {
      nodes()
        .find((n) => n.props?.className === 'hh-text-link hh-inquiry-back')
        .props.onClick();
      render();
    },
    get submitted() {
      return submitted;
    },
    async submit() {
      await find('form').props.onSubmit({ preventDefault() {} });
      render();
    },
  };
}

test('inline website is confirmed, editable and retained through close and qualified submission', async () => {
  const h = harness(
    {
      status: 'calendar_ready',
      reference: 'synthetic-id',
      intent: 'scan',
      calendarUrl: 'https://calendly.com/example/demo',
    },
    { website: 'example.com' },
  );
  assert.equal(
    h.nodes().some((n) => n.props?.name === 'website'),
    false,
  );
  assert.ok(
    h.nodes().find((n) => n.props?.className === 'hh-inquiry-project-summary'),
  );
  h.fill({ name: answers.name, email: answers.email, goal: answers.goal });
  h.setOpen(false);
  h.setOpen(true);
  assert.equal(
    h.nodes().find((n) => n.props?.name === 'name').props.value,
    answers.name,
  );
  assert.equal(
    h.nodes().some((n) => n.props?.name === 'website'),
    false,
  );
  const summary = h
    .nodes()
    .find((n) => n.props?.className === 'hh-inquiry-project-summary');
  summary.props.children[1].props.onClick();
  h.render();
  assert.equal(
    h.nodes().find((n) => n.props?.name === 'website').props.value,
    'https://example.com/',
  );
  h.fill({
    website: 'changed.example',
    capacity: 'revenue_supported',
    budget: 'available',
  });
  await h.submit();
  assert.equal(h.submitted.answers.website, 'https://changed.example/');
  assert.ok(h.find('CalendarBooking'));
  h.enterWebsite('another.example');
  assert.equal(h.find('CalendarBooking'), undefined);
  assert.equal(
    h.nodes().find((n) => n.props?.name === 'name').props.value,
    answers.name,
  );
});

test('invalid inline website cannot suppress the project website question', () => {
  const h = harness({}, { website: 'not-a-domain' });
  assert.ok(h.nodes().find((n) => n.props?.name === 'website'));
  assert.equal(
    h.nodes().some((n) => n.props?.className === 'hh-inquiry-project-summary'),
    false,
  );
});

test('two short screens collect six required answers, then immediately show the qualified calendar', async () => {
  const h = harness({
    status: 'calendar_ready',
    reference: 'synthetic-id',
    intent: 'scan',
    calendarUrl: 'https://calendly.com/example/demo',
  });
  assert.ok(h.find('ScanSamplePreview'));
  assert.equal(
    h.nodes().filter((n) => n.props?.name && n.props.name !== 'companyFax')
      .length,
    5, // Four required project/contact answers, plus collapsed optional context.
  );
  h.fill();
  assert.equal(h.find('ScanSamplePreview'), undefined);
  assert.equal(h.submitted, undefined); // No partial lead submission at Continue.
  assert.deepEqual(
    h
      .nodes()
      .filter((n) => n.props?.name && n.props.name !== 'companyFax')
      .map((n) => n.props.name),
    ['capacity', 'budget'],
  );
  await h.submit();
  assert.equal(h.submitted.intent, 'scan');
  assert.equal(h.submitted.answers.company, '');
  assert.equal(h.submitted.answers.capacity, 'revenue_supported');
  assert.equal(h.submitted.answers.goal, 'adoption');
  assert.equal(h.submitted.answers.authority, '');
  assert.equal(h.submitted.answers.timing, '');
  assert.equal(h.submitted.answers.need, answers.need);
  assert.ok(h.find('CalendarBooking'));
  assert.equal(h.find('ScanSamplePreview'), undefined);
  assert.equal(h.find('form'), undefined);
});

test('unchanged retry keeps its ID; edited answers after a failed save use a new ID', async () => {
  const h = harness({ error: 'Could not save.' });
  h.fill();
  await h.submit();
  const original = h.submitted.id;
  await h.submit();
  assert.equal(h.submitted.id, original);
  h.fill({ capacity: 'not_yet' });
  await h.submit();
  assert.notEqual(h.submitted.id, original);
  assert.equal(h.submitted.answers.capacity, 'not_yet');
});

for (const status of ['not_eligible', 'eligibility_unconfirmed'])
  test(`${status} shows a guide alternative, never a calendar or a review promise`, async () => {
    const h = harness({
      status,
      reasons:
        status === 'not_eligible' ? ['budget'] : ['capacity_unconfirmed'],
      reference: 'synthetic-id',
      intent: 'scan',
    });
    h.fill({ ...answers, budget: 'not_yet' });
    await h.submit();
    assert.equal(h.find('CalendarBooking'), undefined);
    assert.equal(h.find('form'), undefined);
    assert.ok(h.nodes().find((n) => n.props?.href === '/korea-guide'));
    assert.equal(
      h.nodes().some((n) => n.props?.href?.includes('calendly')),
      false,
    );
    assert.doesNotMatch(
      JSON.stringify(h.nodes()),
      /manually review|we’ll review|reach out/i,
    );
  });

test('save failure preserves form answers without a booking fallback', async () => {
  const h = harness({ error: 'Could not save.' });
  h.fill();
  await h.submit();
  assert.ok(h.find('form'));
  assert.equal(h.find('CalendarBooking'), undefined);
  h.back();
  assert.equal(
    h.nodes().find((n) => n.props?.name === 'email').props.value,
    answers.email,
  );
});

test('errors stay on their screen, in displayed order; optional context is not a gate', async () => {
  const h = harness({
    status: 'not_eligible',
    reference: 'synthetic-id',
    intent: 'scan',
  });
  assert.deepEqual(
    h
      .nodes()
      .filter((n) => n.props?.name && n.props.name !== 'companyFax')
      .map((n) => n.props.name),
    ['website', 'goal', 'name', 'email', 'need'],
  );
  await h.submit();
  assert.equal(h.focused.at(-1), 'inquiry-website');
  h.fill({
    website: answers.website,
    name: answers.name,
    email: answers.email,
    need: '   ',
  });
  assert.ok(h.find('textarea'));
  await h.submit();
  assert.equal(h.submitted, undefined);
  assert.equal(h.focused.at(-1), 'inquiry-goal');
  h.fill({ goal: 'other' });
  await h.submit();
  assert.equal(h.submitted, undefined);
  await h.submit();
  assert.equal(h.focused.at(-1), 'inquiry-capacity');
});

test('optional context does not silently select a goal on the new form', async () => {
  const h = harness({ error: 'unused' });
  h.fill({
    website: answers.website,
    name: answers.name,
    email: answers.email,
    need: 'Find partners',
  });
  await h.submit();
  assert.equal(h.submitted, undefined);
  assert.equal(h.focused.at(-1), 'inquiry-goal');
});

test('server project-field errors return to the project screen with answers preserved', async () => {
  const h = harness({
    error: 'Check your email.',
    errors: { email: 'Check this email.' },
  });
  h.fill();
  await h.submit();
  assert.equal(
    h.nodes().find((n) => n.props?.name === 'email').props.value,
    answers.email,
  );
  assert.equal(h.focused.at(-1), 'inquiry-email');
  assert.equal(h.find('CalendarBooking'), undefined);
});

for (const initialStatus of ['not_eligible', 'calendar_ready']) {
  test(`${initialStatus} can edit without losing answers or bypassing qualification`, async () => {
    const response = {
      status: initialStatus,
      reference: 'synthetic-id',
      intent: 'scan',
      ...(initialStatus === 'calendar_ready'
        ? { calendarUrl: 'https://calendly.com/example/demo' }
        : {}),
    };
    const h = harness(response);
    h.fill();
    await h.submit();
    const original = h.submitted.id;
    const edit = () => {
      h.nodes()
        .find((n) => n.type === 'button' && n.props.children === 'Edit answers')
        .props.onClick();
      h.render();
      assert.ok(h.find('form'));
      assert.equal(h.find('CalendarBooking'), undefined);
      assert.equal(
        h.nodes().find((n) => n.props?.name === 'budget').props.value,
        answers.budget,
      );
    };
    edit();
    await h.submit();
    assert.equal(h.submitted.id, original);
    edit();
    h.fill({
      capacity:
        initialStatus === 'calendar_ready' ? 'private' : 'raised_2m_12m',
    });
    response.status =
      initialStatus === 'calendar_ready'
        ? 'eligibility_unconfirmed'
        : 'calendar_ready';
    response.calendarUrl =
      response.status === 'calendar_ready'
        ? 'https://calendly.com/example/demo'
        : undefined;
    await h.submit();
    assert.notEqual(h.submitted.id, original);
    assert.equal(h.submitted.intent, 'scan');
    assert.equal(
      !!h.find('CalendarBooking'),
      response.status === 'calendar_ready',
    );
  });
}

test('pre-call guide and confirmation appear only after the embed reports a booking', async () => {
  const h = harness({
    status: 'calendar_ready',
    reference: 'synthetic-id',
    intent: 'scan',
    calendarUrl: 'https://calendly.com/example/demo',
  });
  h.fill();
  await h.submit();
  assert.notEqual(h.find('DialogTitle').props.children, 'Your call is booked.');
  assert.equal(
    h.nodes().find((n) => n.props?.href === '/korea-guide'),
    undefined,
  );
  h.find('CalendarBooking').props.onScheduled();
  h.render();
  assert.equal(h.find('DialogTitle').props.children, 'Your call is booked.');
  assert.ok(h.nodes().find((n) => n.props?.href === '/korea-guide'));
  assert.equal(
    h
      .nodes()
      .find((n) => n.type === 'button' && n.props.children === 'Edit answers'),
    undefined,
  );
  assert.ok(h.find('CalendarBooking')); // Keep the provider's confirmation visible.
  h.setOpen(false);
  h.setOpen(true);
  assert.equal(h.find('CalendarBooking'), undefined);
  assert.equal(h.find('DialogTitle').props.children, 'Your call is booked.');
  assert.doesNotMatch(
    h.find('DialogDescription').props.children,
    /details are below/,
  );
  assert.ok(h.nodes().find((n) => n.props?.href === '/korea-guide'));
});
