import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { getDictionary, locales } from '@/content';
import { isLocale } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Tracker } from '@/components/layout/Tracker';
import { Analytics } from '@vercel/analytics/next';
import { Motion } from '@/components/layout/Motion';
import { themeScript } from '@/components/layout/theme';
import '../globals.css';
import '@/styles/chrome.css';
import '@/styles/home.css';
import '@/styles/pages.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ferbert.vercel.app'),
    title: t.meta.title,
    description: t.meta.description,
    // German is hidden until it is translated (decision 17): no hreflang links, and /de stays out of search.
    robots: locale === 'de' ? { index: false, follow: false } : undefined,
    icons: { icon: '/icon.svg' },
    openGraph: { title: t.meta.title, description: t.meta.description, type: 'website', siteName: 'Ferbert' },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html lang={locale} data-theme="auto" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">{t.common.skip}</a>
        <Header locale={locale} header={t.header} nav={t.nav} cta={t.common.cta} />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer locale={locale} footer={t.footer} />
        <Motion />
        <Analytics />
        <Tracker />
      </body>
    </html>
  );
}
