/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        chinese: ["CloudKaiXingGBK"],
        english: ["Mansalva"],
        mono: ["0xProto"],
        serif: ["Vollkorn"],
        sans: ["Noto Sans", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "w-full",
          },
        },
      },
    },
  },
  variants: {
    opacity: ["hover", "disabled", "focus"],
    cursor: ["hover", "disabled", "focus"],
  },
  plugins: [require("@tailwindcss/typography")],
  corePlugins: {
    float: false,
  },
};
