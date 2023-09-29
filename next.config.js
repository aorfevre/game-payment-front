/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
    PUBLIC_URL: process.env.PUBLIC_URL,
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
