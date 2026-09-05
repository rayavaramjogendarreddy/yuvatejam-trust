import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/images/yuvatejam-trust-logo.png",
        destination:
          "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/yuvatejam-trust-logo.png",
      },
    ];
  },
};

export default nextConfig;
