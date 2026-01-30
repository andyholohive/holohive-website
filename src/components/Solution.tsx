"use client";

import ScrollReveal from "./ScrollReveal";

const solutions = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    title: "Story That Works",
    description:
      "We rebuild your narrative for how Korea invests. Not translation. Cultural reconstruction.",
    color: "var(--accent)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "On the Ground",
    description:
      "Seoul-based team with deep local networks. We see market shifts before they hit Western radar.",
    color: "var(--accent-teal)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "High-Signal Distribution",
    description:
      "Access to creators who move markets. Vetted for quality, not follower counts.",
    color: "var(--accent-blue)",
  },
];

const antiPitch = [
  "We don't sell impressions",
  "We don't promise overnight miracles",
  "We don't work with everyone",
];

export default function Solution() {
  return (
    <section id="solution" className="section-padding relative overflow-hidden bg-gradient-to-b from-[#111111] via-[#0f0f0f] to-[#111111]">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />

        {/* Diagonal lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 60px, #00D4AA 60px, #00D4AA 61px)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 80px, #8B5CF6 80px, #8B5CF6 81px)',
          }}
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0, 212, 170, 0.4) 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-24 self-start">
            <ScrollReveal>
              <span className="group inline-flex items-center gap-2 text-[var(--accent-teal)] text-sm font-bold tracking-wider uppercase mb-4 bg-[var(--accent-teal)]/10 px-3 py-1 rounded-full cursor-default transition-transform duration-300 hover:scale-110 origin-left">
                <svg className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                What We Do
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground-light)] mb-6 leading-tight">
                Real Traction,{" "}
                <span className="text-[var(--accent-teal)]">
                  Not Vanity Metrics
                </span>
              </h2>
              <p className="text-[var(--foreground-light-secondary)] text-lg mb-8 leading-relaxed">
                We help funded Web3 projects build genuine presence in Korea. No shortcuts, no fake engagement.
              </p>

              {/* Anti-pitch */}
              <div className="space-y-3">
                {antiPitch.map((item, index) => (
                  <div key={index} className="group flex items-center gap-3 text-[var(--foreground-light-secondary)] hover:text-[var(--foreground-light)] transition-all duration-300 cursor-default hover:scale-105 origin-left">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/30 transition-all">
                      <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Solution Cards */}
          <div className="space-y-5">
            {solutions.map((solution, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="group relative bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-[#3a3a3a] rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent-teal)]/10 hover:-translate-y-2 hover:border-[var(--accent-teal)]/40">
                  {/* Gradient glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at top right, ${solution.color}20, transparent 50%)`,
                    }}
                  />

                  {/* Left accent line */}
                  <div
                    className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500"
                    style={{ backgroundColor: solution.color }}
                  />

                  <div className="relative z-10 flex items-start gap-5">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: `${solution.color}20`,
                        color: solution.color,
                      }}
                    >
                      {solution.icon}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[var(--foreground-light)] mb-2 transition-colors duration-300 group-hover:text-[var(--accent-teal)]">
                        {solution.title}
                      </h3>
                      <p className="text-[var(--foreground-light-secondary)] leading-relaxed">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* CTA */}
            <ScrollReveal delay={450}>
              <div className="pt-4">
                <a
                  href="#contact"
                  className="btn-primary inline-flex items-center gap-2 group"
                >
                  Start a conversation
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
