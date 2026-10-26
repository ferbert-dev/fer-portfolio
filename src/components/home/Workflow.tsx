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
      <div className="panel lift dots wf-panel" data-rv="">
        <div className="wf-bar">
          <div className="mono wf-name" data-done={wf >= 6 || undefined}>
            <span className="wf-dot" />
            {workflow.name} <span className="sub">{status}</span>
          </div>
          <PlayPauseButton paused={paused} onToggle={toggle} pressed={paused} label={paused ? common.play : common.pause} />
        </div>
        <ol className="wf-grid">
          {workflow.nodes.map((n, i) => {
            const { done, active } = nodeState(wf, i);
            return (
              <li key={i} data-state={done ? 'done' : active ? 'active' : undefined}>
                <div className="wf-card">
                  <div className="wf-top">
                    <span className="wf-ico"><StrokeIcon d={workflowIcons[i]} /></span>
                    <span className="wf-check">
                      <svg width="11" height="11" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.2 5.8l2.2 2.2L8.8 3.2" /></svg>
                    </span>
                  </div>
                  <div className="mono">{n.kind}</div>
                  <div className="wf-title">{n.title}</div>
                  <div className="sub wf-detail">{n.detail}</div>
                </div>
                {i < workflow.nodes.length - 1 ? <span className="wf-link" aria-hidden="true" /> : null}
              </li>
            );
          })}
        </ol>
        <ol className="list mono wf-log" aria-label={workflow.logLabel}>
          {logs.map((l) => (
            <li key={l.t + l.msg} className="bub"><span className="wf-time">{l.t}</span><span>{l.msg}</span></li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
