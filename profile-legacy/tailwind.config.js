/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx,js,jsx}'],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        chineseChar: ['CloudKaiXingGBK'],
        mono: [
          'Courier Prime', 
          'Vollkorn'
        ],
      },
    },
  },
  variants: {
    opacity: ['hover', 'disabled', 'focus'],
    cursor: ['hover', 'disabled', 'focus'],
  },
  plugins: [],
  corePlugins: {
    float: false,
  },
};
