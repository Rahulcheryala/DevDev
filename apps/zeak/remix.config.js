const path = require("node:path");
const { flatRoutes } = require("remix-flat-routes");

/** @type {import('@remix-run/dev').AppConfig} */

module.exports = {
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  browserNodeBuiltinsPolyfill: { modules: { events: true } },
  dev: {
    port: 3601,
  },
  future: {},
  ignoredRouteFiles: ["**/.*", '**/__tests__/**'],
  serverModuleFormat: "esm",
  serverPlatform: "node",
  serverMinify: false,
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes, {
      // eslint-disable-next-line no-undef
      appDir: path.resolve(__dirname, "app"),
    });
  },
  serverDependenciesToBundle: [
    "@zeak/database",
    "@zeak/logger",
    "@zeak/react",
    "@zeak/remix-validated-form",
    "@zeak/utils",
    "@zeak/labels-forms",
    "@zeak/icons",
    "nanoid",
    "nanostores",
    "@nanostores/react",
  ],
  watchPaths: async () => {
    return [
      "../../packages/database/src/**/*",
      "../../packages/logger/src/**/*",
      "../../packages/react/src/**/*",
      "../../packages/utils/src/**/*",
      "../../packages/labels-forms/src/**/*",
      "../../packages/icons/src/**/*",
    ];
  },
};
