import type { Dictionary } from '@/content';
import { site } from '@/content';
import { ArrowLink, PrimaryButton } from '@/components/ui/Button';
import { Heading, Lead } from '@/components/ui/Heading';
import { FramePanel } from '@/components/ui/Layout';
import { LogoMark } from '@/components/ui/icons';
import { tag } from '@/lib/analytics';

type Home = Dictionary['home'];

export function Closing({ closing, cta, write, contactHref }: { closing: Home['closing']; cta: string; write: string; contactHref: string }) {
  return (
    <section aria-labelledby="cta-title" className="sec closing" data-section="closing">
      <FramePanel glow="radial-gradient(70% 90% at 50% 0%, var(--glow) 0%, transparent 65%)" className="closing-panel">
        <span className="mono" data-rv="">{closing.label}</span>
        <Heading id="cta-title" text={closing.title} size="xl" width="14ch" />
        <span className="closing-rule" aria-hidden="true" />
        <Lead width="46ch">{closing.lead}</Lead>
        <div className="closing-pair" data-rv="" aria-hidden="true">
          <span className="closing-logo"><LogoMark size={34} /></span>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 0v16M0 8h16" /></svg>
          <span className="mono closing-you">{closing.you}</span>
        </div>
        <div className="closing-ctas" data-rv="">
          <PrimaryButton href={contactHref} label={cta} track={tag('cta_click', 'closing', 'book-call')} />
          <ArrowLink href={`mailto:${site.email}`} track={tag('email_click', 'closing')}>{write}</ArrowLink>
        </div>
      </FramePanel>
    </section>
  );
}
