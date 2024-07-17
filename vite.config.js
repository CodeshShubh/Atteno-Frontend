import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // Ensure Vite knows where to find public assets
  build: {
    outDir: 'dist' // Ensure build output directory matches Vercel config
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit'],
  }
})
