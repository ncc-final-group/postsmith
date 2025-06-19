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
};

export default nextConfig;
