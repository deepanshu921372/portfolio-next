/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

// Add proper signal handling
process.on('SIGINT', () => {
  process.exit(0)
})

module.exports = nextConfig;
