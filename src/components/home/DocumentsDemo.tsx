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
    <Section id="knowledge" titleId="rag-title">
      <SectionHead label={knowledge.label} title={knowledge.title} titleId="rag-title" width="15ch" titleStyle={{ fontSize: 'clamp(34px, 4.2vw, 60px)' }} lead={knowledge.lead} leadWidth="42ch" />
      <div className="panel lift kb" data-rv="" style={{ padding: 'clamp(18px, 2.2vw, 28px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="mono" style={{ marginBottom: 4 }}>{knowledge.ask}</div>
          {knowledge.questions.map((item, i) => (
            <ToggleChip key={item.text} variant="choice" pressed={i === q} onClick={() => setQ(i)}>{item.text}</ToggleChip>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="mono" style={{ marginBottom: 4 }}>{knowledge.found}</div>
          {knowledge.docs.map((d, di) => (
            <div key={d.name} style={{ padding: '12px 0 4px', borderTop: '1px solid var(--ln)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
                <svg width="16" height="16" fill="none" style={{ stroke: 'var(--sub)' }} strokeWidth="1.5" aria-hidden="true"><path d="M4 1.5h5.5L13 5v9.5H4z M9.5 1.5V5H13" /></svg>
                {d.name}
              </div>
              {d.chunks.map((c, ci) =>
                hits.has(`${di}-${ci}`) ? (
                  <div key={`${q}-${ci}`} className="bub" style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--tx)', padding: '6px 8px', borderRadius: 6, marginBottom: 4, background: 'var(--acc-tint)', outline: '1px solid var(--acc-bd)' }}>{c}</div>
                ) : (
                  <div key={ci} style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--mut)', padding: '6px 8px', marginBottom: 4 }}>{c}</div>
                ),
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="mono" style={{ marginBottom: 4 }}>{knowledge.answer}</div>
          <div key={q} className="bub" aria-live="polite" style={{ borderRadius: 14, background: 'var(--acc)', color: 'var(--on-acc)', padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.45, letterSpacing: '-0.015em' }}>{cur.answer}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{cur.sources.map((s) => <Pill key={s} tone="onAccent">{s}</Pill>)}</div>
          </div>
          <span className="mono" style={{ marginTop: 'auto', letterSpacing: '.04em' }}>{knowledge.note}</span>
        </div>
      </div>
    </Section>
  );
}
