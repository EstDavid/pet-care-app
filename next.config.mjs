/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Accept images from following hostnames
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
