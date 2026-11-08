import { type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { GuideId } from '@/lib/korea-guide';
import { GuideFigure } from '@/components/korea-guide-visual';

function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="hh-guide-buyer-note">
      <h3>{title}</h3>
      {children}
    </aside>
  );
}

function Outcome({
  name,
  metric,
  label,
  context,
  children,
  href,
  linkLabel = 'See the evidence',
}: {
  name: string;
  metric: string;
  label: string;
  context: string;
  children: ReactNode;
  href: string;
  linkLabel?: string;
}) {
  return (
    <section className="hh-guide-outcome">
      <div className="hh-guide-outcome-evidence">
        <span className="hh-kicker">{name}</span>
        <strong>{metric}</strong>
        <span>{label}</span>
        <small>{context}</small>
      </div>
      <div className="hh-guide-outcome-meaning">
        {children}
        <Link href={href}>
          {linkLabel} <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function GuideChapterContent({ id }: { id: GuideId }) {
  if (id === 'market-fit')
    return (
      <>
        <p>
          Korea can be another source of users, investors and ecosystem
          participation. But the case for entering should rest on your
          project—not on the claim that every Web3 team needs Korea.
        </p>
        <div className="hh-primer-market-stats">
          <div>
            <strong>11.13M</strong>
            <span>trading-eligible accounts</span>
          </div>
          <div>
            <strong>₩5.4T</strong>
            <span>average daily trading volume</span>
          </div>
          <p>
            Registered domestic providers · H2 2025. Accounts are not unique
            people or a count of onchain users.{' '}
            <a
              href="https://www.fsc.go.kr/po010101/86534"
              target="_blank"
              rel="noreferrer"
              aria-label="FSC / KoFIU, March 2026 (opens in a new tab)"
            >
              FSC / KoFIU, March 2026 ↗
            </a>
          </p>
        </div>
        <h2>The audience matters more than the headline number.</h2>
        <p>
          A listed-token trader, an onchain researcher and a gaming community
          may want very different things. Strong activity in one group does not
          prove demand in another.
        </p>
        <p>
          The useful signal is more specific: relevant people are discussing
          your category, exploring similar projects or asking questions your
          project can answer. That creates a reason to investigate, not a
          promise that they will take part.
        </p>
        <h2>You do not need a token launch.</h2>
        <p>
          A sale or listing creates a moment. A live product, ecosystem campaign
          or important update can also give people a reason to pay attention.
          Established teams may need to change an outdated impression rather
          than introduce themselves from scratch.
        </p>
        <Note title="An opportunity needs more than attention.">
          <p>
            There should be a relevant audience, a clear reason to participate,
            practical and permitted access, and a team ready to support the
            work. If any of these are missing, more promotion may not be the
            right next move.
          </p>
        </Note>
        <h2>Start with evidence, not a country-wide assumption.</h2>
        <p>
          Holo Hive’s Korea scan looks at your current coverage, the
          conversation around your category and what competing projects are
          known for. It helps distinguish a promising gap from a market that is
          simply large.
        </p>
        <p>
          Access and Korea-directed promotion should be reviewed with qualified
          counsel for your situation. Interest does not remove those
          requirements.
        </p>
      </>
    );

  if (id === 'your-position')
    return (
      <>
        <p>
          “We already have Korea covered” can mean an agency, a few creators, an
          active community or genuine market understanding. Those are different
          starting points—and they call for different work.
        </p>
        <GuideFigure id="your-position" />
        <h2>A familiar name can still carry an old story.</h2>
        <p>
          Global announcements do reach Korea. In the channels we monitor, the
          gap can be the context: people may know a token event or a price move
          without knowing what the project offers now.
        </p>
        <p>
          A large mention count can also include lists, repeated headlines and
          negative discussion. The more useful question is whether relevant
          voices explain the project accurately—and what their audiences think
          of it.
        </p>
        <figure className="hh-guide-scan-proof">
          <figcaption>
            From a real Korea scan · Project name redacted
          </figcaption>
          <dl>
            <div>
              <dt>Channels discussing the category</dt>
              <dd>147</dd>
            </div>
            <div>
              <dt>Channels naming the project</dt>
              <dd>6</dd>
            </div>
          </dl>
          <p>
            90 days to August 25, 2026 · 263 Korean-language channels reviewed.
            Category discussion is not proof of demand for this project.
          </p>
          <Link href="/korea-scan-example">
            Open the scan excerpt <ArrowUpRight size={16} />
          </Link>
        </figure>
        <h2>The starting point should change the plan.</h2>
        <p>
          A project with little coverage needs a relevant introduction. A
          familiar but misunderstood project needs a clearer explanation. A team
          with strong attention may need to give that audience a useful next
          step.
        </p>
        <p>
          That is why we look at presence and sentiment before proposing a
          plan. Existing relationships can remain valuable; the scan
          shows what they cover and what may still be missing.
        </p>
        <Note title="The question to bring to a partner">
          <p>
            “What does Korea understand about us today—and what would you
            change?”
          </p>
        </Note>
      </>
    );

  if (id === 'common-mistakes')
    return (
      <>
        <p>
          A good paid post can explain a project and prompt action. The mistake
          is treating a list of placements as the entire Korea strategy.
        </p>
        <h2>Local voices do more than translate.</h2>
        <p>
          In the Korean crypto communities we work with, Telegram creators often
          act as researchers and interpreters. Their readers want to know why
          something deserves attention, not only what the announcement says.
        </p>
        <p>
          That makes the creator’s understanding important. We help the right
          creators understand your project, its evidence and its tradeoffs so
          they can explain it in their own voice. Other platforms may matter
          too; Telegram is our main monitored channel set, not the whole Korean
          market.
        </p>
        <div className="hh-guide-pitfalls">
          <section>
            <span>01</span>
            <h2>Reach without audience fit.</h2>
            <p>
              A large following does not show whether the audience is relevant
              to your goal. Several famous channels may reach the same people.
            </p>
            <strong>Look for a reason each creator belongs in the plan.</strong>
          </section>
          <section>
            <span>02</span>
            <h2>Translation without understanding.</h2>
            <p>
              A translated announcement can deliver the facts but leave the
              audience’s real questions unanswered. Repeating it adds volume,
              not necessarily clarity.
            </p>
            <strong>
              Look for an explanation that makes the project relevant.
            </strong>
          </section>
          <section>
            <span>03</span>
            <h2>Activity without useful evidence.</h2>
            <p>
              Views, posts and reward claims can look busy without showing what
              changed. A signup is not retention; a mention is not a buyer.
            </p>
            <strong>Look for progress against a clear starting point.</strong>
          </section>
        </div>
        <h2>Put the local work around the placement.</h2>
        <p>
          Research tells us where the gap is. Different creators explain the
          project for their own audiences. Direct conversations can reveal
          product questions and onboarding barriers. We track the work, the
          market response and useful participation separately.
        </p>
        <Note title="When a placement is enough">
          <p>
            If you already understand the audience and have a clear
            announcement, a direct creator buy may be all you need. Holo Hive is
            most useful when you need the wider Korea program managed as well.
          </p>
        </Note>
        <p>
          Sponsored work should be disclosed. Paying for distribution does not
          buy an independent opinion or guarantee that other channels will share
          it.
        </p>
      </>
    );

  if (id === 'participation')
    return (
      <>
        <p>
          A stronger presence means more than being seen. It gives relevant
          people a better chance to understand your project, form a view and
          recognize a reason to get involved.
        </p>
        <p>
          What that involvement looks like depends on your goal. These examples
          show different kinds of response—not a fixed funnel or a promise that
          each campaign will produce the same result.
        </p>
        <div className="hh-guide-outcomes">
          <Outcome
            name="UMIA · 2026"
            metric="0 → No. 1"
            label="From no recorded coverage to the most-discussed launch"
            context="Prior 12-month audit → monitored Korean launches, August 26 snapshot."
            href="/work/umia"
          >
            <p>
              <strong>Investor interest.</strong> Multiple people requested
              allocations of <strong>$1M+ each</strong> before the sale,
              according to Holo Hive’s founder. Requests, not completed investments.
            </p>
          </Outcome>
          <Outcome
            name="Venice · Summer 2026"
            metric="No. 1"
            label="Onchain AI product by weighted Korean coverage"
            context="30% share in the tracked comparison. Weighted by mention quality."
            href="/work/venice"
          >
            <p>
              <strong>Product activity.</strong> Venice also reported
              <strong> 6,200+ Korean active users</strong> in a separate
              two-week July window. This is product activity, not a count of
              users proven to have been acquired by the campaign.
            </p>
          </Outcome>
          <Outcome
            name="Fogo · 2026"
            metric="$5.48M"
            label="Tracked Korean trading volume on Valiant"
            context="First two conversion weeks, after the awareness-building phase."
            href="/work/fogo"
          >
            <p>
              <strong>Ecosystem participation.</strong> Work around Fogo
              extended to use of a trading product in its ecosystem. The volume
              was company-reported; it is not project revenue.
            </p>
          </Outcome>
        </div>
        <h2>The goal shapes the program.</h2>
        <p>
          For a token, the goal may be informed interest and eligible
          participation. For a product, it may be use. For an ecosystem, it may
          be attention and activity across its teams. None requires reducing the
          entire relationship to a cost-per-signup campaign.
        </p>
        <h2>Direct relationships, wider demand—or both.</h2>
        <p>
          Some teams need relevant people to try the product, ask questions and
          provide feedback. Others need a clearer story reaching more of their
          category. We can support direct onboarding and follow-up, creator-led
          communication, or a combination. These are options, not mandatory
          stages or a requirement to build a campaign website.
        </p>
        <h2>Incentives can start activity. Repeat use is a separate question.</h2>
        <p>
          Rewards can make a trial worthwhile. The next question is whether
          people find value beyond the reward—and what prevents them from
          returning. Useful feedback and repeat-use data can inform the next
          plan. A reward claim or first transaction alone does not establish
          lasting adoption.
        </p>
        <p>
          Presence and sentiment are useful signals, but neither guarantees
          investment, retention, price performance or an exchange listing. The
          plan should connect the local work to the outcomes that matter to your
          team—and measure them separately.
        </p>
      </>
    );

  return (
    <>
      <p>
        The right option depends on what your team already knows and can manage.
        A direct creator buy, a local hire and a Korea partner solve different
        problems. Existing relationships do not have to be replaced.
      </p>
      <div
        className="hh-guide-options"
        aria-label="Ways to build a Korean presence"
      >
        <section>
          <h2>Buy placements</h2>
          <p>
            Useful for a defined announcement. Your team owns the audience,
            brief, coordination and wider plan.
          </p>
        </section>
        <section>
          <h2>Hire locally</h2>
          <p>
            Useful for long-term internal ownership. Your team supports the hire
            with management, campaign resources and any missing skills.
          </p>
        </section>
        <section>
          <h2>Work with a Korea partner</h2>
          <p>
            Useful when you need research, creator relationships, campaigns and
            reporting coordinated together.
          </p>
        </section>
      </div>
      <h2 id="scope">What Holo Hive takes on.</h2>
      <p>
        We research your position, shape the local explanation and coordinate
        direct product relationships, creator-led campaigns or both. That can
        include onboarding, questions and follow-up—not just arranging posts.
        You provide product knowledge, approvals, access and available
        performance data. Reporting is in English.
      </p>
      <p>
        Our research covers 300+ Korean channels. Monitoring is not ownership:
        we do not control independent opinions or promise that every channel
        will cover you.
      </p>
      <h2 id="progress">What you should be able to judge.</h2>
      <dl className="hh-guide-progress">
        <div>
          <dt>The work</dt>
          <dd>
            What was agreed and delivered: published material, onboarding and
            other activity within the scope, explained in English.
          </dd>
        </div>
        <div>
          <dt>The response</dt>
          <dd>
            What audiences discussed, asked and responded to. Distinguish paid
            or coordinated work from reposts and other coverage where verified;
            mark unknown relationships as unknown.
          </dd>
        </div>
        <div>
          <dt>The outcome</dt>
          <dd>
            The product or campaign actions that can be measured—and the limits
            of attributing them to the work.
          </dd>
        </div>
        <div>
          <dt>The next decision</dt>
          <dd>
            What to keep, change or investigate next—and which evidence supports
            that recommendation.
          </dd>
        </div>
      </dl>
      <p>
        A before-and-after change alone does not prove cause. Listings,
        incentives, price moves and other activity can also affect the result.
        You should know what the evidence supports, not have to guess.
      </p>
      <h2>Clear commitments, not a vague guarantee.</h2>
      <p>
        The proposal should define the work, planned creator budget, total cost,
        client responsibilities and what happens if agreed delivery falls short.
        Targets for market response are different from commitments to deliver
        specific work.
      </p>
      <p>
        Education and participation can run together. Agree the kickoff,
        review points and duration around product readiness and milestones,
        rather than assume every project needs the same sequence.
      </p>
      <h2>Ask what you can review—and what stays with your team.</h2>
      <p>
        Ask why the proposed creators and participants fit your goal, and agree
        how your team reviews recommendations. Define handoff, materials,
        relationship access and ongoing support in the scope. A managed program
        does not automatically transfer a partner’s contacts or guarantee that
        participants stay active after it ends.
      </p>
      <Note title="The first call is about your situation.">
        <p>
          Request a Korea scan and, if you qualify, we prepare it before your
          first call and walk you through the findings. Already know what you
          need? <Link href="/#contact">Request a call</Link> to discuss your goals
          and fit without requesting a scan. Both routes include a few questions
          to check fit before booking.
        </p>
      </Note>
      <p>
        Any Korea-directed promotion, incentives and participation flow should
        be reviewed by qualified counsel. A marketing plan or landing page does
        not replace that approval.
      </p>
    </>
  );
}
