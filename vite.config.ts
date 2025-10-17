import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react() // React plugin only
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    // proxy: {
    //   '/': {
    //     target: process.env.VITE_BACKEND_PROD_URL,
    //     changeOrigin: true
    //   }
    // }
  }
})
