/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/sos-pre-install-checker': ['./content/team-mods/team-mods-master.csv'],
    },
  },
};

export default nextConfig;
