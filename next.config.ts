import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'doc',
  assetPrefix: '.',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
