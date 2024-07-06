/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/404",
        destination: "/404",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
