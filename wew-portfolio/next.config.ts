import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Netlify deployment settings
  // output: 'export',
  // trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // Three.js configuration
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  webpack: (config: WebpackConfig, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important for Three.js
    if (config.resolve && config.resolve.alias) {
       (config.resolve.alias as { [key: string]: string | false | string[] }).three = require.resolve('three');
    }
    return config;
  },
}

export default nextConfig;