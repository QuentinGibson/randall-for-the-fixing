/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  serverDependenciesToBundle: [
    /^@splidejs\/react-splide\/css/
  ],
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
    unstable_cssSideEffectImports: true,
  },
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
};
