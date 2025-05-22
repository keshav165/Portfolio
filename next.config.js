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
  // Add CSP headers - Updated to fix strict-dynamic issues
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: isDev 
              ? // Development - More permissive
                [
                  `default-src 'self' data: blob: https:;`,
                  `script-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob: https://prod.spline.design https://unpkg.com https://spline.design https://s3-alpha.figma.com https://*.spline.design https://spline-3d.s3.us-west-2.amazonaws.com;`,
                  `style-src 'self' 'unsafe-inline' https: data: https://prod.spline.design https://unpkg.com https://spline.design;`,
                  `img-src 'self' data: blob: https: https://prod.spline.design https://unpkg.com https://spline.design https://s3-alpha.figma.com https://*.spline.design https://spline-3d.s3.us-west-2.amazonaws.com;`,
                  `connect-src 'self' https: wss: data: blob: https://prod.spline.design https://unpkg.com https://spline.design https://s3-alpha.figma.com https://*.spline.design https://spline-3d.s3.us-west-2.amazonaws.com;`,
                  `frame-src 'self' https: data: https://prod.spline.design https://unpkg.com https://spline.design;`,
                  `worker-src 'self' blob: data: https: https://prod.spline.design https://unpkg.com https://spline.design;`,
                  `media-src 'self' https: data: blob: https://prod.spline.design https://unpkg.com https://spline.design;`,
                  `font-src 'self' https: data:;`,
                  `manifest-src 'self' https:;`,
                  `object-src 'none';`,
                  `base-uri 'self';`,
                  `form-action 'self';`
                ].join(' ')
              : // Production - Remove strict-dynamic and add specific hashes
                [
                  `default-src 'self' data: blob: https:;`,
                  `script-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob: 'sha256-c5Gm1Iytmxlbm7sLzBSUu/dpFv9EWweQTfDc8mG3PME=' 'sha256-Q+8tPsjVtiDsjF/Cv8FMOpg2Yg91oKFKDAJat1PPb2g=' 'sha256-yv/MvfuhaaGjfZSG16fGtAsqb2kN9yMlLNJIHvfHK1I=' 'sha256-Cbd+ntPmFzSXjhRvTIEhSP8CkB5ynH283nhlzUDGiFs=' 'sha256-Ce4/Ph//Ghv71MQk5ifG8L+QoBacoqd2F3Gb0BoIGoc=' 'sha256-L9PhcDR1JpjxjPsZVTF9m718jhSRvj3mNXP6/Xh718w=' 'sha256-rU8KluWUOzsbf7dwvdj/cRJ1P7+RbvNdSANw93Fgflg=' https://prod.spline.design https://unpkg.com https://spline.design https://s3-alpha.figma.com https://*.spline.design https://spline-3d.s3.us-west-2.amazonaws.com;`,
                  `style-src 'self' 'unsafe-inline' https: data: https://prod.spline.design https://unpkg.com https://spline.design;`,
                  `img-src 'self' data: blob: https: https://prod.spline.design https://unpkg.com https://spline.design https://s3-alpha.figma.com https://*.spline.design https://spline-3d.s3.us-west-2.amazonaws.com;`,
                  `connect-src 'self' https: wss: data: blob: https://prod.spline.design https://unpkg.com https://spline.design https://s3-alpha.figma.com https://*.spline.design https://spline-3d.s3.us-west-2.amazonaws.com;`,
                  `frame-src 'self' https: data: https://prod.spline.design https://unpkg.com https://spline.design;`,
                  `worker-src 'self' blob: data: https: https://prod.spline.design https://unpkg.com https://spline.design;`,
                  `media-src 'self' https: data: blob: https://prod.spline.design https://unpkg.com https://spline.design;`,
                  `font-src 'self' https: data:;`,
                  `manifest-src 'self' https:;`,
                  `object-src 'none';`,
                  `base-uri 'self';`,
                  `form-action 'self';`
                ].join(' ')
          }
        ]
      }
    ];
  },
};

module.exports = nextConfig;