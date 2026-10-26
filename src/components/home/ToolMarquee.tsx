'use client';

import { useState } from 'react';
import type { Dictionary } from '@/content';
import { PlayPauseButton } from '@/components/ui/Controls';

export function ToolMarquee({ tools, common }: { tools: Dictionary['home']['tools']; common: Dictionary['common'] }) {
  const [paused, setPaused] = useState(false);
  const item = { padding: '0 clamp(28px, 4vw, 64px)' };
  return (
    <section aria-label={tools.label} style={{ paddingTop: 28 }}>
      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 8 }}>
        <p className="mono" data-rv="" style={{ margin: 0 }}>{tools.lead}</p>
        <PlayPauseButton className="mq-ctl" paused={paused} onToggle={() => setPaused((p) => !p)} ariaLabel={paused ? tools.playLabel : tools.pauseLabel} label={paused ? common.play : common.pause} />
      </div>
      <div className="mq-box" data-rv="" style={{ overflow: 'hidden', background: 'var(--acc)' }}>
        <div className={`mq mono${paused ? ' stop' : ''}`} style={{ color: 'var(--on-acc)', padding: '14px 0' }}>
          {tools.list.map((t) => <span key={t} style={item}>{t}</span>)}
          {tools.list.map((t) => <span key={`d-${t}`} className="mq-dup" aria-hidden="true" style={item}>{t}</span>)}
        </div>
      </div>
    </section>
  );
}
