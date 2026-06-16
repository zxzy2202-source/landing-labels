import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.gozhumeng.com",
      },
      {
        protocol: "https",
        hostname: "gozhumeng.com",
      },
    ],
  },
};

export default nextConfig;
