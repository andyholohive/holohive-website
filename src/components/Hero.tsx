"use client";

import Image from "next/image";
import { useState } from "react";
import AnimatedCounter from "./AnimatedCounter";

const clients = [
  { name: "OKX", logo: "/logos/okx.png", testimonial: "Exceptional execution and deep market understanding.", color: "#2a2a2a" },
  { name: "Avalanche", logo: "/logos/avalanche2.png", testimonial: "Holo Hive's help on MapleStory's launch was invaluable.", color: "#E84142", grayscale: true },
  { name: "MapleStory", logo: "/logos/maplestory2.png", testimonial: "They helped us navigate the Korean market with precision.", color: "#FF9900" },
  { name: "Doodles", logo: "/logos/doodles-2.png", testimonial: "Professional team that delivers real results.", color: "#62B7E4", grayscale: true },
  { name: "MON Protocol", logo: "/logos/monprotocol2-trimmed.png", testimonial: "One of the most professional partners we've worked with.", color: "#2a2a2a", grayscale: true },
  { name: "Zetachain", logo: "/logos/zetachain2.png", testimonial: "Deep understanding of the APAC crypto landscape.", color: "#00BC8B" },
  { name: "Fableborne", logo: "/logos/fableborne.png", testimonial: "One of the few teams we'd work with again without hesitation.", color: "#D4AF37", grayscale: true },
  { name: "Magic Eden", logo: "/logos/magic-eden2-trimmed.png", testimonial: "Strong relationships and flawless execution.", color: "#E42575" },
  { name: "0G Labs", logo: "/logos/0g.png", testimonial: "A team that truly understands the Korean market.", color: "#7C3AED" },
  { name: "Ledger", logo: "/logos/ledger.png", testimonial: "Professional and results-driven.", color: "#FF5300" },
  { name: "NRN", logo: "/logos/nrn-agents.png", testimonial: "Great partners for Asia expansion.", color: "#4ADE80" },
  { name: "Flying Tulip", logo: "/logos/flying-tulip.png", testimonial: "Excellent execution in the Korean market.", color: "#E11D48" },
];

const vcBackers = [
  { name: "Sequoia", logo: "/logos/ventures/trimmed-Sequoia.png" },
  { name: "Andreessen Horowitz", logo: "/logos/ventures/trimmed-Andreessen Horowitz.png" },
  { name: "Google Ventures", logo: "/logos/ventures/trimmed-Google Ventures.png" },
  { name: "Bain Capital", logo: "/logos/ventures/trimmed-BainCapital.png" },
  { name: "Polychain Capital", logo: "/logos/ventures/trimmed-Polychain Capital.png" },
  { name: "Dragonfly", logo: "/logos/ventures/trimmed-Drgaonfly.png" },
  { name: "Framework", logo: "/logos/ventures/trimmed-framework.png" },
  { name: "Golden Ventures", logo: "/logos/ventures/trimmed-Golden Ventures.png" },
  { name: "VersionOne", logo: "/logos/ventures/trimmed-versionone.png" },
  { name: "Coinbase", logo: "/logos/coinbase.png" },
  { name: "a16z", logo: "/logos/a16z.png" },
  { name: "Paradigm", logo: "/logos/paradigm-trimmed.png" },
  { name: "Binance", logo: "/logos/binance-trimmed.png" },
];

const stats = [
  { value: "75+", label: "Projects Launched", icon: "rocket" },
  { value: "$30B+", label: "Client FDV", icon: "chart" },
  { value: "16M+", label: "Koreans drive 16% of global volume", icon: "globe" },
  { value: "Seoul", label: "Based Team", icon: "location" },
];

export default function Hero() {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen flex flex-col pt-6 pb-12 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#0a0a0a]">
      {/* Section background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
        {/* Soft gradient blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--accent-teal)]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-300/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-200/10 rounded-full blur-[80px]" />

        {/* Diagonal lines across */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 60px, #00D4AA 60px, #00D4AA 61px)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.03]"
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

      {/* Hero Card - outside container for more width */}
      <div className="max-w-[1600px] w-full mx-auto mb-10 animate-fade-in px-4 md:px-8">
        <div className="group relative bg-[#1a1a1a]/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl border border-[#2a2a2a] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent-teal)]/10 hover:border-[var(--accent-teal)]/30 hover:-translate-y-1">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1f1f1f]/50 via-transparent to-[var(--accent-teal)]/5 transition-opacity duration-500 group-hover:opacity-0" />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-teal)]/5 via-transparent to-purple-400/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-[var(--accent-teal)]/10 rounded-full px-4 py-2 mb-5">
                <span className="w-2 h-2 bg-[var(--accent-teal)] rounded-full"></span>
                <span className="text-[var(--accent-teal)] text-sm font-medium">
                  Recent client: 3x higher conversion in Korea than global
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight text-[var(--foreground-light)]">
                Stop Guessing in{" "}
                <span className="gradient-text">Asia.</span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--foreground-light-secondary)] mb-6 max-w-2xl mx-auto leading-relaxed">
                Korea dominance for market-leading teams.
                <br />
                Not translated tweets. Not inflated reports.
                <br />
                <span className="text-[var(--foreground-light)] font-medium">Real traction, not vanity metrics.</span>
              </p>

              {/* Clean CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="#contact"
                  className="btn-primary text-base inline-flex items-center justify-center gap-2 group"
                >
                  Get in Touch
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#proof"
                  className="bg-[#2a2a2a] border border-[#3a3a3a] text-[var(--foreground-light)] hover:border-[var(--accent-teal)] hover:text-[var(--accent-teal)] px-8 py-3 rounded-lg font-semibold transition-all text-base inline-flex items-center justify-center gap-2"
                >
                  See Results
                </a>
              </div>

              {/* Stats inside card */}
              <div className="pt-6 border-t border-[#2a2a2a]">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-8 md:gap-12">
                      <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-[var(--foreground-light)]">
                          <AnimatedCounter value={stat.value} />
                        </div>
                        <div className="text-sm text-[var(--foreground-light-secondary)] mt-1">{stat.label}</div>
                      </div>
                      {index < stats.length - 1 && (
                        <div className="hidden md:block w-px h-12 bg-[#3a3a3a]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="container-custom relative z-10">
        {/* Client Logos */}
        <div className="mb-8">
          <p className="text-center text-[var(--foreground-light-secondary)] text-sm font-medium mb-8 uppercase tracking-wider">
            Trusted by Leading Projects
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {clients.map((client) => (
              <div
                key={client.name}
                className="relative group"
                onMouseEnter={() => setHoveredClient(client.name)}
                onMouseLeave={() => setHoveredClient(null)}
              >
                <div className="relative rounded-2xl p-8 flex items-center justify-center cursor-pointer transition-all duration-300 h-32 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] hover:border-[#3a3a3a] hover:from-[#1f1f1f] hover:to-[#141414] overflow-hidden">
                  {/* Reflection effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  </div>
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={160}
                    height={56}
                    className={`max-h-12 max-w-[140px] object-contain opacity-70 group-hover:opacity-100 transition-opacity ${client.grayscale ? 'grayscale' : 'brightness-0 invert'}`}
                  />
                </div>
                {/* Testimonial Tooltip */}
                {hoveredClient === client.name && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 rounded-xl shadow-2xl min-w-[220px] max-w-[280px] z-50 bg-[#1a1a1a] border border-[#2a2a2a]">
                    <p className="text-sm text-white leading-relaxed font-medium">&ldquo;{client.testimonial}&rdquo;</p>
                    <p className="text-xs mt-2 text-[var(--accent-teal)]">{client.name}</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1a1a1a]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* VC Backers */}
        <div className="text-center">
          <p className="text-[var(--foreground-light-secondary)] text-xs mb-3 uppercase tracking-wider">
            Our clients are backed by
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            {vcBackers.map((vc) => (
              <div key={vc.name} className="w-28 h-10 flex items-center justify-center">
                <Image
                  src={vc.logo}
                  alt={vc.name}
                  width={140}
                  height={50}
                  className="max-h-full max-w-full object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-[var(--foreground-light-secondary)] text-sm mt-8">
          Working with Western founders since 2021
        </p>
      </div>
    </section>
  );
}
