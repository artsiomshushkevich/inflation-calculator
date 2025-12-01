import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Generate a unique build identifier (e.g., timestamp)
const buildId = Date.now().toString();

// Write buildId to public/build-id.txt for use in service worker
const buildIdPath = path.resolve('public/build-id.txt');
fs.writeFileSync(buildIdPath, buildId);

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/inflation-calculator/' : '/';

  return {
    plugins: [react()],
    base: base,
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-${buildId}.js`,
          chunkFileNames: `assets/[name]-${buildId}.js`,
          assetFileNames: `assets/[name]-${buildId}.[ext]`,
        },
      },
    },
  };
});
