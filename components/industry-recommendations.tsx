/* oxlint-disable nextjs/no-img-element -- Authentic, pre-sized portraits from the existing public site. */
import { industryRecommendations } from '@/lib/industry-recommendations';

export function IndustryRecommendations() {
  return (
    <section className="hh-peer-recommendations" aria-labelledby="peer-heading">
      <h3 id="peer-heading" className="hh-quote-group-label">
        Recommended by industry peers.
      </h3>
      <div className="hh-testimonial-grid hh-peer-grid">
        {industryRecommendations.map(
          ({ name, affiliation, portrait, quote, source }) => (
            <figure className="hh-testimonial" key={name}>
              <blockquote cite={source}>“{quote}”</blockquote>
              <figcaption>
                <div className="hh-quote-person">
                  <img
                    src={portrait}
                    alt=""
                    width="52"
                    height="52"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <strong>{name}</strong>
                    <span>{affiliation}</span>
                  </div>
                </div>
              </figcaption>
            </figure>
          ),
        )}
      </div>
    </section>
  );
}
