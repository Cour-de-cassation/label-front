import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    root: 'src',
    include: ['**/*.spec.ts'],
    coverage: {
      reporter: ['json', 'lcov', 'text', 'html'],
    },
  },
});
