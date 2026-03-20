import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // CRA's default build output
  },
  base: '/label',
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
});
