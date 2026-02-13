"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { href: "#results", label: "Results" },
  { href: "#solution", label: "How It Works" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-[var(--background-dark)]/95 backdrop-blur-md border-b border-[var(--border-dark)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/logo.png"
              alt="Holo Hive"
              width={112}
              height={28}
              className="h-6 sm:h-7 w-auto brightness-0 invert"
            />
            <svg className="w-[90px] sm:w-[111px] h-auto" viewBox="0 0 139 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.6558 0.683513L19.6896 24.6622H15.907L15.8732 14.0913L3.74879 14.0576L3.78256 24.6622H0.0337725L0 0.683513H3.74879L3.78256 10.714L15.907 10.7478L15.8732 0.683513H19.6558ZM31.1386 25C29.7651 25 28.5268 24.7601 27.4236 24.2804C26.3203 23.8008 25.369 23.1371 24.5697 22.2894C23.7705 21.4418 23.1625 20.477 22.746 19.3953C22.3295 18.3135 22.1212 17.1701 22.1212 15.9652C22.1212 14.7385 22.3295 13.573 22.746 12.4687C23.1625 11.3644 23.7705 10.394 24.5697 9.55759C25.369 8.72119 26.3259 8.06314 27.4404 7.58346C28.5549 7.10379 29.7989 6.86395 31.1723 6.86395C32.5458 6.86395 33.7897 7.10379 34.9042 7.58346C36.0187 8.06314 36.9756 8.72119 37.7749 9.55759C38.5742 10.394 39.1878 11.3644 39.6155 12.4687C40.0433 13.573 40.2572 14.7385 40.2572 15.9652C40.2572 17.1701 40.0433 18.3135 39.6155 19.3953C39.1878 20.477 38.5742 21.4418 37.7749 22.2894C36.9756 23.1371 36.0187 23.8008 34.9042 24.2804C33.7897 24.7601 32.5345 25 31.1386 25ZM25.9038 15.9657C25.9038 17.0753 26.1402 18.0741 26.613 18.962C27.0858 19.85 27.7162 20.5492 28.5043 21.0599C29.2923 21.5705 30.1704 21.8369 31.1386 21.8591C32.1292 21.8369 33.0242 21.565 33.8235 21.0433C34.6228 20.5215 35.2589 19.8112 35.7317 18.9121C36.2045 18.0131 36.4522 17.0197 36.4747 15.932C36.4522 14.8224 36.2045 13.8236 35.7317 12.9357C35.2589 12.0477 34.6228 11.3373 33.8235 10.8043C33.0242 10.2713 32.1405 10.0161 31.1723 10.0386C30.1817 10.0386 29.2923 10.2995 28.5043 10.8212C27.7162 11.3429 27.0858 12.0477 26.613 12.9357C26.1402 13.8236 25.9038 14.8336 25.9038 15.9657ZM42.52 0.00805664H46.235V19.6237C46.235 20.5272 46.3701 21.1031 46.6403 21.3514C46.9105 21.5998 47.2482 21.724 47.6535 21.724C48.1038 21.724 48.5259 21.679 48.92 21.5889C49.314 21.4988 49.6573 21.3863 49.95 21.2512L50.4904 24.1894C49.95 24.4146 49.3084 24.6059 48.5653 24.7636C47.8223 24.9212 47.1581 25 46.5728 25C45.3119 25 44.3212 24.6444 43.6007 23.9332C42.8802 23.222 42.52 22.2343 42.52 20.9699V0.00805664ZM59.474 25C58.1006 25 56.8622 24.7601 55.759 24.2804C54.6557 23.8008 53.7044 23.1371 52.9052 22.2894C52.1059 21.4418 51.498 20.477 51.0814 19.3953C50.6649 18.3135 50.4566 17.1701 50.4566 15.9652C50.4566 14.7385 50.6649 13.573 51.0814 12.4687C51.498 11.3644 52.1059 10.394 52.9052 9.55759C53.7044 8.72119 54.6613 8.06314 55.7758 7.58346C56.8904 7.10379 58.1343 6.86395 59.5078 6.86395C60.8812 6.86395 62.1252 7.10379 63.2397 7.58346C64.3541 8.06314 65.3111 8.72119 66.1103 9.55759C66.9096 10.394 67.5232 11.3644 67.951 12.4687C68.3788 13.573 68.5927 14.7385 68.5927 15.9652C68.5927 17.1701 68.3788 18.3135 67.951 19.3953C67.5232 20.477 66.9096 21.4418 66.1103 22.2894C65.3111 23.1371 64.3541 23.8008 63.2397 24.2804C62.1252 24.7601 60.8699 25 59.474 25ZM54.2392 15.9657C54.2392 17.0753 54.4756 18.0741 54.9484 18.962C55.4212 19.85 56.0517 20.5492 56.8397 21.0599C57.6277 21.5705 58.5058 21.8369 59.474 21.8591C60.4646 21.8369 61.3596 21.565 62.1589 21.0433C62.9582 20.5215 63.5943 19.8112 64.0671 18.9121C64.5399 18.0131 64.7876 17.0197 64.8101 15.932C64.7876 14.8224 64.5399 13.8236 64.0671 12.9357C63.5943 12.0477 62.9582 11.3373 62.1589 10.8043C61.3596 10.2713 60.4759 10.0161 59.5078 10.0386C58.5171 10.0386 57.6277 10.2995 56.8397 10.8212C56.0517 11.3429 55.4212 12.0477 54.9484 12.9357C54.4756 13.8236 54.2392 14.8336 54.2392 15.9657Z" fill="#FFFFFF"/>
              <path d="M93.7378 0.683594L93.7716 24.6623H89.989L89.9553 14.0914L77.8308 14.0576L77.8646 24.6623H74.1158L74.082 0.683594H77.8308L77.8646 10.7141L89.989 10.7479L89.9553 0.683594H93.7378ZM97.6555 24.6623L97.6217 6.99912L101.303 7.03289L101.337 24.6623H97.6555ZM109.645 24.6623L102.924 7.13421H106.774L111.806 21.2439L116.838 7.13421H120.418L113.698 24.6623H109.645ZM129.402 25C128.029 25 126.785 24.7598 125.67 24.2792C124.556 23.7986 123.593 23.1394 122.782 22.3014C121.972 21.4634 121.347 20.5024 120.908 19.4186C120.469 18.3347 120.25 17.1781 120.25 15.9489C120.25 14.3011 120.632 12.7925 121.398 11.4231C122.163 10.0537 123.233 8.95152 124.606 8.11652C125.98 7.28153 127.589 6.86403 129.436 6.86403C131.282 6.86403 132.875 7.28205 134.215 8.11811C135.554 8.95416 136.596 10.0522 137.339 11.4123C138.082 12.7723 138.453 14.2327 138.453 15.7932C138.453 16.061 138.442 16.3118 138.419 16.5457C138.397 16.7797 138.374 16.9748 138.352 17.131H124.201C124.268 18.1533 124.556 19.0478 125.062 19.8143C125.569 20.5809 126.216 21.1809 127.004 21.6143C127.792 22.0477 128.636 22.2644 129.537 22.2644C130.528 22.2644 131.468 22.0168 132.357 21.5214C133.246 21.0261 133.849 20.3732 134.164 19.5626L137.339 20.4745C136.956 21.3301 136.376 22.1012 135.599 22.7879C134.822 23.4746 133.905 24.015 132.847 24.409C131.789 24.803 130.64 25 129.402 25ZM124.1 14.6655H134.772C134.704 13.6721 134.417 12.7946 133.911 12.0331C133.404 11.2716 132.762 10.6757 131.986 10.2453C131.209 9.81484 130.348 9.59963 129.402 9.59963C128.479 9.59963 127.629 9.81484 126.852 10.2453C126.075 10.6757 125.439 11.2716 124.944 12.0331C124.449 12.7946 124.167 13.6721 124.1 14.6655Z" fill="#FFFFFF"/>
              <path d="M97.6549 4.02703L97.6211 0.00805664H101.302L101.336 4.09457L97.6549 4.02703Z" fill="#FFFFFF"/>
            </svg>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[var(--foreground-light-secondary)] hover:text-[var(--foreground-light)] transition-all text-base font-medium tracking-wide group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--accent-teal)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Talk to Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-6 h-[2px] bg-[var(--foreground-light)] rounded-full transition-all duration-300 ease-out ${
                  mobileMenuOpen
                    ? "rotate-45 translate-y-[1px]"
                    : "-translate-y-1.5"
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-[var(--foreground-light)] rounded-full transition-all duration-300 ease-out ${
                  mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100"
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-[var(--foreground-light)] rounded-full transition-all duration-300 ease-out ${
                  mobileMenuOpen
                    ? "-rotate-45 -translate-y-[1px]"
                    : "translate-y-1.5"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[var(--background-dark)] transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6 px-6">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`text-3xl font-semibold text-[var(--foreground-light)] hover:text-[var(--accent-teal)] transition-all duration-300 ${
                mobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: mobileMenuOpen ? `${100 + index * 50}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className={`btn-primary text-lg px-10 py-4 mt-6 transition-all duration-300 ${
              mobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: mobileMenuOpen ? `${100 + navLinks.length * 50}ms` : "0ms" }}
          >
            Talk to Us
          </a>
        </nav>
      </div>
    </>
  );
}
