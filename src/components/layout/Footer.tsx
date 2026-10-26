import Link from 'next/link';
import type { Dictionary, Locale } from '@/content';
import { site } from '@/content';
import { localeHref } from '@/lib/i18n';

export function Footer({ locale, footer }: { locale: Locale; footer: Dictionary['footer'] }) {
  return (
    <footer style={{ padding: 12 }}>
      <div className="panel" style={{ borderRadius: 28, padding: 'clamp(24px, 3vw, 44px)', display: 'flex', flexWrap: 'wrap', gap: '40px 24px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0 }}>
          <a href={`mailto:${site.email}`} style={{ fontSize: 'clamp(24px, 3vw, 44px)', letterSpacing: '-0.03em', textDecoration: 'none', overflowWrap: 'anywhere', padding: '5px 0', margin: '-5px 0' }}>{site.email}</a>
          <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {footer.links.map((l) => (
              <Link key={l.href} className="pill navl" href={localeHref(locale, l.href)} style={{ padding: '0 12px', minHeight: 32 }}>{l.label}</Link>
            ))}
          </div>
        </div>
        <div className="mono" style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 22px' }}>
            <a className="navl" href={site.github} style={{ padding: '15px 0', margin: '-15px 0' }}>{footer.github}</a>
            <Link className="navl" href={localeHref(locale, '/legal#impressum')} style={{ padding: '15px 0', margin: '-15px 0' }}>{footer.impressum}</Link>
            <Link className="navl" href={localeHref(locale, '/legal#privacy')} style={{ padding: '15px 0', margin: '-15px 0' }}>{footer.privacy}</Link>
          </span>
          <span>{footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
