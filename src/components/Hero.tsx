"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";

const banners = [
  "Flying Tulip: 3X conversion in Korea vs. every other region",
  "$65K raised through Korean creators in 6 days",
  "$21.5M in presale deposits. Zero prior Korean presence.",
];

const clients = [
  { name: "*Space", logo: "", testimonial: "You guys have been top tier.", color: "#FFFFFF", svg: true },
  { name: "Fableborne", logo: "/logos/fableborne.png", testimonial: "One of the few teams we'd work with again without hesitation.", color: "#D4AF37", grayscale: true },
  { name: "Flying Tulip", logo: "/logos/flying-tulip.png", testimonial: "Excellent execution in the Korean market.", color: "#E11D48" },
  { name: "OKX", logo: "/logos/okx.png", testimonial: "Exceptional execution and deep market understanding.", color: "#2a2a2a" },
  { name: "Avalanche", logo: "/logos/avalanche2.png", testimonial: "Holo Hive's help on MapleStory's launch was invaluable.", color: "#E84142", grayscale: true },
  { name: "MapleStory", logo: "/logos/maplestory2.png", testimonial: "They helped us navigate the Korean market with precision.", color: "#FF9900" },
  { name: "Doodles", logo: "/logos/doodles-2.png", testimonial: "Professional team that delivers real results.", color: "#62B7E4", grayscale: true },
  { name: "MON Protocol", logo: "/logos/monprotocol2-trimmed.png", testimonial: "One of the most professional partners we've worked with.", color: "#2a2a2a", grayscale: true },
  { name: "Zetachain", logo: "/logos/zetachain2.png", testimonial: "Deep understanding of the APAC crypto landscape.", color: "#00BC8B" },
  { name: "Magic Eden", logo: "/logos/magic-eden2-trimmed.png", testimonial: "Strong relationships and flawless execution.", color: "#E42575" },
  { name: "0G Labs", logo: "/logos/0g.png", testimonial: "A team that truly understands the Korean market.", color: "#7C3AED" },
  { name: "Ledger", logo: "/logos/ledger.png", testimonial: "Professional and results-driven.", color: "#FF5300" },
  { name: "NRN", logo: "/logos/nrn-agents.png", testimonial: "Great partners for Asia expansion.", color: "#4ADE80" },
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
  { value: "Seoul", label: "Based Team", icon: "location" },
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
                  className="btn-primary text-base inline-flex items-center justify-center gap-2 group"
                >
                  See Results
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
                  href="#contact"
                  className="bg-[#2a2a2a] border border-[#3a3a3a] text-[var(--foreground-light)] hover:border-[var(--accent-teal)] hover:text-[var(--accent-teal)] px-8 py-3 rounded-lg font-semibold transition-all text-base inline-flex items-center justify-center gap-2"
                >
                  Talk to Us
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
                    <svg width="139" height="32" viewBox="0 0 139 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-h-12 max-w-[140px] opacity-70 group-hover:opacity-100 transition-opacity">
                      <path fillRule="evenodd" clipRule="evenodd" d="M76.7903 7.26949C78.6517 7.2695 80.1792 7.73275 81.3725 8.65914C82.5897 9.56187 83.4847 10.7619 84.0575 12.2585C84.6541 13.7551 84.9525 15.394 84.9525 17.1756C84.9525 18.9573 84.6542 20.5972 84.0575 22.0939C83.4847 23.5903 82.5896 24.8017 81.3725 25.7281C80.1792 26.6307 78.6518 27.0817 76.7903 27.0817C75.5731 27.0817 74.4632 26.8213 73.4608 26.2988C72.4584 25.7524 71.6948 25.0155 71.1697 24.089V32H67.3752V7.69752H70.9553L71.0263 10.5835C71.5753 9.49075 72.3512 8.67078 73.3536 8.12439C74.3798 7.55436 75.5254 7.26949 76.7903 7.26949ZM76.1097 10.5476C74.5825 10.5476 73.3777 11.1063 72.4947 12.2226C71.6117 13.339 71.1697 14.9902 71.1697 17.1756C71.1697 19.3612 71.6116 21.0121 72.4947 22.1287C73.3777 23.2451 74.5824 23.8036 76.1097 23.8037C77.637 23.8037 78.8305 23.2218 79.6897 22.0579C80.5728 20.8939 81.0147 19.2662 81.0147 17.1756C81.0147 15.0853 80.5727 13.4585 79.6897 12.2945C78.8305 11.1304 77.6372 10.5476 76.1097 10.5476Z" fill="white"/>
                      <path d="M25.8799 0.461644C26.1648 0.102161 26.6943 -0.0799798 27.1257 0.0336165L29.1115 0.556762C29.5427 0.670592 29.7459 1.04625 29.5893 1.4395L26.2925 9.70659L36.3729 6.87394C36.8526 6.73918 37.3165 6.89779 37.4637 7.24745L38.1408 8.85633C38.2879 9.206 38.0734 9.64205 37.6373 9.88058L28.4752 14.8916L36.7458 18.4446C37.139 18.6137 37.2649 19.0199 37.0418 19.4004L36.014 21.152C35.7906 21.5327 35.2851 21.7741 34.8253 21.718L25.1632 20.5395L26.7773 28.3948C26.854 28.7686 26.5689 29.1851 26.106 29.3738L23.9757 30.2415C23.5128 30.4302 23.0118 30.3353 22.7975 30.0176L18.2957 23.3385L12.3092 30.8969C12.0243 31.2565 11.4937 31.4387 11.0623 31.3249L9.07763 30.8006C8.64629 30.6868 8.44324 30.3123 8.59983 29.919L11.8955 21.6508L1.81388 24.4846C1.33436 24.6191 0.870201 24.4594 0.723096 24.1099L0.0460166 22.501C-0.100819 22.1514 0.113546 21.7164 0.549456 21.4779L9.71276 16.4646L1.44329 12.9139C1.04977 12.7449 0.923952 12.3376 1.14729 11.9569L2.17398 10.2054C2.39724 9.82482 2.903 9.58471 3.36266 9.64047L13.0259 10.8178L11.4107 2.96369C11.3338 2.58988 11.6201 2.17345 12.0831 1.98468L14.2134 1.11587C14.6764 0.927247 15.1774 1.02315 15.3916 1.3409L19.8923 8.01883L25.8799 0.461644Z" fill="white"/>
                      <path d="M54.6914 0.784115C56.6244 0.78417 58.2833 1.14098 59.6675 1.85361C61.0515 2.56627 62.1372 3.54038 62.9247 4.77556C63.7122 6.01075 64.2021 7.4238 64.3931 9.01525L60.4192 9.22984C60.2282 7.78094 59.6435 6.59285 58.6653 5.66642C57.7106 4.73993 56.3614 4.27678 54.6191 4.27678C53.1398 4.27681 51.9705 4.62055 51.1113 5.30915C50.2761 5.97421 49.8575 6.86544 49.8574 7.98171C49.8574 8.71793 50.0246 9.32433 50.3585 9.79938C50.7165 10.2745 51.3377 10.7022 52.2208 11.0823C53.1277 11.4386 54.4046 11.8065 56.0513 12.1866C58.2471 12.6855 59.9892 13.3038 61.278 14.0402C62.5668 14.7529 63.4864 15.5961 64.0353 16.5701C64.608 17.5441 64.8942 18.6489 64.8942 19.8841C64.8942 21.3807 64.5 22.6872 63.7125 23.8037C62.9487 24.8965 61.8745 25.7397 60.4902 26.3336C59.106 26.9274 57.4951 27.2244 55.6575 27.2244C53.6288 27.2244 51.8621 26.8566 50.3585 26.1201C48.879 25.3837 47.7099 24.3619 46.8508 23.0555C45.9916 21.7489 45.4906 20.2286 45.3474 18.4945L49.3213 18.2451C49.56 20.0028 50.2036 21.3571 51.2535 22.3073C52.3274 23.2575 53.8195 23.7328 55.7285 23.7329C57.3753 23.7329 58.6533 23.4238 59.5603 22.8061C60.467 22.1884 60.9203 21.2852 60.9203 20.0976C60.9202 19.385 60.741 18.7555 60.383 18.2091C60.0489 17.6391 59.392 17.1282 58.4135 16.6768C57.459 16.2018 56.0513 15.7384 54.1902 15.2872C52.1619 14.8121 50.5385 14.2779 49.3213 13.6841C48.1041 13.0665 47.2202 12.3174 46.6713 11.4384C46.1464 10.5358 45.8835 9.43076 45.8835 8.12439C45.8836 6.67545 46.2298 5.40425 46.9218 4.31158C47.6378 3.19508 48.6531 2.32858 49.9658 1.71093C51.2784 1.09337 52.8538 0.784115 54.6914 0.784115Z" fill="white"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M94.3815 7.26949C96.9591 7.26949 98.9161 7.9587 100.253 9.33656C101.613 10.6907 102.293 12.6031 102.293 15.0738V22.45C102.293 22.9009 102.365 23.2215 102.508 23.4116C102.675 23.5778 102.938 23.6609 103.295 23.661H103.976V26.6549C103.642 26.7261 103.176 26.7616 102.58 26.7616C101.506 26.7616 100.646 26.5355 100.002 26.0842C99.3578 25.6328 98.9636 24.8492 98.8204 23.7329C98.3431 24.7304 97.5202 25.5385 96.351 26.1561C95.1816 26.7737 93.8567 27.0817 92.3771 27.0817C90.3961 27.0817 88.8087 26.6308 87.6154 25.7281C86.4459 24.8253 85.8615 23.5544 85.8615 21.9152C85.8615 20.2999 86.3502 19.0289 87.3287 18.1024C88.3311 17.176 89.8707 16.5111 91.9471 16.1073L98.4988 14.8592C98.4986 11.9375 97.126 10.4768 94.3815 10.4768C93.1643 10.4768 92.2092 10.7494 91.517 11.2957C90.8249 11.8421 90.3485 12.6267 90.086 13.6482L86.1831 13.3988C86.5411 11.4984 87.424 10.0013 88.832 8.90853C90.264 7.81575 92.1142 7.2695 94.3815 7.26949ZM92.9131 18.7799C91.7679 18.9937 90.9571 19.3383 90.4799 19.8134C90.0264 20.2647 89.7993 20.8465 89.7993 21.5591C89.7993 22.3666 90.0733 22.9963 90.622 23.4476C91.1948 23.8752 91.983 24.089 92.9854 24.089C94.7038 24.089 96.0519 23.6015 97.0304 22.6275C98.0088 21.6536 98.4986 20.4189 98.4988 18.9225V17.7104L92.9131 18.7799Z" fill="white"/>
                      <path d="M112.733 7.26949C115.048 7.26952 116.969 7.87562 118.496 9.08716C120.024 10.2749 120.942 11.9615 121.253 14.1469L117.279 14.3604C117.088 13.1253 116.587 12.1865 115.775 11.5451C114.964 10.8802 113.95 10.5476 112.733 10.5476C111.134 10.5476 109.88 11.1415 108.973 12.3293C108.09 13.4933 107.649 15.109 107.649 17.1756C107.649 19.2661 108.09 20.8939 108.973 22.0579C109.88 23.222 111.134 23.8037 112.733 23.8037C113.95 23.8036 114.964 23.4712 115.775 22.8061C116.587 22.1172 117.088 21.0834 117.279 19.7055L121.253 19.9201C120.942 22.1055 120.024 23.852 118.496 25.1585C116.993 26.4412 115.071 27.0817 112.733 27.0817C110.919 27.0817 109.331 26.6784 107.971 25.8707C106.611 25.0393 105.561 23.8869 104.821 22.414C104.081 20.9174 103.71 19.1711 103.71 17.1756C103.71 15.1802 104.081 13.446 104.821 11.9732C105.561 10.4766 106.611 9.32413 107.971 8.51646C109.331 7.68501 110.919 7.26949 112.733 7.26949Z" fill="white"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M130.301 7.26949C132.019 7.26958 133.534 7.67404 134.847 8.48166C136.159 9.26561 137.173 10.4059 137.889 11.9024C138.629 13.399 139 15.2042 139 17.3183V18.2811H125.323C125.419 20.1338 125.909 21.5236 126.792 22.45C127.698 23.3763 128.916 23.8395 130.443 23.8396C131.564 23.8396 132.484 23.5903 133.2 23.0915C133.94 22.5689 134.465 21.8562 134.776 20.9536L138.713 21.203C138.212 22.9846 137.221 24.4097 135.742 25.4787C134.286 26.5476 132.508 27.0817 130.408 27.0817C128.546 27.0817 126.935 26.6783 125.575 25.8707C124.238 25.0393 123.2 23.8869 122.46 22.414C121.744 20.9174 121.385 19.1711 121.385 17.1756C121.385 15.1802 121.744 13.446 122.46 11.9732C123.2 10.4766 124.238 9.32413 125.575 8.51646C126.911 7.68523 128.487 7.26949 130.301 7.26949ZM130.301 10.4768C128.94 10.4768 127.818 10.9045 126.935 11.7597C126.076 12.5912 125.538 13.8145 125.323 15.4299H134.99C134.871 13.7432 134.381 12.4955 133.522 11.6878C132.663 10.8805 131.589 10.4769 130.301 10.4768Z" fill="white"/>
                    </svg>
                  ) : (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={160}
                      height={56}
                      className={`max-h-12 max-w-[140px] object-contain opacity-70 group-hover:opacity-100 transition-opacity ${client.grayscale ? 'grayscale' : 'brightness-0 invert'}`}
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
