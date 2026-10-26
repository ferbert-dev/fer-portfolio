import Link from 'next/link';
import type { Dictionary, Locale } from '@/content';
import { site } from '@/content';
import { localeHref } from '@/lib/i18n';

export function Footer({ locale, footer }: { locale: Locale; footer: Dictionary['footer'] }) {
  return (
    <footer className="ftr">
      <div className="panel ftr-panel">
        <div className="ftr-main">
          <a href={`mailto:${site.email}`} className="ftr-mail">{site.email}</a>
          <div className="mono ftr-pills">
            {footer.links.map((l) => (
              <Link key={l.href} className="pill navl ftr-pill" href={localeHref(locale, l.href)}>{l.label}</Link>
            ))}
          </div>
        </div>
        <div className="mono ftr-side">
          <span className="ftr-links">
            <a className="navl ftr-link" href={site.github}>{footer.github}</a>
            <Link className="navl ftr-link" href={localeHref(locale, '/legal#impressum')}>{footer.impressum}</Link>
            <Link className="navl ftr-link" href={localeHref(locale, '/legal#privacy')}>{footer.privacy}</Link>
          </span>
          <span>{footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
