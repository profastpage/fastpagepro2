import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 3000,
    host: true
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    target: 'es2020',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@splinetool/react-spline') || id.includes('@splinetool/runtime')) {
            return 'spline-3d';
          }
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('gsap')) {
            return 'gsap';
          }
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
            return 'react-vendor';
          }
          if (id.includes('lucide-react')) {
            return 'lucide-icons';
          }
        },
      }
    }
  }
})