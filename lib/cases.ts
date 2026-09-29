export type CaseKey = 'umia' | 'venice' | 'fogo';
export const cases = {
  umia: {
    name: 'UMIA',
    year: 2026,
    asset: 'umia.png',
    category: 'Market attention and investor interest',
    metric: 'No.1',
    unit: 'most-discussed launch in monitored Korean channels',
    period: 'Case-study cutoff: August 26, 2026',
    title: 'From unknown to the most-discussed launch.',
    body: '$1M+ in allocation requests from leading creators ahead of the sale.',
    baseline: 'Baseline: zero mentions in a 12-month audit of 326 channels.',
    detail:
      'The August 26 case insert identifies UMIA as the most-discussed launch in the monitored Korean channels, from zero mentions in a 326-channel, 12-month baseline. Leading creators relayed more than $1 million in allocation requests before the sale. The later final report records 181 mentions across 45 channels through August 31, representing 72 distinct write-ups.',
    approach:
      'Ten creators worked across six briefs. The sequence moved from token-structure context and the treasury model to published arguments, testnet evidence and auction mechanics. One-to-one education gave creators the understanding to explain different aspects in their own voices.',
    significance:
      'The attention was accompanied by a concrete expression of investor interest: creators asking for allocation. UMIA also reported that its auction cap filled in seven minutes. The report does not establish how much of that sale came from Korea or was caused by Holo Hive.',
    note: 'Allocation requests are indicated interest, not completed investment. No.1 refers to launches in the monitored channels, not all projects or all Korean media. The insert and final report use different cutoff dates. Mentions include reposts; the 119 appearances beyond placements were not all original independent coverage.',
    source:
      'UMIA Case Insert and full case, through August 26, 2026; Umia Auction Report Final, prepared September 1, engagement through August 31. Baseline: 12 months to July 19, 2026. The case-study chart uses the final report’s 326-channel frame: zero at July 20 kickoff, 49 mentions over the first four weeks (ending August 16) and 181 through August 31. The chart shows three separate cumulative checkpoints, not daily activity. The earlier insert’s 147 mentions across a different after-scan are not mixed into this chart. The No.1 launch ranking retains its separate August 26 snapshot.',
    checkpoints: [
      { label: 'Placed mentions', value: '62', width: (62 / 181) * 100 },
      { label: 'Reposted onward', value: '65', width: (65 / 181) * 100 },
      {
        label: 'Independent pieces or shares',
        value: '54',
        width: (54 / 181) * 100,
      },
    ],
    chartTitle: 'How the 181 mentions were distributed',
    chartNote:
      'July 20-August 31, 2026. Each bar shows its share of all recorded mentions.',
  },
  venice: {
    name: 'Venice',
    year: 2026,
    asset: 'venice.svg',
    category: 'Product adoption',
    metric: '6,200',
    unit: 'Korean users active in a two-week window',
    period: "Venice's own analytics · July 2026",
    title: 'Beyond the token. Into the product.',
    body: '819 verified signups in the first 14 days of activation. Later, Venice reported 6,200 Korean users active in a single two-week window.',
    baseline: 'Baseline: 61 mentions across 19 channels in the preceding year.',
    detail:
      "Venice's case insert reports 6,200 Korean users active in a single two-week July window, measured by Venice's own analytics. Separately, the first two weeks of activation produced 819 verified signups, tied to a Venice wallet and an Upbit ID. Korean coverage grew to 367 mentions across 101 channels over 12 weeks.",
    approach:
      'Our Korean creator work was already underway when Venice listed on Upbit. We adapted our Korean content to the listing news, then ran signup and product-use activations. Creators learned the product before explaining it to their audiences. A later two-week feature-use activation recorded 1,287 verified participants and 5,134 proof screenshots; 73% completed all five feature tasks. This was a separate activation, not the cohort behind the 819 signups.',
    significance:
      'The goal went beyond getting the token noticed: give Korean audiences a reason to use Venice. The client reported lower churn and higher activity as the engagement progressed. Those observations support the product-use story, but do not establish a measured retention lift caused by the campaign.',
    note: 'The 6,200 figure is Venice’s regional estimate for the two weeks preceding its July 23, 2026 update, as clarified in the Babylon briefing and PerpTools proposal. It is not 6,200 users acquired or retained by Holo Hive; the precise active-user event definition was not supplied. Signups, active users and coverage have separate windows and are not a measured conversion funnel. An Upbit listing provided attention Holo Hive did not cause.',
    source:
      "Venice Case Insert, May 10-July 31, 2026: client analytics for a two-week July activity window, weeks 1-2 signup verification, and 12-week coverage record. Intro / Partner Deck, slide 8: separate two-week feature-use activation. The Case Insert controls the signup window; the deck's seven-day signup wording is not used.",
    checkpoints: [
      {
        label: 'Active Korean users · two-week July window',
        value: '6,200',
        width: 100,
      },
      {
        label: 'Verified signups · activation weeks 1-2',
        value: '819',
        width: 100,
      },
      {
        label: 'Verified participants · separate feature-use activation',
        value: '1,287',
        width: 100,
      },
    ],
    chartTitle: 'Three separately defined measures',
    chartNote:
      'These counts measure different things. They are not successive steps in a measured conversion funnel.',
  },
  fogo: {
    name: 'Fogo',
    year: 2026,
    asset: 'fogo.png',
    category: 'Trading activity',
    metric: '$5.48M',
    unit: 'reported tracked trading volume',
    period: 'First two weeks of conversion · 320 verified wallets',
    title: 'Build the audience. Give it a reason to trade.',
    body: 'Korean awareness-building came first. The conversion phase then recorded $5.48M in tracked trading volume in its first two weeks.',
    baseline:
      'Korean positioning and creator education preceded the conversion phase.',
    detail:
      'After building Korean awareness of Fogo, Holo Hive connected that attention to a trading campaign on Valiant, a product in its ecosystem. The supplied partner deck reports $5.48 million in verified trading volume from 320 Korean wallets in the first two weeks of conversion. Those two weeks were the conversion phase, not the entire engagement.',
    approach:
      'Korean positioning and creator education established context before the tracked activation. The work connected the relevant audience with a specific trading action in the ecosystem, then measured wallet participation and volume.',
    significance:
      "The work began with Fogo's wider ecosystem presence, not a trading-volume guarantee. The campaign then gave an informed audience a clear way to take part. It shows why presence matters: the same audience can support the next relevant campaign, rather than each activity starting cold.",
    quote: 'You have the perfect people talking about us.',
    quoteBy: 'Joey Stewart, Fogo',
    note: 'Trading volume is not client revenue, profit or net capital inflow. Tracked activity does not isolate incremental impact, and wallet verification does not necessarily identify unique people. Calendar dates, the raw attribution export, incentive treatment and wallet-level concentration still need confirmation for public release.',
    source:
      "Intro / Partner Deck, slides 2 and 9; first-two-conversion-weeks wording also appears in the supplied Wallet and ORE proposals. Presented using Holo Hive's current approved deck wording. Earlier records use a different cutoff; the underlying dated export has not been reconciled in this review.",
    checkpoints: [
      {
        label: 'Tracked trading volume · first two conversion weeks',
        value: '$5.48M',
        width: 100,
      },
      { label: 'Verified wallets in the campaign', value: '320', width: 100 },
    ],
    chartTitle: 'After the awareness-building phase',
    chartNote:
      'Company-reported campaign results. Volume and wallets are separate measures, not a growth chart. The two-week period begins with conversion, not the start of Korean positioning.',
  },
};
