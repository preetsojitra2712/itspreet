import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath: isStaticExport ? basePath : undefined,
  assetPrefix: isStaticExport && basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: isStaticExport,
  },
};

export default nextConfig;
