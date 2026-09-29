/* oxlint-disable nextjs/no-img-element -- Original supplied Figma artwork. */
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { guideChapters } from '@/lib/korea-guide';
import { guideReading } from '@/lib/korea-guide-reading';

// Two buying decisions, not a second article archive on the homepage.
const featuredChapters = ['market-fit', 'choosing-a-partner'] as const;

export function HomepageGuideEntry() {
  return (
    <aside
      className="hh-guide-resource hh-guide-doorway hh-shell"
      id="field-guide"
      aria-labelledby="guide-heading"
    >
      <div className="hh-guide-resource-inner">
        <div className="hh-guide-image" aria-hidden="true">
          <img
            src="/assets/holo-matte-charcoal-ribbon.webp"
            width="1600"
            height="1067"
            loading="lazy"
            alt=""
          />
          <span>HH / Field notes</span>
        </div>
        <div className="hh-guide-entry-content">
          <p className="hh-guide-eyebrow">Korea field guide</p>
          <h2 id="guide-heading">Before your first call.</h2>
          <ul className="hh-guide-shortlist">
            {featuredChapters.map((id) => {
              const chapter = guideChapters.find((item) => item.id === id)!;
              return (
                <li key={id}>
                  <Link href={`/korea-guide/${id}`}>
                    <span className="hh-guide-link-copy">
                      <span className="hh-guide-link-title">
                        {chapter.label}
                      </span>
                      <span className="hh-guide-readtime">
                        ~{guideReading[id].minutes} min read
                      </span>
                    </span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link className="hh-guide-all" href="/korea-guide">
            All {guideChapters.length} chapters{' '}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
