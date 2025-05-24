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
    // Common CSP directives for both dev and prod
    const commonDirectives = [
      `default-src 'self' data: blob: https:;`,
      `style-src 'self' 'unsafe-inline' https: data:;`,
      `img-src 'self' data: blob: https: https://prod.spline.design https://unpkg.com https://spline.design https://s3-alpha.figma.com https://*.spline.design https://spline-3d.s3.us-west-2.amazonaws.com;`,
      `connect-src 'self' https: wss: data: blob: https://prod.spline.design https://unpkg.com https://spline.design https://s3-alpha.figma.com https://*.spline.design https://spline-3d.s3.us-west-2.amazonaws.com;`,
      `frame-src 'self' https: data: https://prod.spline.design https://unpkg.com https://spline.design;`,
      `worker-src 'self' blob: data: https://prod.spline.design https://unpkg.com https://spline.design;`,
      `media-src 'self' data: blob: https://prod.spline.design https://unpkg.com https://spline.design;`,
      `font-src 'self' https: data:;`,
      `manifest-src 'self' https:;`,
      `object-src 'none';`,
      `base-uri 'self';`,
      `form-action 'self';`,
      `frame-ancestors 'none';`,
      `block-all-mixed-content;`,
      `upgrade-insecure-requests;`,
    ];

    // Development CSP - more permissive
    const devCsp = [
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:;`,
      ...commonDirectives
    ].join(' ');

    // Production CSP - strict with hashes
    const prodCsp = [
      `script-src 'self' ` +
        `'unsafe-inline' ` +  // Required for Next.js
        `'unsafe-eval' ` +   // Required for some Next.js features
        `'sha256-c5Gm1Iytmxlbm7sLzBSUu/dpFv9EWweQTfDc8mG3PME=' ` +
        `'sha256-Q+8tPsjVtiDsjF/Cv8FMOpg2Yg91oKFKDAJat1PPb2g=' ` +
        `'sha256-yv/MvfuhaaGjfZSG16fGtAsqb2kN9yMlLNJIHvfHK1I=' ` +
        `'sha256-Cbd+ntPmFzSXjhRvTIEhSP8CkB5ynH283nhlzUDGiFs=' ` +
        `'sha256-Ce4/Ph//Ghv71MQk5ifG8L+QoBacoqd2F3Gb0BoIGoc=' ` +
        `'sha256-L9PhcDR1JpjxjPsZVTF9m718jhSRvj3mNXP6/Xh718w=' ` +
        `'sha256-rU8KluWUOzsbf7dwvdj/cRJ1P7+RbvNdSANw93Fgflg=' ` +
        `'sha256-DhdPCUVDHjRt5XENO6SaOiik/TQz48o0Fk4Z9m5agHA=' ` +
        `'sha256-TaANZibFX3ZH34kEXT3lbdWRYYUMZ+4plyqa9oEcWyQ=' ` +
        `'sha256-OPQ4jSWEw3eMFGjyNvfQQtk4aA9OdzXGWNyPrNyuYyA=' ` +
        `'sha256-88bnPcqDn6L2WPtYj4fVMBqboSIRK3PqYaf0V0+oyec=' ` +
        `'sha256-L96EXUmhU7jq6anKyV4BMZk0Rvq9QwmRY9+6G/fF89s=' ` +
        `https://prod.spline.design https://unpkg.com https://spline.design;`,
      ...commonDirectives
    ].join(' ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: isDev ? devCsp : prodCsp,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
