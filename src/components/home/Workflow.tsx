'use client';

import type { Dictionary } from '@/content';
import { PlayPauseButton } from '@/components/ui/Controls';
import { StrokeIcon } from '@/components/ui/icons';
import { Section, SectionHead } from '@/components/ui/Layout';
import { workflowIcons } from './icons';
import { nodeState, useWorkflow } from './WorkflowState';

export function Workflow({ workflow, common }: { workflow: Dictionary['home']['workflow']; common: Dictionary['common'] }) {
  const { wf, paused, toggle } = useWorkflow();
  const status = wf >= 6 ? workflow.status.done : wf === 0 ? workflow.status.arriving : workflow.status.running;
  const logs = workflow.logs.filter((_, i) => wf > i + 1 || wf >= 6);

  return (
    <Section id="workflow" titleId="wf-title">
      <SectionHead label={workflow.label} title={workflow.title} titleId="wf-title" width="13ch" lead={workflow.lead} leadWidth="40ch" />
      <div className="panel lift dots" data-rv="" style={{ padding: 'clamp(18px, 2.4vw, 32px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div className="mono" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--tx)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: wf >= 6 ? 'var(--mut)' : 'var(--acc-tx)' }} />
            {workflow.name} <span style={{ color: 'var(--sub)' }}>{status}</span>
          </div>
          <PlayPauseButton paused={paused} onToggle={toggle} pressed={paused} label={paused ? common.play : common.pause} />
        </div>
        <ol className="wf-grid">
          {workflow.nodes.map((n, i) => {
            const { done, active } = nodeState(wf, i);
            const lit = done || active;
            return (
              <li key={i} style={{ display: 'flex', alignItems: 'stretch' }}>
                <div className="wf-card" style={{ flex: 1, minWidth: 0, background: 'var(--p2)', border: `1px solid ${lit ? 'var(--acc-tx)' : 'var(--ln3)'}`, boxShadow: active ? '0 0 0 4px var(--acc-tint), var(--sh1)' : '0 0 0 0 var(--acc-tint), var(--sh1)', borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, transition: 'border-color .35s cubic-bezier(.16,1,.3,1), box-shadow .35s cubic-bezier(.16,1,.3,1)' }}>
                  <div className="wf-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--p3)', color: lit ? 'var(--acc-tx)' : 'var(--mut)', display: 'grid', placeItems: 'center', transition: 'color .3s' }}><StrokeIcon d={workflowIcons[i]} /></span>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: done ? 'var(--acc)' : 'var(--p3)', display: 'grid', placeItems: 'center', transition: 'background .3s' }}>
                      <svg width="11" height="11" fill="none" style={{ stroke: 'var(--on-acc)' }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.2 5.8l2.2 2.2L8.8 3.2" /></svg>
                    </span>
                  </div>
                  <div className="mono">{n.kind}</div>
                  <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.25 }}>{n.title}</div>
                  <div className="sub" style={{ fontSize: 13, lineHeight: 1.4 }}>{n.detail}</div>
                </div>
                {i < workflow.nodes.length - 1 ? <span className="wf-link" aria-hidden="true" style={{ alignSelf: 'center', flex: '0 0 22px', height: 1, background: done ? 'var(--acc-tx)' : 'var(--ln3)', transition: 'background .35s' }} /> : null}
              </li>
            );
          })}
        </ol>
        <ol className="mono wf-log" aria-label={workflow.logLabel} style={{ listStyle: 'none', margin: '24px 0 0', padding: '16px 0 0', borderTop: '1px solid var(--ln)', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 124, textTransform: 'none', letterSpacing: 0, fontSize: 12, color: 'var(--log)' }}>
          {logs.map((l) => (
            <li key={l.t + l.msg} className="bub" style={{ display: 'flex', gap: 14 }}><span style={{ color: 'var(--mut)' }}>{l.t}</span><span>{l.msg}</span></li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
