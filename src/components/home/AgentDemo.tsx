'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/content';
import { MarkedText, SectionLabel } from '@/components/ui/Heading';
import { StrokeIcon } from '@/components/ui/icons';
import { agentIcons } from './icons';

const STEP_MS = 850;

export function AgentDemo({ agent, demo }: { agent: Dictionary['home']['agent']; demo: string }) {
  const [sc, setSc] = useState(-1);
  const [step, setStep] = useState(-1);
  const [answered, setAnswered] = useState(false);
  const timers = useRef<number[]>([]);
  const stepsBox = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // When the steps are taller than the panel (short screens), keep the running step in view
  // by scrolling the steps column only, never the page.
  useEffect(() => {
    const box = stepsBox.current;
    if (!box || box.scrollHeight <= box.clientHeight) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = box.querySelectorAll('.ag-list > li');
    const target = step <= 0 ? null : (items[Math.min(step, items.length - 1)] as HTMLElement | undefined);
    const top = target ? target.getBoundingClientRect().bottom - box.getBoundingClientRect().top + box.scrollTop - box.clientHeight + 24 : 0;
    box.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
  }, [step]);

  const busy = step >= 0 && !answered;
  const cur = sc >= 0 ? agent.scenarios[sc] : null;

  const ask = (i: number) => {
    if (busy) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setSc(i);
    setStep(0);
    setAnswered(false);
    for (let k = 1; k <= 6; k++) {
      timers.current.push(
        window.setTimeout(() => {
          setStep(k);
          if (k === 6) setAnswered(true);
        }, k * STEP_MS),
      );
    }
  };

  const timer = cur ? (answered ? agent.answeredIn : `${(step * 0.85).toFixed(1)} s`) : agent.waiting;

  return (
    <section id="demos" aria-labelledby="ag-title" className="wrap sec">
      <SectionLabel>{agent.label}</SectionLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, padding: '40px 0 36px' }}>
        <h2 id="ag-title" className="lg" data-rv="" style={{ maxWidth: '12ch' }}><MarkedText text={agent.title} /></h2>
        <p className="sub" data-rv="" style={{ margin: 0, maxWidth: '44ch' }}>{agent.lead}</p>
      </div>
      <div className="panel lift ag-panel" data-rv="" style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>
        <div ref={stepsBox} className="ag-steps" style={{ flex: '999 1 520px', minWidth: 0, padding: 'clamp(18px, 2.2vw, 28px)', backgroundImage: 'radial-gradient(var(--dot) 1px, transparent 1px)', backgroundSize: '22px 22px', borderRight: '1px solid var(--ln)' }}>
          <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
            <span style={{ color: 'var(--tx)' }}>{agent.inside}</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{timer}</span>
          </div>
          <ol className="ag-list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
            {agent.steps.map((s, i) => {
              const done = !!cur && step > i;
              const active = !!cur && step === i && !answered;
              const on = done || active;
              return (
                <li key={i} style={{ display: 'flex', gap: 14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 38px' }}>
                    <span className={`ag-ico${active ? ' act' : ''}`} style={{ width: 38, height: 38, borderRadius: 10, background: done ? 'var(--acc-tint)' : active ? 'var(--acc)' : 'var(--p2)', color: done ? 'var(--acc-tx)' : active ? 'var(--on-acc)' : 'var(--mut)', border: `1px solid ${done ? 'var(--acc-bd)' : active ? 'var(--acc)' : 'var(--ln3)'}`, display: 'grid', placeItems: 'center', transition: 'background .3s, color .3s, border-color .3s' }}>
                      <StrokeIcon d={agentIcons[i]} />
                    </span>
                    {i < agent.steps.length - 1 ? <span style={{ width: 1, flex: 1, minHeight: 14, background: done ? 'var(--acc-bd)' : 'var(--ln3)', transition: 'background .3s' }} /> : null}
                  </div>
                  <div style={{ flex: 1, minWidth: 0, padding: '7px 0 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                      <span className="ag-t" style={{ fontWeight: 500, fontSize: 16, color: on ? 'var(--tx)' : 'var(--sub)' }}>{s.title}</span>
                      <span className="mono" style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: on ? 'var(--acc-tint)' : 'var(--p3)', color: on ? 'var(--acc-tx)' : 'var(--sub)' }}>{s.tag}</span>
                    </div>
                    <div className="sub" style={{ fontSize: 14, minHeight: 20 }}>{done && cur ? cur.details[i] : active ? agent.working : ''}</div>
                    {done && cur && i === 2 && cur.rag.length ? (
                      <div className="bub" style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                        {cur.rag.map((r) => (
                          <div key={r.title} style={{ background: 'var(--p2)', border: '1px solid var(--ln3)', borderRadius: 10, padding: '10px 12px', fontSize: 13, lineHeight: 1.45 }}>
                            <div style={{ fontWeight: 500, marginBottom: 2, display: 'flex', justifyContent: 'space-between', gap: 8 }}><span>{r.title}</span><span className="mono" style={{ color: 'var(--acc-tx)' }}>{r.score}</span></div>
                            <div className="sub ag-rag-t">{r.text}</div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {done && cur && i === 3 ? (
                      <div className="bub" style={{ marginTop: 4, background: 'var(--p2)', border: '1px solid var(--ln3)', borderRadius: 10, overflow: 'hidden' }}>
                        <div className="mono" style={{ padding: '7px 12px', background: 'var(--p3)', borderBottom: '1px solid var(--ln3)' }}>{cur.dbTable}</div>
                        <table className="ag-db" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <tbody>
                            {cur.db.map(([k, v]) => (
                              <tr key={k}>
                                <th scope="row" className="sub" style={{ textAlign: 'left', fontWeight: 400, padding: '6px 12px', width: '40%', borderTop: '1px solid var(--ln)' }}>{k}</th>
                                <td style={{ padding: '6px 12px', borderTop: '1px solid var(--ln)', fontVariantNumeric: 'tabular-nums' }}>{v}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="ag-chat" style={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', background: 'var(--chat)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--ln)' }}>
            <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--inv)', color: 'var(--on-inv)', display: 'grid', placeItems: 'center', fontWeight: 600 }}>{agent.avatar}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500 }}>{agent.shop}</div>
              <div className="mono" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--acc-tx)' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--acc-tx)' }} />{agent.online}</div>
            </div>
            <span className="mono pill">{demo}</span>
          </div>
          <div className="ag-msgs" aria-live="polite" style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="bub" style={{ alignSelf: 'flex-start', maxWidth: '85%', padding: '10px 14px', borderRadius: '14px 14px 14px 4px', background: 'var(--p3)', fontSize: 15, lineHeight: 1.45 }}>{agent.greeting}</div>
            {cur ? (
              <div key={`q${sc}`} className="bub" style={{ alignSelf: 'flex-end', maxWidth: '85%', padding: '10px 14px', borderRadius: '14px 14px 4px 14px', background: 'var(--inv)', color: 'var(--on-inv)', fontSize: 15, lineHeight: 1.45 }}>{cur.ask}</div>
            ) : null}
            {busy ? (
              <div className="bub" role="img" aria-label={agent.thinking} style={{ alignSelf: 'flex-start', padding: '13px 14px', borderRadius: '14px 14px 14px 4px', background: 'var(--p3)', display: 'flex', gap: 5, alignItems: 'center' }}>
                <span className="td" /><span className="td" style={{ animationDelay: '.2s' }} /><span className="td" style={{ animationDelay: '.4s' }} />
              </div>
            ) : null}
            {answered && cur ? (
              <div key={`a${sc}`} className="bub" style={{ alignSelf: 'flex-start', maxWidth: '88%', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ padding: '10px 14px', borderRadius: '14px 14px 14px 4px', background: 'var(--p3)', fontSize: 15, lineHeight: 1.5 }}>{cur.answer}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{cur.sources.map((s) => <span key={s} className="mono pill" style={{ fontSize: 11 }}>{s}</span>)}</div>
              </div>
            ) : null}
          </div>
          <div style={{ padding: '14px 20px 18px', borderTop: '1px solid var(--ln)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div role="group" aria-label={agent.choose} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {agent.scenarios.map((s, i) => (
                <button key={s.ask} type="button" className="qb" onClick={() => ask(i)} disabled={busy} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: '1px solid var(--ln2)', background: 'transparent', font: 'inherit', fontSize: 14, color: 'var(--tx)' }}>{s.ask}</button>
              ))}
            </div>
            <div className="mono" style={{ letterSpacing: '.04em' }}>{agent.hint}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
