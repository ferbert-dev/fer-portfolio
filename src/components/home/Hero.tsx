'use client';

import { useEffect, useState } from 'react';
import type React from 'react';
import type { Dictionary } from '@/content';
import { OutlineButton, PrimaryButton } from '@/components/ui/Button';
import { PlayPauseButton } from '@/components/ui/Controls';
import { FramePanel } from '@/components/ui/Layout';
import { LogoMark } from '@/components/ui/icons';
import { nodeState, useWorkflow } from './WorkflowState';

type Props = {
  hero: Dictionary['home']['hero'];
  workflow: Dictionary['home']['workflow'];
  common: Dictionary['common'];
  contactHref: string;
};

/** Splits text into words; the word list drives the masked, word-by-word headline entrance. */
function words(text: string) {
  return text.split(/\s+/).filter(Boolean);
}

/** Eases the loader counter so it starts and settles softly instead of jumping. */
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const LOAD_MS = 1300;
const LEAVE_MS = 700;

export function Hero({ hero, workflow, common, contactHref }: Props) {
  const { wf, paused, toggle } = useWorkflow();
  const [loader, setLoader] = useState<'on' | 'leaving' | 'off'>('on');
  const [pct, setPct] = useState(0);
  const [intro, setIntro] = useState<'idle' | 'set' | 'go'>('idle');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoader('off');
      window.dispatchEvent(new Event('ferbert:ready'));
      return;
    }
    // Hide the headline words only now that script runs, so the page still reads without it.
    setIntro('set');
    const timers: number[] = [];
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / LOAD_MS);
      setPct(Math.round(ease(p) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      timers.push(window.setTimeout(() => {
        setLoader('leaving');
        setIntro('go');
        window.dispatchEvent(new Event('ferbert:ready'));
        timers.push(window.setTimeout(() => setLoader('off'), LEAVE_MS));
      }, 250));
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  const short = wf >= 6 ? workflow.short.done : wf === 0 ? workflow.short.arriving : workflow.short.running;
  const t = hero.title;
  const full = `${t.before}${t.mark}${t.after}`;
  // Punctuation directly after the marked word stays with it on one line.
  const after = t.after.match(/^(\S*)\s*(.*)$/s)!;
  const head = words(t.before);
  const tail = words(after[2]);
  let n = 0;
  const word = (content: React.ReactNode, key: string) => (
    <span key={key}>
      <span className="w"><span style={{ ['--i' as string]: n++ }}>{content}</span></span>{' '}
    </span>
  );

  return (
    <section aria-label={hero.label} style={{ padding: '12px 12px 0' }}>
      <FramePanel className="hero" glow="radial-gradient(80% 90% at 78% 30%, var(--glow) 0%, transparent 62%)" style={{ display: 'flex', minHeight: 'min(700px, calc(100svh - 80px))', borderRadius: 28, boxShadow: 'var(--sh2)' }}>
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
            <span className="mono" data-rv="" style={{ ['--dl' as string]: '.05s' }}>{hero.label}</span>
            <span aria-hidden="true" style={{ display: 'flex', gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--ln4)' }} />
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--ln4)' }} />
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--tx)' }} />
            </span>
          </div>
          <h1 className={`xl hero-h${intro === 'set' ? ' intro' : ''}${intro === 'go' ? ' intro go' : ''}`} aria-label={full} style={{ maxWidth: '15.5ch', ['--words' as string]: head.length + 1 + tail.length }}>
            <span aria-hidden="true">
              {head.map((w, i) => word(w, `h${i}`))}
              {word(<span className="nw"><span className="mk">{t.mark}</span>{after[1]}</span>, 'mark')}
              {tail.map((w, i) => word(w, `t${i}`))}
            </span>
          </h1>
          <p className="sub" data-rv="" style={{ ['--dl' as string]: '.95s', margin: 0, maxWidth: '50ch', fontSize: 17 }}>{hero.lead}</p>
          <div data-rv="" style={{ ['--dl' as string]: '1.15s', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 36px' }}>
            <PrimaryButton href={contactHref} label={common.cta} />
            <OutlineButton href="#demos">{hero.secondary}</OutlineButton>
          </div>
          <p className="mono" data-rv="" style={{ ['--dl' as string]: '1.3s', margin: '-14px 0 0' }}>{common.ctaNote}</p>

          <div className="hero-card" data-rv="" style={{ ['--dl' as string]: '1.55s', marginTop: 'auto', alignSelf: 'flex-end', width: 'min(100%, 440px)', display: 'flex', border: '1px solid var(--ln2)', borderRadius: 16, background: 'var(--card)', backdropFilter: 'blur(8px)', overflow: 'hidden', boxShadow: 'var(--sh2)' }}>
            <div style={{ flex: 1, minWidth: 0, padding: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* The card loops with the invoice workflow; this pauses both (WCAG 2.2.2). */}
              <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 500, letterSpacing: '-0.03em' }}><LogoMark size={11} />ferbert</span>
                <PlayPauseButton className="ctl-sm" paused={paused} onToggle={toggle} pressed={paused} label={paused ? common.play : common.pause} />
              </span>
              <span className="mono" style={{ color: 'var(--tx)', lineHeight: 1.5 }}>{hero.card}</span>
              <span className="mono" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 8px' }}>
                <span className="nw" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span className={paused ? undefined : 'live'} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--acc-tx)' }} />{workflow.name} ·</span>
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

        {loader !== 'off' ? (
          <div data-loader="" className={`loader${loader === 'leaving' ? ' out' : ''}`} aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'var(--frame)', display: 'grid', placeItems: 'center' }}>
            <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.03em' }}>ferbert</span>
                <span className="mono" style={{ fontVariantNumeric: 'tabular-nums' }}>{pct}%</span>
              </div>
              <div style={{ height: 2, background: 'var(--ln)' }}><div style={{ height: 2, width: `${pct}%`, background: 'var(--acc-tx)' }} /></div>
            </div>
          </div>
        ) : null}
      </FramePanel>
    </section>
  );
}
