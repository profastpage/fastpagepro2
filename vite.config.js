import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 4000,
    host: true
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Split vendor libraries out of the main bundle so they cache
        // independently of app code (hashed filenames = immutable cache).
        // Vite 8 / Rolldown requires manualChunks to be a function.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-helmet-async') || /node_modules\/react(\/|-dom\/|-dom$)/.test(id)) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) return 'framer-motion';
            if (id.includes('lucide-react')) return 'lucide';
            // Spline packages already split via React.lazy() — leave them.
          }
        }
      }
    }
  }
})
