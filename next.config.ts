import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental:{
  //   dynamicIO: true,
  // }
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
