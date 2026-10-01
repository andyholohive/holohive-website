/* oxlint-disable nextjs/no-img-element -- Existing Seoul image supplied with the site. */
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { guideChapters } from '@/lib/korea-guide';
import { guideReading } from '@/lib/korea-guide-reading';
import { GuideLegacyLinks } from '@/components/korea-guide-legacy-links';
import './library.css';

const description =
  'Five short reads on the Korean opportunity, common pitfalls, client outcomes and what to expect from a local partner.';
export const metadata: Metadata = {
  title: 'Korea, in Context | The Holo Hive Field Guide',
  description,
  alternates: { canonical: '/korea-guide' },
  openGraph: {
    title: 'The Korea Field Guide | Holo Hive',
    description,
    url: '/korea-guide',
    type: 'website',
    images: '/opengraph-image.jpeg',
  },
  twitter: {
    card: 'summary_large_image',
    images: '/opengraph-image.jpeg',
    title: 'The Korea Field Guide | Holo Hive',
    description,
  },
};

function TopicPreview({ id }: { id: string }) {
  return (
    <div className={`hh-library-preview hh-library-preview-${id}`}>
      {id === 'your-position' && (
        <div className="hh-library-lenses">
          {['Coverage', 'Understanding', 'Sentiment', 'Participation'].map(
            (label, i) => (
              <div key={label}>
                <span>0{i + 1}</span>
                <strong>{label}</strong>
              </div>
            ),
          )}
        </div>
      )}
      {id === 'common-mistakes' && (
        <div className="hh-library-comparison">
          <div>
            <span>Being seen</span>
            <strong>Attention</strong>
          </div>
          <span className="hh-library-not-equal">≠</span>
          <div>
            <span>Being understood</span>
            <strong>Interest</strong>
          </div>
        </div>
      )}
      {id === 'participation' && (
        <div className="hh-library-result">
          <div>
            <img src="/assets/fogo.png" alt="Fogo" width="110" height="34" />
            <span>2026</span>
          </div>
          <strong>$5.48M</strong>
          <p>
            Tracked trading volume
            <br />
            <span>First two conversion weeks</span>
          </p>
        </div>
      )}
      {id === 'choosing-a-partner' && (
        <div className="hh-library-options">
          {[
            ['01', 'Buy placements'],
            ['02', 'Hire locally'],
            ['03', 'Work with a partner'],
          ].map(([number, label]) => (
            <div key={number}>
              <span>{number}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TopicCard({ index }: { index: number }) {
  const chapter = guideChapters[index];
  return (
    <Link className="hh-library-card" href={'/korea-guide/' + chapter.id}>
      <div className="hh-library-card-heading">
        <div className="hh-library-meta">
          <span>0{index + 1}</span>
          <span>~{guideReading[chapter.id].minutes} min read</span>
        </div>
        <h3>{chapter.label}</h3>
      </div>
      <TopicPreview id={chapter.id} />
      <div className="hh-library-card-foot">
        <p>{chapter.description}</p>
        <span className="hh-library-read">
          Read article <ArrowUpRight size={19} />
        </span>
      </div>
    </Link>
  );
}

export default function KoreaGuide() {
  const first = guideChapters[0];
  return (
    <main id="guide-main" className="hh-library">
      <GuideLegacyLinks />
      <header className="hh-library-masthead hh-shell">
        <div className="hh-library-edition">
          <p className="hh-kicker">The Holo Hive field guide</p>
          <span>September 2026</span>
        </div>
        <div className="hh-library-intro">
          <h1>
            Korea,
            <br />
            <em>in context.</em>
          </h1>
          <div>
            <p>
              The opportunity, the common pitfalls, and what good local work
              should deliver.
            </p>
            <span>5 short reads · Start anywhere</span>
          </div>
        </div>
      </header>
      <section
        className="hh-library-opening hh-shell"
        aria-labelledby="opportunity-title"
      >
        <Link className="hh-library-feature" href={'/korea-guide/' + first.id}>
          <div className="hh-library-feature-image">
            <img
              src="/assets/seoul.jpg"
              alt="Seoul skyline at dusk"
              width="900"
              height="600"
              fetchPriority="high"
            />
            <span>SEOUL · KOREA</span>
          </div>
          <div className="hh-library-feature-copy">
            <div className="hh-library-meta">
              <span>01 / The opportunity</span>
              <span>~{guideReading[first.id].minutes} min read</span>
            </div>
            <h2 id="opportunity-title">Could Korea matter to your team?</h2>
            <p>{first.description}</p>
            <span className="hh-library-feature-read">
              Start here <ArrowRight size={21} />
            </span>
          </div>
        </Link>
      </section>
      <section
        className="hh-library-section hh-library-diagnose"
        aria-labelledby="presence-title"
      >
        <div className="hh-shell">
          <div className="hh-library-section-heading">
            <div>
              <p className="hh-kicker">Your starting point</p>
              <h2 id="presence-title">Look beyond the posts.</h2>
            </div>
            <span>Topics 02—03</span>
          </div>
          <div className="hh-library-grid">
            <TopicCard index={1} />
            <TopicCard index={2} />
          </div>
        </div>
      </section>
      <section
        className="hh-library-section hh-library-evaluate"
        aria-labelledby="delivery-title"
      >
        <div className="hh-shell">
          <div className="hh-library-section-heading">
            <div>
              <p className="hh-kicker">The work & the results</p>
              <h2 id="delivery-title">Know what good looks like.</h2>
            </div>
            <span>Topics 04—05</span>
          </div>
          <div className="hh-library-grid">
            <TopicCard index={3} />
            <TopicCard index={4} />
          </div>
        </div>
      </section>
      <aside className="hh-library-close hh-shell">
        <div>
          <p className="hh-kicker">Your next move</p>
          <h2>What would this mean for your team?</h2>
          <p>
            We’ll walk through your Korea scan and discuss whether there is an
            opportunity worth pursuing.
          </p>
        </div>
        <Link className="hh-btn" href="/#request-scan">
          Get your Korea scan <ArrowUpRight size={18} />
        </Link>
      </aside>
    </main>
  );
}
