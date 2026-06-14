/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0D10',
        surface: '#171B21',
        border: '#262B33',
        textPrimary: '#F5F7FA',
        textSecondary: '#9BA3AF',
        accent: '#4F8CFF',
      }
    },
  },
  plugins: [],
}
