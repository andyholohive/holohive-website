/* oxlint-disable nextjs/no-img-element -- Supplied client wordmarks. */
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

function PosterHeader({
  name,
  asset,
  category,
  period = '2026',
}: {
  name: string;
  asset: string;
  category: string;
  period?: string;
}) {
  return (
    <header className="hh-poster-header">
      <img
        src={`/assets/${asset}`}
        alt={name}
        width="150"
        height="48"
        loading="lazy"
      />
      <div className="hh-poster-meta">
        <span>{category}</span>
        <span className="hh-poster-year">{period}</span>
      </div>
    </header>
  );
}

function CaseLink({ slug, name }: { slug: string; name: string }) {
  return (
    <Link
      className="hh-poster-link"
      href={`/work/${slug}`}
      aria-label={`Read the ${name} case study`}
    >
      {name} case study <ArrowUpRight aria-hidden="true" size={18} />
    </Link>
  );
}

function CaseFooter({ slug, name }: { slug: string; name: string }) {
  return (
    <footer className="hh-poster-footer">
      <Link
        className="hh-measurement-link"
        href={`/work/${slug}#measurement`}
        aria-label={`How the ${name} results are measured`}
      >
        How measured
      </Link>
      <CaseLink slug={slug} name={name} />
    </footer>
  );
}

export function CasePosters() {
  return (
    <div className="hh-case-posters">
      <article
        className="hh-poster hh-poster-umia"
        id="umia-case"
        aria-labelledby="umia-poster-heading"
      >
        <PosterHeader
          name="UMIA"
          asset="umia.png"
          category="Market attention"
        />
        <div className="hh-poster-main">
          <h3 className="sr-only" id="umia-poster-heading">
            From zero recorded coverage to the most-discussed launch in
            monitored Korean channels.
          </h3>
          <div className="hh-poster-transformation">
            <div>
              <strong className="hh-poster-zero">0</strong>
              <span>Recorded mentions</span>
              <small>Prior 12-month audit</small>
            </div>
            <ArrowRight
              className="hh-poster-arrow"
              size={44}
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <div>
              <strong className="hh-poster-rank">
                <span>No.</span> 1
              </strong>
              <span>Most-discussed launch</span>
              <small>
                Monitored Korean channels
                <br />
                Aug 26 snapshot
              </small>
            </div>
          </div>
        </div>
        <div className="hh-poster-support hh-poster-demand hh-poster-secondary">
          <strong>$1M+</strong>
          <div>
            <span>Korean creator allocation requests</span>
            <small>Before the sale</small>
          </div>
        </div>
        <CaseFooter slug="umia" name="UMIA" />
      </article>

      <article
        className="hh-poster hh-poster-venice"
        id="venice-case"
        aria-labelledby="venice-poster-heading"
      >
        <PosterHeader
          name="Venice"
          asset="venice-wordmark.svg"
          category="Mindshare & adoption"
          period="Summer 2026"
        />
        <div className="hh-venice-proof">
          <h3 className="sr-only" id="venice-poster-heading">
            Venice led the tracked onchain AI projects in quality-weighted
            Korean coverage.
          </h3>
          <figure className="hh-venice-mindshare">
            <figcaption>
              <span>Onchain AI mindshare in Korea</span>
              <span>Top 4</span>
            </figcaption>
            <dl className="hh-mindshare-map">
              <div className="hh-mindshare-leader">
                <dt>Venice</dt>
                <dd>
                  30<span>%</span>
                </dd>
                <span className="hh-mindshare-rank">No. 1</span>
              </div>
              <div className="hh-mindshare-peer hh-mindshare-virtuals">
                <dt>Virtuals</dt>
                <dd>
                  17<span>%</span>
                </dd>
              </div>
              <div className="hh-mindshare-peer hh-mindshare-ritual">
                <dt>Ritual</dt>
                <dd>
                  11<span>%</span>
                </dd>
              </div>
              <div className="hh-mindshare-peer hh-mindshare-bittensor">
                <dt>Bittensor</dt>
                <dd>
                  11<span>%</span>
                </dd>
              </div>
            </dl>
          </figure>
        </div>
        <div className="hh-poster-support hh-poster-signups hh-poster-secondary">
          <strong>6,200+</strong>
          <div>
            <span>Korean active users</span>
            <small>Client estimate · two weeks to July 23</small>
          </div>
        </div>
        <CaseFooter slug="venice" name="Venice" />
      </article>

      <article
        className="hh-poster hh-poster-fogo"
        id="fogo-case"
        aria-labelledby="fogo-poster-heading"
      >
        <PosterHeader
          name="Fogo"
          asset="fogo.png"
          category="Trading activity"
        />
        <div className="hh-poster-main">
          <h3 className="hh-poster-headline" id="fogo-poster-heading">
            <strong className="hh-poster-number">$5.48M</strong>
            <span>
              Tracked trading volume{' '}
              <span className="hh-result-time">in 2 weeks</span>
            </span>
          </h3>
          <p className="hh-poster-context">Valiant · Fogo ecosystem</p>
        </div>
        <CaseFooter slug="fogo" name="Fogo" />
      </article>
    </div>
  );
}
