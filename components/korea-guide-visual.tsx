import { ArrowRight } from 'lucide-react';

export function GuideVisual({
  id,
  compact = false,
}: {
  id: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`hh-guide-visual hh-guide-visual-${id}${compact ? ' is-compact' : ''}`}
      aria-hidden={compact || undefined}
    >
      {id === 'market-fit' && (
        <div className="hh-guide-fit">
          {['Audience', 'Relevance', 'Access', 'Readiness'].map((word, i) => (
            <div key={word}>
              <span>0{i + 1}</span>
              <strong>{word}</strong>
            </div>
          ))}
        </div>
      )}
      {id === 'discovery' && (
        <div className="hh-guide-discovery">
          <strong>Original explanation</strong>
          <span className="hh-guide-connector" aria-hidden="true" />
          <div>
            <span>Reposts</span>
            <span>New analysis</span>
          </div>
          <span className="hh-guide-connector" aria-hidden="true" />
          <strong>Community response</strong>
        </div>
      )}
      {id === 'your-position' && (
        <div className="hh-guide-evidence">
          {['Named', 'Explained', 'Sentiment', 'Participation'].map(
            (word, i) => (
              <div key={word}>
                <span>0{i + 1}</span>
                <strong>{word}</strong>
              </div>
            ),
          )}
        </div>
      )}
      {id === 'common-mistakes' && (
        <div className="hh-guide-shifts">
          {[
            ['An unexplained ask', 'A reason to act'],
            ['A familiar roster', 'Audience fit'],
            ['Activity alone', 'A clear baseline'],
          ].map(([from, to]) => (
            <div key={from}>
              <span>{from}</span>
              <ArrowRight size={18} aria-hidden="true" />
              <strong>{to}</strong>
            </div>
          ))}
        </div>
      )}
      {id === 'creators-and-sequence' && (
        <ol className="hh-guide-storyline">
          {['Problem', 'Project', 'Evidence', 'Next step'].map((word, i) => (
            <li key={word}>
              <span>0{i + 1}</span>
              <strong>{word}</strong>
            </li>
          ))}
        </ol>
      )}
      {id === 'participation' && (
        <div className="hh-guide-goals">
          {[
            ['Token / sale', 'Informed participation'],
            ['Product', 'First use → deeper use'],
            ['Ecosystem', 'Explore and take part'],
            ['Established project', 'A reason to look again'],
          ].map(([name, action]) => (
            <div key={name}>
              <strong>{name}</strong>
              <span>{action}</span>
            </div>
          ))}
        </div>
      )}
      {id === 'measurement' && (
        <div className="hh-guide-evidence">
          {['Delivered work', 'Market response', 'Product action', 'Next decision'].map(
            (word, i) => (
              <div key={word}>
                <span>0{i + 1}</span>
                <strong>{word}</strong>
              </div>
            ),
          )}
        </div>
      )}
      {id === 'choosing-a-partner' && (
        <div className="hh-guide-models">
          {[
            ['Direct buying', 'A defined placement'],
            ['Local hire', 'Internal ownership'],
            ['Korea partner', 'Coordinated delivery'],
          ].map(([name, role]) => (
            <div key={name}>
              <strong>{name}</strong>
              <span>{role}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const visualNotes: Record<string, string> = {
  'market-fit': 'Four planning checks—not a prediction of campaign results.',
  discovery: 'An observed sharing pattern, not a guaranteed chain of events.',
  'your-position':
    'Four separate questions. Mentions alone do not answer all four.',
  'common-mistakes': 'Change what you evaluate, not just how much you spend.',
  'creators-and-sequence':
    'An illustrative message sequence. Each piece adds context.',
  participation: 'Choose a goal before choosing the campaign.',
  measurement:
    'Separate the work delivered from the response and product actions it may have influenced.',
  'choosing-a-partner':
    'Different models solve different gaps. None removes the need for client decisions.',
};

export function GuideFigure({ id }: { id: string }) {
  return (
    <figure className="hh-guide-figure">
      <GuideVisual id={id} />
      <figcaption>{visualNotes[id]}</figcaption>
    </figure>
  );
}
