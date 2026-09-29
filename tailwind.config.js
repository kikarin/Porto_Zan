/** @type {import('tailwindcss').Config} */
const bodyStack = ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"];

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        canvas: "#f6f1e9",
        sand: {
          DEFAULT: "#ede5d8",
          deep: "#e3d8c6",
        },
        ink: {
          DEFAULT: "#1d1a16",
          soft: "#3b362f",
          muted: "#6f675c",
          faint: "#a39a8c",
        },
        accent: {
          50: "#fdf3ee",
          100: "#fbe3d6",
          200: "#f6c3a9",
          300: "#f0a07a",
          400: "#e98457",
          DEFAULT: "#e0683c",
          500: "#e0683c",
          600: "#c8532b",
          700: "#a44224",
          800: "#823622",
          900: "#682e1f",
        },
      },
      fontFamily: {
        sans: bodyStack,
        display: ["var(--font-display)", ...bodyStack],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        rubik: bodyStack,
        gotosans: bodyStack,
      },
      zIndex: {
        base: "1",
        raised: "10",
        sticky: "30",
        nav: "40",
        overlay: "50",
        modal: "60",
        grain: "70",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(60, 40, 20, 0.04), 0 8px 24px -8px rgba(60, 40, 20, 0.12)",
        lift: "0 2px 4px rgba(60, 40, 20, 0.05), 0 24px 48px -16px rgba(60, 40, 20, 0.22)",
        accent: "0 10px 30px -10px rgba(200, 83, 43, 0.55)",
        "inner-edge": "inset 0 1px 0 rgba(255, 255, 255, 0.7)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-8deg)" },
          "75%": { transform: "rotate(8deg)" },
        },
        "pulse-dot": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        wiggle: "wiggle 0.5s ease-in-out",
        "pulse-dot": "pulse-dot 1.8s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
};
