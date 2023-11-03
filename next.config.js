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

  async redirects() {
    return [
      {
        source: '/dashboard/words',
        destination: '/dashboard/words/a',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
