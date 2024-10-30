/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all React/TypeScript files
    "./public/index.html", // Include the main HTML file
  ],
  theme: {
    extend: {}, // Add custom themes or styles here if needed
  },
  plugins: [], // Optional: Add any Tailwind plugins here
};
