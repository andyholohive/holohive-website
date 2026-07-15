"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";

const banners = [
  "Flying Tulip: 3X conversion in Korea vs. every other region",
  "$65K raised through Korean creators in 6 days",
  "$21.5M in presale deposits. Zero prior Korean presence.",
  "Lore: 3-year+ partnership",
  "$7M+ AUM driven through one BD play",
];

const clients = [
  // Row 1
  { name: "Avalanche", logo: "/logos/avalanche2.png", testimonial: "Holo Hive's help on MapleStory's launch was invaluable.", color: "#E84142", grayscale: true },
  { name: "OKX", logo: "/logos/okx.png", testimonial: "Exceptional execution and deep market understanding.", color: "#2a2a2a" },
  { name: "MapleStory", logo: "/logos/maplestory2.png", testimonial: "They helped us navigate the Korean market with precision.", color: "#FF9900" },
  { name: "Ledger", logo: "/logos/ledger.png", testimonial: "Professional and results-driven.", color: "#FF5300" },
  // Row 2
  { name: "Doodles", logo: "/logos/doodles-2.png", testimonial: "Professional team that delivers real results.", color: "#62B7E4", grayscale: true, large: true },
  { name: "Flying Tulip", logo: "/logos/flying-tulip.png", testimonial: "Excellent execution in the Korean market.", color: "#E11D48" },
  { name: "0G Labs", logo: "/logos/0g.png", testimonial: "A team that truly understands the Korean market.", color: "#7C3AED" },
  { name: "Zetachain", logo: "/logos/zetachain2.png", testimonial: "Deep understanding of the APAC crypto landscape.", color: "#00BC8B" },
  // Row 3
  { name: "NRN", logo: "/logos/nrn-agents.png", testimonial: "Great partners for Asia expansion.", color: "#4ADE80" },
  { name: "MON Protocol", logo: "/logos/monprotocol2-trimmed.png", testimonial: "One of the most professional partners we've worked with.", color: "#2a2a2a", grayscale: true },
  { name: "Fableborne", logo: "/logos/fableborne.png", testimonial: "One of the few teams we'd work with again without hesitation.", color: "#D4AF37", grayscale: true },
  { name: "Fogo", logo: "", testimonial: "You guys have been top tier.", color: "#FFFFFF", svg: true },
];

const vcBackers = [
  { name: "Sequoia", logo: "/logos/ventures/trimmed-Sequoia.png" },
  { name: "Andreessen Horowitz", logo: "/logos/ventures/trimmed-Andreessen Horowitz.png" },
  { name: "Google Ventures", logo: "/logos/ventures/trimmed-Google Ventures.png" },
  { name: "Bain Capital", logo: "/logos/ventures/trimmed-BainCapital.png" },
  { name: "Polychain Capital", logo: "/logos/ventures/trimmed-Polychain Capital.png" },
  { name: "Dragonfly", logo: "/logos/ventures/trimmed-Drgaonfly.png" },
  { name: "Framework", logo: "/logos/ventures/trimmed-framework.png" },
  { name: "Multicoin", logo: "/logos/ventures/trimmed-Multicoin2.png" },
  { name: "Pantera", logo: "/logos/ventures/trimmed-Pantera2.png" },
  { name: "Coinbase", logo: "/logos/coinbase.png" },

  { name: "Paradigm", logo: "/logos/paradigm-trimmed.png" },
  { name: "Binance", logo: "/logos/binance-trimmed.png" },
];

const stats = [
  { value: "100+", label: "Launches", icon: "rocket" },
  { value: "$30B+", label: "Client FDV", icon: "chart" },
  { value: "7+", label: "Years in Web3", icon: "globe" },
  { value: "Seoul", label: "HQ", icon: "location" },
];

export default function Hero() {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    setBannerIndex(Math.floor(Math.random() * banners.length));
  }, []);

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
                  {banners[bannerIndex]}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight text-[var(--foreground-light)]">
                Korea Converts.{" "}
                <span className="gradient-text">We Make It Happen.</span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--foreground-light)] mb-6 max-w-2xl mx-auto leading-relaxed font-medium">
                Korea market activation for funded Web3 projects. 100+ launches. Seoul-based.
              </p>

              {/* Clean CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="#results"
                  className="bg-[#2a2a2a] border border-[#3a3a3a] text-[var(--foreground-light)] hover:border-[var(--accent-teal)] hover:text-[var(--accent-teal)] px-8 py-3 rounded-lg font-semibold transition-all text-base inline-flex items-center justify-center gap-2"
                >
                  See Results
                </a>
                <a
                  href="#contact"
                  className="btn-primary text-base inline-flex items-center justify-center gap-2 group"
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

              {/* Stats inside card */}
              <div className="pt-6 border-t border-[#2a2a2a]">
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4 sm:gap-8 md:gap-12">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground-light)]">
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
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {clients.map((client) => (
              <div
                key={client.name}
                className="relative group w-[calc(50%-6px)] sm:w-[calc(25%-9px)]"
                onMouseEnter={() => setHoveredClient(client.name)}
                onMouseLeave={() => setHoveredClient(null)}
              >
                <div className="relative rounded-2xl p-8 flex items-center justify-center cursor-pointer transition-all duration-300 h-32 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] hover:border-[#3a3a3a] hover:from-[#1f1f1f] hover:to-[#141414] overflow-hidden">
                  {/* Reflection effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  </div>
                  {client.svg ? (
                    <svg width="140" height="46" viewBox="0 0 81.012 26.392" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-12 max-w-[140px] opacity-70 group-hover:opacity-100 transition-opacity">
                      <path d="M 16.192 0 L 6.999 0 L 5.681 5.283 L 1.711 5.283 L 0.042 11.984 C -0.01 12.191 -0.014 12.408 0.03 12.617 C 0.074 12.826 0.166 13.022 0.297 13.191 C 0.428 13.359 0.596 13.496 0.787 13.59 C 0.979 13.684 1.19 13.733 1.404 13.734 L 4.764 13.734 L 1.611 26.392 L 12.327 15.056 C 13.174 14.158 12.541 12.678 11.309 12.678 L 6.185 12.678 L 7.763 6.339 L 16.41 6.339 L 17.551 1.751 C 17.603 1.543 17.607 1.327 17.564 1.118 C 17.52 0.909 17.429 0.713 17.298 0.544 C 17.166 0.375 16.999 0.239 16.807 0.144 C 16.615 0.05 16.405 0.001 16.191 0 Z M 28.691 19.851 L 25.506 19.851 L 25.506 6.136 L 35.498 6.136 L 35.498 8.913 L 28.691 8.913 L 28.691 11.553 L 34.889 11.553 L 34.889 14.33 L 28.691 14.33 Z M 43.584 20.055 C 42.173 20.055 40.94 19.764 39.883 19.183 C 38.843 18.618 37.988 17.765 37.42 16.727 C 36.834 15.672 36.54 14.428 36.54 12.995 C 36.54 11.561 36.834 10.299 37.42 9.245 C 37.987 8.208 38.843 7.358 39.883 6.798 C 40.938 6.223 42.172 5.935 43.584 5.935 C 44.997 5.935 46.245 6.22 47.302 6.789 C 48.341 7.344 49.195 8.192 49.757 9.228 C 50.339 10.283 50.629 11.539 50.629 12.995 C 50.629 14.451 50.335 15.675 49.748 16.737 C 49.182 17.777 48.327 18.63 47.285 19.193 C 46.229 19.768 44.996 20.056 43.584 20.056 Z M 43.601 17.278 C 44.831 17.278 45.779 16.889 46.445 16.11 C 47.112 15.332 47.446 14.293 47.446 12.995 C 47.446 11.695 47.111 10.645 46.445 9.872 C 45.779 9.098 44.826 8.712 43.584 8.712 C 42.343 8.712 41.402 9.098 40.73 9.871 C 40.059 10.645 39.723 11.68 39.723 12.977 C 39.723 14.275 40.059 15.331 40.73 16.111 C 41.401 16.89 42.359 17.279 43.601 17.278 Z M 58.67 20.055 C 57.337 20.055 56.163 19.759 55.148 19.166 C 54.137 18.579 53.313 17.719 52.769 16.685 C 52.2 15.625 51.916 14.4 51.916 13.012 C 51.916 11.624 52.209 10.348 52.796 9.287 C 53.368 8.241 54.229 7.382 55.276 6.814 C 56.342 6.227 57.581 5.933 58.993 5.933 C 60.156 5.933 61.184 6.133 62.076 6.534 C 62.939 6.911 63.691 7.503 64.26 8.253 C 64.824 8.999 65.18 9.89 65.327 10.927 L 62.011 10.927 C 61.899 10.24 61.577 9.704 61.045 9.319 C 60.515 8.935 59.832 8.743 58.997 8.743 C 58.207 8.744 57.519 8.919 56.931 9.267 C 56.345 9.618 55.894 10.115 55.578 10.758 C 55.262 11.4 55.104 12.162 55.105 13.043 C 55.105 13.924 55.268 14.709 55.594 15.364 C 55.899 15.993 56.382 16.52 56.982 16.88 C 57.58 17.235 58.286 17.413 59.099 17.413 C 59.698 17.413 60.231 17.321 60.698 17.135 C 61.166 16.949 61.536 16.695 61.807 16.373 C 62.071 16.071 62.216 15.682 62.214 15.281 L 62.214 14.874 L 58.844 14.874 L 58.844 12.437 L 63.094 12.437 C 63.838 12.437 64.397 12.615 64.771 12.971 C 65.142 13.325 65.328 13.859 65.329 14.571 L 65.329 19.853 L 62.417 19.853 L 62.417 18.398 L 62.332 18.398 C 62.003 18.95 61.535 19.365 60.927 19.642 C 60.318 19.919 59.567 20.058 58.674 20.057 Z M 73.968 20.055 C 72.556 20.055 71.323 19.764 70.266 19.183 C 69.226 18.618 68.371 17.765 67.803 16.727 C 67.216 15.672 66.923 14.428 66.923 12.995 C 66.923 11.561 67.217 10.299 67.803 9.245 C 68.37 8.208 69.225 7.358 70.266 6.798 C 71.322 6.223 72.556 5.935 73.968 5.935 C 75.38 5.935 76.629 6.22 77.684 6.789 C 78.725 7.344 79.579 8.192 80.141 9.228 C 80.722 10.283 81.012 11.539 81.012 12.995 C 81.012 14.451 80.717 15.675 80.131 16.737 C 79.565 17.777 78.709 18.63 77.668 19.193 C 76.613 19.768 75.38 20.056 73.968 20.056 Z M 73.984 17.278 C 75.213 17.278 76.162 16.889 76.829 16.11 C 77.495 15.332 77.828 14.293 77.828 12.995 C 77.828 11.695 77.494 10.645 76.828 9.872 C 76.162 9.098 75.209 8.712 73.968 8.712 C 72.726 8.712 71.785 9.098 71.114 9.871 C 70.442 10.645 70.107 11.68 70.107 12.977 C 70.107 14.275 70.442 15.331 71.114 16.111 C 71.785 16.89 72.741 17.279 73.984 17.278 Z" fill="white"/>
                    </svg>
                  ) : (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={160}
                      height={56}
                      className={`${client.large ? 'max-h-16 max-w-[180px]' : 'max-h-12 max-w-[140px]'} object-contain opacity-70 group-hover:opacity-100 transition-opacity ${client.grayscale ? 'grayscale' : 'brightness-0 invert'}`}
                    />
                  )}
                </div>
                {/* Testimonial Tooltip */}
                {hoveredClient === client.name && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 rounded-xl shadow-2xl min-w-[180px] sm:min-w-[220px] max-w-[250px] sm:max-w-[280px] z-50 bg-[#1a1a1a] border border-[#2a2a2a]">
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
          <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-12 gap-y-3 sm:gap-y-4">
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
          Trusted by teams backed by Sequoia, a16z, Coinbase, Binance, and Paradigm.
        </p>
      </div>
    </section>
  );
}
