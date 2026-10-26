import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { getDictionary } from '@/content';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { themeScript } from '@/components/layout/theme';
import NotFound from './[locale]/not-found';
import './globals.css';
import '@/styles/chrome.css';
import '@/styles/home.css';
import '@/styles/pages.css';

/**
 * 404 for URLs that match no route. Next renders it without the [locale]
 * layout, so it brings its own <html lang>, fonts, theme script, header and
 * footer. English, because the locale is unknown here.
 */
const t = getDictionary('en');

export const metadata: Metadata = { title: t.notFound.title, robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="auto" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">{t.common.skip}</a>
        <Header locale="en" header={t.header} nav={t.nav} cta={t.common.cta} />
        <main id="main" tabIndex={-1}><NotFound /></main>
        <Footer locale="en" footer={t.footer} />
      </body>
    </html>
  );
}
