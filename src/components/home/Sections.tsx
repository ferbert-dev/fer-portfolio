
import type { Dictionary } from '@/content';
import { site } from '@/content';
import { ArrowLink, PrimaryButton } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Controls';
import { Heading, Lead, SectionLabel } from '@/components/ui/Heading';
import { FramePanel, Section, SectionHead } from '@/components/ui/Layout';
import { LogoMark, StrokeIcon } from '@/components/ui/icons';
import { trustIcons } from './icons';

type Home = Dictionary['home'];
const pad = (i: number) => String(i + 1).padStart(2, '0');

export function Services({ services }: { services: Home['services'] }) {
  return (
    <Section id="services" titleId="sv-title">
      <SectionHead label={services.label} title={services.title} titleId="sv-title" width="14ch" lead={services.lead} leadWidth="40ch" below={48} />
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderBottom: '1px solid var(--ln)' }}>
        {services.rows.map((s, i) => (
          <li key={s.title} className="svc row" data-rv="">
            <span aria-hidden="true" style={{ fontSize: 'clamp(26px, 2.6vw, 36px)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--mut)', fontVariantNumeric: 'tabular-nums' }}>{pad(i)}</span>
            <h3 className="md" style={{ fontSize: 'clamp(24px, 2.4vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{s.title}</h3>
            <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p className="sub" style={{ margin: 0, maxWidth: '52ch' }}>{s.body}</p>
              <ul aria-label={services.includes} style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {s.tags.map((t) => (
                  <li key={t} style={{ padding: '5px 12px', borderRadius: 999, background: 'var(--p1)', border: '1px solid var(--ln)', boxShadow: 'var(--sh1)', fontSize: 14, fontWeight: 500, color: 'var(--log)' }}>{t}</li>
                ))}
              </ul>
              {s.href && s.link ? <ArrowLink href={s.href} style={{ alignSelf: 'flex-start' }}>{s.link}</ArrowLink> : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Trust({ trust, legalHref }: { trust: Home['trust']; legalHref: string }) {
  return (
    <Section id="trust" titleId="tr-title">
      <SectionLabel>{trust.label}</SectionLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px 24px', paddingTop: 40, alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Heading id="tr-title" text={trust.title} width="10ch" />
          <Lead width="40ch">{trust.lead}</Lead>
          <ArrowLink href={legalHref} reveal style={{ alignSelf: 'flex-start' }}>{trust.link}</ArrowLink>
        </div>
        <ul style={{ flex: '1 1 560px', minWidth: 0, listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 8 }}>
          {trust.items.map((t, i) => (
            <li key={t.title} className="panel tc" data-rv="" style={{ ['--dl' as string]: `${i * 0.07}s`, padding: 24, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 220 }}>
              <span style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--ln2)', color: 'var(--acc-tx)', display: 'grid', placeItems: 'center' }}><StrokeIcon d={trustIcons[i]} size={20} stroke={1.5} /></span>
              <span style={{ marginTop: 'auto', fontSize: 21, lineHeight: 1.2, letterSpacing: '-0.02em' }}>{t.title}</span>
              <span className="sub" style={{ fontSize: 15 }}>{t.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function HowStep({ i, step, delay }: { i: number; step: Home['how']['steps'][number]; delay?: string }) {
  return (
    <li data-rv="" style={{ ...(delay ? { ['--dl' as string]: delay } : {}), display: 'flex', flexDirection: 'column', gap: 14 }}>
      <span className="mono">{pad(i)}.</span>
      <h3 className="md">{step.title}</h3>
      <p className="sub" style={{ margin: 0, maxWidth: '30ch' }}>{step.body}</p>
    </li>
  );
}

export function HowWeWork({ how }: { how: Home['how'] }) {
  const [a, b, c] = how.cadence;
  const slash = <span className="sub" aria-hidden="true">/</span>;
  return (
    <Section id="how" titleId="how-title">
      <SectionLabel>{how.label}</SectionLabel>
      <Heading id="how-title" text={how.title} width="14ch" style={{ padding: '40px 0' }} />
      <div data-rv="" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px 40px', padding: '28px 0', marginBottom: 64, borderTop: '1px solid var(--ln)', borderBottom: '1px solid var(--ln)' }}>
        <h3 className="lg" aria-label={how.cadenceLabel} style={{ fontSize: 'clamp(32px, 4.6vw, 68px)' }}>
          <span className="nw">{a}</span>&nbsp;{slash} <span className="nw">{b}</span>&nbsp;{slash} <span className="nw">{c}</span>
        </h3>
        <p className="sub" style={{ margin: 0, maxWidth: '38ch' }}>{how.cadenceLead}</p>
      </div>
      <ol className="how">
        <HowStep i={0} step={how.steps[0]} />
        <li className="how-x" aria-hidden="true" data-rv="" style={{ ['--dl' as string]: '.08s' }}>
          <div className="tile"><svg width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 5v24M5 17h24M9 9l16 16M25 9L9 25" /></svg></div>
        </li>
        <HowStep i={1} step={how.steps[1]} delay=".16s" />
        <li className="how-x" aria-hidden="true" />
        <li className="how-x" aria-hidden="true" />
        <HowStep i={2} step={how.steps[2]} />
        <li className="how-x" aria-hidden="true" data-rv="" style={{ ['--dl' as string]: '.08s' }}>
          <div className="tile"><svg width="38" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l8 12 8-12 8 12 8-12" /></svg></div>
        </li>
        <HowStep i={3} step={how.steps[3]} delay=".16s" />
      </ol>
    </Section>
  );
}

export function Pricing({ pricing, cta, contactHref }: { pricing: Home['pricing']; cta: string; contactHref: string }) {
  return (
    <Section id="start" titleId="st-title">
      <SectionHead label={pricing.label} title={pricing.title} titleId="st-title" lead={pricing.lead} leadWidth="42ch" />
      <ol className="offers" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 8 }}>
        {pricing.offers.map((o, i) => (
          <li key={o.title} className={`panel${o.recommended ? ' invert' : ''}`} data-rv="" style={{ ['--dl' as string]: `${i * 0.08}s`, padding: 8, display: 'flex', flexDirection: 'column', background: 'var(--chat)' }}>
            <div style={{ flex: 1, borderRadius: 14, background: 'var(--p2)', padding: 24, display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {pad(i)}
                  {o.recommended ? <Pill tone="accent" mono={false} style={{ minHeight: 22 }}>{pricing.recommended}</Pill> : null}
                </span>
                <span>{pricing.timeline}: <span style={{ color: 'var(--tx)' }}>{o.time}</span></span>
              </div>
              <h3 className="md" style={{ minHeight: '3.6em' }}>{o.title}. <span className="sub">{o.line}</span></h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11, fontSize: 15 }}>
                {o.items.map((it) => (
                  <li key={it} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span aria-hidden="true" style={{ flex: '0 0 18px', height: 18, marginTop: 2, borderRadius: '50%', border: '1px solid var(--ln2)', display: 'grid', placeItems: 'center' }}>
                      <svg width="9" height="9" fill="none" style={{ stroke: 'var(--acc-tx)' }} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 4.8l2 2L7.5 2.4" /></svg>
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <span className="mono" style={{ marginTop: 'auto' }}>{o.when}</span>
            </div>
            <div style={{ padding: '16px 16px 10px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              {o.recommended ? <PrimaryButton href={contactHref} label={cta} scramble={false} /> : null}
              <span style={{ fontSize: 26, letterSpacing: '-0.03em' }}>{o.price} <span className="mono">{o.unit}</span></span>
            </div>
          </li>
        ))}
      </ol>
      <div className="panel" data-rv="" style={{ marginTop: 8, padding: 'clamp(20px, 2.4vw, 32px)', display: 'flex', flexWrap: 'wrap', gap: '20px 24px', alignItems: 'flex-start' }}>
        <h3 className="md" style={{ flex: '1 1 320px', minWidth: 0 }}>{pricing.how.title}</h3>
        <ol style={{ flex: '2 1 520px', minWidth: 0, listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '20px 24px' }}>
          {pricing.how.steps.map((s) => (
            <li key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 14, borderTop: '1px solid var(--ln2)' }}>
              <span className="mono" style={{ color: 'var(--acc-tx)' }}>{s.label}</span>
              <span>{s.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export function Company({ company }: { company: Home['company'] }) {
  return (
    <Section id="company" titleId="co-title">
      <SectionLabel>{company.label}</SectionLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px 24px', paddingTop: 40 }}>
        <Heading id="co-title" text={company.title} width="11ch" style={{ flex: '1 1 420px', minWidth: 0 }} />
        <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <p className="md co-p" data-rv="" style={{ maxWidth: '30ch' }}>{company.lead} <span className="sub">{company.body}</span></p>
        </div>
      </div>
    </Section>
  );
}

export function Faq({ faq, write }: { faq: Home['faq']; write: string }) {
  return (
    <Section id="faq" titleId="faq-title">
      <SectionLabel>{faq.label}</SectionLabel>
      <Heading id="faq-title" text={faq.title} style={{ padding: '56px 0 48px', textAlign: 'center' }} />
      <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {faq.items.map((f) => (
          <details key={f.q} className="faq panel" data-rv="" style={{ borderRadius: 14 }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, minHeight: 64, padding: '8px 10px 8px 22px', fontSize: 18, letterSpacing: '-0.02em' }}>
              {f.q}
              <span className="pm" aria-hidden="true" style={{ flex: '0 0 44px', height: 44, borderRadius: 10, border: '1px solid var(--ln3)', display: 'grid', placeItems: 'center' }}>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 1v10M1 6h10" /></svg>
              </span>
            </summary>
            <p className="sub" style={{ margin: 0, padding: '0 70px 24px 22px', maxWidth: '64ch' }}>{f.a}</p>
          </details>
        ))}
      </div>
      <div data-rv="" style={{ maxWidth: 820, margin: '40px auto 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, paddingTop: 20, borderTop: '1px solid var(--ln)' }}>
        <span className="mono" style={{ color: 'var(--tx)' }}>{faq.notHere}</span>
        <ArrowLink href={`mailto:${site.email}`}>{write}</ArrowLink>
      </div>
    </Section>
  );
}

export function Closing({ closing, cta, write, contactHref }: { closing: Home['closing']; cta: string; write: string; contactHref: string }) {
  return (
    <section aria-labelledby="cta-title" className="sec" style={{ paddingLeft: 12, paddingRight: 12 }}>
      <FramePanel glow="radial-gradient(70% 90% at 50% 0%, var(--glow) 0%, transparent 65%)" style={{ borderRadius: 28, padding: 'clamp(48px, 7vw, 110px) 24px clamp(44px, 6vw, 90px)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        <span className="mono" data-rv="">{closing.label}</span>
        <Heading id="cta-title" text={closing.title} size="xl" width="14ch" />
        <span aria-hidden="true" style={{ width: 1, height: 56, background: 'var(--ln2)' }} />
        <Lead width="46ch">{closing.lead}</Lead>
        <div data-rv="" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <span style={{ width: 96, height: 96, borderRadius: 14, background: 'var(--inv)', color: 'var(--on-inv)', display: 'grid', placeItems: 'center' }}><LogoMark size={34} /></span>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 0v16M0 8h16" /></svg>
          <span className="mono" style={{ width: 96, height: 96, borderRadius: 14, border: '1px dashed var(--ln4)', display: 'grid', placeItems: 'center', color: 'var(--tx)' }}>{closing.you}</span>
        </div>
        <div data-rv="" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '12px 32px' }}>
          <PrimaryButton href={contactHref} label={cta} />
          <ArrowLink href={`mailto:${site.email}`}>{write}</ArrowLink>
        </div>
      </FramePanel>
    </section>
  );
}

