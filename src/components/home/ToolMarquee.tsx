'use client';

import { useState } from 'react';
import type { Dictionary } from '@/content';
import { PauseIcon, PlayIcon } from '@/components/ui/icons';

export function ToolMarquee({ tools, common }: { tools: Dictionary['home']['tools']; common: Dictionary['common'] }) {
  const [paused, setPaused] = useState(false);
  const item = { padding: '0 clamp(28px, 4vw, 64px)' };
  return (
    <section aria-label={tools.label} className="wrap" style={{ paddingTop: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, margin: '0 0 8px' }}>
        <p className="mono" data-rv="" style={{ margin: 0 }}>{tools.lead}</p>
        <button type="button" className="mono qb mq-ctl" onClick={() => setPaused((p) => !p)} aria-label={paused ? tools.playLabel : tools.pauseLabel} style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, padding: '0 14px', borderRadius: 999, border: '1px solid var(--ln2)', background: 'transparent', color: 'var(--tx)' }}>
          {paused ? <PlayIcon /> : <PauseIcon />}
          {paused ? common.play : common.pause}
        </button>
      </div>
      <div className="mq-box" data-rv="" style={{ overflow: 'hidden', borderRadius: 10, background: 'var(--acc)' }}>
        <div className={`mq mono${paused ? ' stop' : ''}`} style={{ color: 'var(--on-acc)', padding: '14px 0' }}>
          {tools.list.map((t) => <span key={t} style={item}>{t}</span>)}
          {tools.list.map((t) => <span key={`d-${t}`} className="mq-dup" aria-hidden="true" style={item}>{t}</span>)}
        </div>
      </div>
    </section>
  );
}
