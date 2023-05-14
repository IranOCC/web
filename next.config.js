/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['storage.iranocc.com']
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'storage.iranocc.com',
    //   },
    // ],
  },
  output: 'standalone'
}

module.exports = nextConfig
