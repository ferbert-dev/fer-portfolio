import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';
// Vercel's toolbar (preview comments) runs on preview deployments only; its sources follow
// https://vercel.com/docs/vercel-toolbar/managing-toolbar.
const isPreview = process.env.VERCEL_ENV === 'preview';
const toolbar = isPreview ? ' https://vercel.live' : '';

/*
 * Content Security Policy. The site is prerendered, so per-request nonces are not available:
 * Next.js inlines its page data and the theme script (src/components/layout/theme.ts) as inline
 * scripts, and components use inline style variables. Both therefore allow 'unsafe-inline', but
 * only same-origin sources: no third-party script, frame, font or connection can load.
 * Vercel Web Analytics is served from this origin (/<seed>/script.js), so 'self' covers it.
 */
const csp = [
  "default-src 'self'",
  // Dev only: React refresh needs eval, and Vercel Analytics loads its debug script from va.vercel-scripts.com.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ''}${toolbar}`,
  `style-src 'self' 'unsafe-inline'${toolbar}`,
  `img-src 'self' data: blob:${isPreview ? ' https://vercel.live https://vercel.com' : ''}`,
  `font-src 'self' data:${isPreview ? ' https://vercel.live https://assets.vercel.com' : ''}`,
  `connect-src 'self'${isDev ? ' ws:' : ''}${isPreview ? ' https://vercel.live wss://ws-us3.pusher.com' : ''}`,
  `frame-src ${isPreview ? 'https://vercel.live' : "'none'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Older browsers that ignore frame-ancestors.
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
  // Vercel already sends Strict-Transport-Security with preload on its domains.
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The root layout sits under [locale], so unmatched URLs need app/global-not-found.tsx
  // for a branded 404 with <html lang>.
  experimental: {
    globalNotFound: true,
  },
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
