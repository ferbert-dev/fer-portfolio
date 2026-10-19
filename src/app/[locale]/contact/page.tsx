import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, site } from '@/content';
import { isLocale, localeHref } from '@/lib/i18n';
import { MarkedText } from '@/components/ui/Heading';
import { Chevron } from '@/components/ui/icons';
import { ContactForm } from '@/components/contact/ContactForm';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).contact.metaTitle, alternates: { languages: { en: '/contact', de: '/de/contact' } } };
}

const channelHref: Record<string, string | null> = {
  email: `mailto:${site.email}`,
  linkedin: site.linkedin,
  whatsapp: site.whatsapp,
  telegram: site.telegram,
  x: site.x,
  github: site.github,
};

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getDictionary(locale).contact;
  const b = c.booking;
  const bookingInner = (
    <>
      <span className="mono" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: 'var(--tx)' }}>{b.label}</span><span>{b.format}</span></span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span className="md">{b.title}</span>
        <span className="sub">{b.body}</span>
      </span>
      <span className="btn" style={{ alignSelf: 'flex-start' }}><span className="btn-l">{getDictionary(locale).common.cta}</span><span className="btn-t"><Chevron /></span></span>
    </>
  );
  const bookingStyle = { display: 'flex', flexDirection: 'column' as const, gap: 28, padding: 'clamp(20px, 2.4vw, 32px)', textDecoration: 'none', backgroundImage: 'radial-gradient(var(--dot) 1px, transparent 1px)', backgroundSize: '22px 22px' };

  return (
    <div className="wrap" style={{ paddingTop: 'clamp(56px, 7vw, 104px)', paddingBottom: 'clamp(56px, 7vw, 104px)' }}>
      <div className="mono lab">{c.label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px 48px', padding: 'clamp(28px, 4vw, 56px) 0 clamp(36px, 4.5vw, 64px)' }}>
        <h1 className="xl" style={{ maxWidth: '11ch' }}><MarkedText text={c.title} entrance="load" /></h1>
        <p className="sub" style={{ margin: 0, maxWidth: 420, fontSize: 17 }}>{c.lead}</p>
      </div>
      <div className="ct-grid">
        <div className="ct-left" style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
          {site.bookingUrl ? (
            <a href={site.bookingUrl} className="panel" style={bookingStyle}>{bookingInner}</a>
          ) : (
            <a href="#contact-form" className="panel" style={bookingStyle}>{bookingInner}</a>
          )}
          <div className="panel ct-ch" style={{ padding: 'clamp(20px, 2.4vw, 32px)' }}>
            <div className="mono" style={{ paddingBottom: 14 }}>{c.other}</div>
            {c.channels.map((ch) => {
              const href = channelHref[ch.key];
              const content = (
                <>
                  <span className="mono" style={{ flex: '0 0 96px', color: 'var(--tx)' }}>{ch.name}</span>
                  <span className="sub" style={{ flex: 1, minWidth: 0, overflowWrap: 'anywhere' }}>{ch.handle}</span>
                  {href ? <span className="lnk-t"><Chevron /></span> : null}
                </>
              );
              return href ? <a key={ch.key} className="ch" href={href}>{content}</a> : <div key={ch.key} className="ch">{content}</div>;
            })}
          </div>
        </div>
        <div className="panel lift" style={{ padding: 'clamp(20px, 2.8vw, 40px)', minWidth: 0 }}>
          <ContactForm form={c.form} sent={c.sent} privacyHref={localeHref(locale, '/legal#privacy')} />
        </div>
      </div>
    </div>
  );
}
