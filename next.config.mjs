/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
