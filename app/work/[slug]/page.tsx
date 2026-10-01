/* oxlint-disable nextjs/no-img-element -- Local brand assets served directly. */
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { cases, type CaseKey } from '@/lib/cases';
import { UmiaChart } from '@/components/case-details-graphics';
import { VeniceCoverageChart } from '@/components/homepage-evidence';
import { VeniceCampaignStory } from '@/components/venice-campaign-story';
import { CaseMeasurement } from '@/components/case-measurement';
const origin = 'https://www.holohive.io';
export function generateStaticParams() {
  return Object.keys(cases).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!Object.hasOwn(cases, slug)) return {};
  const c = cases[slug as CaseKey];
  return {
    title: `${c.name}: ${c.title} | Holo Hive`,
    description: c.body,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${c.name} | Holo Hive Korea case study`,
      description: c.title,
      url: `${origin}/work/${slug}`,
      type: 'article',
      images: '/opengraph-image.jpeg',
    },
    twitter: {
      card: 'summary_large_image',
      images: '/opengraph-image.jpeg',
      title: `${c.name} | Holo Hive`,
      description: c.title,
    },
  };
}
export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!Object.hasOwn(cases, slug)) notFound();
  const c = cases[slug as CaseKey];
  return (
    <>
      <header className="header wrap">
        <Link className="brand-lockup" href="/" aria-label="Holo Hive home">
          <img
            className="brand-symbol"
            src="/assets/mark.png"
            alt=""
            width="38"
            height="38"
          />
          <img
            className="wordmark"
            src="/assets/wordmark.svg"
            alt="Holo Hive"
            width="160"
            height="31"
          />
        </Link>
        <Link href="/#request-scan" className="button small">
          Get your Korea scan <ArrowUpRight size={17} />
        </Link>
      </header>
      <main className={`case-page wrap ${slug}`}>
        <Link className="text-link" href="/#results">
          <ArrowLeft size={17} /> All client results
        </Link>
        <div className="case-page-heading">
          <p className="eyebrow">
            {c.year} · {c.name} / {c.category}
          </p>
          <h1>{c.title}</h1>
          <p>{c.period}</p>
        </div>
        <div className="case-page-result">
          <strong>{c.metric}</strong>
          <span>{c.unit}</span>
          <p>{c.baseline}</p>
        </div>
        {slug === 'venice' && <VeniceCampaignStory />}
        <div className="case-story-grid">
          <div>
            <section>
              <h2>Starting point and result</h2>
              <p>{c.detail}</p>
              {slug === 'umia' && (
                <div className="case-detail-graphic">
                  <UmiaChart />
                </div>
              )}
              {slug === 'venice' && (
                <div className="case-detail-graphic">
                  <h3>No. 1 in the tracked onchain AI comparison</h3>
                  <p>
                    30% of quality-weighted Korean coverage in the revised
                    Summer 2026 comparison.{' '}
                    <a className="text-link" href="#measurement">
                      See measurement scope
                    </a>
                  </p>
                  <h3>Campaign coverage record</h3>
                  <p>
                    A separate reporting series—not the mindshare comparison or
                    July active-user cohort.
                  </p>
                  <VeniceCoverageChart />
                </div>
              )}
            </section>
            <section>
              <h2>What Holo Hive did</h2>
              <p>
                {slug === 'venice'
                  ? 'Our Korean creator work was already underway when Venice listed on Upbit. We adapted the content to the listing news, then ran signup and product-use activations. Creators learned the product before explaining it to their audiences. We built the campaign experience and tracked participation; Venice supplied its own product-activity analytics.'
                  : c.approach}
              </p>
            </section>
            {slug === 'umia' && (
              <section id="coverage-sequence">
                <h2>How the coverage developed</h2>
                <p>
                  Selected Korean posts from July–August 2026 show a passing
                  mention followed by a detailed explanation and research
                  coverage. This is a chronology, not evidence that one post
                  caused another or drove investment.
                </p>
                <ol className="case-coverage-sources">
                  <li>
                    <time dateTime="2026-07-28">28 July 2026</time> — UMIA is
                    mentioned within an ecosystem post.{' '}
                    <a
                      href="https://t.me/Honeyofwhitesocks_2/10887"
                      aria-label="Original Korean post (opens in a new tab)"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Original Korean post
                    </a>
                    .
                  </li>
                  <li>
                    <time dateTime="2026-07-29">29 July 2026</time> — Degen Guy
                    explains how UMIA differs from MetaDAO. His opening to this
                    passage, translated from Korean: “Looking into this I found
                    Umia.”{' '}
                    <a
                      href="https://t.me/justdegenguy/4197"
                      aria-label="Original Korean explanation (opens in a new tab)"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Original Korean explanation
                    </a>
                    .
                  </li>
                  <li>
                    <time dateTime="2026-08-26">26 August 2026</time> — Four
                    Pillars Research introduces a longer analysis of UMIA.{' '}
                    <a
                      href="https://t.me/FourPillarsFP/993"
                      aria-label="Original research post (opens in a new tab)"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Original research post
                    </a>
                    .
                  </li>
                </ol>
              </section>
            )}
            <section>
              <h2>Why it matters</h2>
              <p>{c.significance}</p>
            </section>
          </div>
          <aside className="case-chart">
            <p className="eyebrow">The evidence</p>
            <h2>{c.chartTitle}</h2>
            {c.checkpoints.map((row) => (
              <div className="research-bar" key={row.label}>
                <div>
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </div>
                {slug === 'umia' && (
                  <div className="bar-track">
                    <span style={{ width: `${row.width}%` }} />
                  </div>
                )}
              </div>
            ))}
            <p>{c.chartNote}</p>
          </aside>
        </div>
        {'quote' in c && (
          <blockquote className="client-endorsement">
            <p>“{c.quote}”</p>
            <cite>{c.quoteBy}</cite>
          </blockquote>
        )}
        <CaseMeasurement slug={slug as CaseKey} />
        <div className="case-page-cta">
          <h2>
            What could the right approach
            <br />
            look like for your project?
          </h2>
          <Link className="button" href="/#request-scan">
            Get your Korea scan <ArrowUpRight size={18} />
          </Link>
        </div>
      </main>
      <footer className="footer wrap">
        <p>Holo Hive · Korea go-to-market for Web3 teams</p>
        <Link href="/#contact" className="text-link">
          Talk to us <ArrowUpRight size={16} />
        </Link>
      </footer>
    </>
  );
}
