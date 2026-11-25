import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'framer';
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor';
          return undefined;
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
