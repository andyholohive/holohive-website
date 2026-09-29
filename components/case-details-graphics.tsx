export function UmiaChart() {
  // Same reporting frame: recorded cumulative checkpoints, not daily data.
  // All columns share a zero baseline and a 200-mention scale.
  const checkpoints = [
    { value: 0, date: 'Jul 20', label: 'Kickoff' },
    { value: 49, date: 'Aug 16', label: 'First four weeks' },
    { value: 181, date: 'Aug 31', label: 'Six-week total' },
  ];
  return (
    <figure className="hh-checkpoint-chart" aria-labelledby="umia-record-title">
      <div className="hh-checkpoint-heading">
        <div>
          <span>Recorded checkpoints · 2026</span>
          <h4 id="umia-record-title">Cumulative Korean mentions</h4>
        </div>
        <p>
          <strong>45</strong> channels at the final checkpoint
        </p>
      </div>
      <div className="hh-checkpoint-columns">
        {checkpoints.map((point) => (
          <div className="hh-checkpoint-column" key={point.date}>
            <div className="hh-checkpoint-track">
              <div
                className="hh-checkpoint-bar"
                style={{ height: `${(point.value / 200) * 100}%` }}
              >
                <strong>{point.value}</strong>
              </div>
            </div>
            <span>{point.date}</span>
            <small>{point.label}</small>
          </div>
        ))}
      </div>
      <figcaption>
        Mentions include forwards. Checkpoints are cumulative, not daily totals.
      </figcaption>
    </figure>
  );
}
