"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What makes you different?",
    answer:
      "Most agencies sell vanity metrics. Big numbers in a report, but nobody in the market knows who you are. We build real presence. A story that works. Distribution that counts. Our clients see results they can point to.",
  },
  {
    question: "How long does this take?",
    answer:
      "Typically 3 months. You'll see early signs within the first few weeks, but real results take time. Overnight success is a lie sold by agencies who don't deliver.",
  },
  {
    question: "Why don't you start with a Korean Telegram right away?",
    answer:
      "Empty rooms kill momentum. We fill the queue before we open the doors. Scarcity drives demand.",
  },
  {
    question: "We already have an agency. Why would we need you?",
    answer:
      "We're not trying to replace your agency. We're the Asia (Korea) layer. The local relationships and distribution your global agency can't provide. We work alongside whatever team you have.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-gradient-to-b from-[#0f0f0f] via-[#0c0c0c] to-[#0a0a0a]">
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
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Column - Header */}
          <div className="self-start">
            <span className="group inline-flex items-center gap-2 text-[var(--accent-teal)] text-sm font-bold tracking-wider uppercase mb-4 bg-[var(--accent-teal)]/10 px-3 py-1 rounded-full cursor-default transition-transform duration-300 hover:scale-110 origin-left">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Questions
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground-light)] mb-6">
              Before You <br />
              <span className="text-[var(--accent-teal)]">Reach Out</span>
            </h2>
            <p className="text-[var(--foreground-light-secondary)] mb-8 leading-relaxed">
              We know you have questions. Here are the ones we hear most often from founders considering Asia expansion.
            </p>

            {/* Quick stats */}
            <div className="flex gap-4">
              <div className="group flex items-center gap-4 bg-[#1a1a1a] rounded-xl px-5 py-4 border border-[#2a2a2a] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[var(--accent-teal)]/30">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--accent-teal)] to-emerald-500 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md shadow-[var(--accent-teal)]/20">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--foreground-light)]">48hr</div>
                  <div className="text-sm text-[var(--foreground-light-secondary)]">Response Time</div>
                </div>
              </div>
              <div className="group flex items-center gap-4 bg-[#1a1a1a] rounded-xl px-5 py-4 border border-[#2a2a2a] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-purple-400/30">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md shadow-purple-500/20">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                    <path d="M9 14l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--foreground-light)]">60s</div>
                  <div className="text-sm text-[var(--foreground-light-secondary)]">Form Completion</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-[#2a2a2a] border rounded-xl overflow-hidden transition-all ${
                  openIndex === index
                    ? "border-[var(--accent-teal)]/30"
                    : "border-[#3a3a3a]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-[#3a3a3a]/50 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <span className={`text-sm font-mono mt-0.5 transition-colors ${
                      openIndex === index ? "text-[var(--accent-teal)]" : "text-[var(--foreground-light-secondary)]"
                    }`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-[var(--foreground-light)] pr-4 text-left">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    openIndex === index
                      ? "bg-[var(--accent-teal)] text-[var(--background-dark)] rotate-180"
                      : "bg-[#3a3a3a] text-[var(--foreground-light-secondary)]"
                  }`}>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 pl-16">
                    <p className="text-[var(--foreground-light-secondary)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* More questions CTA */}
            <div className="text-center pt-6">
              <p className="text-[var(--foreground-light-secondary)] text-sm">
                Have a different question?{" "}
                <a href="#contact" className="text-[var(--accent-teal)] hover:underline">
                  Ask us directly
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
