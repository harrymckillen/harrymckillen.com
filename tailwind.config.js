module.exports = {
  purge: {
    // enabled: true,
    enabled: false,
    content: ['./build/**/*.html'],
  },
  theme: {
    extend: {
      colors: {
        // extend colors here
        brightgreen: '#0f0'
      }
    },
    boxShadow: {
      deep: '0 0 10px #000'
    }
  },
  variants: {},
  plugins: [],
}
