import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  output: "standalone",

  experimental: {
    globalNotFound: true,
  },

  async redirects() {
    return [
      { source: "/", destination: "/id", permanent: false },
    ];
  },
};

export default nextConfig;
