import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, site } from '@/content';
import { isLocale } from '@/lib/i18n';
import { MarkedText } from '@/components/ui/Heading';
import { Chevron } from '@/components/ui/icons';

export async function generateMetadata({ params }: PageProps<'/[locale]/legal'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).legal.metaTitle, alternates: { languages: { en: '/legal', de: '/de/legal' } } };
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
    <div className="wrap" style={{ paddingTop: 'clamp(56px, 7vw, 104px)', paddingBottom: 'clamp(56px, 7vw, 104px)' }}>
      <div className="mono lab">{l.label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px 48px', padding: 'clamp(28px, 4vw, 56px) 0 clamp(36px, 4.5vw, 64px)' }}>
        <h1 className="lg"><MarkedText text={l.title} /></h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 440 }}>
          <span className="mono">{l.updated}</span>
          <p className="sub" style={{ margin: 0 }}>{l.binding}</p>
          <p className="mono" style={{ margin: 0, padding: '10px 12px', border: '1px dashed var(--warn-bd)', borderRadius: 10, color: 'var(--warn-tx)', lineHeight: 1.5 }}>{l.draft}</p>
        </div>
      </div>
      <div className="lg-grid">
        <nav className="toc mono" aria-label={l.toc}>
          <span style={{ paddingBottom: 14 }}>{l.toc}</span>
          {toc.map(([id, title]) => (
            <a key={id} href={`#${id}`}>{title}<span className="lnk-t"><Chevron /></span></a>
          ))}
        </nav>
        <article className="art">
          <section className="blk" id="impressum" style={{ paddingTop: 0 }}>
            <span className="mono">01</span>
            <h2 className="md">{l.impressum.title}</h2>
            <dl className="imp">
              {l.impressum.rows.map(([k, v]) => (
                <div key={k} style={{ display: 'contents' }}>
                  <dt className="mono" style={{ paddingTop: 17 }}>{k}</dt>
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
                  <span aria-hidden="true" style={{ flex: '0 0 20px', height: 20, marginTop: 1, borderRadius: '50%', background: 'var(--acc-tint)', color: 'var(--acc-tx)', display: 'grid', placeItems: 'center' }}>
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
            <p>{l.rights.before}<a href={`mailto:${site.email}`} style={{ color: 'var(--tx)' }}>{site.email}</a>{l.rights.after}</p>
          </section>
        </article>
      </div>
    </div>
  );
}
