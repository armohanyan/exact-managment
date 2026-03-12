/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "dl.airtable.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [{ source: "/faq", destination: "/", permanent: true }];
  },
};

export default nextConfig;
