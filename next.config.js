/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['storage.iranocc.com']
  },
  output: 'standalone'
}


// PWA
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA(nextConfig)
