import Link from 'next/link';
import { getDictionary } from '@/content';
import { Chevron } from '@/components/ui/icons';

/** Not drawn in the design: uses the Legal page header layout. English, because the locale is unknown here. */
export default function NotFound() {
  const t = getDictionary('en').notFound;
  return (
    <div className="wrap" style={{ paddingTop: 'clamp(56px, 7vw, 104px)', paddingBottom: 'clamp(56px, 7vw, 104px)', minHeight: '50vh' }}>
      <div className="mono lab">404</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 'clamp(28px, 4vw, 56px) 0' }}>
        <h1 className="lg">{t.title}</h1>
        <p className="sub" style={{ margin: 0, maxWidth: '46ch' }}>{t.lead}</p>
        <Link href="/" className="lnk mono" style={{ alignSelf: 'flex-start' }}>{t.home}<span className="lnk-t"><Chevron /></span></Link>
      </div>
    </div>
  );
}
