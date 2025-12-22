/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["sanity", "next-sanity"],
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
