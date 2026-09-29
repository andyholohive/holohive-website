import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const source = read('../components/process-evidence.tsx');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.CommonJS,
  },
}).outputText;
const loaded = { exports: {} };
new Function('require', 'module', 'exports', compiled)(
  require,
  loaded,
  loaded.exports,
);
const { ApproachDistinctions } = loaded.exports;

test('connected figures have unique caption associations across repeated instances', () => {
  const html = renderToStaticMarkup(
    React.createElement(
      React.Fragment,
      null,
      React.createElement(ApproachDistinctions),
      React.createElement(ApproachDistinctions),
    ),
  );
  const ids = [...html.matchAll(/<figcaption id="([^"]+)"/g)].map(
    ([, id]) => id,
  );
  assert.equal(ids.length, 2);
  assert.equal(new Set(ids).size, 2);
  for (const id of ids)
    assert.ok(html.includes('aria-labelledby="' + id + '"'));
});

test('illustrations have descriptions and do not introduce keyboard stops', () => {
  const html = renderToStaticMarkup(React.createElement(ApproachDistinctions));
  assert.equal((html.match(/<figure /g) ?? []).length, 1);
  assert.doesNotMatch(html, /role="img"/);
  const svgs = [...html.matchAll(/<svg\b([^>]*)>/g)];
  assert.equal(svgs.length, 9);
  for (const [, attrs] of svgs) {
    assert.match(attrs, /aria-hidden="true"/);
    assert.match(attrs, /focusable="false"/);
  }
  assert.doesNotMatch(html, /tabindex|role="tab|<button|<a /);
  assert.doesNotMatch(html, /<text\b/);
  assert.match(html, /Possible audiences, selected according to your goal/);
});

test('custom geometry frames the mechanism without replacing its readable labels', () => {
  const html = renderToStaticMarkup(React.createElement(ApproachDistinctions));
  assert.match(html, /class="hh-audience-orbit"/);
  assert.match(html, /class="hh-discussion-origin"/);
  assert.doesNotMatch(html, /hh-discussion-primary/);
  const formats = html.match(
    /<ul class="hh-creator-formats"[^>]*>([\s\S]*?)<\/ul>/,
  )?.[1];
  assert.ok(formats);
  assert.equal((formats.match(/<li><span>/g) ?? []).length, 4);
  assert.doesNotMatch(formats, /<svg|<img|<button|<a /);
  const css = read('../app/approach.css');
  assert.match(css, /\.hh-audience-orbit\s*\{[^}]*pointer-events:\s*none/s);
  assert.match(
    css,
    /\.hh-creator-formats li:nth-child\(4\)\s*\{[^}]*inset-inline-start:/s,
  );
  const orbits = [
    ...html.matchAll(
      /<svg class="hh-(?:audience-orbit|discussion-origin)"([^>]*)>/g,
    ),
  ];
  assert.equal(orbits.length, 2);
  for (const [, attributes] of orbits) {
    assert.match(attributes, /viewBox="0 0 200 200"/);
    assert.match(attributes, /preserveAspectRatio="xMidYMid meet"/);
  }
  assert.equal((html.match(/rotate\(-45 100 100\)/g) ?? []).length, 2);
  const sheetPadding = css.match(
    /\.hh-creator-formats li\s*\{[^}]*padding:\s*[\d.]+rem [\d.]+rem ([\d.]+)rem/s,
  );
  const sheetOverlap = css.match(
    /\.hh-creator-formats li \+ li\s*\{[^}]*margin-top:\s*-([\d.]+)rem/s,
  );
  assert.ok(sheetPadding && sheetOverlap);
  assert.ok(
    Number(sheetPadding[1]) > Number(sheetOverlap[1]),
    'Only empty sheet padding may be overlapped',
  );
});

test('the existing palette meets contrast for regular text and diagram strokes', () => {
  const css = read('../app/approach.css');
  const globals = read('../app/globals.css');
  const token = (name) =>
    globals.match(new RegExp('--hh-' + name + ':\\s*(#[a-f0-9]{6})', 'i'))[1];
  function luminance(hex) {
    const parts = hex
      .slice(1)
      .match(/../g)
      .map((v) => {
        const c = parseInt(v, 16) / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
    return parts[0] * 0.2126 + parts[1] * 0.7152 + parts[2] * 0.0722;
  }
  for (const [fg, bg] of [
    ['green', 'paper'],
    ['ink', 'paper'],
    ['muted', 'paper'],
    ['white', 'green'],
  ]) {
    const levels = [luminance(token(fg)), luminance(token(bg))].sort(
      (a, b) => b - a,
    );
    assert.ok((levels[0] + 0.05) / (levels[1] + 0.05) >= 4.5, fg + ' on ' + bg);
    assert.ok(css.includes('var(--hh-' + fg + ')'));
  }
});

test('the mechanism describes goal-led recurring work without invented proof', () => {
  const html = renderToStaticMarkup(React.createElement(ApproachDistinctions));
  for (const phrase of [
    'Your goal',
    'Product',
    'users',
    'Investors',
    'Ecosystem',
    'builders',
    'Selected for your goal—not follower count.',
    'Voices your audience trusts',
    'Explanation',
    'Experience',
    'Perspective',
    'Updates',
    'Useful content, over time.',
    'Wider discussion',
    'Product use',
    'Launch participation',
    'Relevant introductions',
    'Depending on your goal',
    'Questions, participation and results shape the next move.',
    'Illustrative mechanism · shaped around your goals',
  ])
    assert.ok(html.includes(phrase), phrase);
  assert.equal((html.match(/<ul\b/g) ?? []).length, 3);
  assert.equal((html.match(/<li\b/g) ?? []).length, 10);
  assert.doesNotMatch(
    html,
    /<time|<blockquote|<img|\d+%|UMIA|Venice|organic|unpaid|guarantee|First mention/,
  );
  const css = read('../app/approach.css');
  assert.match(css, /\.hh-discussion-potential\s*\{[^}]*stroke-dasharray:/s);
  assert.doesNotMatch(css, /hh-conviction|hh-question-|hh-coverage-sequence/);
});

test('heading text preserves natural spacing across styled spans', () => {
  const html = renderToStaticMarkup(React.createElement(ApproachDistinctions));
  const headings = [...html.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/g)].map(
    ([, text]) =>
      text
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim(),
  );
  assert.deepEqual(headings, [
    'Reach the right Korean audiences.',
    'Become a project worth following.',
    'Give interest somewhere to go.',
  ]);
});

test('participation destinations are readable HTML alternatives, not buttons or chart data', () => {
  const html = renderToStaticMarkup(React.createElement(ApproachDistinctions));
  const outcomes = html.match(
    /<ul class="hh-participation-outcomes"[^>]*>([\s\S]*?)<\/ul>/,
  )?.[1];
  assert.ok(outcomes);
  assert.deepEqual(
    [...outcomes.matchAll(/<li><span>([^<]+)<\/span><\/li>/g)].map(
      ([, label]) => label,
    ),
    ['Product use', 'Launch participation', 'Relevant introductions'],
  );
  assert.match(
    html,
    /<span class="hh-participation-qualifier">Depending on your goal<\/span>/,
  );
  assert.match(html, /<span>Wider discussion<\/span>/);
  assert.doesNotMatch(outcomes, /<svg|<button|<a |\d/);
  const css = read('../app/approach.css');
  assert.match(
    css,
    /\.hh-participation-outcomes\s*\{[^}]*grid-template-rows:\s*repeat\(3, minmax\(0, 1fr\)\)/s,
  );
  assert.match(css, /\.hh-participation-source\s*\{[^}]*grid-row:\s*2/s);
  assert.match(
    css,
    /\.hh-participation-qualifier\s*\{[^}]*grid-column:\s*3[^}]*grid-row:\s*1/s,
  );
  assert.doesNotMatch(html, /hh-discussion-labels/);
  assert.doesNotMatch(
    css,
    /line-clamp|text-overflow:\s*ellipsis|overflow:\s*hidden|white-space:\s*nowrap/,
  );
});
