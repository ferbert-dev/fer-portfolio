import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getDictionary, locales, site } from '@/content';
import { isLocale } from '@/lib/i18n';

/**
 * Share preview (og:image) for every page: the hero headline with its lime
 * marker on the dark theme. Drawn from the copy, so it follows the headline.
 * Colours are the dark values of tokens.css; CSS variables are not available here.
 */
export const alt = 'Ferbert, AI process analysis and agents';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Drawn once per language at build time, like the pages. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const font = (file: string) => readFile(join(process.cwd(), 'node_modules/geist/dist/fonts', file));

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : 'en');
  const { before, mark, after } = t.home.hero.title;
  const [sans, mono] = await Promise.all([font('geist-sans/Geist-Regular.ttf'), font('geist-mono/GeistMono-Medium.ttf')]);
  const label = { fontFamily: 'Geist Mono', fontSize: 20, letterSpacing: 1.4, textTransform: 'uppercase', color: '#A6A6A6' } as const;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 64, background: '#050505', color: '#FFFFFF', fontFamily: 'Geist' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 40, letterSpacing: -1.2 }}>
            <svg width="30" height="30" viewBox="0 0 14 14" fill="#FFFFFF"><path d="M1 1h4v4H1zM1 9h4v4H1zM9 5h4v4H9z" /></svg>
            {site.name.toLowerCase()}
          </div>
          <div style={label}>{t.header.tagline}</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', fontSize: 104, lineHeight: 1.02, letterSpacing: -4.2, maxWidth: 1040 }}>
          {before.trim().split(/\s+/).map((w, i) => <span key={i} style={{ marginRight: 22 }}>{w}</span>)}
          <span style={{ marginRight: 22, padding: '0 12px', background: '#B8F47A', color: '#050505' }}>{mark}</span>
          {after.trim().split(/\s+/).map((w, i) => <span key={i} style={{ marginRight: 22 }}>{w}</span>)}
        </div>
        <div style={{ ...label, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 10, height: 10, background: '#B8F47A' }} />
          {t.home.hero.label}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Geist', data: sans, weight: 400, style: 'normal' },
        { name: 'Geist Mono', data: mono, weight: 500, style: 'normal' },
      ],
    },
  );
}
