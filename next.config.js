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
      'spline-3d.s3.us-west-2.amazonaws.com',
    ],
  },

  webpack: (config, { isServer }) => {
    // Enable WebAssembly support
    config.experiments = {
      ...(config.experiments || {}),
      asyncWebAssembly: true,
      layers: true,
    };

    config.output.webassemblyModuleFilename = isServer
      ? '../static/wasm/[modulehash].wasm'
      : 'static/wasm/[modulehash].wasm';

    // Add fallback for the spline package
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false,
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      net: false,
      tls: false,
      dns: false,
      child_process: false,
      module: false,
    };

    // Handle the spline package specifically
    config.module.rules.push({
      test: /\.m?js$/,
      include: /node_modules\/@splinetool/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false
      }
    });

    return config;
  },

  experimental: {
    // Enable modern browser features
    optimizeCss: true,
    // Enable server components external packages
    serverComponentsExternalPackages: ['@splinetool/react-spline'],
    // Disable esmExternals as it's causing issues with Spline
    esmExternals: false
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://prod.spline.design https://unpkg.com https://spline.design;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob: https://prod.spline.design https://unpkg.com https://spline.design https://s3-alpha.figma.com https://*.spline.design https://spline-3d.s3.us-west-2.amazonaws.com https://images.unsplash.com https://miro.medium.com https://mavigadget.com https://assets.architecturaldigest.in;
              connect-src 'self' https://prod.spline.design https://unpkg.com https://spline.design https://s3-alpha.figma.com https://*.spline.design https://spline-3d.s3.us-west-2.amazonaws.com;
              frame-src 'self' https://prod.spline.design https://unpkg.com https://spline.design;
              worker-src 'self' blob:;
              media-src 'self' blob:;
              font-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              block-all-mixed-content;
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
