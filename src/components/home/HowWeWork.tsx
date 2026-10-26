import type { Dictionary } from '@/content';
import { Heading, Lead, SectionLabel } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Layout';
import { pad } from './format';

type Home = Dictionary['home'];

function HowStep({ i, step, delay }: { i: number; step: Home['how']['steps'][number]; delay?: string }) {
  return (
    <li className="how-step" data-rv="" style={delay ? { ['--dl' as string]: delay } : undefined}>
      <span className="mono">{pad(i)}.</span>
      <h3 className="md">{step.title}</h3>
      <p className="sub">{step.body}</p>
    </li>
  );
}

export function HowWeWork({ how }: { how: Home['how'] }) {
  const [a, b, c] = how.cadence;
  const slash = <span className="sub" aria-hidden="true">/</span>;
  return (
    <Section id="how" titleId="how-title">
      <SectionLabel>{how.label}</SectionLabel>
      <Heading id="how-title" text={how.title} width="14ch" className="how-title" />
      <div className="cadence">
        {/* Each value rises from its own mask, like the headings; the slash stays with the value before it. */}
        <h3 className="lg cadence-line" data-rv="" aria-label={how.cadenceLabel}>
          <span className="wd" style={{ ['--words' as string]: 3 }}>
            <span className="w"><span style={{ ['--i' as string]: 0 }}><span className="nw">{a}</span>&nbsp;{slash}</span></span>{' '}
            <span className="w"><span style={{ ['--i' as string]: 1 }}><span className="nw">{b}</span>&nbsp;{slash}</span></span>{' '}
            <span className="w"><span style={{ ['--i' as string]: 2 }}><span className="nw">{c}</span></span></span>
          </span>
        </h3>
        <Lead width="38ch" style={{ ['--dl' as string]: '.35s' }}>{how.cadenceLead}</Lead>
      </div>
      <ol className="how">
        <HowStep i={0} step={how.steps[0]} />
        <li className="how-x" aria-hidden="true" data-rv="" style={{ ['--dl' as string]: '.08s' }}>
          <div className="tile"><svg width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 5v24M5 17h24M9 9l16 16M25 9L9 25" /></svg></div>
        </li>
        <HowStep i={1} step={how.steps[1]} delay=".16s" />
        <li className="how-x" aria-hidden="true" />
        <li className="how-x" aria-hidden="true" />
        <HowStep i={2} step={how.steps[2]} />
        <li className="how-x" aria-hidden="true" data-rv="" style={{ ['--dl' as string]: '.08s' }}>
          <div className="tile"><svg width="38" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l8 12 8-12 8 12 8-12" /></svg></div>
        </li>
        <HowStep i={3} step={how.steps[3]} delay=".16s" />
      </ol>
    </Section>
  );
}
