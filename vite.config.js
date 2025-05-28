import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Generate a unique build identifier (e.g., timestamp)
const buildId = Date.now().toString()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/inflation-calculator/',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-${buildId}.js`,
        chunkFileNames: `assets/[name]-${buildId}.js`,
        assetFileNames: `assets/[name]-${buildId}.[ext]`,
      },
    },
  },
})
