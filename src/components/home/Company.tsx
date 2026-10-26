import type { Dictionary } from '@/content';
import { Heading, SectionLabel } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Layout';

type Home = Dictionary['home'];

export function Company({ company }: { company: Home['company'] }) {
  return (
    <Section id="company" titleId="co-title">
      <SectionLabel>{company.label}</SectionLabel>
      <div className="split co-split">
        <Heading id="co-title" text={company.title} width="11ch" className="co-half" />
        <div className="co-half">
          <p className="md co-p" data-rv="">{company.lead} <span className="sub">{company.body}</span></p>
        </div>
      </div>
    </Section>
  );
}
