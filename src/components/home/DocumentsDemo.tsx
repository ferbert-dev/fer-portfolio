'use client';

import { useState } from 'react';
import type { Dictionary } from '@/content';
import { Pill, ToggleChip } from '@/components/ui/Controls';
import { Section, SectionHead } from '@/components/ui/Layout';

export function DocumentsDemo({ knowledge }: { knowledge: Dictionary['home']['knowledge'] }) {
  const [q, setQ] = useState(0);
  const cur = knowledge.questions[q];
  const hits = new Set(cur.hits.map(([d, c]) => `${d}-${c}`));
  return (
    <Section id="knowledge" titleId="rag-title" fit>
      <SectionHead label={knowledge.label} title={knowledge.title} titleId="rag-title" width="15ch" titleClass="kb-title" lead={knowledge.lead} leadWidth="42ch" />
      <div className="panel lift kb" data-rv="">
        <div className="kb-col">
          <div className="mono kb-label">{knowledge.ask}</div>
          {knowledge.questions.map((item, i) => (
            <ToggleChip key={item.text} variant="choice" pressed={i === q} onClick={() => setQ(i)}>{item.text}</ToggleChip>
          ))}
        </div>
        <div className="kb-col">
          <div className="mono kb-label">{knowledge.found}</div>
          {knowledge.docs.map((d, di) => (
            <div key={d.name} className="kb-doc">
              <div className="kb-doc-name">
                <svg width="16" height="16" fill="none" strokeWidth="1.5" aria-hidden="true"><path d="M4 1.5h5.5L13 5v9.5H4z M9.5 1.5V5H13" /></svg>
                {d.name}
              </div>
              {d.chunks.map((c, ci) =>
                hits.has(`${di}-${ci}`) ? (
                  <div key={`${q}-${ci}`} className="bub kb-chunk hit">{c}</div>
                ) : (
                  <div key={ci} className="kb-chunk">{c}</div>
                ),
              )}
            </div>
          ))}
        </div>
        <div className="kb-col">
          <div className="mono kb-label">{knowledge.answer}</div>
          <div key={q} className="bub kb-answer" aria-live="polite">
            <p>{cur.answer}</p>
            <div className="pills">{cur.sources.map((s) => <Pill key={s} tone="onAccent">{s}</Pill>)}</div>
          </div>
          <span className="mono hint kb-note">{knowledge.note}</span>
        </div>
      </div>
    </Section>
  );
}
