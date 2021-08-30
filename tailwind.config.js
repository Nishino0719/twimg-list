module.exports = {
  purge: ['./src/**/*.{ts,tsx}'],
  mode: 'jit',
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      colors: { 'accent-1': '#333', darkblue: '#10171e', twitter: '#1DA1F2' }
    }
  },
  variants: { extend: {} },
  plugins: []
}
