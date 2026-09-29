import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

// Unit-test component event handlers without starting another browser.
const source = readFileSync(
  new URL('../components/lore-testimonial.tsx', import.meta.url),
  'utf8',
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
  },
}).outputText;

test('video caption adds no duplicate full-video link', () => {
  const caption = source.slice(
    source.indexOf('<figcaption'),
    source.indexOf('</figcaption>'),
  );
  assert.match(caption, /Lore · Client story/);
  assert.doesNotMatch(caption, /href=|<Link|<a\b|Open full client video/);
  assert.match(caption, /English captions/);
  assert.doesNotMatch(caption, /verified|independent/);
});
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
function harness(play = () => Promise.resolve()) {
  const hooks = [];
  let cursor = 0;
  const document = { activeElement: null };
  const player = {
    error: null,
    calls: 0,
    loads: 0,
    play() {
      this.calls++;
      return play();
    },
    load() {
      this.loads++;
      this.error = null;
    },
    focus() {
      document.activeElement = this;
    },
  };
  const jsx = (type, props) => ({ type, props });
  const react = {
    useRef(initial) {
      const i = cursor++;
      return (hooks[i] ??= { current: initial });
    },
    useState(initial) {
      const i = cursor++;
      hooks[i] ??= { value: initial };
      return [
        hooks[i].value,
        (value) => {
          hooks[i].value = value;
        },
      ];
    },
  };
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    document,
    require(name) {
      if (name === 'react') return react;
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
      if (name === 'next/link') return { __esModule: true, default: 'link' };
      if (name === 'lucide-react')
        return { Play: 'play-icon', ArrowUpRight: 'arrow-icon' };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  let tree;
  function find(predicate, node = tree) {
    if (!node || typeof node !== 'object') return undefined;
    if (predicate(node)) return node;
    for (const child of [node.props?.children].flat(Infinity)) {
      if (!child || typeof child !== 'object') continue;
      const result = find(predicate, child);
      if (result) return result;
    }
  }
  function render() {
    cursor = 0;
    tree = exports.LoreTestimonial();
    find((e) => e.type === 'video').props.ref.current = player;
    return tree;
  }
  render();
  return { render, find, player, document };
}

test('uses the selected cover without preloading or changing the video source', () => {
  const h = harness();
  const props = h.find((e) => e.type === 'video').props;
  assert.equal(props.poster, '/media/lore-testimonial-smile.jpg');
  assert.equal(props.src, '/media/lore-testimonial.mp4');
  assert.equal(props.preload, 'none');
  assert.equal(props.controls, false);
  assert.ok(
    readFileSync(
      new URL('../public/media/lore-testimonial-smile.jpg', import.meta.url),
    ).length > 0,
  );
});

test('moves keyboard focus before removing the play button, never after loading', async () => {
  const load = deferred(),
    h = harness(() => load.promise);
  const button = h.find((e) => e.type === 'button');
  h.document.activeElement = button;
  const result = button.props.onClick({ currentTarget: button });
  assert.equal(h.document.activeElement, h.player);
  h.render();
  assert.equal(h.find((e) => e.type === 'video').props.controls, true);
  const elsewhere = {};
  h.document.activeElement = elsewhere;
  load.resolve();
  await result;
  assert.equal(h.document.activeElement, elsewhere);
});

test('does not steal focus when activation did not focus the trigger', async () => {
  const h = harness(),
    elsewhere = {};
  h.document.activeElement = elsewhere;
  const button = h.find((e) => e.type === 'button');
  await button.props.onClick({ currentTarget: button });
  assert.equal(h.document.activeElement, elsewhere);
});

test('failed playback announces a fallback and supports reloading then retrying', async () => {
  let broken = true;
  const h = harness(() =>
    broken ? Promise.reject(new Error('media failed')) : Promise.resolve(),
  );
  let button = h.find((e) => e.type === 'button');
  h.document.activeElement = button;
  await button.props.onClick({ currentTarget: button });
  h.render();
  assert.match(
    h.find((e) => e.props.role === 'status').props.children,
    /could not play/,
  );
  assert.ok(
    h.find((e) => e.type === 'link' && e.props.children?.[0] === 'Open video '),
  );
  button = h.find(
    (e) => e.type === 'button' && e.props.children === 'Try again',
  );
  assert.ok(button);
  h.player.error = { code: 2 };
  broken = false;
  h.document.activeElement = button;
  await button.props.onClick({ currentTarget: button });
  h.render();
  assert.equal(h.player.loads, 1);
  assert.equal(h.find((e) => e.props.role === 'status').props.children, '');
  assert.equal(h.document.activeElement, h.player);
});

test('native media errors show the fallback without moving focus', () => {
  const h = harness(),
    elsewhere = {};
  h.document.activeElement = elsewhere;
  h.find((e) => e.type === 'video').props.onError();
  h.render();
  assert.match(
    h.find((e) => e.props.role === 'status').props.children,
    /could not play/,
  );
  assert.equal(h.document.activeElement, elsewhere);
});

test('ignores a stale rejected play attempt after a successful retry', async () => {
  const first = deferred();
  let calls = 0;
  const h = harness(() => (++calls === 1 ? first.promise : Promise.resolve()));
  const button = h.find((e) => e.type === 'button');
  const initial = button.props.onClick({ currentTarget: button });
  await button.props.onClick({ currentTarget: button });
  assert.equal(h.player.calls, 1);
  h.find((e) => e.type === 'video').props.onError();
  h.render();
  const retry = h.find(
    (e) => e.type === 'button' && e.props.children === 'Try again',
  );
  await retry.props.onClick({ currentTarget: retry });
  first.reject(new Error('old request aborted'));
  await initial;
  h.render();
  assert.equal(h.find((e) => e.props.role === 'status').props.children, '');
});
