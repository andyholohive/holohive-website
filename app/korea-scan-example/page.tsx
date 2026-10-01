/* oxlint-disable nextjs/no-img-element -- Local brand assets served directly. */
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ScanExcerpt } from '@/components/evidence-excerpts';
export const metadata: Metadata = {
  title: 'Inside a Korea Market Scan | Holo Hive',
  description:
    'A redacted research excerpt showing category interest, project visibility and the questions that shape a Korea activation.',
  alternates: { canonical: '/korea-scan-example' },
  openGraph: {
    title: 'Inside a Korea Market Scan | Holo Hive',
    description: 'Real research. Defined scope. A practical interpretation.',
    url: '/korea-scan-example',
    images: '/opengraph-image.jpeg',
  },
  twitter: {
    card: 'summary_large_image',
    images: '/opengraph-image.jpeg',
    title: 'Inside a Korea Market Scan | Holo Hive',
    description:
      'Category interest, project visibility and the questions worth investigating.',
  },
};
export default function ScanExample() {
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
        <Link className="text-link" href="/#scan">
          <ArrowLeft size={17} /> Back to the scan
        </Link>
      </header>
      <main className="scan-example-page wrap">
        <p className="eyebrow">Inside the work</p>
        <h1>
          A market scan should
          <br />
          help you make a decision.
        </h1>
        <p className="lead">
          A real research excerpt, with selected details redacted. It shows how
          we separate visible category activity from a project-specific
          opportunity.
        </p>
        <ScanExcerpt full />
        <div className="case-page-cta">
          <h2>Start with your market position.</h2>
          <Link className="button" href="/#request-scan">
            Get your Korea scan <ArrowUpRight size={18} />
          </Link>
        </div>
      </main>
    </>
  );
}
