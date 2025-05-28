import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Generate a random value for each build
const buildSalt = Date.now().toString() + Math.random().toString(36).substring(2, 10)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/inflation-calculator/',
  define: {
    __BUILD_SALT__: JSON.stringify(buildSalt),
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash]-${buildSalt}.js`,
        chunkFileNames: `assets/[name]-[hash]-${buildSalt}.js`,
        assetFileNames: `assets/[name]-[hash]-${buildSalt}.[ext]`,
      },
    },
  },
})
