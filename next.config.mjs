/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/specialties/general-physician-internal-medicine",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
