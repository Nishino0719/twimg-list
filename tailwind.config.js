module.exports = {
  purge: ['./src/**/*.{ts,tsx}'],
  mode: 'jit',
  darkMode: 'class', // 'media' or 'class'
  theme: { extend: { colors: { 'accent-1': '#333' } } },
  variants: { extend: {} },
  plugins: []
}
