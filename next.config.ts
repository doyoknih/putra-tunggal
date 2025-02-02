import { NextConfig } from "next";
require("dotenv").config();

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_ROLE_USER: process.env.NEXT_PUBLIC_ROLE_USER,
    NEXT_PUBLIC_IMAGE: process.env.NEXT_PUBLIC_IMAGE,
    MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
    MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "democms.byito.dev",
      },
    ],
  },
};

export default nextConfig;
