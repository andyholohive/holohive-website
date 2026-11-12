/* oxlint-disable nextjs/no-img-element -- Actual supplied Venice campaign image. */
export function VeniceCampaignStory() {
  return (
    <section
      className="hh-campaign-story"
      id="campaign"
      aria-labelledby="campaign-story-heading"
    >
      <div className="hh-campaign-story-heading">
        <p className="eyebrow">Inside the work / Venice</p>
        <h2 id="campaign-story-heading">From explanation to hands-on use.</h2>
      </div>
      <div className="hh-campaign-story-layout">
        <figure className="hh-campaign-object">
          <div className="hh-campaign-object-label">
            <span>Campaign experience</span>
            <span>Built by Holo Hive</span>
          </div>
          <img
            src="/assets/venice-campaign.jpg"
            alt="Venice Korea campaign page: Try Venice. Win your share."
            width="1600"
            height="728"
            loading="lazy"
          />
          <figcaption>The actual Korea campaign page.</figcaption>
        </figure>
        <ol
          className="hh-campaign-participation"
          aria-label="What participants were asked to do"
        >
          <li>
            <span>01</span>
            <strong>Try five features</strong>
          </li>
          <li>
            <span>02</span>
            <strong>Submit proof of use</strong>
          </li>
        </ol>
      </div>
      <dl
        className="hh-campaign-outcomes"
        aria-label="Separate feature-use activation records"
      >
        <div>
          <dt>Entry records</dt>
          <dd>1,287</dd>
        </div>
        <div>
          <dt>Screenshots submitted</dt>
          <dd>5,134</dd>
        </div>
        <div>
          <dt>Entries with five screenshots</dt>
          <dd>
            73<span>%</span>
          </dd>
        </div>
      </dl>
      <p className="hh-campaign-cohort-note">
        Separate feature-use activation. Gross entry and screenshot counts; not
        verified unique users or proof of five distinct features used.
      </p>
    </section>
  );
}
