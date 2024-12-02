import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb"
    }
  },
  env: {
    SERVER_URL: "http://localhost:3000"
  }

};

export default nextConfig;
