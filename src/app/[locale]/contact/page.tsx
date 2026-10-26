import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, site } from '@/content';
import { isLocale, localeHref } from '@/lib/i18n';
import { ArrowTile, ButtonFace } from '@/components/ui/Button';
import { Page, PageHeader, PageLead } from '@/components/ui/Layout';
import { ContactForm } from '@/components/contact/ContactForm';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).contact.metaTitle };
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
      <span className="mono bk-meta"><span className="c-tx">{b.label}</span><span>{b.format}</span></span>
      <span className="bk-copy">
        <span className="md">{b.title}</span>
        <span className="sub">{b.body}</span>
      </span>
      <span className="btn self-start"><ButtonFace label={getDictionary(locale).common.cta} icon="chevron" /></span>
    </>
  );

  return (
    <Page>
      <PageHeader label={c.label} title={c.title} width="11ch">
        <PageLead>{c.lead}</PageLead>
      </PageHeader>
      <div className="ct-grid">
        <div className="ct-left">
          {site.bookingUrl ? (
            <a href={site.bookingUrl} className="panel dots bk">{bookingInner}</a>
          ) : (
            <a href="#contact-form" className="panel dots bk">{bookingInner}</a>
          )}
          <div className="panel ct-ch">
            <div className="mono ct-ch-h">{c.other}</div>
            {c.channels.map((ch) => {
              const href = channelHref[ch.key];
              const content = (
                <>
                  <span className="mono ch-name">{ch.name}</span>
                  <span className="sub ch-handle">{ch.handle}</span>
                  {href ? <ArrowTile /> : null}
                </>
              );
              return href ? <a key={ch.key} className="ch" href={href}>{content}</a> : <div key={ch.key} className="ch">{content}</div>;
            })}
          </div>
        </div>
        <div className="panel lift ct-form">
          <ContactForm form={c.form} sent={c.sent} privacyHref={localeHref(locale, '/legal#privacy')} />
        </div>
      </div>
    </Page>
  );
}
