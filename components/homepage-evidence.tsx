'use client';
/* oxlint-disable nextjs/no-img-element -- Existing supplied client marks. */
import { ApproachDistinctions } from '@/components/process-evidence';
import { useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const clientContext: Record<
  string,
  {
    category: string;
    caption?: string;
    highlight: string;
    highlightLabel: string;
    description: string;
    source: string;
    sourceLabel: string;
    secondarySource?: { url: string; label: string };
    holoHiveHighlight?: {
      headline: string;
      detail: string;
      note?: string;
    };
  }
> = {
  Avalanche: {
    category: 'Blockchain infrastructure',
    caption: 'Galaxy-led $250M token sale',
    highlight: '$250M',
    highlightLabel: 'Locked-token sale',
    description:
      'Galaxy Digital, Dragonfly and ParaFi co-led the December 2024 locked-token sale.',
    source:
      'https://www.theblock.co/news/deals/2024-12-12-avalanche-raises-250-million-usd-locked-token-sale-330570',
    sourceLabel: 'Token-sale reporting',
  },
  OKX: {
    category: 'Exchange & wallets',
    caption: 'Backed by NYSE owner ICE',
    highlight: '$25B',
    highlightLabel: 'Valuation at ICE investment',
    description:
      'ICE, the parent of the New York Stock Exchange, invested in OKX in March 2026.',
    source:
      'https://ir.theice.com/press/news-details/2026/ICE-Makes-Investment-in-OKX-Establishing-Strategic-Relationship/',
    sourceLabel: 'ICE announcement',
  },
  'MapleStory Universe': {
    category: 'Gaming ecosystem',
    caption: 'A Nexon ecosystem',
    highlight: '$100M',
    highlightLabel: 'Strategic capital from Nexon',
    description:
      'Parent-company backing for the MapleStory Universe ecosystem, disclosed in April 2025.',
    source:
      'https://medium.com/maplestory-universe/why-maplestory-universe-chose-independent-funding-over-venture-capital-68e75f8b1477',
    sourceLabel: 'MapleStory Universe leadership note',
    holoHiveHighlight: {
      headline: 'A year-plus partnership.',
      detail:
        'We led and managed MapleStory Universe’s creator program and relationships for over a year, including support for its launch.',
    },
  },
  Ledger: {
    category: 'Wallets & security',
    caption: '7M+ hardware wallets sold',
    highlight: '7M+',
    highlightLabel: 'Hardware wallets sold',
    description:
      'Cumulative device sales reached by 2024. A global name in crypto security and self-custody.',
    source:
      'https://www.ledger.com/academy/topics/ledgersolutions/10-years-of-ledger-secure-self-custody-for-all',
    sourceLabel: 'Ledger anniversary report',
  },
  'Flying Tulip': {
    category: 'Decentralized finance',
    highlight: 'Amber Group',
    highlightLabel: 'Fasanara Digital · Paper Ventures',
    description:
      'Institutional investors in Flying Tulip, announced in January 2026.',
    source:
      'https://www.prnewswire.com/news-releases/flying-tulip-announces-additional-institutional-investors-302673774.html',
    sourceLabel: 'Flying Tulip announcement',
    holoHiveHighlight: {
      headline: '$10M+ from Korea.',
      detail: '15% of its $67M public round · 2026.',
    },
  },
  '0G': {
    category: 'AI infrastructure',
    caption: 'Backed by Samsung Next',
    highlight: '$40M',
    highlightLabel: 'Seed round led by Hack VC',
    description:
      '0G Labs raised the round in November 2024, with Samsung Next and Animoca Brands participating.',
    source:
      'https://0g.ai/blog/0g-ecosystem-receives-290m-in-financing-to-develop-world-s-first-decentralized-ai-operating-system',
    sourceLabel: '0G financing announcement',
    holoHiveHighlight: {
      headline: 'Supported at launch.',
      detail: 'We supported 0G’s token launch in September 2025.',
    },
  },
  Venice: {
    category: 'AI platform',
    caption: 'Backed by Dragonfly',
    highlight: '$65M',
    highlightLabel: 'Series A led by Dragonfly',
    description:
      'The privacy-focused AI platform raised at a $1B valuation in July 2026.',
    source: 'https://venice.ai/blog/venice-raises-65-million-series-a',
    sourceLabel: 'Venice announcement',
    holoHiveHighlight: {
      headline: 'Korean creator campaigns.',
      detail:
        'Our Korean creator work was already underway when Venice listed on Upbit.',
    },
  },
  Fogo: {
    category: 'Trading infrastructure',
    highlight: '$20M+',
    highlightLabel: 'Seed funding and token sales',
    description:
      'Raised across seed funding, Echo rounds and a Binance token sale by January 2026.',
    source:
      'https://www.theblock.co/news/business/2026-01-15-fogo-launches-high-speed-blockchain-mainnet-7-million-binance-token-sale-385663',
    sourceLabel: 'Funding and token-sale reporting',
    secondarySource: {
      url: 'https://www.fogo.io/blog/introducing-fogo-tokenomics---performance-without-compromise',
      label: 'Fogo community-round disclosure',
    },
  },
  Jumper: {
    category: 'Cross-chain finance',
    caption: 'Powered by LI.FI',
    highlight: '$30B+',
    highlightLabel: 'Total volume moved on Jumper',
    description:
      'Reported across 2.1M unique wallets. LI.FI powers the app’s cross-chain infrastructure.',
    source: 'https://jumper.xyz/learn/why-we-built-jumper-earn-portfolio',
    sourceLabel: 'Jumper platform overview',
    secondarySource: {
      url: 'https://li.fi/knowledge-hub/how-jumper-built-one-click-yield-access-with-li-fi-earn',
      label: 'Jumper and LI.FI',
    },
  },
  'Allora Network': {
    category: 'Decentralized AI',
    caption: 'Polychain · Framework',
    highlight: '$35M',
    highlightLabel: 'Allora Labs company funding',
    description:
      'Disclosed in June 2024. Investors in the network contributor include Polychain, Framework Ventures, CoinFund and Blockchain Capital.',
    source:
      'https://www.allora.network/blog/allora-labs-brings-total-funding-to-35-million-with-latest-strategic-round-917c6',
    sourceLabel: 'Allora funding announcement',
  },
  Moonbeam: {
    category: 'Blockchain infrastructure',
    highlight: 'Coinbase Ventures',
    highlightLabel: 'CoinFund · Binance Labs',
    description:
      'Investors in developer PureStake’s $6M strategic round for Moonbeam, led by CoinFund in March 2021.',
    source:
      'https://medium.com/moonbeam-network/moonbeam-monthly-dispatch-march-2021-moonbeam-75f85d2909ed',
    sourceLabel: 'Moonbeam funding announcement',
  },
  UMIA: {
    category: 'Onchain ventures',
    highlight: '$6.11M',
    highlightLabel: 'Committed in its completed token auction',
    description:
      'Total auction commitments at the September 2, 2026 close, funding its treasury and market liquidity.',
    source: 'https://app.umia.finance/p/umia/auction',
    sourceLabel: 'UMIA auction results',
  },
  ZetaChain: {
    category: 'Blockchain & AI',
    highlight: '$27M',
    highlightLabel: 'Funding round',
    description:
      'Participants included Jane Street Capital, Blockchain.com and GSR.',
    source:
      'https://www.zetachain.com/blog/zetachain-raises-twenty-seven-million-for-interoperable-layer-one-blockchain',
    sourceLabel: 'ZetaChain funding announcement',
  },
  'MON Protocol': {
    category: 'Gaming & publishing',
    caption: 'Publisher of Pixelmon',
    highlight: 'Animoca Brands',
    highlightLabel: 'Delphi Ventures · Merit Circle',
    description:
      'Investors in Pixelmon’s $8M seed round in 2024. MON Protocol is Pixelmon’s publisher.',
    source: 'https://onbeam.substack.com/p/39-treasury-report-q1-2024',
    sourceLabel: 'Pixelmon investor report',
    secondarySource: {
      url: 'https://www.pixelmon.ai/blog/240531-pixelmon-development-update-may-2024',
      label: 'Pixelmon publisher announcement',
    },
  },
  Fableborne: {
    category: 'Gaming',
    highlight: '103K+',
    highlightLabel: 'Players in Season 2',
    description:
      'The mobile action RPG joined Ronin in November 2024, with this player milestone already reached.',
    source: 'https://blog.roninchain.com/p/welcome-to-ronin-fableborne',
    sourceLabel: 'Ronin announcement',
  },
  Doodles: {
    category: 'Entertainment & culture',
    highlight: "McDonald's",
    highlightLabel: "adidas Originals · Kellogg's",
    description:
      'Global brands that have collaborated with Doodles across entertainment, fashion and consumer products.',
    source: 'https://www.doodles.app/',
    sourceLabel: 'Doodles brand collaborations',
  },
  NRN: {
    category: 'AI & gaming',
    highlight: '$6M',
    highlightLabel: 'Round led by Framework Ventures',
    description:
      'ArenaX Labs, the team behind NRN and AI Arena, announced the funding in 2024.',
    source:
      'https://www.linkedin.com/posts/brandon-da-silva-a67496a7_im-very-excited-to-announce-our-latest-round-activity-7150508505441910784-xnGZ',
    sourceLabel: 'Founder funding announcement',
  },
  'Animoca Brands': {
    category: 'Web3 ecosystem',
    caption: '600+ builders backed',
    highlight: '600+',
    highlightLabel: 'Builders backed',
    description:
      'A global portfolio spanning blockchain infrastructure, gaming and digital ownership.',
    source: 'https://www.animocabrands.com/',
    sourceLabel: 'Animoca Brands portfolio',
  },
  'The Sandbox': {
    category: 'Gaming & metaverse',
    caption: 'Backed by SoftBank',
    highlight: '$93M',
    highlightLabel: 'Series B led by SoftBank Vision Fund 2',
    description:
      'The virtual-world platform announced the funding round in November 2021.',
    source:
      'https://www.animocabrands.com/announcement/the-sandbox-raises-93m-in-round-led-by-softbank-vision-fund-2-to-grow-its-open-nft-metaverse',
    sourceLabel: 'The Sandbox funding announcement',
  },
  PUMA: {
    category: 'Global sports brand',
    caption: 'Sold in 120+ countries',
    highlight: '120+',
    highlightLabel: 'Countries',
    description:
      'PUMA distributes its products in over 120 countries worldwide.',
    source: 'https://about.puma.com/en',
    sourceLabel: 'PUMA corporate profile',
  },
};

export function ClientCard({
  client,
  eager = false,
}: {
  client: {
    name: string;
    file: string;
    width: number;
    height: number;
    monochrome?: boolean;
  };
  eager?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const context = clientContext[client.name];
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        openOnHover
        delay={160}
        closeDelay={180}
        className="hh-client"
        aria-label={`About ${client.name}`}
        style={
          {
            '--logo-width': `${client.width}px`,
            '--logo-height': `${client.height}px`,
          } as CSSProperties
        }
      >
        <span className="hh-client-mark">
          <img
            src={`/assets/${client.file}`}
            alt={client.name}
            width={client.width}
            height={client.height}
            loading={eager ? 'eager' : 'lazy'}
            className={
              client.monochrome ? 'hh-client-logo-monochrome' : undefined
            }
          />
        </span>
        <Plus className="hh-client-more" size={14} aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent
        ref={popupRef}
        initialFocus={popupRef}
        className="hh-client-popover"
        sideOffset={10}
      >
        <div className="hh-client-popover-header">
          <PopoverTitle>{client.name}</PopoverTitle>
          <button
            type="button"
            className="hh-client-close"
            onClick={() => setOpen(false)}
            aria-label={`Close ${client.name} details`}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="hh-client-proof">
          <p className="hh-client-context-label">Company background</p>
          <strong>{context.highlight}</strong>
          <span>{context.highlightLabel}</span>
        </div>
        <PopoverDescription>{context.description}</PopoverDescription>
        <div className="hh-client-sources">
          <a
            className="hh-client-source"
            href={context.source}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${context.sourceLabel} for ${client.name} (opens in a new tab)`}
          >
            {context.sourceLabel} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          {context.secondarySource && (
            <a
              className="hh-client-source"
              href={context.secondarySource.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${context.secondarySource.label} for ${client.name} (opens in a new tab)`}
            >
              {context.secondarySource.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function VeniceCoverageChart() {
  return (
    <figure className="hh-venice-chart">
      <figcaption>Cumulative Korean mentions · 2026</figcaption>
      <div
        className="hh-venice-bars"
        aria-label="Cumulative Korean mentions: 205 by May, 295 by June, 367 by July 2026."
      >
        {[
          ['May', 205],
          ['June', 295],
          ['July', 367],
        ].map(([month, value]) => (
          <div className="hh-venice-bar" key={month}>
            <div className="hh-venice-bar-space">
              <div style={{ height: `${(Number(value) / 367) * 100}%` }}>
                <strong>{value}</strong>
              </div>
            </div>
            <span>By {month}</span>
          </div>
        ))}
      </div>
      <p className="hh-note">
        Prior-year baseline: 61 mentions. Not monthly totals.
      </p>
    </figure>
  );
}

export function ScanExplorer() {
  const chapters = ['coverage', 'understanding', 'competition', 'opportunity'];
  const [chapter, setChapter] = useState('coverage');
  const chapterIndex = chapters.indexOf(chapter);
  return (
    <Tabs
      value={chapter}
      onValueChange={setChapter}
      className="hh-scan-explorer"
    >
      <div className="hh-report-folio">
        <span className="hh-folio-spine" aria-hidden="true">
          <img src="/assets/mark.png" width="24" height="24" alt="" />
        </span>
        <div className="hh-folio-page">
          <TabsList
            className="hh-scan-tabs"
            aria-label="What a Korea scan can show"
          >
            <TabsTrigger value="coverage">Coverage</TabsTrigger>
            <TabsTrigger value="understanding">Message</TabsTrigger>
            <TabsTrigger value="competition">Competition</TabsTrigger>
            <TabsTrigger value="opportunity">Opportunity</TabsTrigger>
          </TabsList>
          <div className="hh-scan-report">
            <div className="hh-scan-panels">
              {/* Share intrinsic height across reports. Visibility, aria-hidden and
              Base UI's inert state replace display:none for inactive panels. */}
              <TabsContent
                value="coverage"
                keepMounted
                hidden={false}
                aria-hidden={chapter !== 'coverage'}
                className="hh-scan-panel"
              >
                <div className="hh-report-heading">
                  <span>Coverage / Mining category</span>
                  <span className="hh-report-date">
                    90 days to August 25, 2026
                  </span>
                </div>
                <h3>An active category. Little coverage.</h3>
                <div className="hh-report-visual">
                  <div className="hh-report-stat">
                    <strong>
                      6<span> / 147</span>
                    </strong>
                    <p>
                      Relevant channels
                      <br />
                      that named the project.
                    </p>
                  </div>
                  <div>
                    <div className="hh-channel-matrix" aria-hidden="true">
                      {Array.from({ length: 147 }, (_, i) => (
                        <i key={i} className={i < 6 ? 'hh-active' : ''} />
                      ))}
                    </div>
                    <div className="hh-chart-legend">
                      <span>
                        <i className="hh-legend-green" />6 named the project
                      </span>
                      <span>
                        <i />
                        141 did not
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="understanding"
                keepMounted
                hidden={false}
                aria-hidden={chapter !== 'understanding'}
                className="hh-scan-panel"
              >
                <div className="hh-report-heading">
                  <span>Coverage quality / Bridge product</span>
                  <span className="hh-report-date">Research sample · 2026</span>
                </div>
                <h3>Coverage focused on the tool.</h3>
                <div className="hh-report-visual">
                  <div className="hh-report-stat">
                    <strong>0</strong>
                    <p>
                      Posts about its
                      <br />
                      token, sale, raise or team.
                    </p>
                  </div>
                  <div className="hh-coverage-types">
                    <p className="hh-data-caption">
                      What the 15 posts actually covered
                    </p>
                    {[
                      ['Campaign relays', 7],
                      ['Steps in other guides', 4],
                      ['Unpaid recommendations', 2],
                      ['Comparisons', 2],
                    ].map(([label, n]) => (
                      <div key={label}>
                        <span>{label}</span>
                        <div aria-hidden="true">
                          {Array.from({ length: Number(n) }, (_, i) => (
                            <i key={i} />
                          ))}
                        </div>
                        <strong>{n}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="competition"
                keepMounted
                hidden={false}
                aria-hidden={chapter !== 'competition'}
                className="hh-scan-panel"
              >
                <div className="hh-report-heading">
                  <span>Competition / RWA &amp; lending</span>
                  <span className="hh-report-date">Research sample · 2026</span>
                </div>
                <h3>The project vs. its peers.</h3>
                <div className="hh-competition-bars">
                  {[
                    ['Peer A', 719, 112],
                    ['Peer B', 512, 91],
                    ['Peer C', 407, 101],
                    ['Scanned project', 74, 36],
                  ].map(([label, n, channels]) => (
                    <div key={label}>
                      <span>{label}</span>
                      <div className="hh-competition-track">
                        <i style={{ width: `${(Number(n) / 719) * 100}%` }} />
                      </div>
                      <div>
                        <strong>{n} posts</strong>
                        <span>{channels} channels</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent
                value="opportunity"
                keepMounted
                hidden={false}
                aria-hidden={chapter !== 'opportunity'}
                className="hh-scan-panel"
              >
                <div className="hh-report-heading">
                  <span>Audience opportunity / Public sale</span>
                  <span className="hh-report-date">Research sample · 2026</span>
                </div>
                <h3>Relevant audiences. Missing coverage.</h3>
                <div className="hh-report-visual">
                  <div className="hh-report-stat">
                    <strong>50</strong>
                    <p>
                      Relevant channels
                      <br />
                      had not named the project.
                    </p>
                  </div>
                  <div className="hh-opportunity-chart">
                    <p className="hh-data-caption">
                      56 channels followed sales on the same platform
                    </p>
                    <div
                      className="hh-opportunity-bar"
                      aria-label="6 of 56 channels named the project; 50 did not."
                    >
                      <span style={{ width: `${(6 / 56) * 100}%` }} />
                      <span style={{ width: `${(50 / 56) * 100}%` }} />
                    </div>
                    <div className="hh-chart-legend">
                      <span>
                        <i className="hh-legend-green" />6 named the project
                      </span>
                      <span>
                        <i />
                        50 did not
                      </span>
                    </div>
                    <p className="hh-opportunity-context">
                      <strong>220</strong> sale-related posts across those
                      channels.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
          <div className="hh-report-navigation">
            <span>
              {String(chapterIndex + 1).padStart(2, '0')} <span>/ 04</span>
            </span>
            <div>
              <button
                type="button"
                className="hh-circle-action"
                aria-label="Previous scan finding"
                disabled={chapterIndex === 0}
                onClick={() => setChapter(chapters[chapterIndex - 1])}
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="hh-circle-action"
                aria-label="Next scan finding"
                disabled={chapterIndex === chapters.length - 1}
                onClick={() => setChapter(chapters[chapterIndex + 1])}
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hh-explorer-footer">
        <p>Examples from different projects. Identities removed.</p>
      </div>
    </Tabs>
  );
}

export function KoreaProcess() {
  return (
    <section
      className="hh-method hh-section"
      id="approach"
      aria-labelledby="method-heading"
    >
      <div className="hh-shell">
        <header className="hh-method-intro">
          <p className="hh-kicker">Our approach</p>
          <h2 id="method-heading">Attention alone doesn’t build demand.</h2>
          <p className="hh-method-lead">
            Reach people who matter, give them a reason to care, and connect
            that interest to your goals.
          </p>
        </header>
        <ApproachDistinctions />
        <p className="hh-method-ownership">
          <strong>One team in Seoul.</strong>
          <span>Local strategy, execution and English reporting.</span>
        </p>
      </div>
    </section>
  );
}

export function CreatorTestimonials() {
  return (
    <div className="hh-creator-testimonials">
      <h3 className="hh-quote-group-label">Recommended by Korean creators.</h3>
      <div className="hh-local-quotes">
        <figure>
          <blockquote>
            “The best agency I&apos;ve worked with in Korea.”
          </blockquote>
          <figcaption>
            <img
              src="/assets/ewl.jpg"
              alt=""
              width="64"
              height="64"
              loading="lazy"
            />
            <div>
              <strong>EWL</strong>
              <span>Korean creator · @ewlreads</span>
            </div>
          </figcaption>
        </figure>
        <figure>
          <blockquote>
            “I&apos;ve warned them [teams] about most agencies in Korea. Holo
            Hive is legitimate. They know their stuff.”
          </blockquote>
          <figcaption>
            <img
              src="/assets/snatch.jpg"
              alt=""
              width="64"
              height="64"
              loading="lazy"
            />
            <div>
              <strong>Snatch</strong>
              <span>Korean trader & creator · @0x_snatch</span>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
