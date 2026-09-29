/** Static excerpt from the same redacted mining-category scan as ScanExplorer.
 * These are sample findings, never a prediction about the visitor's project. */
export function ScanSamplePreview() {
  return (
    <figure
      className="hh-scan-sample"
      aria-label="Sample scan: mining-category coverage"
    >
      <figcaption className="hh-report-period">
        <span>90 days to August 25, 2026</span>
      </figcaption>
      <p className="hh-sample-category">Mining category · Coverage</p>
      <p className="hh-sample-finding">
        An active category.
        <br />
        Little coverage.
      </p>
      <p className="hh-sample-number">
        6 <span>/ 147</span>
      </p>
      <p className="hh-sample-label">
        Relevant channels that named the project
      </p>
      <div className="hh-sample-bar" aria-hidden="true">
        <span />
      </div>
    </figure>
  );
}
