import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  guideAliases,
  guideChapters,
  guideSourceLinks,
  resolveGuideLink,
} from '@/lib/korea-guide';
import { guideReading } from '@/lib/korea-guide-reading';
import { GuideChapterContent } from '@/components/korea-guide-content';
import { KoreaGuideNav } from '@/components/korea-guide-nav';

type Props = { params: Promise<{ chapter: string }> };
export function generateStaticParams() {
  return [
    ...guideChapters.map(({ id }) => ({ chapter: id })),
    ...Object.keys(guideAliases).map((chapter) => ({ chapter })),
  ];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter: input } = await params;
  const id = Object.hasOwn(guideAliases, input)
    ? guideAliases[input].id
    : input;
  const chapter = guideChapters.find((item) => item.id === id);
  if (!chapter) return { title: 'Article not found | Holo Hive' };
  const title = `${chapter.label} | Korea Field Guide | Holo Hive`;
  const url = `/korea-guide/${chapter.id}`;
  return {
    title,
    description: chapter.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: chapter.description,
      url,
      type: 'article',
      images: '/opengraph-image.jpeg',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: chapter.description,
      images: '/opengraph-image.jpeg',
    },
  };
}
export default async function GuideChapter({ params }: Props) {
  const { chapter: id } = await params;
  if (Object.hasOwn(guideAliases, id)) redirect(resolveGuideLink(id)!);
  const index = guideChapters.findIndex((item) => item.id === id);
  if (index < 0) notFound();
  const chapter = guideChapters[index];
  const reading = guideReading[chapter.id];
  const previous = guideChapters[index - 1];
  const next = guideChapters[index + 1];
  return (
    <main id="guide-main" className="hh-shell hh-guide-reader">
      <nav className="hh-guide-breadcrumb" aria-label="Breadcrumb">
        <Link href="/korea-guide">
          <ArrowLeft size={16} /> All topics
        </Link>
        <span>{chapter.label}</span>
      </nav>
      <div className="hh-guide-reader-layout">
        <KoreaGuideNav activeId={id} />
        <article className="hh-guide-article">
          <header className="hh-guide-article-heading">
            <p className="hh-kicker">
              Korea field guide · ~{reading.minutes} min read
            </p>
            <h1>{chapter.title}</h1>
            <p className="hh-guide-summary">{reading.takeaway}</p>
          </header>
          <div className="hh-primer-body hh-guide-prose">
            <GuideChapterContent id={chapter.id} />
          </div>
          <aside
            className="hh-guide-next-step"
            aria-label="Discuss your Korean opportunity"
          >
            <h2>{reading.nextStep}</h2>
            <p>{reading.nextStepDetail}</p>
            <Link className="hh-btn" href="/#request-scan">
              Get your Korea scan <ArrowUpRight size={18} />
            </Link>
          </aside>
          <aside
            className="hh-guide-source-note"
            aria-label="Sources and context"
          >
            <strong>Sources & further reading</strong>
            <ul>
              {guideSourceLinks[chapter.id].map((source) => (
                <li key={source.href}>
                  <Link
                    href={source.href}
                    target={
                      source.href.startsWith('https://') ? '_blank' : undefined
                    }
                    rel={
                      source.href.startsWith('https://')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    aria-label={
                      source.href.startsWith('https://')
                        ? `${source.label} (opens in a new tab)`
                        : undefined
                    }
                  >
                    {source.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <nav className="hh-guide-pagination" aria-label="Explore more topics">
            {previous ? (
              <Link href={'/korea-guide/' + previous.id}>
                <span>
                  <ArrowLeft size={15} /> Also in the guide
                </span>
                <strong>{previous.label}</strong>
              </Link>
            ) : (
              <Link href="/korea-guide">
                <span>
                  <ArrowLeft size={15} /> Overview
                </span>
                <strong>Explore all five topics</strong>
              </Link>
            )}
            {next ? (
              <Link className="is-next" href={'/korea-guide/' + next.id}>
                <span>
                  Read next <ArrowRight size={15} />
                </span>
                <strong>{next.label}</strong>
              </Link>
            ) : (
              <Link className="is-next" href="/#results">
                <span>
                  See the work <ArrowUpRight size={15} />
                </span>
                <strong>Explore client results</strong>
              </Link>
            )}
          </nav>
        </article>
      </div>
    </main>
  );
}
