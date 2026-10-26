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
const LOAD_MS = 250;
const LEAVE_MS = 150;

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
      }, 0));
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
    <section aria-label={hero.label} className="hero-sec">
      <FramePanel className="hero" glow="radial-gradient(80% 90% at 78% 30%, var(--glow) 0%, transparent 62%)">
        <svg aria-hidden="true" width="100%" height="100%" className="hero-grain">
          <filter id="d-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          <rect width="100%" height="100%" filter="url(#d-grain)" />
        </svg>

        <div className="rail mono" aria-hidden="true">
          <span className="rail-ticks" />
          <span className="rail-txt rail-status">
            {hero.railStatus}: <span className="c-acc">{wf >= 6 ? workflow.railStatus.idle : workflow.railStatus.running}</span>
          </span>
          <span className="rail-txt">{hero.railPlace}</span>
        </div>

        <div className="hero-body">
          <div className="hero-top">
            <span className="mono" data-rv="" style={{ ['--dl' as string]: '.05s' }}>{hero.label}</span>
            <span className="hero-dots" aria-hidden="true"><span /><span /><span /></span>
          </div>
          <h1 className={`xl hero-h${intro === 'set' ? ' intro' : ''}${intro === 'go' ? ' intro go' : ''}`} aria-label={full} style={{ ['--words' as string]: head.length + 1 + tail.length }}>
            <span aria-hidden="true">
              {head.map((w, i) => word(w, `h${i}`))}
              {word(<span className="nw"><span className="mk">{t.mark}</span>{after[1]}</span>, 'mark')}
              {tail.map((w, i) => word(w, `t${i}`))}
            </span>
          </h1>
          <p className="sub hero-lead" data-rv="" style={{ ['--dl' as string]: '.95s' }}>{hero.lead}</p>
          <div className="hero-ctas" data-rv="" style={{ ['--dl' as string]: '1.15s' }}>
            <PrimaryButton href={contactHref} label={common.cta} />
            <OutlineButton href="#demos">{hero.secondary}</OutlineButton>
          </div>
          <p className="mono hero-note" data-rv="" style={{ ['--dl' as string]: '1.3s' }}>{common.ctaNote}</p>

          <div className="hero-card" data-rv="" style={{ ['--dl' as string]: '1.55s' }}>
            <div className="hc-main">
              {/* The card loops with the invoice workflow; this pauses both (WCAG 2.2.2). */}
              <span className="hc-head">
                <span className="hc-brand"><LogoMark size={11} />ferbert</span>
                <PlayPauseButton className="ctl-sm" paused={paused} onToggle={toggle} pressed={paused} label={paused ? common.play : common.pause} />
              </span>
              <span className="mono hc-text">{hero.card}</span>
              <span className="mono hc-status">
                <span className="nw hc-run"><span className={`hc-dot${paused ? '' : ' live'}`} />{workflow.name} ·</span>
                <span className="nw">{short}</span>
              </span>
            </div>
            <ol className="hc-steps" aria-hidden="true">
              {workflow.nodes.map((n, i) => {
                const { done, active } = nodeState(wf, i);
                return (
                  <li key={i} className="mono" data-lit={done || active || undefined}>
                    <span className="hc-sq" />
                    {n.short}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {loader !== 'off' ? (
          <div data-loader="" className={`loader${loader === 'leaving' ? ' out' : ''}`} aria-hidden="true">
            <div className="ldr-box">
              <div className="ldr-row">
                <span className="ldr-name">ferbert</span>
                <span className="mono num">{pct}%</span>
              </div>
              <div className="ldr-bar"><div className="ldr-fill" style={{ ['--pct' as string]: `${pct}%` }} /></div>
            </div>
          </div>
        ) : null}
      </FramePanel>
    </section>
  );
}
