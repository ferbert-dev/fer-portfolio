import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The root layout sits under [locale], so unmatched URLs need app/global-not-found.tsx
  // for a branded 404 with <html lang>.
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
