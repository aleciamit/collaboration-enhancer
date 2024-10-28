import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Vite Configuration
export default defineConfig({
  plugins: [react()], // Plugin for React
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()], // PostCSS with Tailwind & Autoprefixer
    },
  },
});