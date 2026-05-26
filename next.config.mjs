const BOOKING_URL = "https://calendar.app.google/XSc2PBAX8dFwC5AN7";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/book", destination: BOOKING_URL, permanent: false },
      { source: "/schedule", destination: BOOKING_URL, permanent: false },
    ];
  },
}

export default nextConfig
