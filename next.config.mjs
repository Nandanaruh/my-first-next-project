// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     // domains: ["m.media-amazon.com"] },
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "m.media-amazon.com",
//         port: "",
//         search: "",
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
