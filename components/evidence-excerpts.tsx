import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
export function ScanExcerpt({ full = false }: { full?: boolean }) {
  return (
    <div className="research-excerpt">
      <div className="excerpt-head">
        <span className="eyebrow">From a real Korea scan</span>
        <span>Project name redacted</span>
      </div>
      <h3>
        There is category discussion.
        <br />
        Is it the right kind?
      </h3>
      <div className="scan-facts">
        <div>
          <strong>2,285</strong>
          <span>mining-related posts</span>
        </div>
        <div>
          <strong>147</strong>
          <span>relevant channels</span>
        </div>
        <div>
          <strong>6</strong>
          <span>channels naming the project</span>
        </div>
      </div>
      <p className="excerpt-window">
        90 days to August 25, 2026 · 263 Korean-language channels reviewed
      </p>
      <div className="research-bars">
        {[
          { label: 'Listed Bitcoin miners / corporate news', n: 511 },
          { label: 'Miners pivoting to AI data centres', n: 153 },
          { label: 'Tokens readers can mine', n: 5 },
        ].map((row) => (
          <div className="research-bar" key={row.label}>
            <div>
              <span>{row.label}</span>
              <strong>{row.n}</strong>
            </div>
            <div className="bar-track">
              <span style={{ width: `${(row.n / 511) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="excerpt-caption">
        Selected themes from the 2,285 posts; not an exhaustive breakdown.
      </p>
      <div className="research-read">
        <strong>What this changes</strong>
        <p>
          Most of the selected discussion concerns listed miners and
          infrastructure. Low project coverage alone does not establish demand.
          The next question is whether these audiences have a reason and a
          practical way to take part.
        </p>
      </div>
      {full ? (
        <div className="excerpt-method">
          <h3>How to read this excerpt</h3>
          <p>
            The category set contains 147 relevant channels within a broader
            263-channel review. Six category channels named the project; that is
            a channel count, not its number of mentions. Post counts measure
            coverage, not unique people or buying intent.
          </p>
          <p>
            This is a typeset, redacted excerpt of an August 2026 scan. The
            project name, creator handles and project-specific recommendations
            are removed. The original scan includes examples and source
            references; those are not reproduced here.
          </p>
        </div>
      ) : (
        <Link className="text-link" href="/korea-scan-example">
          See scope and interpretation <ArrowUpRight size={17} />
        </Link>
      )}
    </div>
  );
}
export function ReportingExcerpt() {
  return (
    <div className="report-excerpt">
      <div className="excerpt-head">
        <span className="eyebrow">English-language reporting excerpt</span>
        <span>Client and creators redacted</span>
      </div>
      <h3>
        The work, the response,
        <br />
        and what to do with it.
      </h3>
      <p className="excerpt-window">
        July 20-August 31, 2026 · Creator posts only
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead>Content focus</TableHead>
            <TableHead className="numeric">Posts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            ['Jul 20-Aug 2', 'Baseline, introduction and token structure', 15],
            ['Aug 3-9', 'Treasury mechanism and creator questions', 16],
            ['Aug 10-16', 'Published argument: capital formation', 5],
            ['Aug 17-23', 'Testnet evidence and product explanation', 9],
            ['Aug 24-31', 'Auction dates and mechanics', 10],
          ].map(([date, focus, n]) => (
            <TableRow key={date}>
              <TableCell>{date}</TableCell>
              <TableCell>{focus}</TableCell>
              <TableCell className="numeric">{n}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="report-takeaway">
        <strong>55 creator posts · 10 creators · 6 briefs</strong>
        <p>
          Separate from the market-wide 181 mentions. The report explains the
          narrative each week, distinguishes commissioned work from wider
          pickup, and identifies which creators merit further attention.
        </p>
      </div>
      <small>
        Typeset summary of an actual campaign report prepared September 1, 2026.
        Names and source links are omitted in this excerpt.
      </small>
    </div>
  );
}
