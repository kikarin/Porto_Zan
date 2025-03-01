import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["via.placeholder.com"],
    formats: ['image/avif', 'image/webp']
  },  
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};
export default nextConfig;
