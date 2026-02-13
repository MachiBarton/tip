import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'doc',
  basePath: '/tip',
  assetPrefix: '/tip',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
