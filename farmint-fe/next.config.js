/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    // Disable trace collection to avoid permission issues
    isrMemoryCacheSize: 0,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fallbacks for browser environment
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        encoding: false,
      };
    }

    // Ignore node-fetch and encoding in browser builds
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        'node-fetch': 'fetch',
        'encoding': 'TextEncoder',
      });
    }

    return config;
  },
};

module.exports = nextConfig;
