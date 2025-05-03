
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
        assetFileNames: 'talking-robot.[ext]',
        // Garantisce che tutti i file necessari siano inclusi
        manualChunks: undefined,
        inlineDynamicImports: true
      }
    },
    cssCodeSplit: false,
    // Assicurati che il build sia self-contained
    assetsInlineLimit: 0,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
