/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        410: '410px',
        307: '3307px',
        154: '154px',
        128: '128px',
        102: '102px',
        64: '64px',
        51: '51px',
        38: '38px',
        22: '22px',
        19: '19px',
        32: '32px',
        19: '19px',
        16: '16px',
        13: '13px',
        10: '10px',
        6: '6px',
        5: '5px',
        3: '3px',
        1: '1px',
      },
    },
    colors: {
      black3: '#f4f4f4',
      black2: '#AAAAAA',
      black1: '#000000',
      blue3: '#EDF5FF',
      blue2: '#BBDAFF',
      blue1: '#5AA6FF',
      green3: '#E7FFE3',
      green2: '#7BFF70',
      green1: '#00C31F',
      red3: '#FFF0EF',
      red2: '#FFC3BF',
      red1: '#FF7A72',
      white: '#FFFFFF',
    },
    fontSize: {
      xs: ['0.6rem', null],
      xl: ['1rem', null],
      '2xl': ['1.2rem', null],
    },
    height: {
      20: '5rem',
      256: '256px',
      128: '128px',
      80: '80px',
      64: '64px',
      45: '45px',
      40: '40px',
    },
  },
  plugins: [],
};
