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
  // Required for WebGL in production
  env: {
    NEXT_PUBLIC_SPLINE_SCENE: 'https://prod.spline.design/KuT8NlMsfAGLS5ra/scene.splinecode',
  },
  // Remove CSP headers as they're now handled by _document.tsx
  async headers() {
    return [];
  },
};

module.exports = nextConfig;
