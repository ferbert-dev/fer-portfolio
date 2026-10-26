import type { Dictionary } from '@/content';
import { site } from '@/content';
import { ArrowLink } from '@/components/ui/Button';
import { Heading, SectionLabel } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Layout';

type Home = Dictionary['home'];

export function Faq({ faq, write }: { faq: Home['faq']; write: string }) {
  return (
    <Section id="faq" titleId="faq-title">
      <SectionLabel>{faq.label}</SectionLabel>
      <Heading id="faq-title" text={faq.title} className="faq-title" />
      <div className="faq-list">
        {faq.items.map((f) => (
          <details key={f.q} className="faq panel" data-rv="">
            <summary>
              {f.q}
              <span className="pm" aria-hidden="true">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 1v10M1 6h10" /></svg>
              </span>
            </summary>
            <p className="sub">{f.a}</p>
          </details>
        ))}
      </div>
      <div className="faq-more" data-rv="">
        <span className="mono c-tx">{faq.notHere}</span>
        <ArrowLink href={`mailto:${site.email}`}>{write}</ArrowLink>
      </div>
    </Section>
  );
}
