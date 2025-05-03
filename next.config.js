const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    serverActions: true
  },

  turbopack: {
    rules: {
      '*.tsx': ['@next/next/no-html-link-for-pages'],
    },
  },

  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false
    };
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = withPWA(nextConfig); 