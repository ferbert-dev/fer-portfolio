'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Dictionary } from '@/content';
import { PrimaryButton } from '@/components/ui/Button';
import { LogoMark } from '@/components/ui/icons';
import { nodeState, useWorkflow } from './WorkflowState';

type Props = {
  hero: Dictionary['home']['hero'];
  workflow: Dictionary['home']['workflow'];
  common: Dictionary['common'];
  contactHref: string;
};

/** Splits "Find the work AI should do. Then let " into sentence-sized pieces for the scramble. */
function pieces(text: string) {
  return text.split(/(?<=\.)\s+/).map((s) => s.trim()).filter(Boolean);
}

export function Hero({ hero, workflow, common, contactHref }: Props) {
  const { wf } = useWorkflow();
  const [loading, setLoading] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoading(false);
      window.dispatchEvent(new Event('ferbert:ready'));
      return;
    }
    let p = 0;
    let done: number | undefined;
    const id = window.setInterval(() => {
      p = Math.min(100, p + 3 + Math.floor(Math.random() * 7));
      setPct(p);
      if (p >= 100) {
        window.clearInterval(id);
        done = window.setTimeout(() => {
          setLoading(false);
          window.dispatchEvent(new Event('ferbert:ready'));
        }, 220);
      }
    }, 40);
    return () => {
      window.clearInterval(id);
      if (done) window.clearTimeout(done);
    };
  }, []);

  const short = wf >= 6 ? workflow.short.done : wf === 0 ? workflow.short.arriving : workflow.short.running;
  const t = hero.title;
  const full = `${t.before}${t.mark}${t.after}`;

  return (
    <section aria-label={hero.label} style={{ padding: '12px 12px 0' }}>
      <div className="hero" style={{ position: 'relative', overflow: 'hidden', display: 'flex', minHeight: 700, border: '1px solid var(--ln2)', borderRadius: 28, boxShadow: 'var(--sh2)', backgroundColor: 'var(--frame)', backgroundImage: 'radial-gradient(80% 90% at 78% 30%, var(--glow) 0%, transparent 62%), radial-gradient(var(--dot) 1px, transparent 1px)', backgroundSize: 'auto, 22px 22px' }}>
        <svg aria-hidden="true" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 'var(--grain)' as unknown as number, pointerEvents: 'none' }}>
          <filter id="d-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          <rect width="100%" height="100%" filter="url(#d-grain)" />
        </svg>

        <div className="rail mono" aria-hidden="true" style={{ position: 'relative', flex: '0 0 56px', borderRight: '1px solid var(--ln)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '28px 0' }}>
          <span style={{ width: 14, height: 64, backgroundImage: 'repeating-linear-gradient(180deg, var(--tx) 0, var(--tx) 1px, transparent 1px, transparent 4px)' }} />
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', display: 'flex', gap: 8, alignItems: 'center' }}>
            {hero.railStatus}: <span style={{ color: 'var(--acc-tx)' }}>{wf >= 6 ? workflow.railStatus.idle : workflow.railStatus.running}</span>
          </span>
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{hero.railPlace}</span>
        </div>

        <div style={{ position: 'relative', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28, padding: 'clamp(28px, 4vw, 56px) clamp(20px, 3vw, 44px) clamp(20px, 2.4vw, 32px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <span className="mono" data-rv="">{hero.label}</span>
            <span aria-hidden="true" style={{ display: 'flex', gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--ln4)' }} />
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--ln4)' }} />
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--tx)' }} />
            </span>
          </div>
          <h1 className="xl" data-rv="" aria-label={full} style={{ maxWidth: '15.5ch' }}>
            {pieces(t.before).map((p, i) => (
              <span key={i}><span data-scr="">{p}</span> </span>
            ))}
            <span className="mk" data-scr="">{t.mark}</span> <span data-scr="">{t.after.trim()}</span>
          </h1>
          <p className="sub" data-rv="" style={{ ['--dl' as string]: '.12s', margin: 0, maxWidth: '50ch', fontSize: 17 }}>{hero.lead}</p>
          <div data-rv="" style={{ ['--dl' as string]: '.2s', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 36px' }}>
            <PrimaryButton href={contactHref} label={common.cta} />
            <Link href="#demos" className="btn-o">{hero.secondary}</Link>
          </div>
          <p className="mono" data-rv="" style={{ ['--dl' as string]: '.26s', margin: '-14px 0 0' }}>{common.ctaNote}</p>

          <div className="hero-card" data-rv="" style={{ ['--dl' as string]: '.32s', marginTop: 'auto', alignSelf: 'flex-end', width: 'min(100%, 440px)', display: 'flex', border: '1px solid var(--ln2)', borderRadius: 16, background: 'var(--card)', backdropFilter: 'blur(8px)', overflow: 'hidden', boxShadow: 'var(--sh2)' }}>
            <div style={{ flex: 1, minWidth: 0, padding: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 500, letterSpacing: '-0.03em' }}><LogoMark size={11} />ferbert</span>
              <span className="mono" style={{ color: 'var(--tx)', lineHeight: 1.5 }}>{hero.card}</span>
              <span className="mono" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 8px' }}>
                <span className="nw" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span className="live" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--acc-tx)' }} />{workflow.name} ·</span>
                <span className="nw">{short}</span>
              </span>
            </div>
            <ol aria-hidden="true" style={{ listStyle: 'none', margin: 0, padding: 14, flex: '0 0 150px', borderLeft: '1px solid var(--ln)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
              {workflow.nodes.map((n, i) => {
                const { done, active } = nodeState(wf, i);
                const lit = done || active;
                return (
                  <li key={i} className="mono" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: lit ? 'var(--tx)' : 'var(--mut)', transition: 'color .3s' }}>
                    <span style={{ flex: '0 0 8px', height: 8, borderRadius: 2, background: lit ? 'var(--acc-tx)' : 'var(--ln2)', transition: 'background .3s' }} />
                    {n.short}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {loading ? (
          <div data-loader="" className="loader" aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'var(--frame)', display: 'grid', placeItems: 'center' }}>
            <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.03em' }}>ferbert</span>
                <span className="mono" style={{ fontVariantNumeric: 'tabular-nums' }}>{pct}%</span>
              </div>
              <div style={{ height: 2, background: 'var(--ln)' }}><div style={{ height: 2, width: `${pct}%`, background: 'var(--acc-tx)' }} /></div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
