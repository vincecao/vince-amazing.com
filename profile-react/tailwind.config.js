module.exports = {
  content: ['./src/**/*.{html,ts,tsx,js,jsx}'],
  theme: {
    // fontFamily: {
    //   sans: ["-apple-system", "BlinkMacSystemFont"],
    //   serif: ["Georgia", "Cambria"],
    //   mono: ["SFMono-Regular", "Menlo"],
    //   display: ["Oswald"],
    //   body: ["Open Sans"],
    // },
    extend: {
      colors: {
        primary: '#FF6363',
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        },
      },
      fontFamily: {
        body: ['CloudKaiXingGBK'],
        index: ['Vollkorn'],
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
