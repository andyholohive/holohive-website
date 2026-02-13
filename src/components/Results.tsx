"use client";

import AnimatedCounter from "./AnimatedCounter";
import ScrollReveal from "./ScrollReveal";

const results = [
  {
    project: "Fableborne",
    value: "$21.5M",
    label: "Presale Deposits",
    context:
      "Gaming tokens down 60%. Bear market. Zero Korean presence before us.",
    quote:
      "One of the few teams in Web3 we'd work with again without hesitation.",
    attribution: "Kam Punia, CEO",
  },
  {
    project: "Space",
    value: "$65K",
    label: "Raised in 6 Days",
    context: "13X ROI. 42% conversion rate. Industry benchmark is 10-20%.",
    quote: "It's amazing what you guys pulled off.",
    attribution: "Zero, Co-Founder",
  },
  {
    project: "Flying Tulip",
    value: "3X",
    label: "Conversion vs. Every Other Region",
    context:
      "$200M seed. $1B valuation. Korea outperformed every market they launched in.",
    quote: null,
    attribution: null,
  },
];

export default function Results() {
  return (
    <section id="results" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 text-[var(--accent-teal)] text-sm font-semibold tracking-wider uppercase mb-4">
              Results
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground-light)]">
              Numbers, Not Promises
            </h2>
          </div>
        </ScrollReveal>

        {/* Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {results.map((result, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-2xl p-8 h-full flex flex-col hover:border-[var(--accent-teal)]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(45,212,191,0.1)]">
                {/* Project Name */}
                <span className="text-xs font-semibold tracking-wider uppercase text-[var(--foreground-light-secondary)] mb-4">
                  {result.project}
                </span>

                {/* Animated Number */}
                <AnimatedCounter
                  value={result.value}
                  className="text-5xl lg:text-6xl font-bold gradient-text mb-2"
                />

                {/* Label */}
                <span className="text-lg font-medium text-[var(--foreground-light)] mb-3">
                  {result.label}
                </span>

                {/* Context */}
                <p className="text-sm text-[var(--foreground-light-secondary)] leading-relaxed mb-6">
                  {result.context}
                </p>

                {/* Quote */}
                {result.quote && (
                  <blockquote className="mt-auto border-t border-[var(--border-dark)] pt-5">
                    <p className="text-sm italic text-[var(--foreground-light-secondary)] mb-2">
                      &ldquo;{result.quote}&rdquo;
                    </p>
                    <cite className="text-xs text-[var(--accent-teal)] not-italic">
                      &mdash; {result.attribution}
                    </cite>
                  </blockquote>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
