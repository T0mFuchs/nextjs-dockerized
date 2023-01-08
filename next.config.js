const isDev = process.env.NODE_ENV === "development";

const withPWA = require("next-pwa")({
  dest: "public",
  skipWaiting: true,
  disable: isDev
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: isDev ? undefined : "standalone",
  webpack: (config, { isServer }) => {
    if (!isDev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      };
    }
    return config;
  },
  async headers() {
    if (!isDev) {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Content-Security-Policy",
              value: `
                default-src 'self' vitals.vercel-insights.com https:;
                script-src 'self' 'unsafe-inline';
                child-src ${process.env.NEXTAUTH_URL};
                style-src 'self' 'unsafe-inline';
                font-src 'none'; 
              `.replace(/\s{2,}/g, ' ').trim()
            },
            {
              key: "X-XSS-Protection",
              value: "1; mode=block"
            },
            {
              key: "Referrer-Policy",
              value: "origin-when-cross-origin"
            }
          ]
        }
      ]
    } else {
      return [];
    }
  }
};

module.exports = withPWA(nextConfig);
