import type { GuideId } from './korea-guide';

// Approximate title + takeaway + rendered chapter text at 200 words/minute.
// Audited by tests/homepage-refinement.test.mjs so copy changes cannot silently
// leave homepage/chapter reading-time labels out of date.
export const guideReading: Record<
  GuideId,
  {
    takeaway: string;
    minutes: number;
    nextStep: string;
    nextStepDetail: string;
  }
> = {
  'market-fit': {
    takeaway:
      'A large market is a reason to look. A relevant audience with a reason to take part is a reason to act.',
    minutes: 2,
    nextStep: 'Is there a Korean audience for your next move?',
    nextStepDetail:
      'We’ll review your category, your current position and whether there is a useful opportunity to explore.',
  },
  'your-position': {
    takeaway:
      'People can know your name without understanding what you offer today. That gap should shape the plan.',
    minutes: 2,
    nextStep: 'What does Korea understand about you today?',
    nextStepDetail:
      'See your coverage, competitor context and the questions your current presence leaves unanswered.',
  },
  'common-mistakes': {
    takeaway:
      'A placement can carry a good story. It cannot replace the work of finding the right audience and giving them a reason to listen.',
    minutes: 2,
    nextStep: 'Would more reach solve your actual gap?',
    nextStepDetail:
      'Start with what the Korean market already knows, misses or misunderstands about your project.',
  },
  participation: {
    takeaway:
      'Presence is the foundation, not the finish line. The value depends on what it helps the right people understand and do.',
    minutes: 2,
    nextStep: 'Which outcome would make Korea worth it?',
    nextStepDetail:
      'We’ll use your goal and the market evidence to discuss what meaningful progress could look like.',
  },
  'choosing-a-partner': {
    takeaway:
      'Creator access is one part of the job. A partner should also own the research, local explanation, coordination and reporting.',
    minutes: 3,
    nextStep: 'Leave the first call with a clearer Korea decision.',
    nextStepDetail:
      'We’ll walk through your scan, discuss your goals and assess fit. If there is a fit, we’ll outline the next step.',
  },
};
