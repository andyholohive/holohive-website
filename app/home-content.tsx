'use client';
/* oxlint-disable nextjs/no-img-element -- Supplied brand assets and pre-sized photos. */
/* oxlint-disable jsx-a11y/prefer-tag-over-role -- The inline SVG data chart intentionally exposes one named image, not a collection of unlabeled graphics. */
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createInquiryNavigation } from '@/lib/inquiry-navigation';
import { countFunnelEvent } from '@/lib/funnel-client';
import { QualificationDialog } from '@/components/qualification-dialog';
import { HomepageScanStart } from '@/components/homepage-scan-start';
import type { InquiryIntent } from '@/lib/qualification';
import { CasePosters } from '@/components/case-posters';
import { LoreTestimonial } from '@/components/lore-testimonial';
import { IndustryRecommendations } from '@/components/industry-recommendations';
import { HomepageGuideEntry } from '@/components/homepage-guide-entry';
import { homepageQuestions } from '@/lib/homepage-faq';
import { ArrowUpRight, ArrowRight, Menu, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  ClientCard,
  ScanExplorer,
  KoreaProcess,
  CreatorTestimonials,
} from '@/components/homepage-evidence';

const primaryClients = [
  { name: 'OKX', file: 'okx.svg', width: 125, height: 39 },
  { name: 'Avalanche', file: 'avalanche.svg', width: 172, height: 40 },
  { name: 'Venice', file: 'venice-wordmark.svg', width: 126, height: 55 },
  { name: 'PUMA', file: 'puma-official.svg', width: 104, height: 52 },
  { name: 'Animoca Brands', file: 'animoca.svg', width: 120, height: 68 },
  { name: '0G', file: '0g.svg', width: 91, height: 39 },
  { name: 'Jumper', file: 'jumper-wordmark.svg', width: 156, height: 35 },
  {
    name: 'MapleStory Universe',
    file: 'maplestory.svg',
    width: 163,
    height: 52,
  },
];
const moreClients = [
  { name: 'Ledger', file: 'ledger.png', width: 141, height: 37 },
  { name: 'The Sandbox', file: 'sandbox-dark.png', width: 160, height: 48 },
  { name: 'Doodles', file: 'doodles.png', width: 154, height: 77 },
  {
    name: 'Allora Network',
    file: 'allora-wordmark.svg',
    width: 145,
    height: 46,
  },
  {
    name: 'Flying Tulip',
    file: 'flying-tulip-wordmark.svg',
    width: 163,
    height: 35,
  },
  { name: 'Fogo', file: 'fogo.png', width: 133, height: 43 },
  {
    name: 'Moonbeam',
    file: 'moonbeam-wordmark.webp',
    width: 163,
    height: 25,
    monochrome: true,
  },
  { name: 'ZetaChain', file: 'zetachain.png', width: 135, height: 39 },
  {
    name: 'MON Protocol',
    file: 'mon-protocol-official.svg',
    width: 132,
    height: 46,
  },
  { name: 'Fableborne', file: 'fableborne.png', width: 118, height: 68 },
  { name: 'UMIA', file: 'umia.png', width: 115, height: 35 },
  { name: 'NRN', file: 'nrn.png', width: 102, height: 43 },
];
// Brand marks from Simple Icons (CC0).
const socialLinks = [
  {
    label: 'Telegram',
    href: 'https://t.me/yanolima',
    path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  },
  {
    label: 'X',
    href: 'https://x.com/holohive_',
    path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/holo-hive',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];
function Brand() {
  return (
    <a className="hh-brand" href="#top" aria-label="Holo Hive home">
      <img
        className="hh-brand-mark"
        src="/assets/mark.png"
        alt=""
        width="35"
        height="35"
      />
      <img
        className="hh-brand-name"
        src="/assets/wordmark.svg"
        alt="Holo Hive"
        width="143"
        height="28"
      />
    </a>
  );
}
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [websiteEntry, setWebsiteEntry] = useState<{ website: string } | null>(
    null,
  );
  const [inquiryIntent, setInquiryIntent] =
    useState<InquiryIntent>('conversation');
  const inquiryNavigation = useRef<ReturnType<
    typeof createInquiryNavigation
  > | null>(null);
  useEffect(() => {
    countFunnelEvent('page_view', 'site');
    const navigation = createInquiryNavigation(
      window,
      (intent) => {
        if (intent) setInquiryIntent(intent);
        setContactOpen(intent !== null);
      },
      crypto.randomUUID(),
    );
    inquiryNavigation.current = navigation;
    return () => {
      navigation.dispose();
      inquiryNavigation.current = null;
    };
  }, []);
  const openScan = () => {
    setMenuOpen(false);
    inquiryNavigation.current?.open('scan');
  };
  const openConversation = () => {
    setMenuOpen(false);
    inquiryNavigation.current?.open('conversation');
  };
  return (
    <div className="hh-site" id="top">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="hh-header">
        <div className="hh-header-inner hh-shell">
          <Brand />
          <nav className="hh-nav" aria-label="Main navigation">
            <a href="#results">Results</a>
            <a href="#approach">How we work</a>
            <a href="#testimonials">Client stories</a>
          </nav>
          <button
            className="hh-btn hh-btn-small hh-header-cta"
            onClick={openConversation}
          >
            Book a call <ArrowUpRight />
          </button>
          <button
            className="hh-menu-button"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>
      <main id="main">
        <section
          className="hh-hero hh-hero-editorial hh-shell"
          aria-labelledby="hero-heading"
        >
          <div className="hh-hero-intro">
            <div className="hh-hero-message">
              <a className="hh-hero-proof" href="#testimonials">
                <img src="/assets/mark.png" alt="" width="24" height="24" />
                <span>
                  <strong>Lore</strong> · Three years working together
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <h1 id="hero-heading">
                Build demand for <em>your project in Korea.</em>
              </h1>
              <div className="hh-hero-invitation">
                <p className="hh-hero-copy">
                  Attract the right users, investors and partners. Your
                  Seoul-based team for positioning, creator relationships and
                  campaigns.
                </p>
                <div className="hh-hero-actions">
                  <button className="hh-btn" onClick={openConversation}>
                    Book a call <ArrowUpRight />
                  </button>
                  <button className="hh-btn hh-btn-outline" onClick={openScan}>
                    Get your free Korea scan <ArrowUpRight />
                  </button>
                </div>
                <p className="hh-hero-helper">
                  <span>
                    Free scan + live walkthrough. For qualified teams.
                  </span>
                  <a className="hh-text-link" href="#scan">
                    What’s included?
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="clients"
          className="hh-clients hh-shell"
          aria-labelledby="clients-heading"
        >
          <dl
            className="hh-client-credentials"
            aria-label="Holo Hive experience"
          >
            <div>
              <dt>Launches supported</dt>
              <dd>100+</dd>
            </div>
            <div>
              <dt>Years in Korean crypto</dt>
              <dd>5+</dd>
            </div>
          </dl>
          <div className="hh-clients-label">
            <p id="clients-heading">Teams we&apos;ve supported</p>
          </div>
          <div className="hh-client-grid">
            {primaryClients.map((client) => (
              <div className="hh-client-primary" key={client.name}>
                <ClientCard client={client} eager />
              </div>
            ))}
          </div>
          <details className="hh-more-clients">
            <summary>
              More teams we&apos;ve worked with <Plus size={16} />
            </summary>
            <div className="hh-client-grid hh-support-grid">
              {moreClients.map((client) => (
                <ClientCard key={client.name} client={client} />
              ))}
            </div>
          </details>
        </section>
        <section
          className="hh-results hh-section"
          id="results"
          aria-labelledby="results-heading"
        >
          <div className="hh-shell">
            <div className="hh-section-heading">
              <div>
                <p className="hh-kicker">Selected client results · 2026</p>
                <h2 id="results-heading">Results in Korea.</h2>
              </div>
            </div>
            <CasePosters />
            <div className="hh-results-action">
              <a className="hh-text-link" href="#approach">
                See how we work <ArrowRight size={18} />
              </a>
              <button
                className="hh-btn hh-btn-outline"
                onClick={openConversation}
              >
                Book a call <ArrowUpRight />
              </button>
            </div>
          </div>
        </section>
        <KoreaProcess />
        <section
          className="hh-testimonials hh-section"
          id="testimonials"
          aria-labelledby="client-story-heading"
        >
          <div className="hh-shell">
            <div className="hh-testimony-heading">
              <h2 id="client-story-heading">Why teams work with us.</h2>
            </div>
            <div className="hh-lore hh-lore-framed">
              <span className="hh-lore-orbit" aria-hidden="true" />
              <LoreTestimonial />
              <div className="hh-lore-copy">
                <h3 className="hh-lore-heading">
                  Three years <br />
                  working together.
                </h3>
                <blockquote className="hh-lore-quote">
                  “But when they show up like they&apos;re part of your team,
                  you don&apos;t leave.”
                </blockquote>
                <div className="hh-person">
                  <img
                    src="/assets/thomas-scaria.jpeg"
                    alt=""
                    width="43"
                    height="43"
                    loading="lazy"
                  />
                  <div>
                    <strong>Thomas Scaria</strong>
                    <span>CEO, Lore</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hh-testimonial-grid">
              <figure className="hh-testimonial">
                <blockquote>
                  “Holo Hive&apos;s help on MapleStory&apos;s launch was
                  invaluable. Their insights sharpened the team&apos;s messaging
                  and helped them move faster.”
                </blockquote>
                <figcaption>
                  <div className="hh-quote-person">
                    <img
                      src="/assets/parker-heath.jpg"
                      alt=""
                      width="88"
                      height="88"
                      loading="lazy"
                    />
                    <div>
                      <strong>Parker Heath</strong>
                      <span>Avalanche</span>
                    </div>
                  </div>
                </figcaption>
              </figure>
              <figure className="hh-testimonial">
                <blockquote>
                  “One of the few teams in Web3 we&apos;d work with again
                  without hesitation.”
                </blockquote>
                <figcaption>
                  <div className="hh-quote-person">
                    <img
                      src="/assets/kam-punia.jpg"
                      alt=""
                      width="88"
                      height="88"
                      loading="lazy"
                    />
                    <div>
                      <strong>Kam Punia</strong>
                      <span>CEO, Fableborne</span>
                    </div>
                  </div>
                </figcaption>
              </figure>
              <figure className="hh-testimonial">
                <blockquote>
                  “One of the most professional partners we have worked with.”
                </blockquote>
                <figcaption>
                  <div className="hh-quote-person">
                    <img
                      src="/assets/giulio-xiloyannis.jpg"
                      alt=""
                      width="88"
                      height="88"
                      loading="lazy"
                    />
                    <div>
                      <strong>Giulio Xiloyannis</strong>
                      <span>CEO, MON Protocol</span>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
            <IndustryRecommendations />
            <CreatorTestimonials />
          </div>
        </section>
        <section
          className="hh-scan hh-section"
          id="scan"
          aria-labelledby="scan-heading"
        >
          <div className="hh-scan-layout hh-shell">
            <div className="hh-scan-heading-row">
              <div>
                <p className="hh-kicker">Your Korea Market Scan</p>
                <h2 id="scan-heading">
                  What is Korea saying about your project?
                </h2>
                <p className="hh-scan-intro">
                  See where your project stands across leading Korean channels
                  and creators—and where the opportunity may be. We prepare your
                  scan before your first call and walk you through the findings
                  together.
                </p>
                <p className="hh-scan-research-depth">
                  <strong>300+</strong> Korean channels monitored
                </p>
              </div>
            </div>
            <div className="hh-scan-conversion">
              <div className="hh-scan-example-desktop">
                <ScanExplorer />
              </div>
              <div className="hh-scan-entry">
                <HomepageScanStart
                  onContinue={(website) => {
                    setWebsiteEntry({ website });
                    openScan();
                  }}
                />
                <Link
                  className="hh-scan-preview-link"
                  href="/korea-scan-example"
                >
                  Preview the report{' '}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          className="hh-faq hh-section hh-shell"
          id="faq"
          aria-labelledby="faq-heading"
        >
          <div className="hh-faq-layout">
            <div className="hh-faq-intro">
              <h2 id="faq-heading">Common questions.</h2>
            </div>
            <Accordion>
              {homepageQuestions.map(({ question, answer, detail }, i) => (
                <AccordionItem key={question} value={String(i)}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent keepMounted>
                    <p className="hh-faq-answer">{answer}</p>
                    <p className="hh-faq-detail">{detail}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        <HomepageGuideEntry />
        <section className="hh-final hh-shell" aria-labelledby="final-heading">
          <div className="hh-closing-panel hh-closing-spheres">
            <img
              className="hh-closing-texture"
              src="/assets/holo-monochrome-spheres.jpg"
              alt=""
              width="1788"
              height="2235"
              loading="lazy"
            />
            <div className="hh-closing-content">
              <span className="hh-closing-signature">
                <img src="/assets/mark.png" alt="" width="30" height="30" />
                <span>Holo Hive / Seoul</span>
              </span>
              <h2 id="final-heading">Find your next move in Korea.</h2>
              <div className="hh-final-actions">
                <button className="hh-btn" onClick={openConversation}>
                  Book a call <ArrowUpRight />
                </button>
                <button className="hh-btn hh-btn-outline" onClick={openScan}>
                  Get your Korea scan <ArrowUpRight />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="hh-footer hh-shell">
        <div className="hh-footer-top">
          <Brand />
          <div className="hh-footer-links">
            <Link href="/korea-guide">The Korea field guide</Link>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                openConversation();
              }}
            >
              Talk to us
            </a>
            <span className="hh-footer-social">
              {socialLinks.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </span>
          </div>
        </div>
        <div className="hh-footer-bottom">
          <span>© {new Date().getFullYear()} Holo Hive</span>
          <span>Korea research, strategy and execution.</span>
        </div>
      </footer>
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="hh-dialog">
          <DialogTitle>Explore Holo Hive</DialogTitle>
          <DialogDescription>
            Build demand for your project in Korea.
          </DialogDescription>
          <nav className="hh-menu-links" aria-label="Mobile navigation">
            {[
              ['Results', 'results'],
              ['How we work', 'approach'],
              ['Client stories', 'testimonials'],
              ['Your Korea scan', 'scan'],
              ['Common questions', 'faq'],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
            <Link href="/korea-guide" onClick={() => setMenuOpen(false)}>
              The Korea field guide
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </nav>
          <button className="hh-btn hh-menu-scan" onClick={openConversation}>
            Book a call <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </DialogContent>
      </Dialog>
      <QualificationDialog
        open={contactOpen}
        onOpenChange={(open) => {
          if (!open) inquiryNavigation.current?.close();
        }}
        intent={inquiryIntent}
        websiteEntry={websiteEntry}
      />
    </div>
  );
}
