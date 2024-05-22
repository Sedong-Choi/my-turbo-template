/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@repo/ui",
    "@nextui-org/react",
    "@nextui-org/theme",
    "@nextui-org/system",
  ],
};

export default nextConfig;
