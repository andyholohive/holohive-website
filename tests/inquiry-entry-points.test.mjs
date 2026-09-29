import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');
function sourceFiles(directory) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory()
        ? sourceFiles(path)
        : /\.[jt]sx?$/.test(entry.name)
          ? [path]
          : [];
    },
  );
}

test('no public source offers an inquiry email or an email-draft launcher', () => {
  for (const path of [...sourceFiles('app'), ...sourceFiles('components')]) {
    assert.doesNotMatch(
      read(path),
      /mailto:|team@holohive\.io|prepareEmail|emailPrepared|emailLink/i,
      path,
    );
  }
});

test('homepage scan and contact actions use one qualification dialog', () => {
  const home = read('app/home-content.tsx');
  assert.match(
    home,
    /const openScan = \(\) => \{\s*setMenuOpen\(false\);\s*inquiryNavigation\.current\?\.open\('scan'\)/,
  );
  assert.match(
    home,
    /const openConversation = \(\) => \{\s*setMenuOpen\(false\);\s*inquiryNavigation\.current\?\.open\('conversation'\)/,
  );
  assert.equal((home.match(/<QualificationDialog\b/g) ?? []).length, 1);
  assert.match(home, /if \(!open\) inquiryNavigation\.current\?\.close\(\)/);
  assert.match(home, /setContactOpen\(intent !== null\)/);
  assert.match(
    home,
    /className="hh-btn hh-menu-scan" onClick=\{openConversation\}/,
  );
  assert.doesNotMatch(home, /calendly|scanBookingUrl|scanOpen|<iframe/);
});

test('off-home scan CTAs open qualification; informational links stay navigation', () => {
  for (const path of [
    'app/work/[slug]/page.tsx',
    'app/korea-guide/page.tsx',
    'app/korea-guide/[chapter]/page.tsx',
    'app/korea-scan-example/page.tsx',
  ]) {
    const ctas = [
      ...read(path).matchAll(/<Link\b([^>]*)>\s*Get your Korea scan/g),
    ];
    assert.ok(ctas.length, path);
    for (const cta of ctas)
      assert.match(cta[1], /href="\/#request-scan"/, path);
  }
  assert.match(
    read('app/korea-scan-example/page.tsx'),
    /href="\/#scan">\s*<ArrowLeft[^>]+\/> Back to the scan/,
  );
});

test('calendar stays behind a saved qualified result, with no failure fallback', () => {
  const api = read('app/api/inquiries/route.ts');
  const dialog = read('components/qualification-dialog.tsx');
  assert.match(
    api,
    /status !== 'calendar_ready' \|\|\s*qualification\.status !== 'calendar_ready'/,
  );
  assert.match(
    dialog,
    /outcome\.status === 'calendar_ready' &&\s*outcome\.calendarUrl/,
  );
  assert.match(
    dialog,
    /calendarOpen &&\s*!bookingDismissed &&\s*outcome\.status === 'calendar_ready' &&\s*outcome\.calendarUrl/,
  );
  assert.doesNotMatch(dialog, /https:\/\/calendly\.com/);
});

test('inquiry dismissal stays outside a single scrollable form body', () => {
  const dialog = read('components/qualification-dialog.tsx');
  assert.match(dialog, /showCloseButton=\{false\}/);
  assert.match(
    dialog,
    /<DialogClose className="hh-inquiry-close" aria-label="Close">/,
  );
  assert.match(dialog, /<div className="hh-inquiry-scroll">/);
  const css = read('app/homepage.css');
  assert.match(css, /\.hh-dialog\.hh-inquiry-shell\s*\{[^}]*overflow: clip;/);
  assert.match(
    css,
    /\.hh-inquiry-close\s*\{[^}]*width: 44px;[^}]*height: 44px;/,
  );
});
