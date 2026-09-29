import { cases, type CaseKey } from '@/lib/cases';

const measures: Record<
  CaseKey,
  { label: string; value: string; scope: string }[]
> = {
  umia: [
    {
      label: 'Launch ranking',
      value: 'No. 1',
      scope:
        'Monitored Korean channels · 26 Aug 2026. Zero mentions in the prior 12-month baseline.',
    },
    {
      label: 'Pre-sale interest',
      value: '$1M+',
      scope:
        'Allocation requests from Korean creators—not completed investment.',
    },
  ],
  venice: [
    {
      label: 'Onchain AI mindshare',
      value: '30%',
      scope:
        'Quality-weighted coverage in the tracked comparison · Summer 2026. Exact cutoff dates were not supplied.',
    },
    {
      label: 'Korean active users',
      value: '6,200+',
      scope:
        'Venice-reported analytics · Separate two-week July window. Not a count of users acquired by Holo Hive.',
    },
  ],
  fogo: [
    {
      label: 'Tracked trading volume',
      value: '$5.48M',
      scope:
        'Company-reported Valiant activity · First two conversion weeks, after awareness-building. Not revenue or net capital inflow.',
    },
  ],
};

export function CaseMeasurement({ slug }: { slug: CaseKey }) {
  const c = cases[slug];
  return (
    <section
      className="case-method hh-case-measurement"
      id="measurement"
      aria-labelledby="measurement-heading"
    >
      <h2 id="measurement-heading">How these results are measured.</h2>
      <dl className="hh-measurement-register">
        {measures[slug].map((measure) => (
          <div key={measure.label}>
            <dt>{measure.label}</dt>
            <dd>
              <strong>{measure.value}</strong>
              <span>{measure.scope}</span>
            </dd>
          </div>
        ))}
      </dl>
      <details className="hh-measurement-notes">
        <summary>Source notes and limitations</summary>
        <div>
          <p>{c.note}</p>
          {slug === 'venice' && (
            <>
              <p>
                The revised Summer 2026 comparison places Venice first at 30%,
                followed by Virtuals at 17%, Ritual at 11% and Bittensor at 11%.
                The homepage shows the top four; tile areas compare those four,
                while labels refer to the full tracked comparison. Other tracked
                projects account for 31%. This is not all Korean discussion or
                market share.
              </p>
              <p>
                The earlier May 19–August 10 snapshot records 251 pieces of
                coverage through August 10, not the whole engagement. The
                campaign coverage chart uses a separate reporting series. These
                totals and the July active-user figure must not be combined.
              </p>
            </>
          )}
          <p>
            <strong>Source:</strong> {c.source}
          </p>
          {slug === 'venice' && (
            <p>
              <strong>Mindshare source:</strong> Revised Holo Hive Summer 2026
              comparison, replacing the earlier 28% snapshot.
            </p>
          )}
        </div>
      </details>
    </section>
  );
}
