import Link from 'next/link';
export function GuideSources() {
  return (
    <section
      className="hh-primer-sources"
      id="sources"
      tabIndex={-1}
      aria-labelledby="sources-title"
    >
      <p className="hh-kicker">Sources & definitions</p>
      <h2 id="sources-title">What this guide is based on.</h2>
      <p>
        Based on Holo Hive research, market scans and campaign experience. Our
        observations do not represent every Korean participant. External sources
        and case studies are linked below.
      </p>
      <ul>
        <li>
          <a
            href="https://www.fsc.go.kr/po010101/86534"
            target="_blank"
            rel="noreferrer"
          >
            FSC / KoFIU H2 2025 market survey
          </a>
          <span>
            Published March 25, 2026. Registered domestic providers; accounts
            and activity are not unique people or a measure of all Korean crypto
            use.
          </span>
        </li>
        <li>
          <a
            href="https://telegram.org/faq_channels"
            target="_blank"
            rel="noreferrer"
          >
            Telegram Channels FAQ
          </a>
          <span>Channel roles, forwarding and approximate view counts.</span>
        </li>
        <li>
          <a
            href="https://www.fsc.go.kr/no010101/87177"
            target="_blank"
            rel="noreferrer"
          >
            FSC / FIU advisory
          </a>
          <span>
            June 24, 2026. Unregistered virtual-asset operators and
            Korea-directed promotion.
          </span>
        </li>
        <li>
          <Link href="/work/venice">Venice case study</Link>
          <span>
            Revised Summer 2026 weighted-coverage comparison. The July
            active-user window and signup activations are separate measures.
          </span>
        </li>
        <li>
          <Link href="/work/umia">UMIA case study</Link>
          <span>
            August 26 case snapshot and later report through August 31, 2026.
            Allocation requests are not completed investments.
          </span>
        </li>
        <li>
          <Link href="/work/fogo">Fogo case study</Link>
          <span>
            Tracked trading volume in the first two conversion weeks, after
            awareness-building. Volume is not project revenue.
          </span>
        </li>
        <li>
          <Link href="/#flying-tulip">Flying Tulip public round</Link>
          <span>
            Korea contributed 15% of a $67M public round. Regional participation
            does not isolate Holo Hive’s causal contribution.
          </span>
        </li>
        <li>
          <Link href="/korea-scan-example">Redacted Korea scan example</Link>
          <span>
            A practical example of scope, evidence and interpretation.
          </span>
        </li>
      </ul>
    </section>
  );
}
