'use client';

import { ScanSamplePreview } from '@/components/scan-sample-preview';

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  BookOpen,
  X,
} from 'lucide-react';
import { CalendarBooking } from '@/components/calendar-booking';
import { countFunnelEvent } from '@/lib/funnel-client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  emptyInquiry,
  qualificationOptions,
  validateInquiry,
  ineligibilityMessage,
  type Inquiry,
  type InquiryIntent,
  type InquiryErrors,
  type QualificationChoice,
  type QualificationStatus,
  type QualificationReason,
} from '@/lib/qualification';

type Outcome = {
  status: QualificationStatus;
  reasons: QualificationReason[];
  calendarUrl?: string;
  reference: string;
  intent: InquiryIntent;
};

export function QualificationDialog({
  open,
  onOpenChange,
  intent = 'conversation',
  websiteEntry,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intent?: InquiryIntent;
  websiteEntry?: { website: string } | null;
}) {
  const [answers, setAnswers] = useState<Inquiry>({
    ...emptyInquiry,
  });
  const [step, setStep] = useState<'project' | 'fit'>('project');
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [booked, setBooked] = useState(false);
  const [bookingDismissed, setBookingDismissed] = useState(false);
  const calendarOpen =
    outcome?.status === 'calendar_ready' && !!outcome.calendarUrl;
  const showCalendar = calendarOpen && !bookingDismissed;
  useEffect(() => {
    if (!open) return;
    countFunnelEvent('form_open', intent);
    if (!outcome && step === 'fit')
      countFunnelEvent('project_completed', intent);
    if (showCalendar) countFunnelEvent('calendar_offered', intent);
  }, [open, intent, step, outcome, showCalendar]);
  const id = useRef('');
  const activeSubmission = useRef<AbortController | null>(null);
  const previousIntent = useRef(intent);
  const fax = useRef<HTMLInputElement>(null);
  const formTitle = useRef<HTMLHeadingElement>(null);
  const resultTitle = useRef<HTMLHeadingElement>(null);
  const appliedWebsiteEntry = useRef<{ website: string } | null>(null);
  const [websiteConfirmed, setWebsiteConfirmed] = useState(false);
  useEffect(() => {
    if (
      !open ||
      intent !== 'scan' ||
      !websiteEntry ||
      appliedWebsiteEntry.current === websiteEntry
    )
      return;
    const validation = validateInquiry({ website: websiteEntry.website });
    if (validation.errors.website) return;
    appliedWebsiteEntry.current = websiteEntry;
    activeSubmission.current?.abort();
    activeSubmission.current = null;
    id.current = crypto.randomUUID();
    setAnswers((previous) => ({
      ...previous,
      website: validation.data.website,
    }));
    setWebsiteConfirmed(true);
    setStep('project');
    setOutcome(null);
    setBooked(false);
    setBookingDismissed(false);
    setBusy(false);
    setErrors({});
    setSubmitError('');
  }, [open, intent, websiteEntry]);
  useEffect(() => {
    if (previousIntent.current !== intent) {
      // Keep draft answers, but never reuse a saved result for a different request.
      activeSubmission.current?.abort();
      activeSubmission.current = null;
      setBusy(false);
      previousIntent.current = intent;
      id.current = '';
      setOutcome(null);
      setBooked(false);
      setBookingDismissed(false);
      setSubmitError('');
    }
    if (open && !id.current) id.current = crypto.randomUUID();
  }, [open, intent]);
  useEffect(() => {
    // The dialog unmounts its iframe on close. Do not reopen a fresh scheduler
    // under a completed-booking heading when the user returns to this request.
    if (!open && booked && outcome?.intent === intent)
      setBookingDismissed(true);
  }, [open, booked, outcome, intent]);
  useEffect(() => {
    if (!open) return;
    if (outcome) {
      resultTitle.current?.focus();
    } else {
      formTitle.current?.focus();
    }
    formTitle.current?.closest('.hh-inquiry-scroll')?.scrollTo({ top: 0 });
  }, [outcome, open, booked, step]);

  function update(key: keyof Inquiry, value: string) {
    if (answers[key] === value) return;
    // An uncertain save may have reached the server. Edited answers are a new
    // request; an unchanged retry retains its ID and remains idempotent.
    id.current = crypto.randomUUID();
    setAnswers((previous) => ({
      ...previous,
      [key]: value,
    }));
    setErrors((previous) => ({
      ...previous,
      [key]: undefined,
    }));
    setSubmitError('');
  }
  function failValidation(found: InquiryErrors) {
    setErrors(found);
    const order: (keyof Inquiry)[] = [
      'website',
      'goal',
      'name',
      'email',
      'need',
      'capacity',
      'budget',
    ];
    const first = order.find((key) => found[key]) ?? Object.keys(found)[0];
    requestAnimationFrame(() =>
      document.getElementById(`inquiry-${first}`)?.focus(),
    );
  }

  function editAnswers() {
    setOutcome(null);
    setBooked(false);
    setBookingDismissed(false);
    setErrors({});
    setSubmitError('');
    setStep('fit');
    // Preserve the saved request ID until an answer actually changes.
  }
  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const validation = validateInquiry(answers);
    // The shared validator still accepts legacy written-goal submissions.
    // This version of the form explicitly asks visitors to select a goal.
    if (!answers.goal) validation.errors.goal = 'Choose an answer.';
    const projectKeys: (keyof Inquiry)[] = [
      'website',
      'goal',
      'name',
      'email',
      'need',
    ];
    const projectErrors = Object.fromEntries(
      Object.entries(validation.errors).filter(([key]) =>
        projectKeys.includes(key as keyof Inquiry),
      ),
    ) as InquiryErrors;
    if (step === 'project') {
      if (Object.keys(projectErrors).length)
        return failValidation(projectErrors);
      setErrors({});
      setStep('fit');
      return;
    }
    if (Object.keys(projectErrors).length) {
      setStep('project');
      return failValidation(projectErrors);
    }
    if (Object.keys(validation.errors).length)
      return failValidation(validation.errors);
    setBusy(true);
    setSubmitError('');
    const abort = new AbortController();
    activeSubmission.current = abort;
    const submissionId = id.current;
    const timeout = setTimeout(() => abort.abort(), 20000);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: submissionId,
          intent,
          answers: validation.data,
          companyFax: fax.current?.value ?? '',
        }),
        signal: abort.signal,
      });
      const result = (await response.json()) as Partial<Outcome> & {
        errors?: InquiryErrors;
        error?: string;
      };
      // Hash navigation may switch inquiry routes while the request is in flight.
      if (id.current !== submissionId) return;
      if (!response.ok) {
        if (result.errors) {
          if (projectKeys.some((key) => result.errors?.[key]))
            setStep('project');
          failValidation(result.errors);
        }
        throw new Error(
          result.error || 'We could not save your inquiry. Please try again.',
        );
      }
      if (
        !['calendar_ready', 'not_eligible', 'eligibility_unconfirmed'].includes(
          result.status ?? '',
        ) ||
        !result.reference ||
        (result.status === 'calendar_ready' && !result.calendarUrl)
      )
        throw new Error('Please try again.');
      setOutcome({
        status: result.status as QualificationStatus,
        reasons: result.reasons ?? [],
        reference: result.reference,
        calendarUrl: result.calendarUrl,
        intent: result.intent === 'scan' ? 'scan' : 'conversation',
      });
    } catch (error) {
      if (id.current !== submissionId) return;
      setSubmitError(
        error instanceof Error && error.name !== 'AbortError'
          ? error.message
          : 'The connection timed out. Your answers are still here. Please try again.',
      );
    } finally {
      clearTimeout(timeout);
      if (activeSubmission.current === abort) {
        activeSubmission.current = null;
        setBusy(false);
      }
    }
  }

  function textField(
    key: 'name' | 'email' | 'website',
    label: string,
    type = 'text',
    autoComplete?: string,
  ) {
    return (
      <div className="hh-inquiry-field">
        <label htmlFor={`inquiry-${key}`}>{label}</label>
        <input
          id={`inquiry-${key}`}
          name={key}
          type={type}
          autoComplete={autoComplete}
          value={answers[key]}
          onChange={(event) => update(key, event.target.value)}
          required
          maxLength={key === 'website' ? 500 : key === 'email' ? 254 : 120}
          placeholder={key === 'website' ? 'yourproject.com' : undefined}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `inquiry-${key}-error` : undefined}
        />
        {errors[key] && (
          <span className="hh-field-error" id={`inquiry-${key}-error`}>
            {errors[key]}
          </span>
        )}
      </div>
    );
  }
  function choice(key: QualificationChoice, label: string, help?: string) {
    const options = qualificationOptions[key].filter(
      ([value]) => key !== 'goal' || value !== 'written',
    );
    return (
      <div className="hh-inquiry-field">
        <label id={`inquiry-${key}-label`} htmlFor={`inquiry-${key}`}>
          {label}
        </label>
        {help && (
          <p className="hh-form-help" id={`inquiry-${key}-help`}>
            {help}
          </p>
        )}
        <Select
          name={key}
          value={answers[key] || null}
          onValueChange={(value) => update(key, value ?? '')}
          items={Object.fromEntries(qualificationOptions[key])}
        >
          <SelectTrigger
            id={`inquiry-${key}`}
            className="hh-inquiry-select"
            aria-labelledby={`inquiry-${key}-label`}
            aria-required="true"
            aria-invalid={!!errors[key]}
            aria-describedby={
              [
                help && `inquiry-${key}-help`,
                errors[key] && `inquiry-${key}-error`,
              ]
                .filter(Boolean)
                .join(' ') || undefined
            }
          >
            <SelectValue placeholder="Select an answer" />
          </SelectTrigger>
          <SelectContent
            className="hh-inquiry-options"
            alignItemWithTrigger={false}
          >
            {options.map(([value, text]) => (
              <SelectItem key={value} value={value}>
                {text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors[key] && (
          <span className="hh-field-error" id={`inquiry-${key}-error`}>
            {errors[key]}
          </span>
        )}
      </div>
    );
  }

  function fitChoice(key: 'capacity' | 'budget', label: string) {
    const options = qualificationOptions[key].filter(
      ([value]) =>
        key !== 'budget' || !['planning', 'below_range'].includes(value),
    );
    return (
      <div className="hh-fit-question">
        <p id={`inquiry-${key}-label`} className="hh-fit-question-label">
          {label}
        </p>
        <RadioGroup
          name={key}
          value={answers[key]}
          onValueChange={(value) => update(key, String(value))}
          className="hh-fit-options"
          aria-labelledby={`inquiry-${key}-label`}
          aria-required="true"
          aria-describedby={errors[key] ? `inquiry-${key}-error` : undefined}
          disabled={busy}
        >
          {options.map(([value, text], index) => (
            <label
              key={value}
              className="hh-fit-option"
              data-selected={answers[key] === value}
            >
              <RadioGroupItem
                id={index === 0 ? `inquiry-${key}` : `inquiry-${key}-${value}`}
                value={value}
                aria-invalid={!!errors[key]}
              />
              <span>{text}</span>
            </label>
          ))}
        </RadioGroup>
        {errors[key] && (
          <span className="hh-field-error" id={`inquiry-${key}-error`}>
            {errors[key]}
          </span>
        )}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`hh-dialog hh-inquiry-shell ${showCalendar ? 'hh-booking-dialog' : 'hh-qualification-dialog'} ${!outcome && step === 'project' && intent === 'scan' ? 'hh-inquiry-with-preview' : ''}`}
        showCloseButton={false}
      >
        <DialogClose className="hh-inquiry-close" aria-label="Close">
          <X size={20} aria-hidden="true" />
        </DialogClose>
        <div className="hh-inquiry-scroll">
          {!outcome && step === 'project' && intent === 'scan' && (
            <aside className="hh-inquiry-preview">
              <p className="hh-inquiry-preview-benefit">
                Find where your project is being overlooked.
              </p>
              <ScanSamplePreview />
              <p className="hh-inquiry-preview-includes">
                Your coverage · Competitor position · Opportunities
              </p>
            </aside>
          )}
          <div className="hh-inquiry-main">
            {outcome ? (
              <>
                <div
                  className={
                    showCalendar ? 'hh-booking-intro' : 'hh-inquiry-result'
                  }
                >
                  {calendarOpen && !booked && (
                    <span className="hh-inquiry-saved">
                      <Check size={17} /> Eligible based on your answers
                    </span>
                  )}
                  <DialogTitle ref={resultTitle} tabIndex={-1}>
                    {booked
                      ? 'Your call is booked.'
                      : outcome.status === 'calendar_ready'
                        ? outcome.intent === 'scan'
                          ? 'Book your Korea scan walkthrough.'
                          : 'Choose a time to discuss your Korea goals.'
                        : outcome.status === 'eligibility_unconfirmed'
                          ? 'We couldn’t confirm your eligibility.'
                          : outcome.intent === 'scan'
                            ? 'You’re not eligible for the free scan and call yet.'
                            : 'We’re not the right fit for a call yet.'}
                  </DialogTitle>
                  <DialogDescription>
                    {booked
                      ? bookingDismissed
                        ? 'Explore the Korea field guide before we meet.'
                        : 'Your appointment details are below. You can explore the Korea field guide before we meet.'
                      : outcome.status === 'calendar_ready'
                        ? outcome.intent === 'scan'
                          ? 'We’ll prepare your scan before the call, walk you through the findings, and discuss what makes sense for your goals. No obligation to work together.'
                          : 'Choose a time below to discuss your Korea goals with Yano.'
                        : ineligibilityMessage(outcome.reasons)}
                  </DialogDescription>
                  {!calendarOpen && (
                    <div className="hh-inquiry-guide-next">
                      <BookOpen size={24} aria-hidden="true" />
                      <div>
                        <h3>Start with the Korea field guide.</h3>
                        <p>
                          Understand the opportunity, common pitfalls and what a
                          local partner should deliver.
                        </p>
                      </div>
                      <Link
                        className="hh-btn"
                        href="/korea-guide"
                        onClick={() => onOpenChange(false)}
                      >
                        Explore the field guide{' '}
                        <ArrowRight size={18} aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                  <div className="hh-inquiry-result-actions">
                    {!booked && (
                      <button
                        type="button"
                        className="hh-text-link"
                        onClick={editAnswers}
                      >
                        Edit answers
                      </button>
                    )}
                    {!booked &&
                    outcome.status === 'calendar_ready' &&
                    outcome.calendarUrl ? (
                      <a
                        className="hh-text-link"
                        href={outcome.calendarUrl}
                        onClick={() =>
                          countFunnelEvent('calendar_external', outcome.intent)
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Calendar not loading? Open it separately{' '}
                        <ArrowUpRight size={17} />
                      </a>
                    ) : booked ? (
                      <Link
                        className="hh-text-link"
                        href="/korea-guide"
                        onClick={() => onOpenChange(false)}
                      >
                        Explore the Korea field guide <ArrowUpRight size={17} />
                      </Link>
                    ) : null}
                  </div>
                </div>
                {calendarOpen &&
                  !bookingDismissed &&
                  outcome.status === 'calendar_ready' &&
                  outcome.calendarUrl && (
                    <CalendarBooking
                      calendarUrl={outcome.calendarUrl}
                      onScheduled={() => {
                        setBooked(true);
                        countFunnelEvent('booking_reported', outcome.intent);
                      }}
                      title={
                        outcome.intent === 'scan'
                          ? 'Book your Korea scan walkthrough with Yano'
                          : 'Book a conversation with Yano on Calendly'
                      }
                    />
                  )}
              </>
            ) : (
              <>
                <ol className="hh-inquiry-steps" aria-label="Request progress">
                  {['Project', 'Fit', 'Booking'].map((label, index) => (
                    <li
                      key={label}
                      aria-current={
                        (step === 'project' ? 0 : 1) === index
                          ? 'step'
                          : undefined
                      }
                      data-complete={step === 'fit' && index === 0}
                    >
                      <span>{index + 1}</span>
                      {label}
                    </li>
                  ))}
                </ol>
                <div>
                  <DialogTitle ref={formTitle} tabIndex={-1}>
                    {step === 'fit'
                      ? intent === 'scan'
                        ? 'Your scan and call are $0.'
                        : 'Your first call is free.'
                      : intent === 'scan'
                        ? 'Your Korea scan + live walkthrough'
                        : 'Let’s see if we’re a fit.'}
                  </DialogTitle>
                  <DialogDescription>
                    {step === 'fit' ? (
                      'For qualifying teams. No obligation to hire us.'
                    ) : intent === 'scan' ? (
                      <>
                        <strong className="hh-inquiry-free">
                          Free for qualified teams
                        </strong>
                        <span className="hh-inquiry-prepared">
                          Prepared before your first call.
                        </span>
                      </>
                    ) : (
                      'Answer a few questions, then choose a time if we’re a fit.'
                    )}
                  </DialogDescription>
                  {step === 'fit' && (
                    <p className="hh-fit-paid-copy">
                      Ongoing engagements: <span>US$15K–$25K/month</span>,
                      depending on scope. Usually starting with 90 days.
                    </p>
                  )}
                </div>
                <form
                  className="hh-form hh-inquiry-form"
                  onSubmit={submit}
                  noValidate
                  aria-busy={busy}
                >
                  {Object.values(errors).some(Boolean) && (
                    <p role="alert" className="hh-field-error">
                      Please check the marked fields below.
                    </p>
                  )}
                  {step === 'project' ? (
                    <fieldset
                      disabled={busy}
                      className="hh-project-fields"
                      aria-label="Your project and contact details"
                    >
                      <div className="hh-inquiry-grid">
                        {websiteConfirmed && !errors.website ? (
                          <div className="hh-inquiry-project-summary">
                            <div>
                              <span>Project website</span>
                              <strong>{answers.website}</strong>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setWebsiteConfirmed(false);
                                requestAnimationFrame(() =>
                                  document
                                    .getElementById('inquiry-website')
                                    ?.focus(),
                                );
                              }}
                            >
                              Edit
                              <span className="sr-only"> project website</span>
                            </button>
                          </div>
                        ) : (
                          textField('website', 'Project website', 'text', 'url')
                        )}
                        {choice('goal', 'What would you most like to achieve?')}
                        <div className="hh-inquiry-contact hh-inquiry-grid">
                          {textField('name', 'Your name', 'text', 'name')}
                          {textField('email', 'Work email', 'email', 'email')}
                        </div>
                        <details
                          className="hh-inquiry-context"
                          open={errors.need ? true : undefined}
                        >
                          <summary>
                            Add context <span>(optional)</span>
                          </summary>
                          <label className="sr-only" htmlFor="inquiry-need">
                            Additional context
                          </label>
                          <textarea
                            id="inquiry-need"
                            name="need"
                            maxLength={1500}
                            rows={2}
                            placeholder="A goal, upcoming milestone or question…"
                            value={answers.need}
                            onChange={(event) =>
                              update('need', event.target.value)
                            }
                            aria-invalid={!!errors.need}
                            aria-describedby={
                              errors.need ? 'inquiry-need-error' : undefined
                            }
                          />
                          {errors.need && (
                            <span
                              className="hh-field-error"
                              id="inquiry-need-error"
                            >
                              {errors.need}
                            </span>
                          )}
                        </details>
                      </div>
                    </fieldset>
                  ) : (
                    <fieldset
                      disabled={busy}
                      className="hh-fit-fields"
                      aria-label="Investment fit"
                    >
                      {fitChoice('capacity', 'Which best describes your team?')}
                      {fitChoice(
                        'budget',
                        'If the plan fits, is this investment realistic?',
                      )}
                    </fieldset>
                  )}
                  <div className="hh-inquiry-honeypot" aria-hidden="true">
                    <label htmlFor="inquiry-fax">Company fax</label>
                    <input
                      ref={fax}
                      id="inquiry-fax"
                      name="companyFax"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  {submitError && (
                    <p className="hh-field-error" role="alert">
                      {submitError}
                    </p>
                  )}
                  {step === 'fit' && (
                    <p className="hh-form-help hh-inquiry-consent">
                      We’ll use these details to handle your request, not for
                      marketing. If qualified, your name and email are shared
                      with Calendly to prefill booking.
                    </p>
                  )}
                  <div className="hh-inquiry-actions">
                    {step === 'fit' ? (
                      <button
                        type="button"
                        className="hh-text-link hh-inquiry-back"
                        disabled={busy}
                        onClick={() => {
                          setErrors({});
                          setSubmitError('');
                          setStep('project');
                        }}
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                    ) : (
                      <span className="hh-form-help">
                        Next: two fit questions
                      </span>
                    )}
                    <button type="submit" className="hh-btn" disabled={busy}>
                      {busy
                        ? 'Checking fit…'
                        : step === 'project'
                          ? 'Continue'
                          : 'Check fit & see times'}
                      {!busy && <ArrowRight size={18} />}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
