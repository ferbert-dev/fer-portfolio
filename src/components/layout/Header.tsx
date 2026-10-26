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
    document.documentElement.setAttribute('data-theme', mode);
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch {}
  };

  const names = { auto: header.theme.auto, light: header.theme.light, dark: header.theme.dark };
  const h = (href: string) => localeHref(locale, isHome && href.startsWith('/#') ? href.slice(1) : href);
  const desktop = nav.filter((n) => n.href.startsWith('/#'));

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--hdr)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--p3)' }}>
      <div id="d-progress" aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 2, background: 'var(--acc-tx)', transform: 'scaleX(0)', transformOrigin: 'left center' }} />
      <nav className="wrap mono" aria-label={header.navLabel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, minHeight: 56, color: 'var(--tx)' }}>
        <Link href={localeHref(locale, '/')} aria-label={header.home} style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', padding: '10px 0', margin: '-10px 0' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 19, fontWeight: 500, letterSpacing: '-0.03em', textTransform: 'none' }}>
            <LogoMark />
            ferbert
          </span>
          <span className="nav-links tagl" aria-hidden="true" style={{ width: 1, height: 18, background: 'var(--ln2)' }} />
          <span className="nav-links tagl" style={{ color: 'var(--sub)' }}>{header.tagline}</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 44px)' }}>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 44px)' }}>
            {desktop.map((n) => (
              <Link key={n.href} className="navl" href={h(n.href)}>
                {n.label}
              </Link>
            ))}
          </div>
          <div className="th-seg" role="group" aria-label={header.theme.label} style={{ display: 'flex', alignItems: 'center', gap: 2, padding: 2, border: '1px solid var(--ctl-bd)', borderRadius: 999 }}>
            {ORDER.map((m) => (
              <ToggleChip key={m} variant="segment" mono pressed={m === theme} onClick={() => setTheme(m)}>{names[m]}</ToggleChip>
            ))}
          </div>
          <button type="button" className="mono th th-one" onClick={() => setTheme(ORDER[(ORDER.indexOf(theme) + 1) % 3])} aria-label={`${header.theme.label}: ${names[theme]}. ${header.theme.change}`} style={{ display: 'none', alignItems: 'center', gap: 6, minHeight: 44, padding: '0 12px', border: '1px solid var(--ctl-bd)', borderRadius: 999, background: 'transparent', color: 'var(--tx)', cursor: 'pointer' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M6 1a5 5 0 010 10z" fill="currentColor" /></svg>
            {names[theme]}
          </button>
          <Link href={localeHref(locale, '/contact')} className="hdr-cta" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 14px', borderRadius: 999, background: 'var(--inv)', color: 'var(--on-inv)', textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: 'var(--sh-btn)' }}>{cta}</Link>
          <button ref={menuBtn} type="button" className="mono menu-btn" onClick={() => setMenu((v) => !v)} aria-expanded={menu} aria-controls="d-menu" style={{ alignItems: 'center', minHeight: 44, padding: '0 12px', border: '1px solid var(--tx)', borderRadius: 999, background: 'transparent', color: 'var(--tx)', cursor: 'pointer' }}>
            {menu ? header.close : header.menu}
          </button>
        </div>
      </nav>
      {menu ? (
        <div id="d-menu" className="wrap" style={{ paddingTop: 8, paddingBottom: 24, borderTop: '1px solid var(--ln)', background: 'var(--bg)' }}>
          <nav aria-label={header.mobileNavLabel} style={{ display: 'flex', flexDirection: 'column' }}>
            {nav.map((n) => (
              <Link key={n.href} className="navl" href={h(n.href)} aria-current={!n.href.includes('#') && path === n.href ? 'page' : undefined} onClick={() => setMenu(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 52, padding: 0, borderBottom: '1px solid var(--ln)', fontFamily: 'var(--font-sans)', fontSize: 26, letterSpacing: '-0.03em', textTransform: 'none' }}>
                {n.label}
                <ArrowTile />
              </Link>
            ))}
          </nav>
          <Link href={localeHref(locale, '/contact')} className="btn" onClick={() => setMenu(false)} style={{ marginTop: 20, textTransform: 'none', letterSpacing: '-0.01em', fontFamily: 'var(--font-sans)' }}>
            <ButtonFace label={cta} icon="chevron" />
          </Link>
        </div>
      ) : null}
    </header>
  );
}
