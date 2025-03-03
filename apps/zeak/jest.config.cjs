/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  // Handle file patterns and coverage
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "app/**/*.{ts,tsx}"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.cache/",
    "<rootDir>/build/",
  ],

  // Module configuration
  moduleNameMapper: {
    // Handle absolute imports in Remix
    "^~/(.*)$": "<rootDir>/app/$1"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // ESM configuration
  extensionsToTreatAsEsm: [".ts", ".tsx"],

  // Test setup
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Transform configuration
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    // Handle TypeScript files
    "^.+\\.tsx?$": ["ts-jest", {
      useESM: true,
    }],
    // Handle JavaScript files
    "^.+\\.(js|jsx)$": "@swc/jest",
    // Handle CSS files
    "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
    // Handle other files
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file",

  },

  // Ignore patterns for transforms
  transformIgnorePatterns: [
    "/node_modules/",
    "node_modules/@web3-storage/multipart-parser",
    "/node_modules/(?!(@remix-run|@web3-storage)/.*)"
  ],

  // Global configuration
  globals: {
    "ts-jest": {
      useESM: true
    }
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/.cache/", "/build/"],
};