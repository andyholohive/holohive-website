"use client";

import { useState, useEffect } from "react";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById("contact");
      if (!contactSection) {
        setVisible(window.scrollY > 300);
        return;
      }

      const rect = contactSection.getBoundingClientRect();
      const isContactVisible = rect.top < window.innerHeight && rect.bottom > 0;
      setVisible(window.scrollY > 300 && !isContactVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-6 right-4 z-50 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <a
        href="#contact"
        className="inline-flex items-center gap-2 bg-[var(--accent-teal)] text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-[var(--accent-teal)]/30 active:scale-[0.98] transition-transform"
      >
        Talk to Us
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  );
}
