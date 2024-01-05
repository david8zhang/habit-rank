/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/todos',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
