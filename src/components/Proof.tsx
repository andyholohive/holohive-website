"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const loreTestimonial = {
  textQuote:
    "We'd worked with other agencies. Results weren't stacking up, expectations weren't managed. So yeah, there was natural hesitancy. With Holo Hive it was a completely different level of gravitas from day one. Three years later, that speaks for itself.",
  videoQuote:
    "I didn't think we'd be working together for 3 years. That's not what you expect from an agency. But when they show up like they're part of your team, you don't leave.",
  name: "Thomas Scaria",
  role: "CEO, Lore",
  image: "/people/Thomas Scaria.jpeg" as string | null,
  videoSrc: "/videos/testimonial.mp4" as string | null, // Path to video file
  videoPoster: null as string | null, // Optional poster image shown before play
};

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function VideoPlayer({ src, poster }: { src: string | null; poster?: string | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100 || 0);
    };
    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  if (!src) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#1a2a25] to-[#0f0f0f]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-[var(--foreground-light-secondary)] bg-black/60 px-4 py-2 rounded-full">
            Video Coming Soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full aspect-video rounded-xl overflow-hidden bg-black group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster || undefined}
        preload="metadata"
        playsInline
        onClick={togglePlay}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
      />

      {/* Big play button overlay (before first play) */}
      {!hasStarted && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors"
          aria-label="Play testimonial video"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--accent-teal)]/90 flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[var(--accent-teal)]/30">
            <svg className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* Custom controls bar */}
      {hasStarted && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pt-8 pb-3 transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Progress bar */}
          <div
            onClick={handleSeek}
            className="w-full h-1 bg-white/20 rounded-full cursor-pointer mb-3 group/progress hover:h-1.5 transition-all"
          >
            <div
              className="h-full bg-[var(--accent-teal)] rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-[var(--accent-teal)] rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-3 text-white">
            {/* Play/pause */}
            <button
              onClick={togglePlay}
              className="hover:text-[var(--accent-teal)] transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Time */}
            <span className="text-xs font-medium tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex-1" />

            {/* Mute */}
            <button
              onClick={toggleMute}
              className="hover:text-[var(--accent-teal)] transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="hover:text-[var(--accent-teal)] transition-colors"
              aria-label="Fullscreen"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
  featured: boolean;
  tag?: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "One of the few teams in Web3 we'd work with again without hesitation.",
    name: "Kam Punia",
    role: "CEO, Fableborne",
    image: "/people/Kam Punia.jpg",
    featured: true,
  },
  {
    quote: "Holo Hive's help on MapleStory's launch was invaluable. Their insights sharpened the team's messaging and helped them move faster.",
    name: "Parker Heath",
    role: "Avalanche",
    image: "/people/Parker Heath.jpeg",
    featured: true,
  },
  {
    quote: "Top-tier relationships, always professional. Nothing but good things to say.",
    name: "Adam Fern",
    role: "Proof of Play",
    image: "/people/Adam Fern.jpg",
    featured: false,
  },
  {
    quote: "I've introduced Holo Hive to several teams looking to scale. Every time, it's been a smooth experience with great feedback.",
    name: "Omar Ghanem",
    role: "Founder, G3",
    image: "/people/Omar Ghanem.png",
    featured: false,
  },
  {
    quote: "Holo Hive's deep understanding of web3 GTM, combined with a powerful KOL network, allows me to feel confident referring clients to them. Their team brings the perfect mix of strategy, execution, and genuine care for outcomes.",
    name: "Jackson Weinreb",
    role: "The Tie",
    image: "/people/Jackson Weinreb.jpg",
    featured: false,
  },
  {
    quote: "Holo Hive is one of the most professional partners we have worked with. Very happy with the relationship and work done together.",
    name: "Giulio Xiloyannis",
    role: "CEO & Founder, MON Protocol",
    image: "/people/Giulio Xiloyannis.jpeg",
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground-light)]">
              What Founders Say
            </h2>
          </div>
        </ScrollReveal>

        {/* Lore Hero Testimonial */}
        <ScrollReveal>
          <div className="relative group mb-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[var(--accent-teal)]/50 to-transparent" />

            <div className="bg-[var(--card-dark)] border border-[var(--border-dark)] rounded-2xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-[var(--accent-teal)]/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[var(--accent-teal)]/5 rounded-full blur-3xl" />

              <div className="absolute top-4 right-6 text-9xl font-serif text-[var(--accent-teal)]/10 leading-none">
                &ldquo;
              </div>

              <div className="relative z-10 mb-6">
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[var(--accent-teal)] bg-[var(--accent-teal)]/10 px-3 py-1 rounded-full">
                  3-Year Partnership
                </span>
              </div>

              <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-10 items-start">
                {/* Left: Text quote */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-[var(--accent-teal)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-xl md:text-2xl text-[var(--foreground-light)] leading-relaxed font-medium mb-8">
                      &ldquo;{loreTestimonial.textQuote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {loreTestimonial.image ? (
                      <Image
                        src={loreTestimonial.image}
                        alt={loreTestimonial.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[var(--accent-teal)]/20 flex items-center justify-center text-[var(--accent-teal)] font-bold text-lg">
                        TS
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-[var(--foreground-light)] text-lg">{loreTestimonial.name}</p>
                      <p className="text-sm text-[var(--foreground-light-secondary)]">{loreTestimonial.role}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Video + video quote */}
                <div>
                  <VideoPlayer src={loreTestimonial.videoSrc} poster={loreTestimonial.videoPoster} />
                  <p className="mt-4 text-sm md:text-base text-[var(--foreground-light-secondary)] italic leading-relaxed">
                    &ldquo;{loreTestimonial.videoQuote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
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

              {testimonial.tag && (
                <span className="inline-block text-xs font-medium text-[var(--accent-teal)] bg-[var(--accent-teal)]/10 px-2 py-0.5 rounded-full mb-3 w-fit">
                  {testimonial.tag}
                </span>
              )}

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
