import Link from 'next/link';
import { getDictionary } from '@/content';
import { ArrowTile } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/Heading';
import { Page } from '@/components/ui/Layout';

/** Not drawn in the design: uses the Legal page header layout. English, because the locale is unknown here. */
export default function NotFound() {
  const t = getDictionary('en').notFound;
  return (
    <Page className="nf">
      <SectionLabel reveal={false}>404</SectionLabel>
      <div className="nf-body">
        <h1 className="lg">{t.title}</h1>
        <p className="sub">{t.lead}</p>
        <Link href="/" className="lnk mono self-start">{t.home}<ArrowTile /></Link>
      </div>
    </Page>
  );
}
