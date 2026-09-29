'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { guideChapters } from '@/lib/korea-guide';

export function KoreaGuideNav({ activeId }: { activeId: string }) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const current =
    guideChapters.find((chapter) => chapter.id === activeId) ??
    guideChapters[0];
  const links = (
    <ol>
      {guideChapters.map((chapter, i) => (
        <li key={chapter.id}>
          <Link
            href={'/korea-guide/' + chapter.id}
            aria-current={activeId === chapter.id ? 'page' : undefined}
            onClick={() => setExpanded([])}
          >
            <span>{String(i + 1).padStart(2, '0')}</span>
            {chapter.label}
          </Link>
        </li>
      ))}
    </ol>
  );
  return (
    <aside className="hh-primer-toc">
      <nav className="hh-primer-desktop-nav" aria-label="Guide topics">
        <p className="hh-kicker">The field guide</p>
        {links}
        <Link className="hh-primer-source-jump" href="/korea-guide">
          <ArrowLeft size={15} /> All topics
        </Link>
      </nav>
      <div className="hh-primer-mobile-nav">
        <Accordion
          value={expanded}
          onValueChange={(value) => setExpanded(value as string[])}
        >
          <AccordionItem value="contents">
            <AccordionTrigger>
              Topics <span>{current.label}</span>
            </AccordionTrigger>
            <AccordionContent>
              <nav aria-label="Guide topics">
                {links}
                <Link
                  className="hh-primer-source-jump"
                  href="/korea-guide"
                  onClick={() => setExpanded([])}
                >
                  <ArrowLeft size={15} /> All topics
                </Link>
              </nav>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
