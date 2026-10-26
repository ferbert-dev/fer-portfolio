'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Dictionary, Locale } from '@/content';
import { localeHref, stripLocale } from '@/lib/i18n';
import { ArrowTile, ButtonFace } from '@/components/ui/Button';
import { ToggleChip } from '@/components/ui/Controls';
import { LogoMark } from '@/components/ui/icons';
import { THEME_KEY, type ThemeMode } from './theme';
import { tag, trackEvent } from '@/lib/analytics';

const ORDER: ThemeMode[] = ['auto', 'light', 'dark'];

type Props = {
  locale: Locale;
  header: Dictionary['header'];
  nav: Dictionary['nav'];
  cta: string;
};

/**
 * Desktop shows the in-page links (Analysis, Demos, What we automate, Pricing);
 * the phone menu shows every `nav` entry, which adds Contact. There is no
 * language switch until German is translated (decision 17).
 */
export function Header({ locale, header, nav, cta }: Props) {
  const pathname = usePathname() ?? '/';
  const path = stripLocale(pathname);
  const isHome = path === '/';
  const [menu, setMenu] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const [theme, setThemeState] = useState<ThemeMode>('auto');

  useEffect(() => {
    const t = document.documentElement.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') setThemeState(t);
  }, []);

  useEffect(() => {
    const bar = document.getElementById('d-progress');
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => setMenu(false), [pathname]);

  // Escape closes the open menu and returns focus to the Menu button.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenu(false);
      menuBtn.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menu]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    trackEvent('theme_change', 'header', mode);
    document.documentElement.setAttribute('data-theme', mode);
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch {}
  };

  const names = { auto: header.theme.auto, light: header.theme.light, dark: header.theme.dark };
  const h = (href: string) => localeHref(locale, isHome && href.startsWith('/#') ? href.slice(1) : href);
  const desktop = nav.filter((n) => n.href.startsWith('/#'));

  return (
    <header className="hdr">
      <div id="d-progress" className="hdr-progress" aria-hidden="true" />
      <nav className="wrap mono hdr-nav" aria-label={header.navLabel}>
        <Link href={localeHref(locale, '/')} aria-label={header.home} className="hdr-home" {...tag('nav_click', 'header', 'home')}>
          <span className="hdr-logo">
            <LogoMark />
            ferbert
          </span>
          <span className="nav-links tagl hdr-sep" aria-hidden="true" />
          <span className="nav-links tagl sub">{header.tagline}</span>
        </Link>
        <div className="hdr-right">
          <div className="nav-links hdr-links">
            {desktop.map((n) => (
              <Link key={n.href} className="navl" href={h(n.href)} {...tag('nav_click', 'header', n.href)}>
                {n.label}
              </Link>
            ))}
          </div>
          <div className="th-seg" role="group" aria-label={header.theme.label}>
            {ORDER.map((m) => (
              <ToggleChip key={m} variant="segment" mono pressed={m === theme} onClick={() => setTheme(m)}>{names[m]}</ToggleChip>
            ))}
          </div>
          <button type="button" className="mono th th-one" onClick={() => setTheme(ORDER[(ORDER.indexOf(theme) + 1) % 3])} aria-label={`${header.theme.label}: ${names[theme]}. ${header.theme.change}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M6 1a5 5 0 010 10z" fill="currentColor" /></svg>
            {names[theme]}
          </button>
          <Link href={localeHref(locale, '/contact')} className="hdr-cta" {...tag('cta_click', 'header', 'book-call')}>{cta}</Link>
          <button ref={menuBtn} type="button" className="mono menu-btn" onClick={() => setMenu((v) => !v)} aria-expanded={menu} aria-controls="d-menu">
            {menu ? header.close : header.menu}
          </button>
        </div>
      </nav>
      {menu ? (
        <div id="d-menu" className="wrap menu">
          <nav aria-label={header.mobileNavLabel} className="menu-nav">
            {nav.map((n) => (
              <Link key={n.href} className="navl menu-link" href={h(n.href)} {...tag('nav_click', 'menu', n.href)} aria-current={!n.href.includes('#') && path === n.href ? 'page' : undefined} onClick={() => setMenu(false)}>
                {n.label}
                <ArrowTile />
              </Link>
            ))}
          </nav>
          <Link href={localeHref(locale, '/contact')} className="btn menu-cta" onClick={() => setMenu(false)} {...tag('cta_click', 'menu', 'book-call')}>
            <ButtonFace label={cta} icon="chevron" />
          </Link>
        </div>
      ) : null}
    </header>
  );
}
