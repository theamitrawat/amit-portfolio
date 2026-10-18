import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // ── Dev proxy — forwards /api/* to Express server ──────────────────────────
  // This means axios calls to '/api/contact' work in dev without CORS issues.
  // In production, point VITE_API_URL to your deployed server URL.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-icons'))    return 'react-icons'
          if (id.includes('node_modules/framer-motion') ||
              id.includes('node_modules/motion-dom') ||
              id.includes('node_modules/motion-utils'))   return 'framer-motion'
          if (id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-router'))   return 'react-vendor'
          if (id.includes('node_modules/axios'))          return 'axios'
        },
      },
    },
  },
})
