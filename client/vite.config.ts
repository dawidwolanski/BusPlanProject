import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/styles/variables' as *;`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5137,
  },
})
