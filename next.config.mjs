/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'console.firebase.google.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
