import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['kr.object.ncloudstorage.com'],
  },

  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',
      pathname: '/**',
      search: '',
    },
    {
      protocol: 'https',
      hostname: 'kr.object.ncloudstorage.com',
      port: '',
      pathname: '/postsmith-bucket/**',
      search: '',
    },
  ],
};

export default nextConfig;
