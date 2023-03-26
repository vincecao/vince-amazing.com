/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx,js,jsx}', './index.html', './index.tsx'],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        chinesename: ['CloudKaiXingGBK'],
        englishname: ['Mansalva'],
        mono: ['Courier Prime'],
        sans: ['Vollkorn'],
      },
    },
  },
  variants: {
    opacity: ['hover', 'disabled', 'focus'],
    cursor: ['hover', 'disabled', 'focus'],
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  corePlugins: {
    float: false,
  },
};
