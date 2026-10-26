import Link from 'next/link';
import { getDictionary } from '@/content';
import { ArrowTile } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/Heading';
import { Page } from '@/components/ui/Layout';

/** Not drawn in the design: uses the Legal page header layout. English, because the locale is unknown here. */
export default function NotFound() {
  const t = getDictionary('en').notFound;
  return (
    <Page style={{ minHeight: '50vh' }}>
      <SectionLabel reveal={false}>404</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 'clamp(28px, 4vw, 56px) 0' }}>
        <h1 className="lg">{t.title}</h1>
        <p className="sub" style={{ margin: 0, maxWidth: '46ch' }}>{t.lead}</p>
        <Link href="/" className="lnk mono" style={{ alignSelf: 'flex-start' }}>{t.home}<ArrowTile /></Link>
      </div>
    </Page>
  );
}
