import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
 images: {
    domains: ['cdn.sanity.io'],

   
  },
};

export default nextConfig;
