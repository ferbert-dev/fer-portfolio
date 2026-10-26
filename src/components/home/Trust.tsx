import type { Dictionary } from '@/content';
import { ArrowLink } from '@/components/ui/Button';
import { Heading, Lead, SectionLabel } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Layout';
import { CardGrid } from '@/components/ui/Lists';
import { StrokeIcon } from '@/components/ui/icons';
import { trustIcons } from './icons';
import { tag } from '@/lib/analytics';

type Home = Dictionary['home'];

export function Trust({ trust, legalHref }: { trust: Home['trust']; legalHref: string }) {
  return (
    <Section id="trust" titleId="tr-title">
      <SectionLabel>{trust.label}</SectionLabel>
      <div className="split">
        <div className="tr-copy">
          <Heading id="tr-title" text={trust.title} width="10ch" />
          <Lead width="40ch">{trust.lead}</Lead>
          <ArrowLink href={legalHref} reveal className="self-start" track={tag('nav_click', 'trust', 'privacy')}>{trust.link}</ArrowLink>
        </div>
        <CardGrid min={260} className="tr-cards">
          {trust.items.map((t, i) => (
            <li key={t.title} className="panel tc" data-rv="" style={{ ['--dl' as string]: `${i * 0.07}s` }}>
              <span className="tc-ico"><StrokeIcon d={trustIcons[i]} size={20} stroke={1.5} /></span>
              <span className="tc-title">{t.title}</span>
              <span className="sub tc-body">{t.body}</span>
            </li>
          ))}
        </CardGrid>
      </div>
    </Section>
  );
}
