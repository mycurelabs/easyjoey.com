import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable source maps in production to prevent code exposure
  productionBrowserSourceMaps: false,
};

export default nextConfig;
