/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      // The root layout reads this CSV (team mods nav dropdown), so EVERY
      // server-rendered route needs it in its traced bundle — static pages
      // read it at build time and are unaffected. The glob covers any
      // future dynamic route; the explicit key keeps today's only dynamic
      // route pinned regardless of glob semantics.
      '/sos-pre-install-checker': ['./content/team-mods/team-mods-master.csv'],
      '/**': ['./content/team-mods/team-mods-master.csv'],
    },
  },
};

export default nextConfig;
