import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(join(root, 'package.json'));
const read = (path) => readFileSync(join(root, path), 'utf8');
const cache = new Map();
let selectedChapter = 'coverage';

test('client gallery keeps background detail inside the accessible popover', () => {
  const component = read('components/homepage-evidence.tsx');
  const card = component.slice(
    component.indexOf('export function ClientCard'),
    component.indexOf('export function VeniceCoverageChart'),
  );
  const trigger = card.slice(
    card.indexOf('<PopoverTrigger'),
    card.indexOf('</PopoverTrigger>'),
  );
  assert.doesNotMatch(
    trigger,
    /hh-client-category|hh-client-caption-row|context\.caption/,
  );
  assert.match(trigger, /aria-label=\{`About \$\{client\.name\}`\}/);
  assert.match(trigger, /hh-client-more/);
  assert.match(card, /Company background/);
  assert.match(card, /context\.description/);
  assert.match(card, /context\.source/);
});

test('closing panel offers qualified contact alongside the optional scan', () => {
  const home = read('app/home-content.tsx');
  const closing = home.slice(
    home.indexOf('className="hh-final-actions"'),
    home.indexOf('</main>'),
  );
  assert.equal((closing.match(/<button\b/g) ?? []).length, 2);
  assert.match(closing, /onClick=\{openConversation\}/);
  assert.match(closing, /onClick=\{openScan\}/);
  assert.doesNotMatch(closing, /Talk to us/);
  assert.match(home.slice(home.indexOf('<footer')), /openConversation\(\)/);
});

test('homepage guide titles cannot inherit the old article-section grid', () => {
  const component = read('components/homepage-guide-entry.tsx');
  const css = read('app/refinement.css');
  assert.match(component, /className="hh-guide-link-copy"/);
  assert.match(component, /className="hh-guide-link-title"/);
  assert.doesNotMatch(component, /className="hh-guide-question"/);
  assert.match(css, /\.hh-guide-shortlist a\s*\{\s*display: flex/);
  assert.match(css, /\.hh-guide-link-copy\s*\{[^}]*flex: 1 1 0%/s);
  assert.doesNotMatch(css, /\.hh-guide-question\s*\{/);
});

// Exercise every initial chapter using real Base UI and React SSR semantics.
function loadTs(path) {
  if (cache.has(path)) return cache.get(path);
  const source = ts.transpileModule(read(path), {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const module = { exports: {} };
  const dependency = (name) => {
    if (name === 'next/link') return 'a';
    if (name === 'react')
      return {
        ...React,
        useState: (initial) =>
          React.useState(initial === 'coverage' ? selectedChapter : initial),
      };
    if (name.startsWith('@/')) {
      const base = name.slice(2);
      return loadTs(
        existsSync(join(root, `${base}.tsx`)) ? `${base}.tsx` : `${base}.ts`,
      );
    }
    return require(name);
  };
  new Function('require', 'module', 'exports', source)(
    dependency,
    module,
    module.exports,
  );
  cache.set(path, module.exports);
  return module.exports;
}

test('inline scan starts with one labelled website field inside the scan section', () => {
  const { HomepageScanStart } = loadTs('components/homepage-scan-start.tsx');
  const html = renderToStaticMarkup(
    React.createElement(HomepageScanStart, { onContinue() {} }),
  );
  assert.equal((html.match(/<input\b/g) ?? []).length, 1);
  assert.match(html, /for="scan-start-website"/);
  assert.match(html, /free Korea scan \+ walkthrough/);
  assert.match(html, /For qualified teams/);
  assert.doesNotMatch(html, /autofocus|type="email"/i);
  const home = read('app/home-content.tsx');
  assert.ok(home.indexOf('<HomepageScanStart') > home.indexOf('id="scan"'));
  assert.ok(home.indexOf('<HomepageScanStart') < home.indexOf('id="faq"'));
  assert.equal((home.match(/<HomepageScanStart/g) ?? []).length, 1);
  assert.match(home, /href="#scan">\s*What’s included\?/);
});

test('compact scan preview uses a labelled, dated sample, with no controls or invented findings', () => {
  const { ScanSamplePreview } = loadTs('components/scan-sample-preview.tsx');
  const html = renderToStaticMarkup(React.createElement(ScanSamplePreview));
  assert.match(html, /Sample scan/);
  assert.match(html, /Mining category/);
  assert.match(html, /6 <span>\/ 147/);
  assert.match(html, /90 days to August 25, 2026/);
  assert.doesNotMatch(html, /hh-sample-source/);
  assert.doesNotMatch(html, /<button|<input|<a\s/);
  assert.match(read('app/refinement.css'), /width: calc\(6 \/ 147 \* 100%\)/);
});

test('every scan chapter preserves one accessible panel and four measurable panels', () => {
  const { ScanExplorer } = loadTs('components/homepage-evidence.tsx');
  const chapters = ['coverage', 'understanding', 'competition', 'opportunity'];
  for (const [active, chapter] of chapters.entries()) {
    selectedChapter = chapter;
    const html = renderToStaticMarkup(React.createElement(ScanExplorer));
    assert.equal((html.match(/role="tab"/g) ?? []).length, 4);
    assert.equal((html.match(/role="tabpanel"/g) ?? []).length, 4);
    assert.equal((html.match(/aria-selected="true"/g) ?? []).length, 1);
    assert.match(html, /aria-label="What a Korea scan can show"/);
    const panels = [...html.matchAll(/<div\b([^>]*role="tabpanel"[^>]*)>/g)];
    for (const [index, panel] of panels.entries()) {
      assert.doesNotMatch(panel[1], /\shidden(?:=|\s|$)/);
      if (index === active) {
        assert.match(panel[1], /aria-hidden="false"/);
        assert.doesNotMatch(panel[1], /\binert=/);
      } else {
        assert.match(panel[1], /aria-hidden="true"/);
        assert.match(panel[1], /\binert=/);
      }
    }
    const previous = html.match(
      /<button\b[^>]*aria-label="Previous scan finding"[^>]*>/,
    )?.[0];
    const next = html.match(
      /<button\b[^>]*aria-label="Next scan finding"[^>]*>/,
    )?.[0];
    assert.ok(previous && next);
    assert.equal(/\bdisabled=/.test(previous), active === 0);
    assert.equal(/\bdisabled=/.test(next), active === 3);
    assert.match(
      html,
      /Examples from different projects\. Identities removed\./,
    );
  }
});

test('folio retains shared intrinsic height, category labels and mobile chapters', () => {
  const source = read('components/homepage-evidence.tsx');
  const craft = read('app/craft.css');
  const css = read('app/refinement.css');
  assert.equal(
    (source.match(/keepMounted\s+hidden=\{false\}/g) ?? []).length,
    4,
  );
  assert.match(craft, /grid-area: 2 \/ 1/);
  assert.match(
    craft,
    /\.hh-scan-panel\[aria-hidden='true'\][^{]*\{[^}]*visibility: hidden/s,
  );
  assert.match(
    craft,
    /\.hh-report-heading > span:last-child\s*\{\s*display: inline/,
  );
  assert.match(css, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /tabs-trigger'\]:focus-visible/);
  assert.match(css, /\.hh-report-date\s*\{[^}]*margin-left: auto/s);
  assert.match(css, /\.hh-report-stat\s*\{\s*flex-wrap: wrap/);
  assert.match(css, /\.hh-report-date\s*\{[^}]*white-space: normal/s);
  const explorer = source.slice(
    source.indexOf('export function ScanExplorer'),
    source.indexOf('export function KoreaProcess'),
  );
  assert.equal((explorer.match(/Research sample · 2026/g) ?? []).length, 3);
  assert.match(explorer, /90 days to August 25, 2026/);
  assert.doesNotMatch(explorer, /Last 100 days to August 31/);
  assert.doesNotMatch(
    explorer,
    /hh-report-masthead|Sample \/ 2026|className="hh-note"/,
  );
  assert.doesNotMatch(css, /(?:min-|max-)?height:\s*\d{3,}px/);
  assert.doesNotMatch(
    source.slice(
      source.indexOf('export function ScanExplorer'),
      source.indexOf('export function KoreaProcess'),
    ),
    /setInterval|autoPlay/,
  );
});

test('centered service-first hero separates the call and optional scan paths', () => {
  const source = read('app/home-content.tsx');
  const hero = source.slice(
    source.indexOf('hh-hero-editorial'),
    source.indexOf('id="clients"'),
  );
  assert.doesNotMatch(source, /HeroProof|hh-hero-with-proof/);
  assert.doesNotMatch(read('app/layout.tsx'), /hero-proof\.css/);
  assert.equal((source.match(/<CasePosters\s*\/>/g) ?? []).length, 1);
  assert.match(hero, /onClick=\{openScan\}/);
  assert.match(hero, /onClick=\{openConversation\}/);
  assert.equal((hero.match(/<button\b/g) ?? []).length, 2);
  assert.match(hero, /Attract the right users, investors and partners/);
  assert.match(hero, /positioning, creator\s+relationships and\s+campaigns/);
  assert.match(hero, /Free scan \+ live walkthrough\. For qualified teams/);
  assert.match(hero, /For qualified\s+teams/);
  assert.doesNotMatch(hero, /hh-credentials|hh-client-credentials/);
  assert.match(
    source,
    /className="hh-client-credentials"\s+aria-label="Holo Hive experience"/,
  );
  assert.ok(
    source.indexOf('hh-client-credentials') <
      source.indexOf('primaryClients.map'),
  );
  assert.ok(
    source.indexOf('hh-client-credentials') < source.indexOf('id="results"'),
  );
  const clients = source.slice(
    source.indexOf('id="clients"'),
    source.indexOf('id="results"'),
  );
  assert.doesNotMatch(clients, /300\+/);
  assert.match(clients, /<dd>100\+<\/dd>/);
  assert.match(clients, /<dd>5\+<\/dd>/);
  const scan = source.slice(
    source.indexOf('id="scan"'),
    source.indexOf('id="faq"'),
  );
  assert.match(scan, /<strong>300\+<\/strong> Korean channels monitored/);
  assert.match(
    read('app/refinement.css'),
    /\.hh-site \.hh-hero-editorial \.hh-hero-intro\s*\{[^}]*text-align: center/s,
  );
  assert.match(hero, /Build demand for\s+<em>your project in Korea\.<\/em>/);
});

test('scan booking promises prepared findings on the first call without skipping qualification', () => {
  const dialog = read('components/qualification-dialog.tsx');
  assert.match(dialog, /Book your Korea scan walkthrough\./);
  assert.match(
    dialog,
    /We’ll prepare your scan before the call, walk you through the findings, and discuss what makes sense for your goals/,
  );
  assert.match(dialog, /Eligible based on your answers/);
  assert.match(dialog, /No obligation to work together/);
  assert.match(
    read('lib/homepage-faq.ts'),
    /prepare the scan before your first call/,
  );
});

test('brand accents stay decorative and preserve genuine client media', () => {
  const home = read('app/home-content.tsx');
  const css = read('app/refinement.css');
  assert.match(home, /className="hh-lore-orbit" aria-hidden="true"/);
  assert.match(css, /\.hh-lore-orbit\s*\{[^}]*pointer-events: none/s);
  assert.match(home, /src="\/assets\/holo-monochrome-spheres\.jpg"\s+alt=""/);
  assert.ok(
    existsSync(join(root, 'public/assets/holo-monochrome-spheres.jpg')),
  );
  const film = read('components/lore-testimonial.tsx');
  assert.match(film, /poster="\/media\/lore-testimonial-smile\.jpg"/);
  assert.match(film, /src="\/media\/lore-testimonial\.mp4"/);
});

test('three peer recommendations use verbatim published excerpts and authentic portraits', () => {
  const { industryRecommendations } = loadTs('lib/industry-recommendations.ts');
  assert.deepEqual(
    industryRecommendations.map(({ name }) => name),
    ['Adam Fern', 'Omar Ghanem', 'Jackson Weinreb'],
  );
  for (const recommendation of industryRecommendations) {
    assert.ok(recommendation.publishedQuote.includes(recommendation.quote));
    assert.equal(recommendation.source, 'https://www.holohive.io/');
    assert.ok(recommendation.quote.split(/\s+/).length <= 25);
    const portrait = readFileSync(
      join(root, 'public', recommendation.portrait),
    );
    assert.ok(portrait.length > 1000 && portrait.length < 100000);
  }
  assert.match(
    industryRecommendations[1].quote,
    /introduced Holo Hive to several teams/,
  );
  assert.match(industryRecommendations[2].publishedQuote, /referring clients/);
});

test('peer proof renders as three fully visible, attributed recommendations without a carousel', () => {
  const { IndustryRecommendations } = loadTs(
    'components/industry-recommendations.tsx',
  );
  const html = renderToStaticMarkup(
    React.createElement(IndustryRecommendations),
  );
  assert.match(html, /aria-labelledby="peer-heading"/);
  assert.match(html, /Recommended by industry peers/);
  assert.equal((html.match(/<figure\b/g) ?? []).length, 3);
  assert.equal((html.match(/<figcaption\b/g) ?? []).length, 3);
  assert.equal(
    (html.match(/<blockquote cite="https:\/\/www.holohive.io\/"/g) ?? [])
      .length,
    3,
  );
  for (const name of ['Adam Fern', 'Omar Ghanem', 'Jackson Weinreb']) {
    assert.equal(html.split(name).length - 1, 1);
  }
  for (const affiliation of [
    'Co-founder, Proof of Play',
    'Founder, G3',
    'The Tie',
  ]) {
    assert.equal(html.split(affiliation).length - 1, 1);
  }
  assert.equal((html.match(/loading="lazy"/g) ?? []).length, 3);
  assert.doesNotMatch(html, /<button|<video|aria-hidden="true"|hidden=/);
  assert.doesNotMatch(
    read('components/industry-recommendations.tsx'),
    /setInterval|useState|Carousel/,
  );
  const home = read('app/home-content.tsx');
  assert.match(
    home,
    /<strong>Parker Heath<\/strong>\s*<span>Avalanche<\/span>/,
  );
  assert.doesNotMatch(home, /MapleStory launch support/);
  assert.equal((home.match(/<IndustryRecommendations\s*\/>/g) ?? []).length, 1);
  assert.ok(
    home.indexOf('<IndustryRecommendations') <
      home.indexOf('<CreatorTestimonials'),
  );
});

test('shorter FAQ retains decision-critical scope, timing and eligibility', () => {
  const { homepageQuestions } = loadTs('lib/homepage-faq.ts');
  assert.equal(homepageQuestions.length, 9);
  assert.equal(
    new Set(homepageQuestions.map(({ question }) => question)).size,
    9,
  );
  for (const item of homepageQuestions) {
    assert.ok(item.question.length < 65);
    assert.ok(item.answer && item.detail);
    assert.ok(`${item.answer} ${item.detail}`.split(/\s+/).length <= 50);
  }
  const copy = homepageQuestions
    .map(({ answer, detail }) => `${answer} ${detail}`)
    .join(' ');
  assert.match(copy, /do not arrange or guarantee exchange listings/);
  assert.match(copy, /data your team shares/);
  assert.match(copy, /within seven days of the agreed kickoff/);
  assert.match(copy, /At week six/);
  assert.match(copy, /Free for qualified teams/);
  assert.match(copy, /without duplicating effort/);
  const home = read('app/home-content.tsx');
  assert.match(home, /<p className="hh-faq-answer">\{answer\}<\/p>/);
  assert.match(home, /<p className="hh-faq-detail">\{detail\}<\/p>/);
});

test('mobile navigation includes the guide and text selection stays in the approved palette', () => {
  const home = read('app/home-content.tsx');
  const nav = home.slice(home.indexOf('aria-label="Mobile navigation"'));
  assert.match(
    nav,
    /<Link href="\/korea-guide" onClick=\{\(\) => setMenuOpen\(false\)\}/,
  );
  assert.match(
    read('app/globals.css'),
    /::selection\s*\{\s*background: #24583e;\s*color: #fff;/,
  );
});

// Source contracts, not a substitute for visual viewport QA.
test('homepage spacing owns section gaps without stacking neighboring blank bands', () => {
  const css = read('app/refinement.css');
  assert.match(css, /--hh-section-space: clamp\(56px, 6\.5vw, 88px\)/);
  assert.match(css, /\.hh-site \.hh-faq\s*\{\s*padding-top: 0;/);
  assert.match(css, /\.hh-site \.hh-guide-resource\s*\{\s*padding-bottom: 0;/);
  assert.match(css, /\.hh-site \.hh-final-actions\s*\{\s*margin-top: 0;/);
  assert.match(css, /\.hh-site \.hh-guide-resource p\s*\{\s*font-size: 1rem;/);
  const styles = [
    ...read('app/layout.tsx').matchAll(/import ['"](.+\.css)['"]/g),
  ];
  assert.equal(styles.at(-1)?.[1], './refinement.css');
});

test('testimonial groups share insets and keep all quote text in flow', () => {
  const css = read('app/refinement.css');
  assert.match(
    css,
    /\.hh-testimonials \.hh-testimonial-grid\s*\{\s*padding: 20px 0;/,
  );
  assert.match(
    css,
    /\.hh-testimonials \.hh-testimonial-grid \.hh-testimonial\s*\{[^}]*padding-inline: var\(--hh-proof-gutter\);/s,
  );
  assert.match(
    css,
    /\.hh-testimonials \.hh-peer-recommendations,\s*\.hh-testimonials \.hh-creator-testimonials\s*\{\s*margin-top: var\(--hh-proof-group-space\);\s*padding-top: 0;\s*border-top: 0;/,
  );
  assert.match(
    css,
    /\.hh-testimonials \.hh-peer-grid,\s*\.hh-testimonials \.hh-local-quotes\s*\{\s*margin-top: 16px;/,
  );
  assert.doesNotMatch(css, /line-clamp|text-overflow:\s*ellipsis/);
});

test('tablet layout releases narrow scan and quote columns without fixing report height', () => {
  const css = read('app/refinement.css');
  const tablet = css
    .split('@media (max-width: 960px) {')
    .at(-1)
    ?.split('@media (max-width: 780px)')[0];
  assert.ok(tablet);
  assert.match(
    tablet,
    /\.hh-site \.hh-scan-layout\s*\{\s*grid-template-columns: minmax\(0, 1fr\);/,
  );
  assert.match(
    tablet,
    /\.hh-testimonials \.hh-testimonial-grid\s*\{\s*grid-template-columns: minmax\(0, 1fr\);\s*grid-template-rows: none;/,
  );
  assert.match(tablet, /grid-template-rows: auto auto;\s*grid-row: auto;/);
  assert.match(tablet, /border-left: 0;/);
  assert.doesNotMatch(tablet, /height:|visibility:|display:\s*none/);
  assert.match(css, /max-width: min\(100%, max\(58%, 28rem\)\);/);
});

test('guide doorway links to two real buying questions with audited reading estimates', () => {
  const { HomepageGuideEntry } = loadTs('components/homepage-guide-entry.tsx');
  const { guideChapters } = loadTs('lib/korea-guide.ts');
  const { guideReading } = loadTs('lib/korea-guide-reading.ts');
  const { GuideChapterContent } = loadTs('components/korea-guide-content.tsx');
  const html = renderToStaticMarkup(React.createElement(HomepageGuideEntry));
  assert.equal((html.match(/<li\b/g) ?? []).length, 2);
  assert.match(html, /href="\/korea-guide\/market-fit"/);
  assert.match(html, /href="\/korea-guide\/choosing-a-partner"/);
  assert.match(html, /href="\/korea-guide"/);
  assert.match(html, /All 5 chapters/);
  assert.match(html, /id="field-guide"/);
  assert.match(html, /Before your first call\./);
  assert.match(html, /Korea field guide/);
  assert.equal((html.match(/class="hh-guide-link-title"/g) ?? []).length, 2);
  assert.match(html, /~2 min/);
  assert.match(html, /~3 min/);
  for (const chapter of guideChapters) {
    const content = renderToStaticMarkup(
      React.createElement(GuideChapterContent, { id: chapter.id }),
    );
    const words =
      `${chapter.title} ${guideReading[chapter.id].takeaway} ${content}`
        .replace(/<[^>]*>/g, ' ')
        .replace(/&(?:[a-z]+|#\d+);/gi, ' ')
        .trim()
        .split(/\s+/).length;
    assert.equal(
      guideReading[chapter.id].minutes,
      Math.max(1, Math.ceil(words / 200)),
      chapter.id,
    );
  }
  assert.equal(
    (read('app/home-content.tsx').match(/<HomepageGuideEntry\s*\/>/g) ?? [])
      .length,
    1,
  );
});

test('approach makes the connected mechanism available without interaction', () => {
  const { ApproachDistinctions } = loadTs('components/process-evidence.tsx');
  const html = renderToStaticMarkup(React.createElement(ApproachDistinctions));
  assert.equal((html.match(/<section /g) ?? []).length, 3);
  assert.equal((html.match(/<h3\b[^>]*>/g) ?? []).length, 3);
  assert.equal((html.match(/role="img"/g) ?? []).length, 0);
  assert.equal((html.match(/<figure /g) ?? []).length, 1);
  for (const phrase of [
    'Reach the right Korean audiences.',
    'Become a project worth following.',
    'Give interest somewhere to go.',
    'Reach without relevance',
    'Mentions without credibility',
    'Attention without action',
    'Voices your audience trusts',
    'Wider discussion',
    'Product use',
    'Launch participation',
    'Relevant introductions',
    'Depending on your goal',
    'Your goal',
    'Questions, participation and results shape the next move.',
    'Illustrative mechanism',
  ])
    assert.ok(html.includes(phrase), phrase);
  assert.doesNotMatch(
    html,
    /role="tab|<button|<a |aria-hidden="false"|<svg[^>]*>[^<]*[0-9]+%/,
  );
  assert.doesNotMatch(
    html,
    /Venice|Fogo|theddari|View post archive|English annotation|73%|1,287/,
  );
  assert.match(html, /<figure class="hh-presence-system" aria-labelledby="/);
});

test('approach keeps principal copy concise beside a single connected visual', () => {
  const { KoreaProcess } = loadTs('components/homepage-evidence.tsx');
  const html = renderToStaticMarkup(React.createElement(KoreaProcess));
  assert.match(html, /Attention alone doesn’t build demand/);
  assert.match(html, /Reach people who matter, give them a reason to care/);
  assert.match(html, /id="approach"/);
  assert.match(html, /aria-labelledby="method-heading"/);
  assert.match(html, /id="method-heading"/);
  assert.match(html, /One team in Seoul/);
  assert.match(html, /Local strategy, execution and English reporting/);
  const main = [
    ...html.matchAll(/<(?:h2|h3|p)\b[^>]*>([\s\S]*?)<\/(?:h2|h3|p)>/g),
  ]
    .map(([, content]) => content.replace(/<[^>]+>/g, ' '))
    .join(' ');
  assert.ok(main.split(/\s+/).filter(Boolean).length <= 95);
  assert.doesNotMatch(
    html,
    /Strategy in practice|Read the .* story|Three.step|guarantee/i,
  );
});

test('approach diagrams stay responsive without hiding principal copy', () => {
  const source = read('components/process-evidence.tsx');
  const css = read('app/approach.css');
  assert.doesNotMatch(source, /setInterval|autoPlay|setTimeout|useState|Tabs/);
  assert.match(css, /@media \(max-width: 1100px\)/);
  assert.match(css, /@media \(max-width: 740px\)/);
  assert.match(css, /@media \(max-width: 600px\)/);
  assert.match(
    css,
    /\.hh-presence-flow\s*\{[^}]*grid-template-columns: minmax\(0, 1fr\);/s,
  );
  assert.match(css, /\.hh-method-ownership\s*\{[^}]*flex-wrap: wrap/s);
  assert.doesNotMatch(css, /hh-conviction|hh-question-/);
  assert.doesNotMatch(
    css,
    /line-clamp|text-overflow:\s*ellipsis|max-height:|overflow:\s*hidden/,
  );
  assert.doesNotMatch(css, /@keyframes|animation:|transition:/);
});

test('case preview source paths resolve to defined metrics without hiding critical qualifications', () => {
  const { CasePosters } = loadTs('components/case-posters.tsx');
  const { CaseMeasurement } = loadTs('components/case-measurement.tsx');
  const html = renderToStaticMarkup(React.createElement(CasePosters));
  for (const slug of ['umia', 'venice', 'fogo']) {
    assert.ok(html.includes(`href="/work/${slug}#measurement"`));
    const detail = renderToStaticMarkup(
      React.createElement(CaseMeasurement, { slug }),
    );
    assert.match(detail, /id="measurement"/);
    assert.match(detail, /<summary>Source notes and limitations<\/summary>/);
    assert.match(detail, /<dt>/);
    assert.match(detail, /<dd>/);
    const visible = detail.split('<details')[0];
    if (slug === 'umia') {
      assert.match(visible, /not completed investment/);
      assert.doesNotMatch(
        detail,
        /app\.holohive\.io|Open the public UMIA tracker/,
      );
    }
    if (slug === 'venice') {
      assert.match(visible, /Summer 2026/);
      assert.match(visible, /Separate two-week July window/);
      assert.match(visible, /Not a count of users acquired by Holo Hive/);
      assert.match(detail, /251 pieces of coverage through August 10/);
      assert.match(detail, /remaining|Other tracked projects account for 31%/);
    }
    if (slug === 'fogo')
      assert.match(visible, /Not revenue or net capital inflow/);
  }
  assert.doesNotMatch(html, /work\/flying-tulip/);
  assert.match(
    read('app/work/[slug]/page.tsx'),
    /<CaseMeasurement slug=\{slug as CaseKey\}/,
  );
});

test('case previews prioritize outcomes without dropping periods or geographic scope', () => {
  const { CasePosters } = loadTs('components/case-posters.tsx');
  const html = renderToStaticMarkup(React.createElement(CasePosters));
  assert.equal((html.match(/<article\b/g) ?? []).length, 3);
  assert.equal((html.match(/hh-poster-secondary/g) ?? []).length, 2);
  assert.match(html, /Korean creator allocation requests/);
  assert.match(html, /Before the sale/);
  assert.match(html, /\$5\.48M/);
  assert.match(html, /Tracked trading volume/);
  assert.match(html, /in 2 weeks/);
  assert.match(html, /Valiant · Fogo ecosystem/);
  assert.match(html, /Client estimate · two weeks to July 23/);
  assert.match(html, /Summer 2026/);
  assert.doesNotMatch(html, /hh-poster-tulip/);
  assert.doesNotMatch(
    html,
    /hh-poster-time|hh-tulip-round|320 verified wallets/,
  );
});

test('approach has no duplicate case links while full campaign evidence stays in its case', () => {
  const { ApproachDistinctions } = loadTs('components/process-evidence.tsx');
  const html = renderToStaticMarkup(React.createElement(ApproachDistinctions));
  assert.doesNotMatch(html, /href=|venice-campaign.jpg/);
  assert.match(read('app/work/[slug]/page.tsx'), /<VeniceCampaignStory/);
});

test('UMIA case keeps the coverage sources separate from performance attribution', () => {
  const source = read('app/work/[slug]/page.tsx');
  const coverage = source.match(
    /<section id="coverage-sequence">([\s\S]*?)<\/section>/,
  )?.[1];
  assert.ok(coverage);
  assert.match(coverage, /chronology, not evidence/);
  assert.match(coverage, /caused another or drove investment/);
  for (const url of [
    'Honeyofwhitesocks_2/10887',
    'justdegenguy/4197',
    'FourPillarsFP/993',
  ]) {
    assert.ok(coverage.includes('https://t.me/' + url));
  }
  assert.doesNotMatch(coverage, /Babylon|66%|68%|reader.views|organic|unpaid/);
});

test('Venice work feature uses the real artifact and distinguishes the feature-use cohort', () => {
  const { VeniceCampaignStory } = loadTs(
    'components/venice-campaign-story.tsx',
  );
  const html = renderToStaticMarkup(React.createElement(VeniceCampaignStory));
  assert.match(html, /id="campaign"/);
  assert.match(html, /src="\/assets\/venice-campaign.jpg"/);
  assert.match(html, /width="1600" height="728"/);
  assert.match(html, /Try five features/);
  assert.match(html, /Submit proof of use/);
  assert.match(html, /1,287/);
  assert.match(html, /5,134/);
  assert.match(
    html,
    /Separate from the 819 signups and the July active-user report/,
  );
  assert.doesNotMatch(html, /hh-campaign-action-summary|retention lift/);
});

test('buyer-question scan invitation keeps the report offer and qualified CTA', () => {
  const home = read('app/home-content.tsx');
  const scan = home.slice(home.indexOf('id="scan"'), home.indexOf('id="faq"'));
  assert.match(scan, /What is Korea saying about your project\?/);
  assert.match(scan, /See where your project stands across leading Korean channels/);
  assert.match(scan, /and creators—and where the opportunity may be/);
  assert.match(scan, /before your first call/);
  assert.match(scan, /<HomepageScanStart/);
  assert.match(scan, /setWebsiteEntry\(\{ website \}\)/);
  assert.match(scan, /openScan\(\)/);
  assert.match(scan, /Preview the report/);
  assert.equal((scan.match(/href="\/korea-scan-example"/g) ?? []).length, 1);
  assert.ok(scan.indexOf('Preview the report') > scan.indexOf('<ScanExplorer'));
  assert.match(
    read('app/refinement.css'),
    /\.hh-site \.hh-scan-action\s*\{\s*max-width: none;/,
  );
  assert.doesNotMatch(scan, /mailto:|Yes, show me/);
});
