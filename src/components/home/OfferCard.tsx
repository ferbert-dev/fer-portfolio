'use client';

import { useId, useState } from 'react';
import type { Dictionary } from '@/content';
import { PrimaryButton } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Controls';
import { CheckList } from '@/components/ui/Lists';
import { pad } from './format';
import { tag } from '@/lib/analytics';

type Pricing = Dictionary['home']['pricing'];

/**
 * One pricing offer. On phones the offers that are not recommended fold: number,
 * title and price stay visible and a button opens the list of what is included,
 * so all three prices are seen without three screens of scrolling. From tablet
 * up the list is always shown and the button is hidden (rules in home.css).
 */
export function OfferCard({ offer: o, index, pricing, cta, contactHref }: { offer: Pricing['offers'][number]; index: number; pricing: Pricing; cta: string; contactHref: string }) {
  const [open, setOpen] = useState(false);
  const moreId = useId();
  const fold = !o.recommended;
  return (
    <li className={`panel offer${o.recommended ? ' invert' : ''}`} data-fold={fold ? '' : undefined} data-open={fold && open ? '' : undefined} data-rv="" style={{ ['--dl' as string]: `${index * 0.08}s` }}>
      <div className="offer-body">
        <div className="mono offer-meta">
          <span className="offer-num">
            {pad(index)}
            {o.recommended ? <Pill tone="accent" mono={false} className="pill-sm">{pricing.recommended}</Pill> : null}
          </span>
          <span>{pricing.timeline}: <span className="c-tx">{o.time}</span></span>
        </div>
        <h3 className="md offer-title">{o.title}. <span className="sub">{o.line}</span></h3>
        <div id={moreId} className="offer-more">
          <CheckList items={o.items} />
          <span className="mono offer-when">{o.when}</span>
        </div>
      </div>
      <div className="offer-foot">
        {o.recommended ? <PrimaryButton href={contactHref} label={cta} scramble={false} track={tag('cta_click', 'pricing', 'book-call')} /> : null}
        <span className="offer-price">{o.price} <span className="mono">{o.unit}</span></span>
        {fold ? (
          <button type="button" className="mono offer-toggle" aria-label={`${pricing.details}: ${o.title}`} aria-expanded={open} aria-controls={moreId} onClick={() => setOpen((v) => !v)}>
            {pricing.details}
            <span className="pm" aria-hidden="true">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 1v10M1 6h10" /></svg>
            </span>
          </button>
        ) : null}
      </div>
    </li>
  );
}
