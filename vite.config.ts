import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'REACT_');

  return {
    plugins: [react()],
    build: {
      outDir: 'build',
    },
    base: '/label',
    server: {
      port: 55432,
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': env,
    },
  };
});
