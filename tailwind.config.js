const { colors, fontFamily } = require(`tailwindcss/defaultTheme`);

module.exports = {
  content: ["./src/components/**/*.js", "./src/pages/**/*.js"],
  theme: {
    maxWidth: {
      '3xl': '768px',
      '6xl': '1024px',
      '7xl': '1400px',
    },
    listStyleType: {
      none: 'none',
     disc: 'disc',
     decimal: 'decimal',
     square: 'square',
     roman: 'upper-roman',
    },
    boxShadow: {
      'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      'md': '0 1px 5px rgba(0, 0, 0, 0.2)',
      'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '2px 2px 0px #F59E0B;',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
     '3': '3px',
      '4': '4px',
     '6': '6px',
     '8': '8px',
    },
    extend: {
      colors: {
        primary: '#faf0ed',
        secondary: '#3472d5',
        default: '#1A202C'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "0rem",
        },
      },
      screens: {
        'md': '768px',
        'lg': '992px',
        'xl': '1280px',
        'xxl': '1440px',
      },
      filter: ['hover', 'focus'],
    },
    variants: {
      fill: ['hover', 'focus'],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};