
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'standalone-dist',
    lib: {
      entry: resolve(__dirname, 'src/standalone.tsx'),
      name: 'TalkingRobot',
      fileName: 'talking-robot',
      formats: ['umd'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'talking-robot.[ext]'
      }
    },
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
