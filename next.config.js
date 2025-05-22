/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'prod.spline.design',
      'unpkg.com',
      'www.gstatic.com',
      'spline.design',
      's3-alpha.figma.com',
      'spline-3d.s3.us-west-2.amazonaws.com'
    ],
  },
  // Required for WebGL and WebAssembly
  webpack: (config, { isServer }) => {
    // Enable WebAssembly
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    
    // Required for Spline to work in production
    config.output.webassemblyModuleFilename = isServer
      ? '../static/wasm/[modulehash].wasm'
      : 'static/wasm/[modulehash].wasm';

    return config;
  },
  // Required for WebGL
  experimental: {
    esmExternals: false,
  },
  // Add CSP headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' data: blob: https:;",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;",
              "style-src 'self' 'unsafe-inline' https:;",
              "img-src 'self' data: blob: https:;",
              "connect-src 'self' https: wss:;",
              "frame-src 'self' https:;",
              "worker-src 'self' blob: https:;",
              "media-src 'self' https:;",
              "font-src 'self' https: data:;",
              "manifest-src 'self' https:;",
              "object-src 'none';",
              "base-uri 'self';",
              "form-action 'self';",
              "frame-ancestors 'none';",
              "upgrade-insecure-requests;",
              "require-trusted-types-for 'script';",
              "trusted-types default"
            ].join(' ')
          }
        ]
      }
    ];
  },
};

module.exports = nextConfig;
