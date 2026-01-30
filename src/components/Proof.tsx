"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote: "You guys have been f****** top tier. It's amazing what you guys pulled off from zero.",
    name: "Zero",
    role: "Space",
    image: "/people/Kam Punia.jpg",
    featured: true,
  },
  {
    quote: "Holo Hive is one of the most professional partners we have worked with.",
    name: "Giulio Xiloyannis",
    role: "CEO, Pixelmon",
    image: "/people/Giulio Xiloyannis.jpeg",
    featured: true,
  },
  {
    quote: "Holo Hive's help on MapleStory's launch was invaluable. Their insights sharpened the team's messaging and helped them move faster.",
    name: "Parker Heath",
    role: "Avalanche",
    image: "/people/Parker Heath.jpeg",
    featured: false,
  },
  {
    quote: "Top-tier relationships, always professional. Nothing but good things to say.",
    name: "Adam Fern",
    role: "Co-Founder, Proof of Play",
    image: "/people/Adam Fern.jpg",
    featured: false,
  },
  {
    quote: "Deep understanding of how to launch in this space. I feel good sending clients their way.",
    name: "Jackson Weinreb",
    role: "Protocol Partnerships, The Tie",
    image: "/people/Jackson Weinreb.jpg",
    featured: false,
  },
  {
    quote: "I've sent several teams to Holo Hive for Asia help. Every time, great feedback.",
    name: "Omar Ghanem",
    role: "CEO, G3",
    image: "/people/Omar Ghanem.png",
    featured: false,
  },
];

export default function Proof() {
  const featuredTestimonials = testimonials.filter((t) => t.featured);
  const otherTestimonials = testimonials.filter((t) => !t.featured);

  return (
    <section id="proof" className="section-padding relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#151515] to-[#0f0f0f]">
      {/* Background texture - radial dots pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0, 212, 170, 0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-transparent to-[#1a1a1a]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--foreground-light)]">
              Testimonials
            </h2>
            <p className="text-[var(--foreground-light-secondary)] max-w-xl mx-auto">
              Don&apos;t take our word for it. Here&apos;s what founders and growth leads say about working with us.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featuredTestimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="relative group h-full">
              {/* Card */}
              <div className="bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-2xl p-8 h-full relative overflow-hidden flex flex-col">
                {/* Decorative quote mark */}
                <div className="absolute top-4 right-4 text-8xl font-serif text-[var(--accent-teal)]/10 leading-none">
                  &ldquo;
                </div>

                {/* Glow effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent-teal)]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Star rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[var(--accent-teal)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl text-[var(--foreground-light)] mb-8 leading-relaxed font-medium flex-grow">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[var(--foreground-light)] text-lg">{testimonial.name}</p>
                      <p className="text-sm text-[var(--foreground-light-secondary)]">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </ScrollReveal>
          ))}
        </div>


        {/* Other Testimonials - Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[var(--card-dark)]/60 backdrop-blur-sm border border-[var(--border-dark)] rounded-xl p-5 hover:border-[var(--accent-teal)]/30 transition-all group flex flex-col h-full"
            >
              {/* Quote icon */}
              <svg className="w-8 h-8 text-[var(--accent-teal)]/30 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-[var(--foreground-light)] mb-4 text-sm leading-relaxed flex-grow">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-[var(--foreground-light)] text-sm">{testimonial.name}</p>
                  <p className="text-xs text-[var(--foreground-light-secondary)]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
