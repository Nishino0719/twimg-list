module.exports = {
  purge: ['./src/**/*.{ts,tsx}'],
  mode: 'jit',
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      colors: { 'accent-1': '#333', darkblue: '#10171e', twitter: '#1DA1F2' },
      maxHeight: { modalImage: '40rem' },
      width: { image: '40rem' }
    }
  },
  variants: { extend: {} },
  plugins: []
}
