/** @type {import('@jest/types').Config.InitialOptions} */

export default {
  preset: "ts-jest",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  moduleNameMapper: {
    // Handle absolute imports in Remix
    "~/(.*)": "<rootDir>/app/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.cache/",
    "<rootDir>/build/",
  ],
  testEnvironment: "jsdom",
  transform: {
    // Use @swc/jest to transpile tests
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": "@swc/jest",
    "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
      "jest-preview/transforms/file",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
    // "^.+\\.tsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Ensure that .ts/.tsx files are treated as modules
  globals: {
    "ts-jest": {
      useESM: true, // Enable support for ES modules
    },
  },
};
