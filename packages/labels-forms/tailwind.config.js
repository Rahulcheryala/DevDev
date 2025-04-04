/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-primary": "#19110B",
        stroke: {
          primary: "#E9E9EE",
        },
        background: {
          primary: "#F4F4F4",
        },
      },
      fontFamily: {
        suisseIntl: ["SuisseIntl", "sans-serif"],
      },
      letterSpacing: {
        wider: "0.5px",
      },
    },
  },
  plugins: [],
  compilerOptions: {
    jsx: "react-jsx", // For React 17+ (use "react" for React 16 or earlier)
    lib: ["dom", "esnext"],
    // other compiler options
  },
};
