import { ArrowRight } from 'lucide-react';

export function VeniceCompletion() {
  return (
    <figure className="hh-completion">
      <div className="hh-completion-ring">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <circle
            cx="100"
            cy="100"
            r="84"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="hh-completion-track"
          />
          <circle
            cx="100"
            cy="100"
            r="84"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            pathLength="100"
            strokeDasharray="73 27"
            transform="rotate(-90 100 100)"
          />
        </svg>
        <strong>
          73<span>%</span>
        </strong>
      </div>
      <figcaption>
        <span className="hh-graphic-label">Feature-use activation</span>
        <h4>Completed all five product tasks.</h4>
        <p>
          <strong>1,287</strong> verified participants
        </p>
        <span className="hh-note">
          Separate two-week feature-use activation.
        </span>
      </figcaption>
    </figure>
  );
}

export function FogoActivation() {
  return (
    <figure className="hh-activation">
      <figcaption>Campaign sequence</figcaption>
      <div className="hh-activation-path">
        <div>
          <span>Build</span>
          <strong>Korean presence</strong>
        </div>
        <ArrowRight aria-hidden="true" />
        <div>
          <span>Activate</span>
          <strong>Trading on Valiant</strong>
        </div>
      </div>
      <p>
        <strong>320</strong> verified wallets
      </p>
    </figure>
  );
}

export function ProcessGraphic({
  stage,
}: {
  stage: 'read' | 'voices' | 'action';
}) {
  if (stage === 'read') {
    return (
      <div className="hh-process-graphic hh-read-graphic">
        <div>
          <span>Your coverage</span>
          <span>Your competitors</span>
          <span>Audience fit</span>
        </div>
        <span className="hh-graphic-bracket" aria-hidden="true" />
        <strong>Your Korea plan</strong>
      </div>
    );
  }
  if (stage === 'voices') {
    return (
      <div className="hh-process-graphic hh-voices-graphic">
        <strong>Your project</strong>
        <svg viewBox="0 0 300 38" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M150 0 V18 M50 38 V18 H250 V38 M150 18 V38"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div>
          <span>Creators</span>
          <span>Analysts</span>
          <span>Communities</span>
        </div>
      </div>
    );
  }
  return (
    <div className="hh-process-graphic hh-action-graphic">
      <strong>A campaign built around your goal</strong>
      <span className="hh-action-connector" aria-hidden="true" />
      <div className="hh-campaign-goals">
        <span>Product use</span>
        <span>Trading activity</span>
        <span>Sale participation</span>
        <span>Ecosystem activity</span>
      </div>
    </div>
  );
}
