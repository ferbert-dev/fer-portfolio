'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { eventsEnabled, trackEvent, type EventName } from '@/lib/analytics';

/**
 * One listener for the whole site, so components only need tags, not code:
 * - clicks on any element with data-track send that event,
 * - each element with data-section sends section_view once per page view when it reaches the upper half of the window,
 * - opening a FAQ item (details.faq) sends faq_open with its question.
 * Does nothing unless custom events are switched on (see src/lib/analytics.ts).
 */
export function Tracker() {
  const path = usePathname();

  useEffect(() => {
    if (!eventsEnabled) return;
    // The Vercel script loads after first paint; queue early events (the hero is on screen at once)
    // the same way Vercel's plain-HTML snippet does, so they are sent once the script is ready.
    const w = window as unknown as { va?: (...args: unknown[]) => void; vaq?: unknown[][] };
    w.va = w.va || ((...args: unknown[]) => { (w.vaq = w.vaq || []).push(args); });

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
      if (!el) return;
      trackEvent(el.dataset.track as EventName, el.dataset.trackLocation ?? '', el.dataset.trackLabel ?? '');
    };
    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement;
      if (d.matches?.('details.faq') && d.open) trackEvent('faq_open', 'faq', d.querySelector('summary')?.textContent?.trim() ?? '');
    };

    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.section;
          if (!entry.isIntersecting || !id || seen.has(id)) continue;
          seen.add(id);
          trackEvent('section_view', path, id);
        }
      },
      // Counts once the section reaches the upper half of the window; works for sections taller than the screen.
      { rootMargin: '0px 0px -50% 0px' },
    );
    document.querySelectorAll('[data-section]').forEach((el) => io.observe(el));

    document.addEventListener('click', onClick, true);
    document.addEventListener('toggle', onToggle, true);
    return () => {
      io.disconnect();
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('toggle', onToggle, true);
    };
  }, [path]);

  return null;
}
