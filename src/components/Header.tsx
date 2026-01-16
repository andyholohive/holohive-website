"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#proof", label: "Results" },
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
        <div className="container-custom px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Holo Hive"
              width={140}
              height={36}
              className="h-9 w-auto brightness-0 invert"
            />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[var(--foreground-light)]">Holo</span>{" "}
              <span className="text-[var(--foreground-light)]">Hive</span>
            </span>
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
              Let&apos;s Talk
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
            Let&apos;s Talk
          </a>
        </nav>
      </div>
    </>
  );
}
