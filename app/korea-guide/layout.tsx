/* oxlint-disable nextjs/no-img-element -- Existing supplied brand assets. */
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import './guide.css';
import './reading.css';

export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <div className="hh-site hh-fieldguide" id="guide-top">
      <a className="skip" href="#guide-main">
        Skip to content
      </a>
      <header className="hh-header">
        <div className="hh-header-inner hh-shell">
          <Link className="hh-brand" href="/" aria-label="Holo Hive home">
            <img
              className="hh-brand-mark"
              src="/assets/mark.png"
              alt=""
              width="35"
              height="35"
            />
            <img
              className="hh-brand-name"
              src="/assets/wordmark.svg"
              alt="Holo Hive"
              width="143"
              height="28"
            />
          </Link>
          <Link className="hh-text-link hh-guide-home" href="/">
            <ArrowLeft size={17} /> Holo Hive home
          </Link>
        </div>
      </header>
      {children}
      <footer className="hh-footer hh-shell">
        <Link href="/korea-guide">The Korea field guide</Link>
        <span>Research and perspective from Holo Hive.</span>
        <a href="#guide-top">Back to top ↑</a>
      </footer>
    </div>
  );
}
