"use client";

import Image from "next/image";
import { useState } from "react";

const clients = [
  { name: "OKX", logo: "/logos/okx.png", testimonial: "Exceptional execution and deep market understanding.", color: "#000000" },
  { name: "Avalanche", logo: "/logos/avalanche.png", testimonial: "Holo Hive's help on MapleStory's launch was invaluable.", color: "#E84142" },
  { name: "MapleStory", logo: "/logos/maplestory.png", testimonial: "They helped us navigate the Korean market with precision.", color: "#FF9900" },
  { name: "Doodles", logo: "/logos/doodles.png", testimonial: "Professional team that delivers real results.", color: "#62B7E4" },
  { name: "MON Protocol", logo: "/logos/pixelmon-mon.png", testimonial: "One of the most professional partners we've worked with.", color: "#000000", darkBg: true },
  { name: "Zetachain", logo: "/logos/zetachain.png", testimonial: "Deep understanding of the APAC crypto landscape.", color: "#00BC8B" },
  { name: "Fableborne", logo: "/logos/fableborne.png", testimonial: "One of the few teams we'd work with again without hesitation.", color: "#D4AF37" },
  { name: "Magic Eden", logo: "/logos/magic-eden.png", testimonial: "Strong relationships and flawless execution.", color: "#E42575" },
  { name: "Solana", logo: "/logos/solana.png", testimonial: "They know how to move the needle in Korea.", color: "#9945FF" },
];

const vcBackers = ["Coinbase Ventures", "a16z", "Paradigm", "Binance Labs"];

const stats = [
  { value: "75+", label: "Projects Launched", icon: "rocket" },
  { value: "$30B+", label: "Client FDV", icon: "chart" },
  { value: "35%", label: "Korea Crypto Volume", icon: "globe" },
  { value: "Seoul", label: "Based Team", icon: "location" },
];

export default function Hero() {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen flex flex-col pt-8 pb-16 px-4 md:px-6 overflow-hidden bg-white">
      {/* Section background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50">
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
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Hero Card - outside container for more width */}
      <div className="max-w-[1600px] w-full mx-auto mb-16 animate-fade-in px-4 md:px-8">
        <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl border border-gray-200/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent-teal)]/10 hover:border-[var(--accent-teal)]/30 hover:-translate-y-1">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-[var(--accent-teal)]/5 transition-opacity duration-500 group-hover:opacity-0" />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-teal)]/5 via-transparent to-purple-400/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-[var(--accent-teal)]/10 rounded-full px-4 py-2 mb-5">
                <span className="w-2 h-2 bg-[var(--accent-teal)] rounded-full"></span>
                <span className="text-[var(--accent)] text-sm font-medium">
                  Seoul-Based Web3 Growth Agency
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight text-[var(--foreground)]">
                Stop Guessing in{" "}
                <span className="gradient-text">Asia.</span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--foreground-secondary)] mb-6 max-w-2xl mx-auto leading-relaxed">
                Korea and China growth for funded Web3 projects.
                <span className="text-[var(--foreground)] font-medium"> Real traction, not vanity metrics.</span>
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
                  className="bg-gray-50 border border-gray-200 text-[var(--foreground)] hover:border-[var(--accent-teal)] hover:text-[var(--accent-teal)] px-8 py-3 rounded-lg font-semibold transition-all text-base inline-flex items-center justify-center gap-2"
                >
                  See Results
                </a>
              </div>

              {/* Stats inside card */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-8 md:gap-12">
                      <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                          {stat.value}
                        </div>
                        <div className="text-sm text-[var(--foreground-secondary)] mt-1">{stat.label}</div>
                      </div>
                      {index < stats.length - 1 && (
                        <div className="hidden md:block w-px h-12 bg-gray-200" />
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
        <div className="mb-12">
          <p className="text-center text-[var(--foreground-secondary)] text-sm font-medium mb-8 uppercase tracking-wider">
            Trusted by Leading Projects
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {clients.map((client) => (
              <div
                key={client.name}
                className="relative"
                onMouseEnter={() => setHoveredClient(client.name)}
                onMouseLeave={() => setHoveredClient(null)}
              >
                <div
                  className="rounded-xl p-4 flex items-center justify-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg h-16"
                  style={{ backgroundColor: client.darkBg ? client.color + '90' : client.color + '35' }}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={100}
                    height={32}
                    className="h-7 w-auto object-contain"
                  />
                </div>
                {/* Testimonial Tooltip */}
                {hoveredClient === client.name && (
                  <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 rounded-xl shadow-2xl min-w-[220px] max-w-[280px] z-50"
                    style={{ backgroundColor: client.color }}
                  >
                    <p className="text-sm text-white leading-relaxed font-medium">&ldquo;{client.testimonial}&rdquo;</p>
                    <p className="text-xs mt-2 text-white/80">{client.name}</p>
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent"
                      style={{ borderTopColor: client.color }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* VC Backers */}
        <div className="text-center">
          <p className="text-[var(--foreground-secondary)] text-xs mb-3 uppercase tracking-wider">
            Our clients are backed by
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {vcBackers.map((vc) => (
              <span
                key={vc}
                className="text-[var(--foreground-secondary)] text-sm font-medium"
              >
                {vc}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-[var(--foreground-secondary)] text-sm mt-12">
          Working with Western founders since 2021
        </p>
      </div>
    </section>
  );
}
