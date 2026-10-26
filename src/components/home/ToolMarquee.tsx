'use client';

import { useState } from 'react';
import type { Dictionary } from '@/content';
import { PlayPauseButton } from '@/components/ui/Controls';

export function ToolMarquee({ tools, common }: { tools: Dictionary['home']['tools']; common: Dictionary['common'] }) {
  const [paused, setPaused] = useState(false);
  return (
    <section aria-label={tools.label} className="tools" data-section="tools">
      <div className="wrap tools-bar">
        <p className="mono tools-lead" data-rv="">{tools.lead}</p>
        <PlayPauseButton className="mq-ctl" paused={paused} onToggle={() => setPaused((p) => !p)} ariaLabel={paused ? tools.playLabel : tools.pauseLabel} label={paused ? common.play : common.pause} />
      </div>
      <div className="mq-box" data-rv="">
        <div className={`mq mono${paused ? ' stop' : ''}`}>
          {tools.list.map((t) => <span key={t}>{t}</span>)}
          {tools.list.map((t) => <span key={`d-${t}`} className="mq-dup" aria-hidden="true">{t}</span>)}
        </div>
      </div>
    </section>
  );
}
