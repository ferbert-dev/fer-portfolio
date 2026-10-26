import type { Dictionary } from '@/content';
import { ArrowLink } from '@/components/ui/Button';
import { Section, SectionHead } from '@/components/ui/Layout';
import { pad } from './format';
import { tag } from '@/lib/analytics';

type Home = Dictionary['home'];

export function Services({ services }: { services: Home['services'] }) {
  return (
    <Section id="services" titleId="sv-title">
      <SectionHead label={services.label} title={services.title} titleId="sv-title" width="14ch" lead={services.lead} leadWidth="40ch" below={48} />
      <ol className="list svc-list">
        {services.rows.map((s, i) => (
          <li key={s.title} className="svc row" data-rv="">
            <span className="svc-num" aria-hidden="true">{pad(i)}</span>
            <h3 className="md svc-title">{s.title}</h3>
            <div className="svc-body">
              <p className="sub svc-text">{s.body}</p>
              <ul className="list svc-tags" aria-label={services.includes}>
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {s.href && s.link ? <ArrowLink href={s.href} className="self-start" track={tag('nav_click', 'services', s.href)}>{s.link}</ArrowLink> : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
