'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/content';
import { Pill } from '@/components/ui/Controls';
import { Section, SectionHead } from '@/components/ui/Layout';
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
    <Section id="demos" titleId="ag-title" fit>
      <SectionHead label={agent.label} title={agent.title} titleId="ag-title" width="12ch" lead={agent.lead} leadWidth="44ch" />
      <div className="panel lift ag-panel" data-rv="">
        {/* Focusable so keyboard users can scroll it when a run is taller than the panel. Question buttons use aria-disabled, not disabled, so focus stays on them during a run. */}
        <div ref={stepsBox} className="ag-steps dots" tabIndex={0} role="region" aria-label={agent.inside}>
          <div className="mono ag-bar">
            <span className="c-tx">{agent.inside}</span>
            <span className="num">{timer}</span>
          </div>
          <ol className="list ag-list">
            {agent.steps.map((s, i) => {
              const done = !!cur && step > i;
              const active = !!cur && step === i && !answered;
              return (
                <li key={i} data-state={done ? 'done' : active ? 'active' : undefined}>
                  <div className="ag-track">
                    <span className={`ag-ico${active ? ' act' : ''}`}>
                      <StrokeIcon d={agentIcons[i]} />
                    </span>
                    {i < agent.steps.length - 1 ? <span className="ag-line" /> : null}
                  </div>
                  <div className="ag-body">
                    <div className="ag-head">
                      <span className="ag-t">{s.title}</span>
                      <span className="mono ag-tag">{s.tag}</span>
                    </div>
                    <div className="sub ag-detail">{done && cur ? cur.details[i] : active ? agent.working : ''}</div>
                    {done && cur && i === 2 && cur.rag.length ? (
                      <div className="bub ag-rag">
                        {cur.rag.map((r) => (
                          <div key={r.title} className="ag-card">
                            <div className="ag-rag-h"><span>{r.title}</span><span className="mono c-acc">{r.score}</span></div>
                            <div className="sub ag-rag-t">{r.text}</div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {done && cur && i === 3 ? (
                      <div className="bub ag-card ag-db-box">
                        <div className="mono ag-db-h">{cur.dbTable}</div>
                        <table className="ag-db">
                          <tbody>
                            {cur.db.map(([k, v]) => (
                              <tr key={k}>
                                <th scope="row" className="sub">{k}</th>
                                <td>{v}</td>
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
        <div className="ag-chat">
          <div className="ag-top">
            <span className="ag-avatar">{agent.avatar}</span>
            <div className="ag-who">
              <div className="ag-shop">{agent.shop}</div>
              <div className="mono ag-online">{agent.online}</div>
            </div>
            <Pill>{demo}</Pill>
          </div>
          <div className="ag-msgs" aria-live="polite">
            <div className="bub msg msg-in">{agent.greeting}</div>
            {cur ? <div key={`q${sc}`} className="bub msg msg-out">{cur.ask}</div> : null}
            {busy ? (
              <div className="bub msg-typing" role="img" aria-label={agent.thinking}>
                <span className="td" /><span className="td" /><span className="td" />
              </div>
            ) : null}
            {answered && cur ? (
              <div key={`a${sc}`} className="bub msg-answer">
                <div className="msg msg-in">{cur.answer}</div>
                <div className="pills">{cur.sources.map((s) => <Pill key={s}>{s}</Pill>)}</div>
              </div>
            ) : null}
          </div>
          <div className="ag-foot">
            <div className="ag-qs" role="group" aria-label={agent.choose}>
              {agent.scenarios.map((s, i) => (
                <button key={s.ask} type="button" className="qb ag-q" onClick={() => ask(i)} aria-disabled={busy}>{s.ask}</button>
              ))}
            </div>
            <div className="mono hint">{agent.hint}</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
