import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  turbopack: {
    resolveAlias: {
      three: 'three',
    },
  },
}

export default nextConfig;