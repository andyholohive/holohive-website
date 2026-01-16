"use client";

import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (roughly 100vh)
      setIsVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="#contact"
      className={`floating-cta ${isVisible ? "visible" : ""} bg-[#00D4AA] text-[#0A0A0A] px-6 py-3 rounded-full font-semibold shadow-lg shadow-[#00D4AA]/25 hover:bg-[#00E5BB] hover:shadow-[#00D4AA]/40 transition-all flex items-center gap-2`}
    >
      <span>Let&apos;s Talk</span>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}
