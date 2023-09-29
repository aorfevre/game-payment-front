/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
    PUBLIC_URL: process.env.PUBLIC_URL,
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
    PUBLIC_CHAIN_ID: process.env.PUBLIC_CHAIN_ID,
    PUBLIC_RECEIVING_WALLET: process.env.PUBLIC_RECEIVING_WALLET,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
