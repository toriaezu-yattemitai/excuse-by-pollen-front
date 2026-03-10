import type { NextConfig } from "next";

const isWatchpackPilling = process.env.WATCHPACK_POLLING === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Dockerのときはwebpackを利用する
  ...(isWatchpackPilling && {
    webpack: (config, { dev }) => {
      if (dev) {
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 200,
        };
      }
      return config;
    }
  })
};

export default nextConfig;
