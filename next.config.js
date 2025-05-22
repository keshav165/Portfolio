/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com;",
              "style-src 'self' 'unsafe-inline' https://unpkg.com;",
              "img-src 'self' data: https://prod.spline.design https://unpkg.com;",
              "connect-src 'self' https://prod.spline.design https://unpkg.com;",
              "frame-src 'self' https://prod.spline.design https://unpkg.com;",
              "worker-src 'self' blob:;",
            ].join(' '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
