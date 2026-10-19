import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/content';
import { isLocale } from '@/lib/i18n';
import { Page, PageHeader, PageLead } from '@/components/ui/Layout';
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
    <Page>
      <PageHeader label={blog.label} title={blog.title} width="12ch" tight>
        <PageLead>{blog.lead}</PageLead>
      </PageHeader>
      <BlogList blog={blog} />
    </Page>
  );
}
