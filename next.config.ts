import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "cdn.sanity.io",
      "aceon-interior.vercel.app",
      "clipground.com",
      "placehold.co",
      "res.cloudinary.com",
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during production build
  },
};

export default nextConfig;
