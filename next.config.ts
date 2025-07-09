import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "cdn.sanity.io",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.sanity.io",
        port: "",
        search: ""
      }
    ]
  },
};

export default nextConfig;
