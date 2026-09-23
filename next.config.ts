import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image only allows listed qualities; the cover media uses 80.
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/work", destination: "/", permanent: true },
      { source: "/work/:slug", destination: "/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
