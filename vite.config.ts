import { defineConfig, loadEnv } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'REACT_');

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    build: {
      outDir: 'build',
    },
    base: '/label',
    server: {
      port: 55432,
      host: true,
    },
    resolve: {
      alias: {
        src: path.resolve(import.meta.dirname, './src'),
      },
    },
    define: {
      'process.env': env,
    },
    test: {
      globals: true,
    },
  };
});
