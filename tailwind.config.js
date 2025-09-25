export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2', // A modern, slightly brighter blue
        secondary: '#F0F2F5', // A very light, clean gray
        accent: '#FFFFFF', // Pure white for backgrounds
        text: '#333333', // Dark gray for readability
        'light-gray': '#E0E0E0', // A new light gray for borders or subtle elements
        'dark-blue': '#2C3E50', // A dark blue for strong accents or text on light backgrounds
      },
    },
  },
  plugins: [],
}