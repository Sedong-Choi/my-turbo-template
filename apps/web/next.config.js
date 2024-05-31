/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    "@repo/ui",
    "@repo/tailwind-config",
  ],
  env: {
    APP_NAME: process.env.APP_NAME,
  },
};

