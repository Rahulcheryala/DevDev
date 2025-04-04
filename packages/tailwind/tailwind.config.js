const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "../../apps/**/*.{ts,tsx}", // include packages if not transpiling
    "../../packages/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    extend: {
      screens: {
        xl: "1199px", // This will override Tailwind's default xl (1280px)
        xxl: "1399px", // New breakpoint
        hd: "1440px", // Custom HD breakpoint
        xxxl: "1799px", // New breakpoint
        fhd: "1920px", // Custom Full HD breakpoint
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        inputBg: "hsla(var(--input-bg))",
        ring: "hsl(var(--ring))",
        dropdownHoverBg: "hsl(var(--dropdown-hover-bg))",
        checkboxBorder: "hsl(var(--checkbox-border))",
        background: "hsl(var(--background))",
        foreground: "var(--foreground)",
        text: {
          dark: "hsl(var(--text-dark))",
          tertiary: "hsl(var(--text-tertiary))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          blue: "hsl(var(--primary-blue))",
          bright: "hsl(var(--accent-primary-bright))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          tertiary: "hsl(var(--text-secondary-tertiary))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
        },
        textLink: {
          DEFAULT: "hsl(var(--text-secondary))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          primary: "hsl(var(--accent-primary))",
          primaryDark: "hsl(var(--accent-primary-dark))",
          blue: "hsl(var(--accent-blue))",
          green: "hsl(var(--accent-green))",
          darkGreen: "hsl(var(--dark-green))",
          brightGreen: "hsl(var(--bright-green))",
          blueLight: "hsl(var(--accent-blue-light))",
          yellowLight: "hsl(var(--accent-yellow-light))",
          dark: "hsl(var(--accent-dark))",
          grayLight: "hsl(var(--accent-gray-light))",
          grayDeep: "hsl(var(--accent-gray-deep))",
          orange: "hsl(var(--accent-orange-deep))",
          overlay: "hsl(var(--accent-overlay))",
          blueDark: "hsl(var(--accent-blue-dark))",
          gray: "hsl(var(--accent-gray))",
          gray2: "hsl(var(--gray-2))",
          red: "hsl(var(--accent-red))",
          lightGreen: "rgba(4, 167, 119, 0.12)",
          hoverActive: "hsl(var(--dropdown-hover-bg))",
          p2: "hsl(var(--accent-p2))",
          accentYellow: "hsl(var(--accent-yellow))",
          bgHover: "hsl(var(--accent-bgHover))",
          bgHoverNew: "hsl(var(--accent-bgHovernew))",
          yellow: "hsl(var(--yellow))",
          darkYellow: "hsl(var(--dark-yellow))",
          darkYellowShade1: "hsl(var(--yellow-dark-shade-1))",
          pink: "hsl(var(--accent-pink))",
          pink2: "hsl(var(--accent-pink-2))",
          pink3: "hsl(var(--accent-pink-3))",
          greenishBlue: "hsl(var(--greenish-blue))",
        },
        stroke: {
          DEFAULT: "hsl(var(--stroke))",
          primary: "hsl(var(--stroke-primary))",
          secondary: "hsl(var(--stroke-secondary))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          green: "hsl(var(--accent-lighGreen))",
        },
        success: {
          DEFAULT: "hsl(var(--success-base))",
        },
        table: {
          DEFAULT: "hsl(var(--background-table))",
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `10px`,
        sm: "calc(var(--radius) - 4px)",
        zeak: `var(--zeak-radius)`,
      },
      boxShadow: {
        "6large": "0 9px 28px 8px hsl(var(--accent-shadow))",
        "3xl": "0 0 8px 0 hsl(var(--accent-blue-light))",
        "4xl": "-13px 11px 11px 0px hsl(var(--accent-gray-light))",
        input: "box-shadow: 0px 0px 15px 0px rgba(223, 229, 242, 0.80);",
      },
      fontSize: {
        xxs: "0.675rem",
      },
      fontFamily: {
        sans: ["SuisseIntl"],
        mono: ["Roboto Mono", ...fontFamily.mono],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      letterSpacing: {
        wider: "0.5px",
      },
      // screens: {
      //   xl: "1199px",
      //   xxl: "1399px",
      //   xxxl: "1799px",
      // },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        leftAbstractBg: "url('/images/loginSidebg.png')",
        locationMarkerBg:
          'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxNiAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuOTk5NjcgOS44MzQ2NEM5LjM4MDM5IDkuODM0NjQgMTAuNDk5NyA4LjcxNTM1IDEwLjQ5OTcgNy4zMzQ2NEMxMC40OTk3IDUuOTUzOTIgOS4zODAzOSA0LjgzNDY0IDcuOTk5NjcgNC44MzQ2NEM2LjYxODk2IDQuODM0NjQgNS40OTk2NyA1Ljk1MzkyIDUuNDk5NjcgNy4zMzQ2NEM1LjQ5OTY3IDguNzE1MzUgNi42MTg5NiA5LjgzNDY0IDcuOTk5NjcgOS44MzQ2NFoiIHN0cm9rZT0iIzVFNjI2RCIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNNy45OTk2NyAxNy4zMzQ2QzExLjMzMyAxNC4wMDEzIDE0LjY2NjMgMTEuMDE2NSAxNC42NjYzIDcuMzM0NjRDMTQuNjY2MyAzLjY1Mjc0IDExLjY4MTYgMC42Njc5NjkgNy45OTk2NyAwLjY2Nzk2OUM0LjMxNzc4IDAuNjY3OTY5IDEuMzMzMDEgMy42NTI3NCAxLjMzMzAxIDcuMzM0NjRDMS4zMzMwMSAxMS4wMTY1IDQuNjY2MzQgMTQuMDAxMyA3Ljk5OTY3IDE3LjMzNDZaIiBzdHJva2U9IiM1RTYyNkQiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+ Cg ==")',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
