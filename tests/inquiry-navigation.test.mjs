import assert from 'node:assert/strict';
import test from 'node:test';
import { createInquiryNavigation } from '../lib/inquiry-navigation.ts';

function fixture(
  initial = '/?campaign=korea#results',
  state = { router: 'preserved' },
) {
  let index = 0;
  const entries = [{ url: initial, state }];
  const listeners = new Map();
  const changes = [];
  const location = new URL(initial, 'https://example.test');
  const update = () => {
    location.href = new URL(entries[index].url, location.origin).href;
    for (const name of ['popstate', 'hashchange'])
      for (const handler of listeners.get(name) ?? []) handler();
  };
  const browser = {
    location,
    history: {
      get state() {
        return entries[index].state;
      },
      pushState(state, unused, url) {
        entries.splice(index + 1);
        entries.push({ state, url });
        index++;
        location.href = new URL(url, location.origin).href;
      },
      replaceState(state, unused, url) {
        entries[index] = { state, url };
        location.href = new URL(url, location.origin).href;
      },
      back() {
        if (index > 0) {
          index--;
          update();
        }
      },
      forward() {
        if (index < entries.length - 1) {
          index++;
          update();
        }
      },
    },
    addEventListener(name, handler) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(handler);
    },
    removeEventListener(name, handler) {
      listeners.get(name)?.delete(handler);
    },
  };
  const nav = createInquiryNavigation(
    browser,
    (intent) => changes.push(intent),
    'test-owner',
  );
  return { browser, nav, entries, changes, listeners };
}

test('CTA opens qualification; Back closes it and Forward restores it', () => {
  const { browser, nav, changes } = fixture();
  nav.open('scan');
  assert.equal(browser.location.hash, '#request-scan');
  assert.equal(changes.at(-1), 'scan');
  assert.equal(browser.history.state.router, 'preserved');
  browser.history.back();
  assert.equal(browser.location.hash, '#results');
  assert.equal(changes.at(-1), null);
  browser.history.forward();
  assert.equal(changes.at(-1), 'scan');
});

test('Close restores the originating section and campaign query', () => {
  const { browser, nav, changes } = fixture();
  nav.open('conversation');
  nav.close();
  assert.equal(
    browser.location.pathname + browser.location.search + browser.location.hash,
    '/?campaign=korea#results',
  );
  assert.equal(changes.at(-1), null);
  nav.close();
  assert.equal(browser.location.hash, '#results');
});

test('Repeated CTA and intent switches do not stack dialogs in history', () => {
  const { browser, nav, entries, changes } = fixture();
  nav.open('scan');
  nav.open('scan');
  nav.open('conversation');
  assert.equal(entries.length, 2);
  assert.equal(changes.at(-1), 'conversation');
  nav.close();
  assert.equal(browser.location.hash, '#results');
});

test('Direct and reloaded inquiry links close safely without leaving the site', () => {
  for (const state of [
    null,
    { router: 'preserved', __hhInquiryEntry: 'old-owner' },
  ]) {
    const { browser, nav, changes, entries } = fixture(
      '/?campaign=korea#request-scan',
      state,
    );
    assert.equal(changes.at(-1), 'scan');
    nav.close();
    assert.equal(browser.location.hash, '#top');
    assert.equal(browser.location.search, '?campaign=korea');
    assert.equal(entries.length, 1);
    assert.equal(changes.at(-1), null);
    assert.equal(browser.history.state.__hhInquiryEntry, undefined);
  }
});

test('Disposing navigation removes both event listeners', () => {
  const { nav, listeners } = fixture();
  nav.dispose();
  assert.equal(listeners.get('popstate').size, 0);
  assert.equal(listeners.get('hashchange').size, 0);
});
