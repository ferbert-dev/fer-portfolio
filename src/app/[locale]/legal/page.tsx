import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, site } from '@/content';
import { isLocale } from '@/lib/i18n';
import { ArrowTile } from '@/components/ui/Button';
import { Page, PageHeader } from '@/components/ui/Layout';

export async function generateMetadata({ params }: PageProps<'/[locale]/legal'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).legal.metaTitle };
}

export default async function LegalPage({ params }: PageProps<'/[locale]/legal'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = getDictionary(locale).legal;
  const toc = [
    ['impressum', l.impressum.title],
    ['privacy', l.privacy.title],
    ['ai', l.ai.title],
    ['rights', l.rights.title],
  ];
  return (
    <Page>
      <PageHeader label={l.label} title={l.title} size="lg">
        <div className="legal-meta">
          <span className="mono">{l.updated}</span>
          <p className="sub">{l.binding}</p>
          <p className="mono draft">{l.draft}</p>
        </div>
      </PageHeader>
      <div className="lg-grid">
        <nav className="toc mono" aria-label={l.toc}>
          <span>{l.toc}</span>
          {toc.map(([id, title]) => (
            <a key={id} href={`#${id}`}>{title}<ArrowTile /></a>
          ))}
        </nav>
        <article className="art">
          <section className="blk" id="impressum">
            <span className="mono">01</span>
            <h2 className="md">{l.impressum.title}</h2>
            <dl className="imp">
              {l.impressum.rows.map(([k, v]) => (
                <div key={k}>
                  <dt className="mono">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="blk" id="privacy">
            <span className="mono">02</span>
            <h2 className="md">{l.privacy.title}</h2>
            {l.privacy.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </section>
          <section className="blk" id="ai">
            <span className="mono">03</span>
            <h2 className="md">{l.ai.title}</h2>
            <ul className="chk">
              {l.ai.items.map((it) => (
                <li key={it}>
                  <span className="chk-dot" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5.3l2 2L8 3" /></svg>
                  </span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="blk" id="rights">
            <span className="mono">04</span>
            <h2 className="md">{l.rights.title}</h2>
            <p>{l.rights.before}<a href={`mailto:${site.email}`} className="c-tx">{site.email}</a>{l.rights.after}</p>
          </section>
        </article>
      </div>
    </Page>
  );
}
