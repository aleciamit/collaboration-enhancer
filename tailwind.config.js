/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust paths as necessary
    './public/index.html', // Include the main HTML file
  ],
  theme: {
    extend: {}, // Add custom themes or styles here if needed
  },
  plugins: [
    require('@tailwindcss/forms'), // Add necessary plugins
    require('@tailwindcss/typography'),
  ],
};