'use client';

import { useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { Play, ArrowUpRight } from 'lucide-react';

export function LoreTestimonial() {
  const video = useRef<HTMLVideoElement>(null);
  const pending = useRef(false);
  const attempt = useRef(0);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  async function play(event: MouseEvent<HTMLButtonElement>) {
    const player = video.current;
    if (!player || pending.current) return;
    pending.current = true;
    const currentAttempt = ++attempt.current;
    // Move focus before removing its trigger, never after an async load.
    if (document.activeElement === event.currentTarget) {
      player.focus({ preventScroll: true });
    }
    setStarted(true);
    setFailed(false);
    try {
      if (player.error) player.load();
      await player.play();
    } catch {
      if (currentAttempt === attempt.current) setFailed(true);
    } finally {
      if (currentAttempt === attempt.current) pending.current = false;
    }
  }

  return (
    <figure className="hh-lore-film">
      <div className="hh-lore-film-frame">
        {/* oxlint-disable-next-line jsx-a11y/media-has-caption -- Supplied video has burned-in English captions. */}
        <video
          ref={video}
          className="hh-video"
          controls={started}
          playsInline
          preload="none"
          src="/media/lore-testimonial.mp4"
          poster="/media/lore-testimonial-smile.jpg"
          width="1280"
          height="720"
          tabIndex={started ? 0 : -1}
          onPlay={() => setStarted(true)}
          onPlaying={() => setFailed(false)}
          onError={() => {
            pending.current = false;
            setFailed(true);
          }}
          aria-label="Thomas Scaria, CEO of Lore, on working with Holo Hive. 1 minute 36 seconds. English captions are included in the video."
        >
          <Link href="/media/lore-testimonial.mp4" prefetch={false}>
            Watch the Lore testimonial
          </Link>
        </video>
        {!started && (
          <button
            className="hh-film-play"
            onClick={play}
            aria-label="Watch Lore testimonial, 1 minute 36 seconds"
          >
            <span>
              <Play size={20} fill="currentColor" aria-hidden="true" />
            </span>
            Watch testimonial
            <small>1:36</small>
          </button>
        )}
      </div>
      <figcaption className="hh-video-caption">
        <span>Lore · Client story</span>
        <span>English captions</span>
      </figcaption>
      {/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Playback announcements are live status messages, not form calculation output. */}
      <p
        className="hh-film-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {failed
          ? 'The video could not play. Please try again or open the video.'
          : ''}
      </p>
      {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
      {failed && (
        <div className="hh-film-fallback">
          <button type="button" onClick={play}>
            Try again
          </button>
          <Link href="/media/lore-testimonial.mp4" prefetch={false}>
            Open video <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      )}
    </figure>
  );
}
