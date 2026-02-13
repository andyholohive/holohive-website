"use client";

import ScrollReveal from "./ScrollReveal";

const problems = [
  {
    number: "01",
    title: "The Farmer Trap",
    description:
      "You get users, but they're farming points with zero liquidity. When incentives stop, they leave. Mercenaries dump. Believers hold. You’re currently paying for the dump.",
    stat: "90%",
    statLabel: "of airdrop farmers leave within 30 days",
  },
  {
    number: "02",
    title: "The Translation Trap",
    description:
      "You translated your tweets and called it marketing. Korean investors scroll right past. Without local context and local voices, you are background noise.",
    stat: "0.1%",
    statLabel: "engagement on translated content",
  },
  {
    number: "03",
    title: "The Vanity Metric Trap",
    description:
      "Your agency sends reports with millions of impressions. Nobody in Korea knows who you are. You are paying for screenshots in a PDF.",
    stat: "10M+",
    statLabel: "impressions with zero conversions",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="section-padding relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#151515] to-[#111111]">
      {/* Animated Grid pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 opacity-[0.2] animate-grid-scroll"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 text-red-400 text-sm font-semibold tracking-wider uppercase mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              The Reality
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground-light)] mb-6">
              Why Most Projects <br className="hidden md:block" />
              <span className="text-[var(--foreground-light-secondary)]">Burn Money in Korea</span>
            </h2>
            <p className="text-[var(--foreground-light-secondary)] max-w-2xl mx-auto">
              These are the patterns we see over and over. Projects that spend months and hundreds of thousands in Korea with nothing to show for it.
            </p>
          </div>
        </ScrollReveal>

        {/* Problem Cards - Staggered Layout */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div
                className={`flex flex-col lg:flex-row gap-6 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
              {/* Card */}
              <div className="flex-1 bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-2xl p-8 relative overflow-hidden group hover:border-red-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:via-transparent group-hover:to-red-500/10 transition-all duration-500" />

                {/* Number badge */}
                <div className="absolute top-6 right-6 text-6xl font-bold text-[var(--border-dark)] group-hover:text-red-500/20 transition-colors duration-300">
                  {problem.number}
                </div>

                {/* Red accent line */}
                <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-red-500 to-red-500/0 group-hover:h-full transition-all duration-500" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-[var(--foreground-light)] group-hover:text-red-400 transition-colors duration-300">
                    {problem.title}
                  </h3>
                  <p className="text-[var(--foreground-light-secondary)] leading-relaxed text-lg">
                    {problem.description}
                  </p>
                </div>
              </div>

              {/* Stat Box */}
              <div className="lg:w-48 flex-shrink-0">
                <div className="bg-[var(--card-dark)]/50 border border-[var(--border-dark)] rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-red-400 mb-1">
                    {problem.stat}
                  </div>
                  <div className="text-xs text-[var(--foreground-light-secondary)] leading-tight">
                    {problem.statLabel}
                  </div>
                </div>
              </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-[var(--foreground-light)] text-lg font-medium mb-6">Sound familiar? Here is what actually works.</p>
          <a href="#solution" className="inline-flex items-center gap-2 text-[var(--accent-teal)] font-medium hover:gap-3 transition-all">
            See what actually works
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
