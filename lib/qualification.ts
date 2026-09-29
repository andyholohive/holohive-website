export type InquiryIntent = 'scan' | 'conversation';

export const qualificationOptions = {
  authority: [
    ['decision_maker', 'I make or share the final decision'],
    ['evaluation_lead', 'I lead the evaluation and recommend a partner'],
    ['researcher', 'I am gathering information for our team'],
    ['external_adviser', 'I am an adviser or agency representing the team'],
  ],
  goal: [
    ['written', 'Written Korea goal'],
    ['presence', 'Build awareness and trust'],
    ['ecosystem', 'Grow interest in our token or ecosystem'],
    ['launch', 'Support a token launch, sale or listing campaign'],
    ['adoption', 'Grow product use or trading activity'],
    ['improve', 'Improve our existing Korea presence'],
    ['evaluate', 'Decide whether Korea should be our next market'],
    ['other', 'Something else'],
  ],
  timing: [
    ['within_30_days', 'Within 30 days'],
    ['within_90_days', 'In 1-3 months'],
    ['within_6_months', 'In 3-6 months'],
    ['exploring', 'Later, or still exploring'],
  ],
  capacity: [
    ['raised_2m_12m', 'Raised US$2M+ in the past 12 months'],
    ['raised_5m_24m', 'Raised US$5M+ in the past 24 months'],
    ['revenue_supported', 'Our revenue can support this investment'],
    ['not_yet', 'None of these applies yet'],
    ['private', 'Prefer not to share this'],
  ],
  funding: [
    ['none', 'No external funding raised'],
    ['under_1m', 'Under $1M'],
    ['1m_5m', '$1M to under $5M'],
    ['5m_20m', '$5M to under $20M'],
    ['20m_plus', '$20M+'],
    ['private', 'Prefer to discuss privately'],
  ],
  revenue: [
    ['pre_revenue', 'Pre-revenue'],
    ['under_1m', 'Under $1M'],
    ['1m_5m', '$1M to under $5M'],
    ['5m_20m', '$5M to under $20M'],
    ['20m_plus', '$20M+'],
    ['private', 'Prefer to discuss privately'],
  ],
  budget: [
    ['available', 'Yes, we have budget available'],
    ['approval_needed', 'Yes, if the plan fits; final approval is needed'],
    ['not_yet', 'Not yet'],
    ['planning', 'Not yet; we are planning the budget'],
    ['below_range', 'That is above our current budget'],
  ],
} as const;

export type QualificationChoice = keyof typeof qualificationOptions;
export type Inquiry = {
  name: string;
  email: string;
  company: string;
  website: string;
  role: string;
  need: string;
} & Record<QualificationChoice, string>;
export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

export const emptyInquiry: Inquiry = {
  name: '',
  email: '',
  company: '',
  website: '',
  role: '',
  authority: '',
  goal: '',
  need: '',
  timing: '',
  capacity: '',
  funding: '',
  revenue: '',
  budget: '',
};

// Only ask what identifies the project and determines the next step.
// Legacy context fields remain supported for old saved records/clients.
export const requiredInquiryFields: (keyof Inquiry)[] = [
  'name',
  'email',
  'website',
  'goal',
  'capacity',
  'budget',
];

export function validateInquiry(value: unknown): {
  data: Inquiry;
  errors: InquiryErrors;
} {
  const raw =
    value && typeof value === 'object'
      ? (value as Record<string, unknown>)
      : {};
  const data = Object.fromEntries(
    Object.keys(emptyInquiry).map((key) => [
      key,
      typeof raw[key] === 'string' ? raw[key].trim() : '',
    ]),
  ) as Inquiry;
  // Retain genuine written-goal submissions from the earlier form, but do not
  // silently invent a goal for a new empty submission.
  if (!data.goal && data.need) data.goal = 'written';
  const errors: InquiryErrors = {};
  for (const key of ['name', 'company', 'role'] as const) {
    if ((key === 'name' && !data[key]) || data[key].length > 120)
      errors[key] = 'Enter up to 120 characters.';
  }
  if (
    data.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.email = 'Enter a valid work email address.';
  }
  data.email = data.email.toLowerCase();
  try {
    const site = new URL(
      data.website.includes('://') ? data.website : `https://${data.website}`,
    );
    if (
      !['https:', 'http:'].includes(site.protocol) ||
      !site.hostname.includes('.') ||
      site.username ||
      site.password ||
      data.website.length > 500
    )
      throw new Error();
    data.website = site.toString();
  } catch {
    errors.website = 'Enter your project website, for example example.com.';
  }
  if (data.need.length > 1500 || (data.goal === 'written' && !data.need)) {
    errors.need = 'Briefly describe your goal (up to 1,500 characters).';
  }
  for (const key of Object.keys(
    qualificationOptions,
  ) as QualificationChoice[]) {
    if (!requiredInquiryFields.includes(key) && !data[key]) continue;
    if (!qualificationOptions[key].some(([option]) => option === data[key])) {
      errors[key] = 'Choose an answer.';
    }
  }
  return { data, errors };
}

export function hasQualifyingCapacity(capacity: string | null | undefined) {
  return ['raised_2m_12m', 'raised_5m_24m', 'revenue_supported'].includes(
    capacity ?? '',
  );
}

export type QualificationStatus =
  | 'calendar_ready'
  | 'not_eligible'
  | 'eligibility_unconfirmed';
export type QualificationReason =
  | 'business_capacity'
  | 'capacity_unconfirmed'
  | 'budget'
  | 'qualification_unconfirmed';

// User-defined financial fit; all answers are self-reported.
// Legacy lifetime funding/revenue ranges cannot establish current capacity.
// Role and start timing remain optional historical context, not hidden gates.
export function qualifyInquiry(data: Pick<Inquiry, 'capacity' | 'budget'>): {
  status: QualificationStatus;
  reasons: QualificationReason[];
} {
  const reasons: QualificationReason[] = [];
  const unknownCapacity =
    data.capacity !== 'not_yet' && !hasQualifyingCapacity(data.capacity);
  if (!hasQualifyingCapacity(data.capacity))
    reasons.push(
      unknownCapacity ? 'capacity_unconfirmed' : 'business_capacity',
    );
  if (!['available', 'approval_needed'].includes(data.budget))
    reasons.push('budget');
  return {
    status: unknownCapacity
      ? 'eligibility_unconfirmed'
      : reasons.length
        ? 'not_eligible'
        : 'calendar_ready',
    reasons,
  };
}

export function ineligibilityMessage(reasons: QualificationReason[]) {
  if (reasons.includes('capacity_unconfirmed') && reasons.includes('budget'))
    return 'Your funding or revenue capacity is unconfirmed, and your answer indicates the ongoing investment is not realistic yet.';
  if (
    reasons.includes('capacity_unconfirmed') ||
    reasons.includes('qualification_unconfirmed')
  )
    return 'We need confirmation of your team’s funding or revenue capacity before we can offer the free scan and call.';
  if (reasons.includes('business_capacity') && reasons.includes('budget'))
    return 'Based on your answers, your team does not currently meet our funding or revenue requirements, and the ongoing investment is not realistic yet.';
  if (reasons.includes('business_capacity'))
    return 'Based on your answers, your team does not currently meet our funding or revenue requirements.';
  return 'Based on your answers, the ongoing engagement investment is not realistic for your team yet.';
}

export function choiceLabel(key: QualificationChoice, value: string): string {
  return (
    qualificationOptions[key].find(([option]) => option === value)?.[1] ?? value
  );
}
