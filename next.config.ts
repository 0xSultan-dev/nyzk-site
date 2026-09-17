import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (the parent folder is its own git repo).
  turbopack: { root },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.kick.com" },
      { protocol: "https", hostname: "files.kick.com" },
      { protocol: "https", hostname: "clips.kick.com" },
    ],
  },
};

export default nextConfig;
