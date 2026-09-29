/* oxlint-disable jsx-a11y/prefer-tag-over-role, jsx-a11y/no-redundant-roles -- Explicit list roles preserve Safari/VoiceOver semantics when list markers are removed. */
import { useId } from 'react';
import { Repeat2 } from 'lucide-react';

// A conceptual mechanism, not a measured funnel. Meaningful labels stay in
// HTML so they remain readable independently of the decorative geometry.
function HoloOrbit({
  className,
  nested = false,
}: {
  className: string;
  nested?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {nested && <path d="M162.1 100H200" />}
      <g transform="rotate(-45 100 100)">
        <ellipse cx="100" cy="100" rx="92" ry="50" />
        {nested && <ellipse cx="100" cy="100" rx="57" ry="31" />}
      </g>
    </svg>
  );
}

function FlowConnector() {
  return (
    <div className="hh-presence-connector" aria-hidden="true">
      <svg viewBox="0 0 48 24" aria-hidden="true" focusable="false">
        <path d="M2 12H44M36 4L44 12L36 20" />
      </svg>
    </div>
  );
}

function AudienceSelection() {
  return (
    <div className="hh-audience-selection">
      <div className="hh-audience-compass">
        <HoloOrbit className="hh-audience-orbit" />
        <span className="hh-audience-goal">Your goal</span>
        <svg
          className="hh-audience-branches"
          viewBox="0 0 300 48"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M150 0V18M46 48V28Q46 18 56 18H244Q254 18 254 28V48M150 18V48" />
        </svg>
        <ul
          className="hh-audience-options"
          role="list"
          aria-label="Possible audiences, selected according to your goal"
        >
          <li>
            <span>
              Product
              <br />
              users
            </span>
          </li>
          <li>Investors</li>
          <li>
            <span>
              Ecosystem
              <br />
              builders
            </span>
          </li>
        </ul>
      </div>
      <span className="hh-presence-note">
        Selected for your goal—not follower count.
      </span>
    </div>
  );
}

function CreatorRhythm() {
  return (
    <div className="hh-creator-rhythm">
      <span className="hh-creator-rhythm-label">
        Voices your audience trusts
      </span>
      <ul
        className="hh-creator-formats"
        role="list"
        aria-label="Examples of recurring creator content"
      >
        <li>
          <span>Explanation</span>
        </li>
        <li>
          <span>Experience</span>
        </li>
        <li>
          <span>Perspective</span>
        </li>
        <li>
          <span>Updates</span>
        </li>
      </ul>
      <span className="hh-creator-cadence">
        <Repeat2 size={18} aria-hidden="true" focusable="false" />
        Useful content, over time.
      </span>
    </div>
  );
}

function GoalLedParticipation() {
  return (
    <div className="hh-wider-discussion">
      <div className="hh-participation-map">
        <span className="hh-participation-qualifier">
          Depending on your goal
        </span>
        <div className="hh-participation-source">
          <HoloOrbit className="hh-discussion-origin" nested />
          <span>Wider discussion</span>
        </div>
        <svg
          className="hh-participation-paths"
          viewBox="0 0 80 240"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <g className="hh-discussion-connections">
            <path d="M0 120C32 120 22 40 66 40M0 120H66M0 120C32 120 22 200 66 200" />
            <path
              className="hh-discussion-potential"
              d="M66 40H80M66 120H80M66 200H80"
            />
          </g>
        </svg>
        <ul
          className="hh-participation-outcomes"
          role="list"
          aria-label="Examples of participation, depending on your goal"
        >
          <li>
            <span>Product use</span>
          </li>
          <li>
            <span>Launch participation</span>
          </li>
          <li>
            <span>Relevant introductions</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function ApproachDistinctions() {
  const captionId = useId();
  return (
    <figure className="hh-presence-system" aria-labelledby={captionId}>
      <div className="hh-presence-flow">
        <section className="hh-presence-zone">
          <header className="hh-presence-heading">
            <p className="hh-presence-problem">Reach without relevance</p>
            <h3>Reach the right Korean audiences.</h3>
          </header>
          <AudienceSelection />
        </section>
        <FlowConnector />
        <section className="hh-presence-zone">
          <header className="hh-presence-heading">
            <p className="hh-presence-problem">Mentions without credibility</p>
            <h3>Become a project worth following.</h3>
          </header>
          <CreatorRhythm />
        </section>
        <FlowConnector />
        <section className="hh-presence-zone">
          <header className="hh-presence-heading">
            <p className="hh-presence-problem">Attention without action</p>
            <h3>Give interest somewhere to go.</h3>
          </header>
          <GoalLedParticipation />
        </section>
      </div>
      <div className="hh-presence-feedback">
        <svg
          viewBox="0 0 1000 52"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M985 0V16C985 36 970 46 950 46H50C30 46 15 36 15 16V2M8 10L15 2L22 10" />
        </svg>
        <p>
          <Repeat2 size={18} aria-hidden="true" focusable="false" />
          Questions, participation and results shape the next move.
        </p>
      </div>
      <figcaption id={captionId}>
        Illustrative mechanism · shaped around your goals
      </figcaption>
    </figure>
  );
}
