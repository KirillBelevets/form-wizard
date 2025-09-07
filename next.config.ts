import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: "export" to enable API routes for MongoDB
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
