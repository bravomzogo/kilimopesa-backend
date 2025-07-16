/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#28a745', // Vibrant green
        secondary: '#f4c430', // Bright yellow
        accent: '#007bff', // Blue
        background: '#f8fafc', // Light background
        gradientStart: '#1a7f33', // Darker green for gradient
        gradientEnd: '#4ade80', // Lighter green for gradient
      },
    },
  },
  plugins: [],
};