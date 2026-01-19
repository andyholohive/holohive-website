"use client";

import { useState, useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";

interface CustomDropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

function CustomDropdown({ label, placeholder, options, value, onChange, required }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <label className="block text-sm font-medium text-[var(--foreground-light)] mb-2">
        {label} {required && <span className="text-[var(--accent-teal)]">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[var(--card-dark)] border rounded-xl px-4 py-3.5 text-left flex items-center justify-between transition-all ${
          isOpen
            ? "border-[var(--accent-teal)] ring-2 ring-[var(--accent-teal)]/20"
            : "border-[var(--border-dark)] hover:border-[var(--foreground-light-secondary)]"
        }`}
      >
        <span className={value ? "text-[var(--foreground-light)]" : "text-[var(--foreground-light-secondary)]"}>
          {value || placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-[var(--foreground-light-secondary)] transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-xl shadow-2xl overflow-hidden animate-fade-in">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left transition-colors flex items-center justify-between ${
                value === option
                  ? "bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]"
                  : "text-[var(--foreground-light)] hover:bg-[var(--border-dark)]"
              }`}
            >
              {option}
              {value === option && (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const roleOptions = ["Founder", "CMO / Marketing Lead", "Head of Growth", "BD / Partnerships", "Other"];
const fundingOptions = ["Under $2M", "$2M - $10M", "$10M - $30M", "$30M+"];
const tokenOptions = ["Live", "TGE Pending", "No Token"];
const timelineOptions = ["Urgent (within 2 weeks)", "Soon (1-2 months)", "Planning (3+ months)", "No specific launch"];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    projectName: "",
    yourName: "",
    role: "",
    email: "",
    telegram: "",
    funding: "",
    tokenStatus: "",
    timeline: "",
    goals: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Check if this is a "hot" lead (high funding + urgent timeline)
  const isHotLead = (formData.funding === "$10M - $30M" || formData.funding === "$30M+") &&
    (formData.timeline === "Urgent (within 2 weeks)" || formData.timeline === "Soon (1-2 months)");

  if (submitted) {
    return (
      <section id="contact" className="section-padding relative overflow-hidden bg-[var(--background-dark)]">
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 bg-[var(--accent-teal)]/20 rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow">
                <svg className="w-10 h-10 text-[var(--accent-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-[var(--foreground-light)] mb-4">
                {isHotLead ? "We'll be in touch soon!" : "Thanks for reaching out!"}
              </h3>
              <p className="text-[var(--foreground-light-secondary)] text-lg">
                {isHotLead
                  ? "Your project looks like a great fit. Expect a response within 24 hours."
                  : "We'll review your submission and get back to you within 48 hours."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-[var(--background-dark)]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[var(--accent-teal)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--accent-purple)]/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[var(--accent-teal)]/10 border border-[var(--accent-teal)]/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-[var(--accent-teal)] rounded-full animate-pulse" />
                <span className="text-[var(--accent-teal)] text-sm font-medium">Limited Availability</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground-light)] mb-4">
                Let&apos;s Talk
              </h2>
              <p className="text-[var(--foreground-light-secondary)] text-lg">
                Takes 60 seconds. We respond within 48 hours.
              </p>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={200}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground-light)] mb-2">
                    Project Name <span className="text-[var(--accent-teal)]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-xl px-4 py-3.5 text-[var(--foreground-light)] placeholder-[var(--foreground-light-secondary)] focus:border-[var(--accent-teal)] focus:ring-2 focus:ring-[var(--accent-teal)]/20 focus:outline-none transition-all"
                    placeholder="Your project"
                  />
                </div>

                {/* Your Name */}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground-light)] mb-2">
                    Your Name <span className="text-[var(--accent-teal)]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.yourName}
                    onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                    className="w-full bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-xl px-4 py-3.5 text-[var(--foreground-light)] placeholder-[var(--foreground-light-secondary)] focus:border-[var(--accent-teal)] focus:ring-2 focus:ring-[var(--accent-teal)]/20 focus:outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Role */}
                <CustomDropdown
                  label="Role"
                  placeholder="Select your role"
                  options={roleOptions}
                  value={formData.role}
                  onChange={(value) => setFormData({ ...formData, role: value })}
                  required
                />

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground-light)] mb-2">
                    Email <span className="text-[var(--accent-teal)]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-xl px-4 py-3.5 text-[var(--foreground-light)] placeholder-[var(--foreground-light-secondary)] focus:border-[var(--accent-teal)] focus:ring-2 focus:ring-[var(--accent-teal)]/20 focus:outline-none transition-all"
                    placeholder="you@project.com"
                  />
                </div>

                {/* Telegram */}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground-light)] mb-2">
                    Telegram <span className="text-[var(--accent-teal)]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    className="w-full bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-xl px-4 py-3.5 text-[var(--foreground-light)] placeholder-[var(--foreground-light-secondary)] focus:border-[var(--accent-teal)] focus:ring-2 focus:ring-[var(--accent-teal)]/20 focus:outline-none transition-all"
                    placeholder="@username"
                  />
                </div>

                {/* Funding */}
                <CustomDropdown
                  label="Funding Raised"
                  placeholder="Select range"
                  options={fundingOptions}
                  value={formData.funding}
                  onChange={(value) => setFormData({ ...formData, funding: value })}
                  required
                />

                {/* Token Status */}
                <CustomDropdown
                  label="Token Status"
                  placeholder="Select status"
                  options={tokenOptions}
                  value={formData.tokenStatus}
                  onChange={(value) => setFormData({ ...formData, tokenStatus: value })}
                  required
                />

                {/* Timeline */}
                <CustomDropdown
                  label="Timeline"
                  placeholder="Select timeline"
                  options={timelineOptions}
                  value={formData.timeline}
                  onChange={(value) => setFormData({ ...formData, timeline: value })}
                  required
                />
              </div>

              {/* Goals */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-light)] mb-2">
                  What do you want from Korea/China? <span className="text-[var(--accent-teal)]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className="w-full bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-xl px-4 py-3.5 text-[var(--foreground-light)] placeholder-[var(--foreground-light-secondary)] focus:border-[var(--accent-teal)] focus:ring-2 focus:ring-[var(--accent-teal)]/20 focus:outline-none transition-all resize-none"
                  placeholder="Tell us about your goals for the Korean and Chinese markets..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[var(--accent-teal)] text-white font-semibold py-4 rounded-xl hover:bg-[var(--accent-teal)]/90 transition-all shadow-lg shadow-[var(--accent-teal)]/20 hover:shadow-[var(--accent-teal)]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Submit Application
              </button>

              <p className="text-center text-[var(--foreground-light-secondary)] text-sm">
                We cap our active roster at 5 partners per quarter to ensure depth. If timing doesn't work now, we'll tell you.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
