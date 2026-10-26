import { track } from '@vercel/analytics';

/**
 * Custom analytics events. Page views are tracked automatically by <Analytics />;
 * everything here is extra and is only sent when NEXT_PUBLIC_ANALYTICS_EVENTS=1.
 * Custom events need a Vercel Pro plan; on Hobby the switch stays off.
 *
 * Every event carries the same two properties so exports line up in one table:
 *   location: where on the site it happened (header, hero, pricing, support, ...)
 *   label:    what was chosen (a section id, a link target, a demo question, ...)
 * Never put personal data (names, emails, message text) into an event.
 * Full list: docs/analytics.md.
 */
export type EventName =
  | 'section_view'
  | 'cta_click'
  | 'nav_click'
  | 'email_click'
  | 'demo_question'
  | 'faq_open'
  | 'contact_submit'
  | 'contact_channel'
  | 'theme_change'
  | 'blog_filter';

export const eventsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_EVENTS === '1';

export function trackEvent(name: EventName, location: string, label = '') {
  if (!eventsEnabled) return;
  track(name, { location, label });
}

/** Attributes that tag a clickable element; the delegated listener in Tracker.tsx sends them. */
export type TrackTag = { 'data-track': EventName; 'data-track-location': string; 'data-track-label'?: string };

export function tag(name: EventName, location: string, label?: string): TrackTag {
  return { 'data-track': name, 'data-track-location': location, ...(label ? { 'data-track-label': label } : {}) };
}
