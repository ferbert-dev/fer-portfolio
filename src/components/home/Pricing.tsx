import type { Dictionary } from '@/content';
import { PrimaryButton } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Controls';
import { Section, SectionHead } from '@/components/ui/Layout';
import { CardGrid, CheckList } from '@/components/ui/Lists';
import { pad } from './format';
import { tag } from '@/lib/analytics';

type Home = Dictionary['home'];

export function Pricing({ pricing, cta, contactHref }: { pricing: Home['pricing']; cta: string; contactHref: string }) {
  return (
    <Section id="start" titleId="st-title">
      <SectionHead label={pricing.label} title={pricing.title} titleId="st-title" lead={pricing.lead} leadWidth="42ch" />
      <CardGrid as="ol" min={320} className="offers">
        {pricing.offers.map((o, i) => (
          <li key={o.title} className={`panel offer${o.recommended ? ' invert' : ''}`} data-rv="" style={{ ['--dl' as string]: `${i * 0.08}s` }}>
            <div className="offer-body">
              <div className="mono offer-meta">
                <span className="offer-num">
                  {pad(i)}
                  {o.recommended ? <Pill tone="accent" mono={false} className="pill-sm">{pricing.recommended}</Pill> : null}
                </span>
                <span>{pricing.timeline}: <span className="c-tx">{o.time}</span></span>
              </div>
              <h3 className="md offer-title">{o.title}. <span className="sub">{o.line}</span></h3>
              <CheckList items={o.items} />
              <span className="mono offer-when">{o.when}</span>
            </div>
            <div className="offer-foot">
              {o.recommended ? <PrimaryButton href={contactHref} label={cta} scramble={false} track={tag('cta_click', 'pricing', 'book-call')} /> : null}
              <span className="offer-price">{o.price} <span className="mono">{o.unit}</span></span>
            </div>
          </li>
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
