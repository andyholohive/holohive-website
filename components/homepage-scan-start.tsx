'use client';

import { useRef, useState, type SyntheticEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { validateInquiry } from '@/lib/qualification';

export function HomepageScanStart({
  onContinue,
}: {
  onContinue: (website: string) => void;
}) {
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);

  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateInquiry({ website });
    if (result.errors.website) {
      setError(result.errors.website);
      input.current?.focus();
      return;
    }
    setError('');
    onContinue(result.data.website);
  }

  return (
    <form
      className="hh-scan-start"
      aria-labelledby="scan-start-heading"
      onSubmit={submit}
      noValidate
    >
      <h3 id="scan-start-heading">Get your free Korea scan + walkthrough</h3>
      <p className="hh-scan-start-eligibility">For qualified teams.</p>
      <label htmlFor="scan-start-website">What’s your project’s website?</label>
      <div className="hh-scan-start-controls">
        <input
          ref={input}
          id="scan-start-website"
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={500}
          required
          placeholder="yourproject.com"
          value={website}
          onChange={(event) => {
            setWebsite(event.target.value);
            setError('');
          }}
          aria-invalid={!!error}
          aria-describedby={
            error ? 'scan-start-error scan-start-next' : 'scan-start-next'
          }
        />
        <button className="hh-btn" type="submit">
          Continue <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p className="hh-field-error" id="scan-start-error" role="alert">
          {error}
        </p>
      )}
      <p className="hh-scan-start-next" id="scan-start-next">
        A few details to check fit, then choose a time.
      </p>
    </form>
  );
}
