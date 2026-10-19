'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const GLYPHS = '!?<>/\\[]{}=+*#-_0123456789';

/** Resolves an element's text from random glyphs to the real text, left to right. */
function scramble(el: HTMLElement & { __busy?: boolean }, dur: number) {
  if (el.__busy) return;
  const text = el.getAttribute('data-t') || el.textContent || '';
  el.setAttribute('data-t', text);
  const start = performance.now();
  el.__busy = true;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const done = Math.floor(p * text.length);
    let out = text.slice(0, done);
    for (let i = done; i < text.length; i++) {
      const c = text[i];
      out += c === ' ' || Math.random() > 0.4 ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(tick);
    else {
      el.textContent = text;
      el.__busy = false;
    }
  };
  requestAnimationFrame(tick);
}

/**
 * Scroll reveal, text scramble and button hover scramble for blocks marked
 * data-rv / data-scr. Fail-safe: content is visible until this script hides
 * what it will reveal. On a page with the hero loader it waits for the
 * "ferbert:ready" event; reduced motion shows everything at once.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timers: number[] = [];
    let io: IntersectionObserver | null = null;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('main [data-rv]'));
    const below = targets.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92 || document.querySelector('[data-loader]'));
    below.forEach((el) => el.classList.add('pre'));

    const reveal = (el: HTMLElement) => {
      el.classList.remove('pre');
      // The hero has its own calm entrance; scrambling there reads as glitchy.
      if (el.closest('.hero')) return;
      el.querySelectorAll<HTMLElement>('[data-scr]').forEach((s, i) => {
        timers.push(window.setTimeout(() => scramble(s, 750), i * 90));
      });
    };

    const start = () => {
      if (!('IntersectionObserver' in window)) {
        below.forEach(reveal);
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              reveal(e.target as HTMLElement);
              io?.unobserve(e.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px' },
      );
      below.forEach((t) => io!.observe(t));
    };

    const onEnter = (e: Event) => {
      const s = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('[data-scr]');
      if (s) scramble(s, 420);
    };
    const buttons = Array.from(document.querySelectorAll<HTMLElement>('.btn, .lnk'));
    buttons.forEach((b) => b.addEventListener('mouseenter', onEnter));

    const hasLoader = !!document.querySelector('[data-loader]');
    if (hasLoader) window.addEventListener('ferbert:ready', start, { once: true });
    else start();

    return () => {
      timers.forEach(clearTimeout);
      io?.disconnect();
      window.removeEventListener('ferbert:ready', start);
      buttons.forEach((b) => b.removeEventListener('mouseenter', onEnter));
      targets.forEach((el) => el.classList.remove('pre'));
    };
  }, [pathname]);

  return null;
}
