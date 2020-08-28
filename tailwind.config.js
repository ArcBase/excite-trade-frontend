const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer')
    ],
    zIndex: {
             '-1': '-1',
    },
    theme: {
        zIndex: {
          '-1':-1,
          '0': 0,
    -     '10': 10,
    -     '20': 20,
    -     '30': 30,
    -     '40': 40,
    -     '50': 50,
    +     '25': 25,
    +     '50': 50,
    +     '75': 75,
    +     '100': 100,
          'auto': 'auto',
        }
};
