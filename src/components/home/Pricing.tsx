import type { Dictionary } from '@/content';
import { Section, SectionHead } from '@/components/ui/Layout';
import { CardGrid } from '@/components/ui/Lists';
import { OfferCard } from './OfferCard';

type Home = Dictionary['home'];

export function Pricing({ pricing, cta, contactHref }: { pricing: Home['pricing']; cta: string; contactHref: string }) {
  return (
    <Section id="start" titleId="st-title">
      <SectionHead label={pricing.label} title={pricing.title} titleId="st-title" lead={pricing.lead} leadWidth="42ch" />
      <CardGrid as="ol" min={320} className="offers">
        {pricing.offers.map((o, i) => (
          <OfferCard key={o.title} offer={o} index={i} pricing={pricing} cta={cta} contactHref={contactHref} />
        ))}
      </CardGrid>
      <div className="panel price-how" data-rv="">
        <h3 className="md price-how-title">{pricing.how.title}</h3>
        <CardGrid as="ol" min={220} gap="20px 24px" className="price-steps">
          {pricing.how.steps.map((s) => (
            <li key={s.label}>
              <span className="mono c-acc">{s.label}</span>
              <span>{s.body}</span>
            </li>
          ))}
        </CardGrid>
      </div>
    </Section>
  );
}
