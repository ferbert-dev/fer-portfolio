import type { Dictionary } from '@/content';
import { PrimaryButton } from '@/components/ui/Button';
import { MarkedText, SectionLabel } from '@/components/ui/Heading';

const pad = (i: number) => String(i + 1).padStart(2, '0');
const levelStyle = {
  high: { borderColor: 'var(--acc-bd)', color: 'var(--acc-tx)' },
  medium: { borderColor: 'var(--warn-bd)', color: 'var(--warn-tx)' },
  low: { borderColor: 'var(--ln2)', color: 'var(--sub)' },
} as const;

export function Analysis({ analysis, cta, contactHref }: { analysis: Dictionary['home']['analysis']; cta: string; contactHref: string }) {
  const r = analysis.report;
  const max = Math.max(...r.rows.map((row) => row.before));
  const mono = { letterSpacing: 0, textTransform: 'none' as const };
  return (
    <section id="analysis" aria-labelledby="an-title" className="wrap sec">
      <SectionLabel>{analysis.label}</SectionLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px 24px', paddingTop: 40, alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h2 id="an-title" className="lg" data-rv="" style={{ maxWidth: '11ch' }}><MarkedText text={analysis.title} /></h2>
          <p className="sub" data-rv="" style={{ margin: 0, maxWidth: '46ch' }}>{analysis.lead}</p>
          <ul data-rv="" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', maxWidth: '52ch' }}>
            {analysis.deliverables.map((d, i) => (
              <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 0', borderTop: '1px solid var(--ln)' }}>
                <span className="mono" style={{ flex: '0 0 22px', color: 'var(--acc-tx)', paddingTop: 3 }}>{pad(i)}</span><span>{d}</span>
              </li>
            ))}
          </ul>
          <PrimaryButton href={contactHref} label={cta} reveal style={{ alignSelf: 'flex-start' }} />
        </div>
        <figure className="panel lift" data-rv="" style={{ ['--dl' as string]: '.1s', flex: '1 1 520px', minWidth: 0, margin: 0, padding: 'clamp(18px, 2.2vw, 28px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginBottom: 22 }}>
            <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em' }}>{r.title}</div>
            <div className="mono">{r.note}</div>
          </div>
          <div className="rep" style={{ overflowX: 'auto' }}>
            <div className="mono rep-key">{r.phoneKey}</div>
            <table style={{ width: '100%', minWidth: 440, borderCollapse: 'collapse', fontSize: 15 }}>
              <thead>
                <tr className="mono" style={{ textAlign: 'left' }}>
                  <th scope="col" style={{ fontWeight: 500, padding: '0 0 12px' }}>{r.cols.process}</th>
                  <th scope="col" style={{ fontWeight: 500, padding: '0 0 12px', width: '46%' }}>{r.cols.hours}</th>
                  <th scope="col" style={{ fontWeight: 500, padding: '0 0 12px', textAlign: 'right' }}>{r.cols.potential}</th>
                </tr>
              </thead>
              <tbody>
                {r.rows.map((row, i) => (
                  <tr key={row.name} style={{ borderTop: '1px solid var(--ln)' }}>
                    <th scope="row" style={{ textAlign: 'left', fontWeight: 400, padding: '14px 12px 14px 0' }}>{row.name}</th>
                    <td style={{ padding: '14px 12px 14px 0' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span className="bar" style={{ animationDelay: `${0.2 + i * 0.12}s`, height: 6, width: `${Math.round((row.before / max) * 100)}%`, background: 'var(--bar)' }} />
                          <span className="mono hrs" style={mono}>{row.before} {r.unit}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span className="bar" style={{ animationDelay: `${0.5 + i * 0.12}s`, height: 6, width: `${Math.max(3, Math.round((row.after / max) * 100))}%`, background: 'var(--acc-tx)' }} />
                          <span className="mono hrs" style={{ ...mono, color: 'var(--acc-tx)' }}>{row.after} {r.unit}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 0', textAlign: 'right' }}>
                      <span className="mono pill" style={levelStyle[row.potential as keyof typeof levelStyle]}>{r.levels[row.potential as keyof typeof r.levels]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: '1px solid var(--tx)' }}>
                  <th scope="row" style={{ textAlign: 'left', padding: '16px 12px 0 0', fontWeight: 500 }}>{r.total}</th>
                  <td style={{ padding: '16px 12px 0 0', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                    {r.totalValue.before} → <span style={{ color: 'var(--acc-tx)' }}>{r.totalValue.after}</span> {r.totalValue.unit}
                  </td>
                  <td style={{ padding: '16px 0 0', textAlign: 'right', fontWeight: 500, color: 'var(--acc-tx)' }}>{r.saved}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </figure>
      </div>
    </section>
  );
}
