import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Absolutely no source maps in production
  },
  esbuild: {
    drop: ['console', 'debugger'], // Remove console logs for extra protection
  }
})
