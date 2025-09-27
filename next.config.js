/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker optimization
  output: 'standalone',
  
  // Optimize for production
  swcMinify: true,
  
  // Enable experimental features for better performance
  experimental: {
    // Add experimental features here if needed
  },
  
  // Image optimization settings
  images: {
    domains: [],
    unoptimized: false,
  },
  
  // Environment variables that should be available on the client side
  env: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  
  // Disable x-powered-by header for security
  poweredByHeader: false,
  
  // Compress responses
  compress: true,
  
  // Generate ETags for better caching
  generateEtags: true,
}

module.exports = nextConfig
