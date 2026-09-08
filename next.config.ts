import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/form-builder",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;