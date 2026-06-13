import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-6e633d2edb0249a49e2d6756b3a8b446.r2.dev",
      },
      {
        protocol: "https",
        hostname: "gozhumeng.com",
      },
    ],
  },
};

export default nextConfig;
