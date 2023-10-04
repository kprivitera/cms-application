/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
