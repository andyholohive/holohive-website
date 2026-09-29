'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { resolveGuideLink } from '@/lib/korea-guide';

export function GuideLegacyLinks() {
  const router = useRouter();
  useEffect(() => {
    const follow = () => {
      const id = window.location.hash.slice(1);
      const target = resolveGuideLink(id);
      if (target) router.replace(target);
    };
    follow();
    window.addEventListener('hashchange', follow);
    return () => window.removeEventListener('hashchange', follow);
  }, [router]);
  return null;
}
