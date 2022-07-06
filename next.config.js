/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'tvinccnmqzniuaenjngl.supabase.co'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/Memes',
  //       destination: '/memes',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
