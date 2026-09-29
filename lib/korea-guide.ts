export const guideChapters = [
  {
    id: 'market-fit',
    label: 'Could Korea matter to you?',
    title: 'Could Korea matter to your team?',
    description:
      'Where a Korean audience could add value to your token, product or ecosystem.',
  },
  {
    id: 'your-position',
    label: 'Are you really reaching Korea?',
    title: 'Are you reaching Korea—or just appearing there?',
    description: 'Why existing coverage can hide a gap in understanding.',
  },
  {
    id: 'common-mistakes',
    label: 'Why aren’t more posts enough?',
    title: 'Why more posts aren’t always the answer.',
    description:
      'The difference between buying attention and building a useful presence.',
  },
  {
    id: 'participation',
    label: 'What could this lead to?',
    title: 'What can a stronger Korean presence lead to?',
    description:
      'What client results show about interest, product use and participation.',
  },
  {
    id: 'choosing-a-partner',
    label: 'What should a partner handle?',
    title: 'What should a Korea partner take off your plate?',
    description:
      'The work, the responsibilities and the evidence you should expect.',
  },
] as const;

export type GuideId = (typeof guideChapters)[number]['id'];

// Preserve previously shared article URLs and single-document anchors.
export const guideAliases: Record<string, { id: GuideId; anchor?: string }> = {
  discovery: { id: 'common-mistakes' },
  'creators-and-sequence': { id: 'common-mistakes' },
  measurement: { id: 'choosing-a-partner', anchor: 'progress' },
};

export function resolveGuideLink(id: string) {
  if (guideChapters.some((chapter) => chapter.id === id))
    return '/korea-guide/' + id;
  const alias = Object.hasOwn(guideAliases, id) ? guideAliases[id] : undefined;
  return alias
    ? '/korea-guide/' + alias.id + (alias.anchor ? '#' + alias.anchor : '')
    : null;
}

export const guideSourceLinks: Record<
  GuideId,
  { label: string; href: string }[]
> = {
  'market-fit': [
    {
      label: 'FSC / KoFIU · H2 2025 market survey',
      href: 'https://www.fsc.go.kr/po010101/86534',
    },
    {
      label: 'FSC / FIU · June 24, 2026 advisory',
      href: 'https://www.fsc.go.kr/no010101/87177',
    },
  ],
  'your-position': [
    {
      label: 'Redacted Korea scan · scope and findings',
      href: '/korea-scan-example',
    },
  ],
  'common-mistakes': [
    {
      label: 'Telegram · Channels and view counts',
      href: 'https://telegram.org/faq_channels',
    },
    { label: 'UMIA · Paid work and wider coverage', href: '/work/umia' },
  ],
  participation: [
    { label: 'UMIA · Ranking and allocation requests', href: '/work/umia' },
    { label: 'Venice · Mindshare and product activity', href: '/work/venice' },
    { label: 'Fogo · First two conversion weeks', href: '/work/fogo' },
    {
      label: 'Flying Tulip · Korea’s share of the public round',
      href: '/#flying-tulip',
    },
  ],
  'choosing-a-partner': [
    { label: 'Holo Hive · How we work', href: '/#approach' },
    { label: 'UMIA · Reporting definitions and windows', href: '/work/umia' },
    {
      label: 'FSC / FIU · Korea-directed promotion',
      href: 'https://www.fsc.go.kr/no010101/87177',
    },
  ],
};
