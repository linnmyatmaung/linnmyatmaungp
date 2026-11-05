/** @type {import('next').NextConfig} */
const firebaseBuild = process.env.FIREBASE_BUILD === "true";

const nextConfig = {
  ...(firebaseBuild ? { output: "export" } : {}),
  images: {
    ...(firebaseBuild ? { unoptimized: true } : {}),
    remotePatterns: [],
  },
};

module.exports = nextConfig;
