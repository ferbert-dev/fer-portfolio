import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/content';
import { isLocale } from '@/lib/i18n';
import { MarkedText } from '@/components/ui/Heading';
import { BlogList } from '@/components/blog/BlogList';

export async function generateMetadata({ params }: PageProps<'/[locale]/blog'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).blog.metaTitle, alternates: { languages: { en: '/blog', de: '/de/blog' } } };
}

export default async function BlogPage({ params }: PageProps<'/[locale]/blog'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const blog = getDictionary(locale).blog;
  return (
    <div className="wrap" style={{ paddingTop: 'clamp(56px, 7vw, 104px)', paddingBottom: 'clamp(56px, 7vw, 104px)' }}>
      <div className="mono lab">{blog.label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px 48px', padding: 'clamp(28px, 4vw, 56px) 0 clamp(36px, 4.5vw, 56px)' }}>
        <h1 className="xl" style={{ maxWidth: '12ch' }}><MarkedText text={blog.title} /></h1>
        <p className="sub" style={{ margin: 0, maxWidth: 420, fontSize: 17 }}>{blog.lead}</p>
      </div>
      <BlogList blog={blog} />
    </div>
  );
}
