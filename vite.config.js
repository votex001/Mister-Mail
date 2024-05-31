import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    host: true,
    open: '/#/mail',
  },
  base: './',
  publicPath: '/assets/', // Add this line to specify the public path for your assets
})
