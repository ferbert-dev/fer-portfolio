import type { Dictionary } from '@/content';
import { PrimaryButton } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Controls';
import { Heading, Lead, SectionLabel } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Layout';
import { pad } from './format';
import { tag } from '@/lib/analytics';

const levelTone = { high: 'good', medium: 'warn', low: 'muted' } as const;

export function Analysis({ analysis, cta, contactHref }: { analysis: Dictionary['home']['analysis']; cta: string; contactHref: string }) {
  const r = analysis.report;
  const max = Math.max(...r.rows.map((row) => row.before));
  return (
    <Section id="analysis" titleId="an-title">
      <SectionLabel>{analysis.label}</SectionLabel>
      <div className="split an-split">
        <div className="an-copy">
          <Heading id="an-title" text={analysis.title} width="11ch" />
          <Lead width="46ch">{analysis.lead}</Lead>
          <ul className="list an-list" data-rv="">
            {analysis.deliverables.map((d, i) => (
              <li key={i}>
                <span className="mono an-num">{pad(i)}</span><span>{d}</span>
              </li>
            ))}
          </ul>
          <PrimaryButton href={contactHref} label={cta} reveal className="self-start" track={tag('cta_click', 'analysis', 'book-call')} />
        </div>
        <figure className="panel lift an-report" data-rv="" style={{ ['--dl' as string]: '.1s' }}>
          <div className="rep-head">
            <div className="rep-title">{r.title}</div>
            <div className="mono">{r.note}</div>
          </div>
          <div className="rep">
            <div className="mono rep-key">{r.phoneKey}</div>
            <table>
              <thead>
                <tr className="mono">
                  <th scope="col">{r.cols.process}</th>
                  <th scope="col">{r.cols.hours}</th>
                  <th scope="col">{r.cols.potential}</th>
                </tr>
              </thead>
              <tbody>
                {r.rows.map((row, i) => (
                  <tr key={row.name}>
                    <th scope="row">{row.name}</th>
                    <td>
                      <div className="rep-bars">
                        <div className="rep-bar">
                          <span className="bar" style={{ animationDelay: `${0.2 + i * 0.12}s`, ['--w' as string]: `${Math.round((row.before / max) * 100)}%` }} />
                          <span className="mono hrs">{row.before} {r.unit}</span>
                        </div>
                        <div className="rep-bar after">
                          <span className="bar" style={{ animationDelay: `${0.5 + i * 0.12}s`, ['--w' as string]: `${Math.max(3, Math.round((row.after / max) * 100))}%` }} />
                          <span className="mono hrs">{row.after} {r.unit}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Pill tone={levelTone[row.potential as keyof typeof levelTone]}>{r.levels[row.potential as keyof typeof r.levels]}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">{r.total}</th>
                  <td>
                    {r.totalValue.before} → <span className="c-acc">{r.totalValue.after}</span> {r.totalValue.unit}
                  </td>
                  <td>{r.saved}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </figure>
      </div>
    </Section>
  );
}
