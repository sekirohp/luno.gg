import type { NextConfig } from "next";

const nextConfig: NextConfig & { turbopack?: { root?: string } } = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [
      {
        // Proxy Python API requests
        source: '/api/py/:path*',
        destination: 'http://localhost:3002/:path*',
      },
    ];
  },
};

export default nextConfig;
