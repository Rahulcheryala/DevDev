import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { vercelPreset } from "@vercel/remix/vite";
import path from "node:path";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { envOnlyMacros } from "vite-env-only";

installGlobals();

export default defineConfig({
  ssr: {
    noExternal: ["react-icons", "react-phone-number-input", "react-quill"],
  },
  server: {
    port: 3000,
  },
  plugins: [
    envOnlyMacros(),
    remix({
      // appDirectory: "app",
      // assetsBuildDirectory: "public/build",
      // publicPath: "/build/",
      // serverBuildPath: "build/index.js",
      //browserNodeBuiltinsPolyfill: { modules: { events: true } },
      // dev: {
      //   port: 3601,
      // },
      presets: [vercelPreset()],
      future: {},
      ignoredRouteFiles: ["**/.*"],
      serverModuleFormat: "esm",
      //serverPlatform: "node",
      //serverMinify: false,
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes, {
          // eslint-disable-next-line no-undef
          appDir: path.resolve(__dirname, "app"),
        });
      },
      // serverDependenciesToBundle: [
      //   "@zeak/database",
      //   "@zeak/logger",
      //   "@zeak/react",
      //   "@zeak/remix-validated-form",
      //   "@zeak/utils",
      //   "nanoid",
      //   "nanostores",
      //   "@nanostores/react",
      // ],
      // watchPaths: async () => {
      //   return [
      //     "../../packages/database/src/**/*",
      //     "../../packages/logger/src/**/*",
      //     "../../packages/react/src/**/*",
      //     "../../packages/utils/src/**/*",
      //   ];
      // },
    }),
    tsconfigPaths(),
  ],
});

// import { vitePlugin as remix } from "@remix-run/dev";
// import { installGlobals } from "@remix-run/node";
// import { vercelPreset } from "@vercel/remix/vite";
// import path from "node:path";
// import { flatRoutes } from "remix-flat-routes";
// import { defineConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";

// installGlobals();

// export default defineConfig({
//   ssr: {
//     noExternal: ["react-icons"],
//   },
//   server: {
//     port: 3000,
//   },
//   plugins: [
//     remix({
//       // appDirectory: "app",
//       // assetsBuildDirectory: "public/build",
//       // publicPath: "/build/",
//       // serverBuildPath: "build/index.js",
//       //browserNodeBuiltinsPolyfill: { modules: { events: true } },
//       // dev: {
//       //   port: 3601,
//       // },
//       presets: [vercelPreset()],
//       future: {},
//       ignoredRouteFiles: ["**/.*"],
//       serverModuleFormat: "esm",
//       //serverPlatform: "node",
//       //serverMinify: false,
//       routes: async (defineRoutes) => {
//         return flatRoutes("routes", defineRoutes, {
//           // eslint-disable-next-line no-undef
//           appDir: path.resolve(__dirname, "app"),
//         });
//       },
//       // serverDependenciesToBundle: [
//       //   "@zeak/database",
//       //   "@zeak/logger",
//       //   "@zeak/react",
//       //   "@zeak/remix-validated-form",
//       //   "@zeak/utils",
//       //   "nanoid",
//       //   "nanostores",
//       //   "@nanostores/react",
//       // ],
//       // watchPaths: async () => {
//       //   return [
//       //     "../../packages/database/src/**/*",
//       //     "../../packages/logger/src/**/*",
//       //     "../../packages/react/src/**/*",
//       //     "../../packages/utils/src/**/*",
//       //   ];
//       // },
//     }),
//     tsconfigPaths(),
//   ],
//   build: {
//     rollupOptions: {
//       external: ["react-phone-number-input"],
//     },
//   },
// });
