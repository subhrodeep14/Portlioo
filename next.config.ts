import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript:{
    ignoreBuildErrors:true,
  },
  eslint:{
    ignoreDuringBuilds:true,
  },

  images: {
    domains: [
      'raw.githubusercontent.com',
      'images.unsplash.com',

    ]
  }


};

export default nextConfig;
