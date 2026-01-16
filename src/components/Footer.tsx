import Image from "next/image";

const navigationLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#proof", label: "Results" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--background-dark)] border-t border-[var(--border-dark)]">
      {/* Main Footer */}
      <div className="container-custom px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Holo Hive"
                width={120}
                height={32}
                className="h-8 w-auto brightness-0 invert"
              />
              <span className="text-lg font-bold">
                <span className="text-[var(--foreground-light)]">Holo</span>{" "}
                <span className="text-[var(--foreground-light)]">Hive</span>
              </span>
            </a>
            <p className="text-[var(--foreground-light-secondary)] text-sm leading-relaxed mb-6">
              Seoul-based Web3 growth agency specializing in Korea and China market entry for funded projects. Real traction, not vanity metrics.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/holohive_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-lg flex items-center justify-center text-[var(--foreground-light-secondary)] hover:text-[var(--accent-teal)] hover:border-[var(--accent-teal)]/50 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-lg flex items-center justify-center text-[var(--foreground-light-secondary)] hover:text-[var(--accent-teal)] hover:border-[var(--accent-teal)]/50 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/holo-hive"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-lg flex items-center justify-center text-[var(--foreground-light-secondary)] hover:text-[var(--accent-teal)] hover:border-[var(--accent-teal)]/50 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-[var(--foreground-light)] font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[var(--foreground-light-secondary)] hover:text-[var(--accent-teal)] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-[var(--foreground-light)] font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:team@holohive.io"
                  className="flex items-center gap-3 text-[var(--foreground-light-secondary)] hover:text-[var(--accent-teal)] transition-colors text-sm group"
                >
                  <div className="w-8 h-8 bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-lg flex items-center justify-center group-hover:border-[var(--accent-teal)]/50 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  team@holohive.io
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-dark)]">
        <div className="container-custom px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--foreground-light-secondary)] text-sm">
              &copy; 2026 Holo Hive. All rights reserved.
            </p>
            <p className="text-[var(--foreground-light-secondary)] text-sm">
              Working with Western founders since 2021.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
