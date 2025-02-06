/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.indiacafe24.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.moviecrow.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.onlykollywood.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
