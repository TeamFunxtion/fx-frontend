/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ["funxtion-image.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;
