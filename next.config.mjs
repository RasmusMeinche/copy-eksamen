/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iiif-prod.kunst.dk", // eller hvad end du får fra response.url
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "open.smk.dk",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;