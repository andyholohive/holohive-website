import ScrollReveal from "./ScrollReveal";

const calendarIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const steps = [
  {
    month: "Week 1-2",
    title: "Foundation",
    description:
      "We analyze your positioning and rebuild it for Korea. What angle resonates. What story gets creators invested. What makes Korean audiences care.",
    tasks: ["Market Analysis", "Narrative Development", "Competitive Positioning"],
    icon: calendarIcon,
    color: "var(--accent)",
  },
  {
    month: "Week 2-4",
    title: "Seeding",
    description:
      "We build awareness through creators who explain why your project matters. Credibility before conversion.",
    tasks: ["Creator Activation", "Content Seeding", "Trust Building"],
    icon: calendarIcon,
    color: "var(--accent-teal)",
  },
  {
    month: "Month 2-3",
    title: "Amplification",
    description:
      "Once there is traction, we scale it. Coordinated campaigns, conversion paths, and performance tracking against the metrics that matter to you.",
    tasks: ["Campaign Launch", "Conversion Paths", "Performance Optimization"],
    icon: calendarIcon,
    color: "var(--accent-blue)",
  },
];

export default function Process() {
  return (
    <section id="process" className="section-padding relative overflow-hidden bg-gradient-to-b from-[#111111] via-[#141414] to-[#1a1a1a]">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[var(--accent-teal)]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

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
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="text-[var(--accent-teal)] text-sm font-semibold tracking-wider uppercase mb-4 block">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground-light)] mb-6">
              A Clear Path to{" "}
              <span className="gradient-text">Results</span>
            </h2>
            <p className="text-[var(--foreground-light-secondary)] text-lg">
              No black boxes. A structured approach that builds real presence in Korea.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border-dark)] md:-translate-x-px" />

            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 200} className={index < steps.length - 1 ? "mb-10 sm:mb-0" : ""}>
                <div className={`relative flex items-start gap-8 sm:mb-8 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}>
                  {/* Timeline node */}
                  <div className="absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className="w-4 h-4 rounded-full pulse-glow"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ml-14 sm:ml-20 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}>
                    <div className={`relative group bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-2xl p-6 card-hover ${
                      index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                    }`}>
                      {/* Accent corner */}
                      <div
                        className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-2xl"
                        style={{
                          background: `radial-gradient(circle at top right, ${step.color}10, transparent 70%)`,
                        }}
                      />

                      <div className="relative z-10">
                        {/* Month badge */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                          index % 2 === 0 ? "md:ml-auto" : ""
                        }`}
                          style={{
                            backgroundColor: `${step.color}15`,
                            color: step.color,
                          }}
                        >
                          {step.icon}
                          {step.month}
                        </div>

                        <h3 className="text-xl font-semibold text-[var(--foreground-light)] mb-3">
                          {step.title}
                        </h3>
                        <p className="text-[var(--foreground-light-secondary)] mb-4 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Tasks */}
                        <div className={`flex flex-wrap gap-2 ${
                          index % 2 === 0 ? "md:justify-end" : ""
                        }`}>
                          {step.tasks.map((task, taskIndex) => (
                            <span
                              key={taskIndex}
                              className="text-xs text-[var(--foreground-light-secondary)] bg-[var(--background-dark)] border border-[var(--border-dark)] px-3 py-1 rounded-full"
                            >
                              {task}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <ScrollReveal delay={500}>
          <div className="max-w-4xl mx-auto mt-10 text-center">
            <div className="inline-flex items-center gap-3 bg-[var(--accent-teal)]/10 border border-[var(--accent-teal)]/20 rounded-full px-6 py-3">
              <svg className="w-5 h-5 text-[var(--accent-teal)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[var(--foreground-light)] text-sm md:text-base font-medium">
                If we do not hit the agreed metrics by Day 90, we keep working at no extra cost until we do.
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={600}>
          <div className="text-center mt-16">
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2 group"
            >
              Talk to Us
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
    </section>
  );
}
