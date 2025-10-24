import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during production build
  },
};

export default nextConfig;
