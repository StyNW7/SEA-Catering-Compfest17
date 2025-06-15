/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
    optimizePackageImports: ['@radix-ui/react-dialog'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  devIndicators: {
    buildActivity: false,
  },
  // Modern alternative to handle CSR bailout warnings
  reactStrictMode: true,
  transpilePackages: ['@radix-ui/react-slot']
}

module.exports = nextConfig